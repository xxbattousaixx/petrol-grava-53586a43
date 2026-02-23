import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { translations } from '@/i18n/translations';

interface ServiceCardProps {
  service: any;
  image: string;
  index: number;
}

const ServiceCard = ({ service, image, index }: ServiceCardProps) => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX / rect.width - 0.5 - rect.left / rect.width);
    y.set(e.clientY / rect.height - 0.5 - rect.top / rect.height);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); setIsHovered(false); };

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }} onMouseMove={handleMouseMove} onMouseEnter={() => setIsHovered(true)} onMouseLeave={handleMouseLeave} style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} className="relative h-full perspective-1000">
      <Link to={`/servicios/${service.slug}`} className="group block h-full bg-white border border-stone-200 overflow-hidden transition-all duration-500 hover:border-petrol-gold/50 hover:shadow-2xl" style={{ transformStyle: 'preserve-3d' }}>
        <div className="relative h-52 overflow-hidden">
          <motion.img src={image} alt={t(service.title)} className="w-full h-full object-cover" animate={{ scale: isHovered ? 1.1 : 1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} />
          <motion.div className="absolute inset-0 bg-gradient-to-t from-petrol-green-900/80 via-petrol-green-900/20 to-transparent" animate={{ opacity: isHovered ? 1 : 0.6 }} transition={{ duration: 0.3 }} />
          <motion.div className="absolute bottom-0 left-0 right-0 h-1 bg-petrol-gold origin-left" initial={{ scaleX: 0 }} animate={{ scaleX: isHovered ? 1 : 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} />
        </div>
        <div className="p-6" style={{ transform: 'translateZ(20px)' }}>
          <h3 className="font-heading font-bold text-foreground text-base mb-2 uppercase tracking-wide leading-tight group-hover:text-petrol-green transition-colors duration-300">{t(service.title)}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{t(service.shortDesc)}</p>
          <motion.span className="inline-flex items-center gap-2 text-xs font-heading font-bold text-petrol-green uppercase tracking-widest group-hover:text-petrol-gold transition-colors" animate={{ x: isHovered ? 5 : 0 }} transition={{ duration: 0.2 }}>
            {t(translations.services.learnMore)}<ArrowRight className="h-3 w-3" />
          </motion.span>
        </div>
      </Link>
    </motion.div>
  );
};

export default ServiceCard;
