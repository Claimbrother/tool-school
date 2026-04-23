import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio - Falilou Holler",
  description: "Willkommen auf meinem Portfolio! Hier findest du eine Auswahl meiner Projekte, Schulungen und mehr über mich als Full-Stack Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <style>{`
          .arc-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: -1;
            background-color: #030305;
            overflow: hidden;
            pointer-events: none;
          }
          .arc-core {
            position: absolute;
            width: 136vw;
            height: 150vh;
            top: -25vh;
            left: -70vw;
            background: transparent;
            border-radius: 40%;
            border-right: 12px solid #ffffff;
            filter: blur(6px);
            box-shadow:
              15px 0 30px rgba(140, 200, 255, 0.9),
              30px 0 60px rgba(60, 130, 255, 0.6),
              60px 0 120px rgba(20, 60, 255, 0.3),
              inset -15px 0 30px rgba(140, 200, 255, 0.9),
              inset -30px 0 60px rgba(60, 130, 255, 0.6);
            animation: morphArc 12s ease-in-out infinite alternate;
            will-change: transform, border-radius;
          }
          .arc-core-2 {
            position: absolute;
            width: 135vw;
            height: 155vh;
            top: -27vh;
            left: -69vw;
            background: transparent;
            border-radius: 40%;
            border-right: 6px solid rgba(255, 255, 255, 0.8);
            filter: blur(8px);
            box-shadow:
              10px 0 20px rgba(140, 200, 255, 0.6),
              inset -10px 0 20px rgba(140, 200, 255, 0.6);
            animation: morphArc2 17s ease-in-out infinite alternate-reverse;
            will-change: transform, border-radius;
          }
          .arc-highlight {
            position: absolute;
            top: 30vh;
            left: 89vw;
            width: 30px;
            height: 40vh;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 50%;
            filter: blur(12px);
            mix-blend-mode: overlay;
            animation: moveHighlight 8s ease-in-out infinite alternate;
            will-change: transform;
          }
          @keyframes morphArc {
            0%   { transform: translateX(0) scaleY(1) rotate(-1deg); border-radius: 50%; }
            33%  { transform: translateX(1.5vw) scaleY(1.03) rotate(0.5deg); border-radius: 48% 52% 55% 45% / 50% 50% 45% 55%; }
            66%  { transform: translateX(-1vw) scaleY(0.97) rotate(1deg); border-radius: 52% 48% 45% 55% / 55% 45% 50% 50%; }
            100% { transform: translateX(0) scaleY(1) rotate(-1deg); border-radius: 50%; }
          }
          @keyframes morphArc2 {
            0%   { transform: translateX(0) scaleY(1) rotate(1deg); border-radius: 50%; }
            33%  { transform: translateX(-2vw) scaleY(0.96) rotate(-0.5deg); border-radius: 55% 45% 50% 50% / 48% 52% 55% 45%; }
            66%  { transform: translateX(1vw) scaleY(1.04) rotate(-1deg); border-radius: 45% 55% 48% 52% / 52% 48% 45% 55%; }
            100% { transform: translateX(0) scaleY(1) rotate(1deg); border-radius: 50%; }
          }
          @keyframes moveHighlight {
            0%   { transform: translateY(-20vh) scale(0.8); opacity: 0.4; }
            100% { transform: translateY(20vh) scale(1.1); opacity: 1; }
          }
        `}</style>
        <div className="arc-container">
          <div className="arc-core"></div>
          <div className="arc-core-2"></div>
          <div className="arc-highlight"></div>
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
