import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';

export function useFormTriggers() {
  const { openContactForm } = useFormContext();
  const location = useLocation();

  useEffect(() => {
    const visitedPages = JSON.parse(localStorage.getItem('visitedPages') || '[]');
    if (!visitedPages.includes(location.pathname)) {
      const newVisitedPages = [...visitedPages, location.pathname];
      localStorage.setItem('visitedPages', JSON.stringify(newVisitedPages));

      if (newVisitedPages.length >= 3) {
        const hasShownForm = sessionStorage.getItem('hasShownMultiPageForm');
        if (!hasShownForm) {
          setTimeout(() => {
            openContactForm();
            sessionStorage.setItem('hasShownMultiPageForm', 'true');
          }, 1000);
        }
      }
    }
  }, [location.pathname, openContactForm]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;
      const threshold = pageHeight - 100;

      if (scrollPosition >= threshold) {
        const hasShownBottomForm = sessionStorage.getItem('hasShownBottomForm');
        if (!hasShownBottomForm) {
          openContactForm();
          sessionStorage.setItem('hasShownBottomForm', 'true');
          window.removeEventListener('scroll', handleScroll);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [openContactForm]);
}
