import FeaturesSection from "./FeaturesSection";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import NavigationBar from "./Header";

const LandingPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen w-full">
      {/* Navigation Bar */}
      <NavigationBar />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
