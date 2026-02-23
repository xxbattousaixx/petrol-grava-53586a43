import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import aboutDock from "@/assets/about-dock.jpg";
import mission1 from "@/assets/mission-1.jpg";
import mission2 from "@/assets/mission-2.jpg";
import { CheckCircle } from "lucide-react";

const AboutPage = () => {
  const { t, tArr } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-black mb-4"
          >
            {t(translations.about.title)}
          </motion.h1>
          <p className="text-lg opacity-80">{t(translations.about.subtitle)}</p>
          <p className="text-sm opacity-60 mt-2">{translations.about.rif}</p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-muted-foreground leading-relaxed text-base mb-8">{t(translations.about.description)}</p>
              <h3 className="text-xl font-heading font-bold text-foreground mb-4">{t(translations.about.areas.title)}</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />{t(translations.about.areas.north)}</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />{t(translations.about.areas.west)}</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />{t(translations.about.areas.east)}</li>
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img src={aboutDock} alt="Dock facilities" className="rounded-xl shadow-xl w-full h-72 object-cover mb-4" />
              <img src={mission1} alt="Operations" className="rounded-xl shadow-xl w-full h-48 object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Other experience */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-6">{t(translations.about.experience.title)}</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {tArr(translations.about.experience.items).map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-lg p-4 shadow-sm border border-border"
              >
                <CheckCircle className="h-5 w-5 text-primary mb-2" />
                <p className="text-sm font-medium text-foreground">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image section */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <img src={mission2} alt="Petrol Grava facilities" className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg" />
        </div>
      </section>
    </>
  );
};

export default AboutPage;
