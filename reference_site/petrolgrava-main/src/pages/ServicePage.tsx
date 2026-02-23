import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { servicesData, translations } from "@/i18n/translations";
import { ArrowLeft, ArrowRight } from "lucide-react";

const serviceImages: Record<string, string> = {};
const imageModules = import.meta.glob("@/assets/service-*.jpg", { eager: true }) as Record<string, { default: string }>;
Object.entries(imageModules).forEach(([path, mod]) => {
  const name = path.split("/").pop()?.replace(".jpg", "") || "";
  serviceImages[name] = mod.default;
});

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();

  const service = servicesData.find((s) => s.slug === slug);
  if (!service) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-heading font-bold">{t({ es: "Servicio no encontrado", en: "Service not found" })}</h1>
        <Link to="/" className="text-primary mt-4 inline-block">{t({ es: "Volver al inicio", en: "Back to home" })}</Link>
      </div>
    );
  }

  const currentIndex = servicesData.findIndex((s) => s.id === service.id);
  const prevService = currentIndex > 0 ? servicesData[currentIndex - 1] : null;
  const nextService = currentIndex < servicesData.length - 1 ? servicesData[currentIndex + 1] : null;

  // Get all images for this service
  const mainImage = serviceImages[service.image] || "";
  const extraImages = Object.entries(serviceImages)
    .filter(([key]) => key.startsWith(service.image) && key !== service.image)
    .map(([, val]) => val);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <img src={mainImage} alt={t(service.title)} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-primary/40" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Link
              to="/#servicios"
              className="inline-flex items-center gap-1 text-sm text-primary-foreground/80 hover:text-secondary mb-3 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t(translations.nav.services)}
            </Link>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-heading font-black text-primary-foreground"
            >
              {t(service.title)}
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground leading-relaxed text-base mb-8"
            >
              {t(service.fullDesc)}
            </motion.p>

            {/* Extra images */}
            {extraImages.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mb-8">
                {extraImages.map((img, i) => (
                  <img key={i} src={img} alt={`${t(service.title)} ${i + 2}`} className="rounded-lg shadow-md w-full h-48 object-cover" />
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="bg-primary rounded-xl p-6 text-center">
              <p className="text-primary-foreground text-sm mb-4">
                {t({
                  es: "¿Interesado en este servicio? Contáctenos para más información.",
                  en: "Interested in this service? Contact us for more information.",
                })}
              </p>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-5 py-2.5 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity"
              >
                {t(translations.nav.contact)}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Navigation between services */}
          <div className="flex justify-between mt-12 max-w-3xl mx-auto">
            {prevService ? (
              <Link
                to={`/servicios/${prevService.slug}`}
                className="flex items-center gap-2 text-sm text-primary hover:text-secondary transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">{t(prevService.title)}</span>
                <span className="sm:hidden">{t({ es: "Anterior", en: "Previous" })}</span>
              </Link>
            ) : <div />}
            {nextService ? (
              <Link
                to={`/servicios/${nextService.slug}`}
                className="flex items-center gap-2 text-sm text-primary hover:text-secondary transition-colors"
              >
                <span className="hidden sm:inline">{t(nextService.title)}</span>
                <span className="sm:hidden">{t({ es: "Siguiente", en: "Next" })}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicePage;
