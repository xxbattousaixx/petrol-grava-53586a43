import { useState, useCallback, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { servicesData, translations } from '@/i18n/translations';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { serviceImages } from '@/lib/serviceImages';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';

const ServicePage = () => {
  const { slug } = useParams();
  const { t } = useLanguage();
  const service = servicesData.find((s) => s.slug === slug);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  const onSelect = useCallback(() => {
    if (!carouselApi) return;
    setCurrentSlide(carouselApi.selectedScrollSnap());
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi) return;
    onSelect();
    carouselApi.on('select', onSelect);
    return () => { carouselApi.off('select', onSelect); };
  }, [carouselApi, onSelect]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-industrial-white">
        <div className="text-center">
          <h1 className="font-heading font-bold text-3xl text-foreground mb-4 uppercase">{t(translations.servicePage.notFound)}</h1>
          <Link to="/" className="text-petrol-green hover:text-petrol-gold transition-colors font-heading uppercase tracking-wider">{t(translations.notFound.back)}</Link>
        </div>
      </div>
    );
  }

  const currentIndex = servicesData.findIndex((s) => s.id === service.id);
  const prevService = currentIndex > 0 ? servicesData[currentIndex - 1] : null;
  const nextService = currentIndex < servicesData.length - 1 ? servicesData[currentIndex + 1] : null;
  const mainImage = serviceImages[service.image] || '';
  const extraImages = Object.entries(serviceImages).filter(([key]) => key.startsWith(service.image) && key !== service.image).map(([, val]) => val);
  const allImages = [mainImage, ...extraImages].filter(Boolean);

  return (
    <>
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <motion.img initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} src={mainImage} alt={t(service.title)} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-petrol-green-900/90 via-petrol-green-900/50 to-petrol-green-900/30" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
              <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-petrol-gold mb-4 transition-colors font-heading uppercase tracking-wider text-sm"><ArrowLeft className="h-4 w-4" />{t(translations.servicePage.back)}</Link>
            </motion.div>
            <div className="overflow-hidden"><motion.h1 initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl text-white uppercase tracking-tight max-w-4xl">{t(service.title)}</motion.h1></div>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28 bg-industrial-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
              <div className="w-20 h-1 bg-petrol-gold mb-8" />
              <p className="text-muted-foreground leading-relaxed text-lg mb-12 font-body whitespace-pre-line">{t(service.fullDesc)}</p>
            </motion.div>

            {/* Image Carousel */}
            {allImages.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="mb-12">
                <Carousel setApi={setCarouselApi} opts={{ loop: true }} className="relative">
                  <CarouselContent>
                    {allImages.map((img, i) => (
                      <CarouselItem key={i}>
                        <div className="overflow-hidden">
                          <img
                            src={img}
                            alt={`${t(service.title)} ${i + 1}`}
                            className="w-full h-[300px] md:h-[450px] object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={() => carouselApi?.scrollPrev()}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-petrol-green-900/70 hover:bg-petrol-green-900/90 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => carouselApi?.scrollNext()}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-petrol-green-900/70 hover:bg-petrol-green-900/90 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                      <div className="flex justify-center gap-2 mt-4">
                        {allImages.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => carouselApi?.scrollTo(i)}
                            className={`w-2.5 h-2.5 rounded-full transition-colors ${
                              i === currentSlide ? 'bg-petrol-gold' : 'bg-stone-300 hover:bg-stone-400'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </Carousel>
              </motion.div>
            )}

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-petrol-green-900 p-8 md:p-12 text-center">
              <p className="text-white/80 mb-6 font-body text-lg">{t(translations.servicePage.interested)}</p>
              <Link to="/contacto" className="group inline-flex items-center gap-3 bg-petrol-gold text-petrol-green-900 px-8 py-4 font-heading font-bold uppercase tracking-widest text-sm hover:bg-petrol-gold-500 transition-all duration-300">{t(translations.nav.contact)}<ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></Link>
            </motion.div>
            <div className="flex justify-between mt-12 pt-8 border-t border-stone-200">
              {prevService ? (<Link to={`/servicios/${prevService.slug}`} className="group flex items-center gap-3 text-petrol-green hover:text-petrol-gold transition-colors"><ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /><div className="text-left"><span className="block text-xs text-muted-foreground uppercase tracking-wider mb-1">{t(translations.servicePage.prev)}</span><span className="font-heading font-semibold uppercase tracking-wide text-sm hidden sm:block max-w-[200px] truncate">{t(prevService.title)}</span></div></Link>) : <div />}
              {nextService ? (<Link to={`/servicios/${nextService.slug}`} className="group flex items-center gap-3 text-petrol-green hover:text-petrol-gold transition-colors"><div className="text-right"><span className="block text-xs text-muted-foreground uppercase tracking-wider mb-1">{t(translations.servicePage.next)}</span><span className="font-heading font-semibold uppercase tracking-wide text-sm hidden sm:block max-w-[200px] truncate">{t(nextService.title)}</span></div><ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></Link>) : <div />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicePage;
