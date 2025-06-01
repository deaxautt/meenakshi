import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import { query } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '24h';
const RESET_TOKEN_EXPIRES_IN = '1h';

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export interface User {
  id: string;
  email: string;
  full_name: string;
  mobile?: string;
  avatar_url?: string;
  email_verified: boolean;
}

export async function signIn(email: string, password: string): Promise<{ user: User | null; token: string | null; error: string | null }> {
  try {
    const [users] = await query<User[]>('SELECT * FROM users WHERE email = ?', [email]);
    const user = users[0];

    if (!user) {
      return { user: null, token: null, error: 'User not found' };
    }

    const [passwords] = await query<{ password_hash: string }[]>(
      'SELECT password_hash FROM users WHERE id = ?',
      [user.id]
    );

    const isValid = await bcrypt.compare(password, passwords[0].password_hash);
    if (!isValid) {
      return { user: null, token: null, error: 'Invalid password' };
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // Update last login timestamp
    await query(
      'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
      [user.id]
    );

    return { user, token, error: null };
  } catch (error) {
    console.error('Sign in error:', error);
    return { user: null, token: null, error: 'Authentication failed' };
  }
}

export async function signUp(
  email: string,
  password: string,
  fullName: string,
  mobile?: string
): Promise<{ user: User | null; token: string | null; error: string | null }> {
  try {
    // Check if user exists
    const [existingUsers] = await query<User[]>('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return { user: null, token: null, error: 'Email already exists' };
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const [result] = await query(
      'INSERT INTO users (id, email, full_name, password_hash, mobile, email_verified, created_at, last_login) VALUES (UUID(), ?, ?, ?, ?, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)',
      [email, fullName, hashedPassword, mobile]
    );

    // Get created user
    const [users] = await query<User[]>('SELECT * FROM users WHERE email = ?', [email]);
    const user = users[0];

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return { user, token, error: null };
  } catch (error) {
    console.error('Sign up error:', error);
    return { user: null, token: null, error: 'Registration failed' };
  }
}

export async function requestPasswordReset(email: string): Promise<{ success: boolean; error: string | null }> {
  try {
    // Check if user exists
    const [users] = await query<User[]>('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return { success: false, error: 'User not found' };
    }

    const user = users[0];
    const resetToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: RESET_TOKEN_EXPIRES_IN });

    // Store reset token in database
    await query(
      'UPDATE users SET reset_token = ?, reset_token_expires = DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE id = ?',
      [resetToken, user.id]
    );

    // Send reset email
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@meenakshi.com',
      to: email,
      subject: 'Password Reset Request',
      html: `
        <h1>Password Reset Request</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link will expire in 1 hour.</p>
      `
    });

    return { success: true, error: null };
  } catch (error) {
    console.error('Password reset request error:', error);
    return { success: false, error: 'Failed to process password reset request' };
  }
}

export async function resetPassword(token: string, newPassword: string): Promise<{ success: boolean; error: string | null }> {
  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    // Check if token is valid and not expired
    const [users] = await query<User[]>(
      'SELECT * FROM users WHERE id = ? AND reset_token = ? AND reset_token_expires > NOW()',
      [decoded.userId, token]
    );

    if (users.length === 0) {
      return { success: false, error: 'Invalid or expired reset token' };
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password and clear reset token
    await query(
      'UPDATE users SET password_hash = ?, reset_token = NULL, reset_token_expires = NULL, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [hashedPassword, decoded.userId]
    );

    return { success: true, error: null };
  } catch (error) {
    console.error('Password reset error:', error);
    return { success: false, error: 'Failed to reset password' };
  }
}

export async function verifyToken(token: string): Promise<{ userId: string | null; error: string | null }> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return { userId: decoded.userId, error: null };
  } catch (error) {
    return { userId: null, error: 'Invalid token' };
  }
}

export async function getUser(userId: string): Promise<User | null> {
  try {
    const [users] = await query<User[]>('SELECT * FROM users WHERE id = ?', [userId]);
    return users[0] || null;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
}

export async function updateUser(
  userId: string,
  updates: Partial<User>
): Promise<{ user: User | null; error: string | null }> {
  try {
    const allowedUpdates = ['full_name', 'mobile', 'avatar_url'];
    const updateFields = Object.entries(updates)
      .filter(([key]) => allowedUpdates.includes(key))
      .map(([key, value]) => `${key} = ?`);

    if (updateFields.length === 0) {
      return { user: null, error: 'No valid fields to update' };
    }

    const query = `UPDATE users SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
    const values = [...Object.values(updates), userId];

    await query(query, values);

    const user = await getUser(userId);
    return { user, error: null };
  } catch (error) {
    console.error('Update user error:', error);
    return { user: null, error: 'Failed to update user' };
  }
}