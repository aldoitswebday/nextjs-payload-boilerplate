"use client";

import { useNavMenu } from "@/contexts/NavMenuProvider/NavMenuProvider";

type HamburgerButtonProps = {
  className?: string;
};

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ className }) => {
  const navMenu = useNavMenu();

  return (
    <button
      className={`
        flex flex-col justify-center items-center w-14 h-14 px-3 py-4 rounded-full de:hidden
        transition-all ease-in-out z-50
        ${navMenu.isOpen ? "bg-black" : "bg-white"}
        ${className}
      `}
      onClick={navMenu.toggle}
    >
      {/* First hamburger dash */}
      <div
        className={`
          h-0.5 w-full bg-gradient-to-r rounded-full mb-1.5
          transition-all duration-300 ease-in-out
          ${
            navMenu.isOpen
              ? "from-white to-white rotate-45 translate-y-2"
              : "from-blue-500 to-green-500"
          }
        `}
      />
      {/* Second hamburger dash */}
      <div
        className={`
          h-0.5 w-full bg-gradient-to-r rounded-full mb-1.5
          transition-all duration-300 ease-in-out
          ${
            navMenu.isOpen
              ? "from-white to-white opacity-0"
              : "from-blue-500 to-green-500"
          }
        `}
      />
      {/* Third hamburger dash */}
      <div
        className={`
          h-0.5 w-full bg-gradient-to-r rounded-full
          transition-all duration-300 ease-in-out
          ${
            navMenu.isOpen
              ? "from-white to-white -rotate-45 -translate-y-2"
              : "from-blue-500 to-green-500"
          }
        `}
      />
    </button>
  );
};

export default HamburgerButton;
