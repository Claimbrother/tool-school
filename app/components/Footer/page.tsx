"use client";
import { GithubIcon } from "@/components/ui/github-icon";
import { LinkedInIcon } from "@/components/ui/linkedin-icon";
import { NewTwitterIcon } from "@/components/ui/new-twitter-icon";


const Footer = () => (
  <footer className="py-8 border-t bg-slate-950/90 border-white/10 text-center relative z-10">
    <div className="flex justify-center gap-6 mb-4">
      <a href="https://github.com/Claimbrother" className="text-slate-400 hover:text-white transition-colors"><GithubIcon size={20} /></a>
      <a href="https://www.linkedin.com/in/falilou-holler-379615284" className="text-slate-400 hover:text-white transition-colors"><LinkedInIcon size={20} /></a>
      <a href="https://twitter.com/Claimbrother" className="text-slate-400 hover:text-white transition-colors"><NewTwitterIcon size={20} /></a>
    </div>
    <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Falilou Holler.</p>
    <a href="/Impressum" className="text-slate-500 hover:text-slate-300 text-sm transition-colors mt-2 inline-block">Impressum</a>
  </footer>
);

export default Footer;