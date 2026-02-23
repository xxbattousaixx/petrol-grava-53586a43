import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, servicesData } from "@/i18n/translations";
import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-heading font-bold text-secondary mb-4">Petrol Grava Services C.A</h3>
            <p className="text-sm opacity-80 leading-relaxed mb-4">
              {t({
                es: "Más de 27 años de experiencia en servicios lacustres y petroleros.",
                en: "Over 27 years of experience in lacustrine and oil services.",
              })}
            </p>
            <p className="text-xs opacity-60">RIF J303361250</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-bold text-secondary mb-4">{t(translations.nav.services)}</h4>
            <ul className="space-y-1.5">
              {servicesData.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <Link to={`/servicios/${s.slug}`} className="text-xs opacity-80 hover:opacity-100 hover:text-secondary transition-colors">
                    {t(s.title)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-heading font-bold text-secondary mb-4">{t(translations.nav.contact)}</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-secondary flex-shrink-0" />
                <span className="opacity-80">{t(translations.contact.addressText)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-secondary flex-shrink-0" />
                <span className="opacity-80">{translations.contact.phoneNumbers}</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-secondary flex-shrink-0" />
                <div className="opacity-80">
                  {translations.contact.emails.map((e) => (
                    <a key={e} href={`mailto:${e}`} className="block hover:text-secondary transition-colors">{e}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-foreground/20 text-center text-xs opacity-60">
          © {new Date().getFullYear()} Petrol Grava Services C.A. {t(translations.footer.rights)}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
