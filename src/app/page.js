import BecomeDonor from "@/components/homepage/BecomeDonor";
import EmergencyRequests from "@/components/homepage/EmergencyRequests";
import Hero from "@/components/homepage/Hero";
import HeroTrust from "@/components/homepage/HeroTrust";
import Statistics from "@/components/homepage/Statistics";

export default function Home() {
  return (
    <div>
      <Hero />
      <HeroTrust />
      <Statistics />
      <EmergencyRequests />
      <BecomeDonor />
    </div>
  );
}
