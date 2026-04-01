import React from 'react'; 

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown; // For additional div props
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', ...props }) => (
  <div 
    className={`bg-white/5 border border-white/10 backdrop-blur-lg shadow-2xl rounded-3xl ${className}`}
    {...props}
  >
    {children}
  </div>
);

interface PillBadgeProps {
  icon?: React.ComponentType<{ size?: number; className?: string }>; // Assuming icon is a component like LucideIcon
  text: string;
}

export const PillBadge: React.FC<PillBadgeProps> = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 whitespace-nowrap backdrop-blur-md">
    {Icon && <Icon size={14} className="text-teal-400" />}
    {text}
  </div>
);