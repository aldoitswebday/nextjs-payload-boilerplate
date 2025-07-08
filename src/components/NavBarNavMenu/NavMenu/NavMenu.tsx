"use client";

import { useTranslations } from "next-intl";

import NavMenuLink from "./NavMenuLink/NavMenuLink";
import { useNavMenu } from "@/contexts/NavMenuProvider/NavMenuProvider";

type NavMenuProps = {
  className?: string;
  links: { label: string }[];
};

const NavMenu: React.FC<NavMenuProps> = ({ className, links }) => {
  const navMenu = useNavMenu();
  const routesT = useTranslations("routes");

  return (
    <nav
      className={`
        w-full h-full text-white lg:hidden
        bg-gradient-to-br from-green-500 to-blue-700/95
        opacity-0 animate-fade-in-fast z-40
        ${navMenu.isOpen ? "mobile" : "hidden"}
        ${className}
      `}
    >
      {/* Container */}
      <div
        className={`
          flex flex-col gap-8 w-5/6 min-w-72 max-w-96 pt-28 pb-64 mx-auto
          overflow-y-scroll [&::-webkit-scrollbar]:hidden
          [-ms-overflow-style:none] [scrollbar-width:none]
          mi:pt-[28vw]
        `}
      >
        {/* Links */}
        <div className="flex flex-col items-center gap-2">
          {links.map((link, index) => (
            <NavMenuLink
              key={index}
              text={routesT(`${link.label}.text`)}
              href={routesT(`${link.label}.href`)}
            />
          ))}
        </div>

      </div>
    </nav>
  );
};

export default NavMenu;
