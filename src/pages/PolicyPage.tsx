import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { translations } from '@/i18n/translations';
import { Shield, Leaf, ArrowLeft, CheckCircle } from 'lucide-react';

const PolicyPage = () => {
  const { slug } = useParams();
  const { t, tArr } = useLanguage();

  const isSafety = slug === translations.policies.safety.slug;
  const isEnvironment = slug === translations.policies.environment.slug;

  if (!isSafety && !isEnvironment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-4">
            {t(translations.notFound.title)}
          </h1>
          <Link to="/" className="text-petrol-green hover:underline">
            {t(translations.notFound.back)}
          </Link>
        </div>
      </div>
    );
  }

  if (isSafety) {
    const policy = translations.policies.safety;
    return (
      <div className="min-h-screen bg-background">
        {/* Hero */}
        <div className="bg-petrol-green-900 pt-28 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-petrol-gold/80 hover:text-petrol-gold transition-colors mb-6 text-sm font-heading uppercase tracking-wider"
            >
              <ArrowLeft className="h-4 w-4" />
              {t(translations.policies.navLabel)}
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-4"
            >
              <Shield className="h-10 w-10 text-petrol-gold" />
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-white">
                {t(policy.title)}
              </h1>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <p className="text-muted-foreground leading-relaxed italic border-l-4 border-petrol-gold pl-4">
              {t(policy.intro)}
            </p>

            <p className="text-foreground leading-relaxed text-lg">
              {t(policy.body)}
            </p>

            <p className="text-foreground leading-relaxed">
              {t(policy.training)}
            </p>

            <p className="text-foreground leading-relaxed">
              {t(policy.protection)}
            </p>

            <p className="text-foreground leading-relaxed">
              {t(policy.principles)}
            </p>

            {/* Signatories */}
            <div className="border-t border-border pt-8 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <p className="font-heading font-bold text-foreground">{policy.signatories.manager}</p>
                <p className="text-muted-foreground text-sm">{t(policy.signatories.managerTitle)}</p>
                <p className="text-muted-foreground text-xs mt-1">{policy.signatories.managerDate}</p>
              </div>
              <div className="text-center">
                <p className="font-heading font-bold text-foreground">{policy.signatories.delegate}</p>
                <p className="text-muted-foreground text-sm">{t(policy.signatories.delegateTitle)}</p>
                <p className="text-muted-foreground text-xs mt-1">{policy.signatories.delegateDate}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Environment policy
  const policy = translations.policies.environment;
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-petrol-green-900 pt-28 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-petrol-gold/80 hover:text-petrol-gold transition-colors mb-6 text-sm font-heading uppercase tracking-wider"
          >
            <ArrowLeft className="h-4 w-4" />
            {t(translations.policies.navLabel)}
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-4"
          >
            <Leaf className="h-10 w-10 text-petrol-gold" />
            <h1 className="text-2xl md:text-4xl font-heading font-bold text-white">
              {t(policy.title)}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          <p className="text-muted-foreground leading-relaxed italic border-l-4 border-petrol-gold pl-4">
            {t(policy.intro)}
          </p>

          <p className="text-foreground leading-relaxed text-lg">
            {t(policy.body)}
          </p>

          <div>
            <p className="text-foreground leading-relaxed mb-4">
              {t(policy.commitmentsIntro)}
            </p>
            <ul className="space-y-3">
              {tArr(policy.commitments).map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-petrol-green mt-0.5 flex-shrink-0" />
                  <span className="text-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Signatories */}
          <div className="border-t border-border pt-8 mt-12">
            <div className="text-center">
              <p className="font-heading font-bold text-foreground">{policy.signatories.manager}</p>
              <p className="text-muted-foreground text-sm">{t(policy.signatories.managerTitle)}</p>
              <p className="text-muted-foreground text-xs mt-1">{policy.signatories.managerDate}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PolicyPage;
