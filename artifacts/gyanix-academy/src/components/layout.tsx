import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { WhatsappFab } from "./whatsapp-fab";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-[100dvh] w-full font-sans bg-background">
      <Navbar />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
      <WhatsappFab />
    </div>
  );
}
