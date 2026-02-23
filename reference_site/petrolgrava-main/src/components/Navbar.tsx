import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, servicesData } from "@/i18n/translations";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import logoHeader from "@/assets/logo-header.jpg";

const Navbar = () => {
  const { lang, toggleLanguage, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoHeader} alt="Petrol Grava Services C.A Logo" className="h-12 w-auto rounded" />
          <div className="hidden sm:block">
            <span className="text-lg font-heading font-bold text-primary-foreground">PETROL GRAVA</span>
            <span className="block text-xs text-secondary font-heading tracking-widest">SERVICES C.A</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          <NavItem to="/" label={t(translations.nav.home)} active={isActive("/")} />
          <NavItem to="/nosotros" label={t(translations.nav.about)} active={isActive("/nosotros")} />

          {/* Services dropdown */}
          <div className="relative group">
            <button
              className={`flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition-colors text-primary-foreground hover:bg-primary/80 hover:text-secondary`}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              {t(translations.nav.services)}
              <ChevronDown className="h-4 w-4" />
            </button>
            <div
              className={`absolute left-0 top-full pt-2 w-80 transition-all ${servicesOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <div className="bg-card rounded-lg shadow-xl border border-border overflow-hidden max-h-[70vh] overflow-y-auto">
                {servicesData.map((s) => (
                  <Link
                    key={s.id}
                    to={`/servicios/${s.slug}`}
                    className="block px-4 py-3 text-sm text-card-foreground hover:bg-primary hover:text-primary-foreground transition-colors border-b border-border last:border-b-0"
                    onClick={() => setServicesOpen(false)}
                  >
                    {t(s.title)}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <NavItem to="/mision-vision" label={t(translations.nav.mission)} active={isActive("/mision-vision")} />
          <NavItem to="/contacto" label={t(translations.nav.contact)} active={isActive("/contacto")} />

          <button
            onClick={toggleLanguage}
            className="ml-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-bold hover:opacity-90 transition-opacity"
            aria-label="Toggle language"
          >
            <Globe className="h-3.5 w-3.5" />
            {lang === "es" ? "EN" : "ES"}
          </button>
        </nav>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold"
          >
            <Globe className="h-3.5 w-3.5" />
            {lang === "es" ? "EN" : "ES"}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-primary-foreground p-2">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-primary border-t border-primary/50 pb-4">
          <MobileLink to="/" label={t(translations.nav.home)} onClick={() => setMobileOpen(false)} />
          <MobileLink to="/nosotros" label={t(translations.nav.about)} onClick={() => setMobileOpen(false)} />
          <div className="px-4 py-2">
            <span className="text-secondary text-xs font-bold uppercase tracking-wider">{t(translations.nav.services)}</span>
          </div>
          {servicesData.map((s) => (
            <MobileLink
              key={s.id}
              to={`/servicios/${s.slug}`}
              label={t(s.title)}
              onClick={() => setMobileOpen(false)}
              indent
            />
          ))}
          <MobileLink to="/mision-vision" label={t(translations.nav.mission)} onClick={() => setMobileOpen(false)} />
          <MobileLink to="/contacto" label={t(translations.nav.contact)} onClick={() => setMobileOpen(false)} />
        </div>
      )}
    </header>
  );
};

const NavItem = ({ to, label, active }: { to: string; label: string; active: boolean }) => (
  <Link
    to={to}
    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
      active ? "bg-secondary text-secondary-foreground" : "text-primary-foreground hover:bg-primary/80 hover:text-secondary"
    }`}
  >
    {label}
  </Link>
);

const MobileLink = ({ to, label, onClick, indent }: { to: string; label: string; onClick: () => void; indent?: boolean }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`block px-4 py-2.5 text-sm text-primary-foreground hover:bg-primary/80 hover:text-secondary transition-colors ${indent ? "pl-8 text-xs" : "font-medium"}`}
  >
    {label}
  </Link>
);

export default Navbar;
