import { MessageCircle } from "lucide-react";

export const WHATSAPP_URL = "https://wa.me/917525871717";

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-elegant hover:scale-105 active:scale-95 transition-transform"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline font-medium">WhatsApp</span>
    </a>
  );
}
