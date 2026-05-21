"use client";
import { BrainIcon } from '@/components/ui/brain-icon';
import { LoaderIcon } from '@/components/ui/loader-icon';
import { ShieldUserIcon } from '@/components/ui/shield-user-icon';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import CourseCard from '../../../components/myShit/GlassCard';

const SchulungenSection = () => {
  const t = useTranslations('Classes');

  const courses = [
    {
      icon: BrainIcon,
      title: t('courses.ki.title'),
      desc: t('courses.ki.desc'),
      longDesc: t('courses.ki.longDesc'),
    },
    {
      icon: ShieldUserIcon,
      title: t('courses.internet.title'),
      desc: t('courses.internet.desc'),
      longDesc: t('courses.internet.longDesc'),
    },
    {
      icon: LoaderIcon,
      title: t('courses.smartphone.title'),
      desc: t('courses.smartphone.desc'),
      longDesc: t('courses.smartphone.longDesc'),
    },
  ];

  return (
    <section id="schulungen" className="py-24 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mt-12 tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-6 pb-6">
            {t('titleLine1')} <br /> {t('titleLine2')}
          </h2>
          <p className="text-slate-400 text-base md:text-lg">
            {t('desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="h-full"
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SchulungenSection;
