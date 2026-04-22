import React from 'react';

export interface Course {
  icon: React.ComponentType<{ size: number }>;
  title: string;
  desc: string;
  longDesc: string;
}

export interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ size: number }>;
  gradientClasses: string;
  flipContent: string;
  nodeColor: string;
}

export interface EmailDataProject {
  from: string;
  to: "claimbrother@gmail.com";
  subject: string;
  name: string;
  message: string;
  budget: number;
  html: string;
}

export interface EmailDataClasses {
  from: string;
  to: "claimbrother@gmail.com";
  subject: string;
  name: string;
  expirience: string;
  message: string;
  html: string;
}

export interface VideoModalProps {
  src: string;
  onClose: () => void;
}

export interface CurriculumItem {
  time: string;
  title: string;
  description: string;
}

export interface CourseTheme {
  color: string;
  bg: string;
  border: string;
  glowBg: string;
  glowBorder: string;
}

export interface AuraCourse {
  id: string;
  number: string;
  moduleCode: string;
  theme: CourseTheme;
  title: string;
  description: string;
  format: string;
  duration: string;
  level: string;
  availability: string;
  curriculum: CurriculumItem[];
  outcomes: string[];
}
