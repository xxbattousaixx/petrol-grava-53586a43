import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { MapPin, Phone, Mail, Send, Clock } from "lucide-react";

const ContactPage = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="relative py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-black mb-4"
          >
            {t(translations.contact.title)}
          </motion.h1>
          <p className="text-lg opacity-80">{t(translations.contact.subtitle)}</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {submitted ? (
                <div className="bg-primary/10 rounded-xl p-8 text-center">
                  <Send className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                    {t({ es: "¡Mensaje Enviado!", en: "Message Sent!" })}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t({ es: "Nos pondremos en contacto con usted pronto.", en: "We will get in touch with you soon." })}
                  </p>
                </div>
              ) : (
                <form
                  action="https://formsubmit.co/petrolgravaadm@gmail.com"
                  method="POST"
                  onSubmit={() => setSubmitted(true)}
                  className="space-y-5"
                >
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_subject" value="Nuevo mensaje desde el sitio web de Petrol Grava" />
                  <input type="text" name="_honey" className="hidden" />

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">{t(translations.contact.name)} *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      maxLength={100}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">{t(translations.contact.email)} *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      maxLength={255}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">{t(translations.contact.phone)}</label>
                    <input
                      type="tel"
                      name="phone"
                      maxLength={20}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">{t(translations.contact.message)} *</label>
                    <textarea
                      name="message"
                      required
                      maxLength={1000}
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-shadow resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold font-heading hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    {t(translations.contact.send)}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-card rounded-xl p-6 shadow-md border border-border space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading font-bold text-foreground text-sm mb-1">{t(translations.contact.address)}</h4>
                    <p className="text-sm text-muted-foreground">{t(translations.contact.addressText)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading font-bold text-foreground text-sm mb-1">{t({ es: "Teléfono", en: "Phone" })}</h4>
                    <p className="text-sm text-muted-foreground">{translations.contact.phoneNumbers}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading font-bold text-foreground text-sm mb-1">{t({ es: "Correo Electrónico", en: "Email" })}</h4>
                    {translations.contact.emails.map((e) => (
                      <a key={e} href={`mailto:${e}`} className="block text-sm text-primary hover:text-secondary transition-colors">{e}</a>
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading font-bold text-foreground text-sm mb-1">{t({ es: "Horario", en: "Schedule" })}</h4>
                    <p className="text-sm text-muted-foreground">{t({ es: "Lunes a Viernes: 7:00 AM - 5:00 PM", en: "Monday to Friday: 7:00 AM - 5:00 PM" })}</p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden shadow-md border border-border h-72">
                <iframe
                  title="Petrol Grava Services location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.5!2d-71.45!3d10.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCabimas%2C+Zulia%2C+Venezuela!5e0!3m2!1ses!2sve!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
