"use client";

import  { useEffect } from "react";
import { createChat } from "@n8n/chat";

// ❌ WICHTIG: Diesen lokalen Import LÖSCHEN, da er den Turbopack-Error verursacht:
// import "@n8n/chat/style.css"; 

const AIConsultantModal = () => {
  useEffect(() => {
    // 1. Workaround: Das CSS dynamisch im Browser laden (umgeht den Next.js Build-Error)
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css";
    document.head.appendChild(link);

    // 2. Den Chat normal initialisieren
    const chat = createChat({
      webhookUrl: "https://coderino.app.n8n.cloud/webhook/5bfe8737-2a5a-4b07-a3c6-7a766cfe5d14/chat",
      mode: "window", 
      showWelcomeScreen: true,
      defaultLanguage: "en",
      initialMessages: [
        "Hallo! Beschreibe mir kurz deine berufliche Rolle oder was du gerne lernen möchtest. Ich finde den perfekten Kurs für dich."
      ],
  //     i18n: {
	// 	en: {
	// 		title: 'Hi there! 👋',
	// 		subtitle: "Start a chat. We're here to help you 24/7.",
	// 		footer: '',
	// 		getStarted: 'New Conversation',
	// 		inputPlaceholder: 'Type your question..',
	// 	},
	// },
	enableStreaming: false,
    });

    // 3. Aufräumen, wenn die Komponente entfernt wird
    return () => {
      const chatContainer = document.querySelector('.chat-window');
      const chatButton = document.querySelector('.chat-button');
      if (chatContainer) chatContainer.remove();
      if (chatButton) chatButton.remove();
      
      // CSS-Link wieder aus dem Head entfernen
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return null; 
};

export default AIConsultantModal;