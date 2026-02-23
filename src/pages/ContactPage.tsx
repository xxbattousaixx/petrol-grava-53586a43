import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { translations } from '@/i18n/translations';
import { MapPin, Phone, Mail, Send, Clock, CheckCircle } from 'lucide-react';

const ContactPage = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    try {
      await fetch('https://formsubmit.co/ajax/petrolgravaadm@gmail.com', { method: 'POST', body: formData });
      setSubmitted(true);
    } catch (error) { console.error('Form submission error:', error); }
    setIsSubmitting(false);
  };

  return (
    <>
      <section className="relative py-32 md:py-40 bg-petrol-green-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10"><div className="absolute top-20 left-1/4 w-40 h-40 border border-white rounded-full" /><div className="absolute bottom-10 right-1/4 w-60 h-60 border border-white rounded-full" /></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-mono text-petrol-gold text-xs tracking-[0.3em] mb-4 block">{t(translations.contact.label)}</motion.span>
          <div className="overflow-hidden"><motion.h1 initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight">{t(translations.contact.title)}</motion.h1></div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }} className="text-xl text-white/80 mt-4 max-w-2xl mx-auto font-body">{t(translations.contact.subtitle)}</motion.p>
        </div>
      </section>
      <section className="py-24 md:py-32 bg-industrial-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-petrol-green/10 border-l-4 border-petrol-green p-8 text-center h-full flex flex-col items-center justify-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }} className="w-16 h-16 bg-petrol-green rounded-full flex items-center justify-center mb-6"><CheckCircle className="h-8 w-8 text-white" /></motion.div>
                  <h3 className="font-heading font-bold text-2xl text-foreground mb-2 uppercase tracking-wide">{t(translations.contact.success)}</h3>
                  <p className="text-muted-foreground font-body">{t(translations.contact.successText)}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input type="hidden" name="_cc" value="petrolgravagerencia@gmail.com" />
                  <input type="hidden" name="_subject" value="Nuevo mensaje de contacto - Petrol Grava Services" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_captcha" value="false" />
                  <div><label className="block font-heading font-semibold text-foreground mb-2 uppercase tracking-wider text-sm">{t(translations.contact.name)} *</label><input type="text" name="name" required maxLength={100} className="w-full px-4 py-4 bg-white border-2 border-stone-200 text-foreground focus:outline-none focus:border-petrol-green transition-colors font-body" /></div>
                  <div><label className="block font-heading font-semibold text-foreground mb-2 uppercase tracking-wider text-sm">{t(translations.contact.email)} *</label><input type="email" name="email" required maxLength={255} className="w-full px-4 py-4 bg-white border-2 border-stone-200 text-foreground focus:outline-none focus:border-petrol-green transition-colors font-body" /></div>
                  <div><label className="block font-heading font-semibold text-foreground mb-2 uppercase tracking-wider text-sm">{t(translations.contact.phone)}</label><input type="tel" name="phone" maxLength={20} className="w-full px-4 py-4 bg-white border-2 border-stone-200 text-foreground focus:outline-none focus:border-petrol-green transition-colors font-body" /></div>
                  <div><label className="block font-heading font-semibold text-foreground mb-2 uppercase tracking-wider text-sm">{t(translations.contact.message)} *</label><textarea name="message" required maxLength={1000} rows={6} className="w-full px-4 py-4 bg-white border-2 border-stone-200 text-foreground focus:outline-none focus:border-petrol-green transition-colors resize-none font-body" /></div>
                  <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-petrol-green text-white py-4 font-heading font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-petrol-green-800 transition-colors disabled:opacity-50">
                    {isSubmitting ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" /> : <><Send className="h-4 w-4" />{t(translations.contact.send)}</>}
                  </motion.button>
                </form>
              )}
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="space-y-8">
              <div className="bg-white border-l-4 border-petrol-gold p-6 shadow-lg">
                <div className="space-y-6">
                  <div className="flex items-start gap-4"><div className="p-2 bg-petrol-green"><MapPin className="h-5 w-5 text-white" /></div><div><h4 className="font-heading font-bold text-foreground uppercase tracking-wider text-sm mb-1">{t(translations.contact.address)}</h4><p className="text-muted-foreground font-body">{t(translations.contact.addressText)}</p></div></div>
                  <div className="flex items-start gap-4"><div className="p-2 bg-petrol-green"><Phone className="h-5 w-5 text-white" /></div><div><h4 className="font-heading font-bold text-foreground uppercase tracking-wider text-sm mb-1">{t({ es: 'Teléfono', en: 'Phone' })}</h4><p className="text-muted-foreground font-body">{translations.contact.phoneNumbers}</p></div></div>
                  <div className="flex items-start gap-4"><div className="p-2 bg-petrol-green"><Mail className="h-5 w-5 text-white" /></div><div><h4 className="font-heading font-bold text-foreground uppercase tracking-wider text-sm mb-1">{t({ es: 'Correo Electrónico', en: 'Email' })}</h4><div className="text-muted-foreground font-body">{translations.contact.emails.map((e) => (<a key={e} href={`mailto:${e}`} className="block hover:text-petrol-green transition-colors">{e}</a>))}</div></div></div>
                  <div className="flex items-start gap-4"><div className="p-2 bg-petrol-green"><Clock className="h-5 w-5 text-white" /></div><div><h4 className="font-heading font-bold text-foreground uppercase tracking-wider text-sm mb-1">{t({ es: 'Horario', en: 'Schedule' })}</h4><p className="text-muted-foreground font-body">{t(translations.contact.schedule)}</p></div></div>
                </div>
              </div>
              <div className="h-80 shadow-lg overflow-hidden">
                <iframe title="Petrol Grava Services location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.5!2d-71.45!3d10.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCabimas%2C+Zulia%2C+Venezuela!5e0!3m2!1ses!2sve!4v1" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
