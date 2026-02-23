import { LanguageProvider } from './i18n/LanguageContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Index from './pages/Index';
import AboutPage from './pages/AboutPage';
import MissionVisionPage from './pages/MissionVisionPage';
import ServicePage from './pages/ServicePage';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/nosotros" element={<AboutPage />} />
            <Route path="/mision-vision" element={<MissionVisionPage />} />
            <Route path="/servicios/:slug" element={<ServicePage />} />
            <Route path="/contacto" element={<ContactPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
