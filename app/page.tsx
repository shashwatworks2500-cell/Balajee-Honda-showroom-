import { Enquire } from "@/components/sections/enquire";
import { Hero } from "@/components/sections/hero";
import { Lineup } from "@/components/sections/lineup";
import { Services, Trust, Visit } from "@/components/sections/sections";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Lineup />
      <Services />
      <Trust />
      <Visit />
      <Enquire />
    </>
  );
}
