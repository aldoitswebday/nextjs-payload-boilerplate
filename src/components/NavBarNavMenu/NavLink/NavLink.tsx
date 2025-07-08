"use client";

import Link from "next/link";
import { useState } from "react";

import {
  NAV_MENU_CLOSING_DELAY,
  NAV_MENU_CLOSING_DURATION,
} from "@/constants/global";
import { useNavMenu } from "@/contexts/NavMenuProvider/NavMenuProvider";
import { usePage } from "@/contexts/PageProvider/PageProvider";

export type NavLinkProps = {
  className?: string;
  text: string;
  href: string;
  closingNavMenu?: boolean;
  routeLabel?: string;
  onClick?: () => void;
};

const NavLink: React.FC<NavLinkProps> = ({
  className,
  text,
  href,
  closingNavMenu = true,
  routeLabel,
  onClick,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const navMenu = useNavMenu();
  const page = usePage();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (closingNavMenu) {
      navMenu.close();
    }

    if (href.includes("#")) {
      e.preventDefault();

      // Extract the anchor part (everything after #)
      const anchorPart = href.includes("#") ? href.split("#")[1] : "";
      const targetSelector = anchorPart ? `#${anchorPart}` : href;

      setTimeout(
        () => {
          const targetElement = document.querySelector(targetSelector);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        },
        closingNavMenu ? NAV_MENU_CLOSING_DELAY : NAV_MENU_CLOSING_DURATION
      );
    } else {
      if (routeLabel) {
        page.setCurrentPage(routeLabel);
        page.setCurrentSlug("");
      }

      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 1000);
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <Link
      className={`
        flex items-center h-full px-nav-link text-black font-poppins
        transition-colors duration-200 hover:text-white hover:bg-button-grayhover
        text-sm
        ${isClicked ? "opacity-50 pointer-events-none" : ""}
        ${className}
        ${text === "Sign In" || text === "Inloggen" ? "bg-button-greenhover" : ""}
      `}
      href={href}
      onClick={handleClick}
    >
      {/* Link text */}
      {text}
    </Link>
  );
};

export default NavLink;
