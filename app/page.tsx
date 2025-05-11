import Achievements from "@/components/Home/achievements/achievements";
import CallToAction from "@/components/Home/call/calltoaction";
import ChatWidget from "@/components/Home/call/chat";
import HeroSection from "@/components/Home/hero/HeroSection";
import Messages from "@/components/Home/messages/Messages";
import PublicUpdatesGrid from "@/components/Home/newupdates/Updates";
import Summary from "@/components/Home/us/summary";

export default function Home() {
  return (
    <main>
        <HeroSection />
        <Summary />
        <PublicUpdatesGrid/>
        <Achievements />
        <Messages />
        <CallToAction />
        <ChatWidget />
    </main>
      
  );
}
