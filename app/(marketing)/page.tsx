import HeroLanding from "@/components/sections/hero-landing";
import MarqueeLogo from "@/components/sections/marquee-logo";

export default function IndexPage() {
  return (
    <>
      <HeroLanding />
      <div className="pb-16">
        <MarqueeLogo />
      </div>
    </>
  );
}
