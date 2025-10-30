import { createContext, useContext, useState, ReactNode } from 'react';

interface FormContextType {
  openContactForm: () => void;
  openNewsletterForm: (downloadUrl?: string) => void;
  showContactForm: boolean;
  showNewsletterForm: boolean;
  downloadUrl?: string;
  closeContactForm: () => void;
  closeNewsletterForm: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showNewsletterForm, setShowNewsletterForm] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | undefined>();

  const openContactForm = () => setShowContactForm(true);
  const closeContactForm = () => setShowContactForm(false);

  const openNewsletterForm = (url?: string) => {
    setDownloadUrl(url);
    setShowNewsletterForm(true);
  };

  const closeNewsletterForm = () => {
    setShowNewsletterForm(false);
    setDownloadUrl(undefined);
  };

  return (
    <FormContext.Provider
      value={{
        openContactForm,
        openNewsletterForm,
        showContactForm,
        showNewsletterForm,
        downloadUrl,
        closeContactForm,
        closeNewsletterForm
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within FormProvider');
  }
  return context;
}
