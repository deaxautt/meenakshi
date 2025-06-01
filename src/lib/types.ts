export interface User {
  id: string;
  email: string;
  full_name: string;
  mobile?: string;
  avatar_url?: string;
  email_verified?: boolean;
}