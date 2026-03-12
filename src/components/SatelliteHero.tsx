import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ChevronRight, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { translations } from '@/i18n/translations';

const ANIMATION_STATES = ['idle', 'space', 'zoom1', 'zoom2', 'map', 'zoom3', 'zoom4', 'dock', 'complete'];

interface SatelliteHeroProps {
  latitude?: number;
  longitude?: number;
  locationName?: string;
  onAnimationComplete?: () => void;
}

const SatelliteHero = ({ latitude = 10.4123, longitude = -71.4368, locationName = 'Cabimas, Zulia, Venezuela', onAnimationComplete }: SatelliteHeroProps) => {
  const { t } = useLanguage();
  const [animationState, setAnimationState] = useState('idle');
  const [showContent, setShowContent] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasStarted = useRef(false);

  const loadImage = (src: string) => new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });

  const startAnimation = useCallback(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    setAnimationState('space');
    const sequence = async () => {
      const venezuelaLoaded = loadImage('/assets/satellite-venezuela-region.jpg');
      await new Promise(r => setTimeout(r, 1800));
      await venezuelaLoaded;
      setAnimationState('zoom1');
      const maracaiboLoaded = loadImage('/assets/satellite-lake-maracaibo.jpg');
      await new Promise(r => setTimeout(r, 1800));
      await maracaiboLoaded;
      setAnimationState('zoom2');
      // Map slide (4th position)
      const mapLoaded = loadImage('/assets/satellite-lago-map.jpg');
      await new Promise(r => setTimeout(r, 1800));
      await mapLoaded;
      setAnimationState('map');
      const dockAerialLoaded = loadImage('/assets/satellite-dock-aerial.png');
      await new Promise(r => setTimeout(r, 2200));
      await dockAerialLoaded;
      setAnimationState('zoom3');
      const dockWideLoaded = loadImage('/assets/dock-wide-aerial.jpg');
      await new Promise(r => setTimeout(r, 1800));
      await dockWideLoaded;
      setAnimationState('zoom4');
      const dockFinalLoaded = loadImage('/assets/dock-aerial-view.jpg');
      await new Promise(r => setTimeout(r, 1500));
      await dockFinalLoaded;
      setAnimationState('dock');
      await new Promise(r => setTimeout(r, 800));
      setAnimationState('complete');
      setShowContent(true);
      // Start looping video background
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
      onAnimationComplete?.();
    };
    sequence();
  }, [onAnimationComplete]);

  useEffect(() => {
    if (!hasStarted.current) startAnimation();
  }, [startAnimation]);

  const skipAnimation = useCallback(() => {
    if (videoRef.current) { videoRef.current.play().catch(() => {}); }
    setAnimationState('complete');
    setShowContent(true);
    hasStarted.current = true;
  }, []);

  const getImageForState = (state: string) => {
    switch (state) {
      case 'idle': case 'space': return '/assets/satellite-earth-space.jpg';
      case 'zoom1': return '/assets/satellite-venezuela-region.jpg';
      case 'zoom2': return '/assets/satellite-lake-maracaibo.jpg';
      case 'map': return '/assets/satellite-lago-map.jpg';
      case 'zoom3': return '/assets/satellite-dock-aerial.png';
      case 'zoom4': return '/assets/dock-wide-aerial.jpg';
      case 'dock': case 'complete': return '/assets/dock-aerial-view.jpg'; // fallback behind video
      default: return '/assets/satellite-earth-space.jpg';
    }
  };

  const getScaleForState = (state: string) => {
    switch (state) {
      case 'idle': return 1;
      case 'space': return 1.1;
      case 'zoom1': return 1.25;
      case 'zoom2': return 1.15;
      case 'map': return 1.05;
      case 'zoom3': return 1.12;
      case 'zoom4': return 1.1;
      case 'dock': case 'complete': return 1.05;
      default: return 1;
    }
  };

  const getOverlayOpacity = (state: string) => {
    switch (state) {
      case 'idle': return 0.4;
      case 'space': case 'zoom1': case 'zoom2': return 0.3;
      case 'map': return 0.25;
      case 'zoom3': return 0.35;
      case 'zoom4': return 0.45;
      case 'dock': return 0.55;
      case 'video': return 0.3;
      case 'complete': return 0.55;
      default: return 0.3;
    }
  };

  const getProgressWidth = () => {
    switch (animationState) {
      case 'space': return '10%';
      case 'zoom1': return '25%';
      case 'zoom2': return '40%';
      case 'map': return '50%';
      case 'zoom3': return '62%';
      case 'zoom4': return '75%';
      case 'dock': return '85%';
      case 'video': return '95%';
      default: return '100%';
    }
  };

  return (
    <div ref={containerRef} className="satellite-hero">
      <div className="satellite-layers">
        {ANIMATION_STATES.map((state) => {
          if (state === 'video') return null;
          return (
            <div key={state} className={`satellite-layer ${animationState === state ? 'active' : ''} ${animationState === 'complete' && state === 'dock' ? 'active' : ''}`} style={{ backgroundImage: `url(${getImageForState(state)})`, transform: `scale(${getScaleForState(animationState)})` }} />
          );
        })}
        {/* Video layer */}
        <div 
          className={`satellite-layer ${animationState === 'video' ? 'active' : ''}`} 
          style={{ 
            transform: `scale(${getScaleForState(animationState)})`,
            overflow: 'hidden',
          }}
        >
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          >
            <source src="/assets/video-muelle-2.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="satellite-overlay" style={{ opacity: getOverlayOpacity(animationState) }} />
        {(animationState === 'space' || animationState === 'zoom1' || animationState === 'zoom2' || animationState === 'map' || animationState === 'zoom3' || animationState === 'zoom4') && <div className="scan-lines" />}
        {(animationState === 'zoom1' || animationState === 'zoom2' || animationState === 'map' || animationState === 'zoom3' || animationState === 'zoom4') && (
          <div className="crosshair-overlay">
            <div className="crosshair-h" /><div className="crosshair-v" />
            <div className="crosshair-center"><div className="crosshair-ring" /><div className="crosshair-dot" /></div>
          </div>
        )}
      </div>
      {animationState !== 'idle' && animationState !== 'complete' && (
        <div className="satellite-ui">
          <div className="ui-bottom-bar">
            <div className="ui-coords">
              <span className="coord-lat">{latitude}° N</span>
              <span className="coord-separator">·</span>
              <span className="coord-lng">{Math.abs(longitude)}° W</span>
            </div>
            <div className="ui-progress"><div className="progress-bar" style={{ width: getProgressWidth() }} /></div>
          </div>
          <button className="skip-button" onClick={skipAnimation}>Skip<ChevronRight className="w-4 h-4" /></button>
        </div>
      )}
      <div className={`final-content ${showContent ? 'visible' : ''}`}>
        <div className="hero-badge"><span className="badge-line" /><span className="badge-text font-mono">{t(translations.hero.since)}</span></div>
        <h1 className="hero-title"><span className="title-white">{t(translations.hero.title)}</span><span className="title-gold">{t(translations.hero.titleLine2)}</span></h1>
        <p className="hero-subtitle">{t(translations.hero.subtitle)}</p>
        <div className="hero-ctas">
          <Link to="/contacto" className="cta-primary"><span>{t(translations.hero.ctaContact)}</span><ArrowRight className="cta-icon" /></Link>
          <Link to="/nosotros" className="cta-secondary"><span>{t(translations.hero.cta)}</span><ChevronRight className="cta-icon" /></Link>
        </div>
        <div className="location-indicator">
          <MapPin className="location-icon" /><span>{locationName}</span>
          <span className="coordinates">{latitude}° N · {Math.abs(longitude)}° W</span>
        </div>
      </div>
    </div>
  );
};

export default SatelliteHero;
