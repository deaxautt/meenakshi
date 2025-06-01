import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ConsultationBanner from './components/sections/ConsultationBanner';
import AppRoutes from './routes';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <AppRoutes />
          </main>
          <ConsultationBanner />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;