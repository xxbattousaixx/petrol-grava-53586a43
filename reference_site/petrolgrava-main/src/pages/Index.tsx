import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, servicesData } from "@/i18n/translations";
import { ChevronLeft, ChevronRight, ArrowRight, Anchor, Shield, Clock, Award } from "lucide-react";
import carousel1 from "@/assets/carousel-1.jpg";
import carousel2 from "@/assets/carousel-2.jpg";
import carousel3 from "@/assets/carousel-3.jpg";
import carousel4 from "@/assets/carousel-4.jpg";
import carousel5 from "@/assets/carousel-5.jpg";
import aboutDock from "@/assets/about-dock.jpg";
import mission1 from "@/assets/mission-1.jpg";

const serviceImages: Record<string, string> = {};
const imageModules = import.meta.glob("@/assets/service-*.jpg", { eager: true }) as Record<string, { default: string }>;
Object.entries(imageModules).forEach(([path, mod]) => {
  const name = path.split("/").pop()?.replace(".jpg", "") || "";
  serviceImages[name] = mod.default;
});

const carouselImages = [carousel1, carousel2, carousel3, carousel4, carousel5];

const Index = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <>
      {/* Hero Carousel */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img
              src={carouselImages[currentSlide]}
              alt="Petrol Grava Services operations"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-xl"
          >
            <span className="inline-block bg-secondary text-secondary-foreground px-4 py-1.5 rounded-full text-sm font-bold mb-4">
              {t(translations.hero.since)}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-primary-foreground leading-tight mb-4">
              {t(translations.hero.title)}
            </h1>
            <p className="text-lg text-primary-foreground/90 mb-8 leading-relaxed">
              {t(translations.hero.subtitle)}
            </p>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
            >
              {t(translations.hero.cta)}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>

        {/* Carousel controls */}
        <button
          onClick={() => setCurrentSlide((p) => (p - 1 + carouselImages.length) % carouselImages.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-primary/60 text-primary-foreground p-2 rounded-full hover:bg-primary/80 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-primary/60 text-primary-foreground p-2 rounded-full hover:bg-primary/80 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {carouselImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2.5 rounded-full transition-all ${i === currentSlide ? "w-8 bg-secondary" : "w-2.5 bg-primary-foreground/50"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-secondary py-6">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: Clock, value: "+27", label: { es: "Años de Experiencia", en: "Years of Experience" } },
            { icon: Anchor, value: "76,402", label: { es: "m² de Terreno", en: "sqm of Land" } },
            { icon: Shield, value: "465", label: { es: "Mts Lineales de Muelle", en: "Linear Meters of Dock" } },
            { icon: Award, value: "10", label: { es: "Servicios Especializados", en: "Specialized Services" } },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <stat.icon className="h-6 w-6 text-secondary-foreground/70 mb-1" />
              <span className="text-2xl md:text-3xl font-heading font-black text-secondary-foreground">{stat.value}</span>
              <span className="text-xs text-secondary-foreground/70 font-medium">{t(stat.label)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* About preview */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
                {t(translations.about.title)}
              </h2>
              <div className="w-16 h-1 bg-secondary rounded-full mb-6" />
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t(translations.about.description)}
              </p>
              <Link
                to="/nosotros"
                className="inline-flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors"
              >
                {t({ es: "Leer Más", en: "Read More" })}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img src={aboutDock} alt="Petrol Grava dock facilities" className="rounded-xl shadow-xl w-full h-80 object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">{t(translations.services.title)}</h2>
            <div className="w-16 h-1 bg-secondary rounded-full mx-auto mb-4" />
            <p className="text-muted-foreground max-w-2xl mx-auto">{t(translations.services.subtitle)}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <Link
                  to={`/servicios/${service.slug}`}
                  className="group block bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={serviceImages[service.image] || ""}
                      alt={t(service.title)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading font-bold text-foreground text-sm mb-2 leading-tight group-hover:text-primary transition-colors">
                      {t(service.title)}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">{t(service.shortDesc)}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:text-secondary transition-colors">
                      {t(translations.services.learnMore)}
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision preview */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-heading font-bold text-secondary mb-4">{t(translations.mission.title)}</h2>
              <p className="text-sm opacity-90 leading-relaxed">{t(translations.mission.text)}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <h2 className="text-2xl font-heading font-bold text-secondary mb-4">{t(translations.vision.title)}</h2>
              <p className="text-sm opacity-90 leading-relaxed">{t(translations.vision.text)}</p>
            </motion.div>
          </div>
          <div className="mt-8 text-center">
            <Link to="/mision-vision" className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-5 py-2.5 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">
              {t({ es: "Leer Más", en: "Read More" })}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <img src={mission1} alt="Petrol Grava operations" className="w-full h-64 object-cover rounded-xl mb-8 shadow-lg" />
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
            {t({ es: "¿Necesita nuestros servicios?", en: "Need our services?" })}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            {t({
              es: "Contáctenos hoy para discutir cómo podemos ayudarle con sus necesidades de mantenimiento lacustre y petrolero.",
              en: "Contact us today to discuss how we can help with your lacustrine and oil maintenance needs.",
            })}
          </p>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
          >
            {t(translations.nav.contact)}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Index;
