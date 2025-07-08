"use client";

import Hero from "./_ui/Hero/Hero";
import Usps from "./_ui/Usps/Usps";

const HomePage: React.FC = () => {
  return (
    <main className="overflow-x-hidden font-poppins">
      <Hero />
      <Usps />
    </main>
  );
};

export default HomePage;
