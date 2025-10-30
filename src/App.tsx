import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { ContactFormModal } from './components/ContactFormModal';
import { NewsletterModal } from './components/NewsletterModal';
import { FormProvider, useFormContext } from './context/FormContext';
import { AuthProvider } from './context/AuthContext';
import { useFormTriggers } from './hooks/useFormTriggers';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';
import { CaseStudies } from './pages/CaseStudies';
import { FAQs } from './pages/FAQs';
import { Resources } from './pages/Resources';
import Insights from './pages/Insights';
import { SubmitReview } from './pages/SubmitReview';
import AdminLogin from './pages/AdminLogin';
import AdminSignup from './pages/AdminSignup';
import SetupAdmin from './pages/SetupAdmin';
import AdminResetPassword from './pages/AdminResetPassword';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const { showContactForm, showNewsletterForm, downloadUrl, closeContactForm, closeNewsletterForm } = useFormContext();
  useFormTriggers();

  return (
    <div className="min-h-screen bg-[#f5f1ed]">
      <ScrollToTop />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/submit-review" element={<SubmitReview />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/setup" element={<SetupAdmin />} />
        <Route path="/admin/reset-password" element={<AdminResetPassword />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      </Routes>
      <Footer />
      <ContactFormModal isOpen={showContactForm} onClose={closeContactForm} />
      <NewsletterModal isOpen={showNewsletterForm} onClose={closeNewsletterForm} downloadUrl={downloadUrl} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <FormProvider>
          <AppContent />
        </FormProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
