import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import mission1 from "@/assets/mission-1.jpg";
import mission2 from "@/assets/mission-2.jpg";
import { Target, Eye } from "lucide-react";

const MissionVisionPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <section className="relative py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-black mb-4"
          >
            {t(translations.nav.mission)}
          </motion.h1>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 space-y-16">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-10 items-center"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary p-3 rounded-lg">
                  <Target className="h-6 w-6 text-primary-foreground" />
                </div>
                <h2 className="text-3xl font-heading font-bold text-foreground">{t(translations.mission.title)}</h2>
              </div>
              <div className="w-16 h-1 bg-secondary rounded-full mb-6" />
              <p className="text-muted-foreground leading-relaxed text-base">{t(translations.mission.text)}</p>
            </div>
            <img src={mission1} alt="Mission" className="rounded-xl shadow-xl w-full h-72 object-cover" />
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-10 items-center"
          >
            <img src={mission2} alt="Vision" className="rounded-xl shadow-xl w-full h-72 object-cover order-2 md:order-1" />
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-secondary p-3 rounded-lg">
                  <Eye className="h-6 w-6 text-secondary-foreground" />
                </div>
                <h2 className="text-3xl font-heading font-bold text-foreground">{t(translations.vision.title)}</h2>
              </div>
              <div className="w-16 h-1 bg-primary rounded-full mb-6" />
              <p className="text-muted-foreground leading-relaxed text-base">{t(translations.vision.text)}</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default MissionVisionPage;
