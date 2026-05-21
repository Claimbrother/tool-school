"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { GlassCard } from '@/app/Global/UIComponents';
import { SendIcon } from '@/components/ui/send-icon';

const ContactSection = () => {
  const t = useTranslations('Contact');
  const [activeTab, setActiveTab] = useState('coding');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());
    const payload = { ...formValues, type: activeTab };

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert(t('successMessage'));
      } else {
        console.error('Fehler beim Senden:', await response.text());
        alert(t('errorMessage'));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section id="contact" className="py-12 md:py-24 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">

        <GlassCard className="p-8 md:p-12 bg-slate-950/60">

          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('title')}</h2>
            <p className="text-slate-400">{t('subtitle')}</p>
          </div>

          {/* Tab Switcher */}
          <div className="flex justify-center mb-12">
            <div className="flex p-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
              <button
                onClick={() => setActiveTab('coding')}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'coding' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                {t('tabCoding')}
              </button>
              <button
                onClick={() => setActiveTab('schulung')}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'schulung' ? 'bg-teal-500 text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                {t('tabTraining')}
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.form
                onSubmit={handleSubmit}
                key={activeTab}
                initial={{ opacity: 0, x: activeTab === 'coding' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: activeTab === 'coding' ? 20 : -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 ml-1">{t('labelName')}</label>
                    <input name="name" type="text" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all backdrop-blur-sm placeholder-slate-500" placeholder={t('placeholderName')} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 ml-1">{t('labelEmail')}</label>
                    <input name="email" type="email" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all backdrop-blur-sm placeholder-slate-500" placeholder={t('placeholderEmail')} />
                  </div>
                </div>

                {activeTab !== 'coding' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300 ml-1">{t('labelExperience')}</label>
                      <select name="expirience" className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-white/10 text-slate-300 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all backdrop-blur-sm appearance-none">
                        <option value="">{t('experiencePlaceholder')}</option>
                        <option value="beginner">{t('experienceBeginner')}</option>
                        <option value="intermediate">{t('experienceIntermediate')}</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300 ml-1">{t('labelPhone')}</label>
                      <input name="phone" type="tel" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all backdrop-blur-sm placeholder-slate-500" placeholder={t('placeholderPhone')} />
                    </div>
                  </div>
                ) : null}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">{t('labelMessage')}</label>
                  <textarea name="message" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all backdrop-blur-sm placeholder-slate-500" placeholder={t('placeholderMessage')} rows={4}></textarea>
                </div>

                <motion.button type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-colors ${
                    activeTab === 'coding' ? 'bg-white text-slate-900 hover:bg-slate-200' : 'bg-teal-500 text-slate-900 hover:bg-teal-400'
                  }`}
                >
                  {t('submitButton')}
                  <SendIcon size={18} />
                </motion.button>
              </motion.form>
            </AnimatePresence>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

export default ContactSection;
