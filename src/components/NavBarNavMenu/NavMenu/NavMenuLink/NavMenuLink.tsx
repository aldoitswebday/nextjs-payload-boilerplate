"use client";

import Link from "next/link";
import { useState } from "react";

import { useNavMenu } from "@/contexts/NavMenuProvider/NavMenuProvider";

export type NavMenuLinkProps = {
  className?: string;
  icon?: React.ReactNode;
  text: string;
  href: string;
  target?: string;
  closesNavMenu?: boolean;
  onClick?: () => void;
};

const NavMenuLink: React.FC<NavMenuLinkProps> = ({
  className,
  icon,
  text,
  href,
  target = "_self",
  closesNavMenu = true,
  onClick,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const navMenu = useNavMenu();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (closesNavMenu) {
      navMenu.close();
    }

    if (href.startsWith("#")) {
      e.preventDefault();

      const targetElement = document.querySelector(href);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "start",
        });
      }
    } else {
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
        w-full flex items-center justify-center gap-4 rounded-full px-6 py-4
        transition-colors duration-200 hover:bg-primary-green-dark/50
        ${isClicked ? "opacity-50 pointer-events-none" : ""}
        ${className}
      `}
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      onClick={handleClick}
    >
      {/* Link icon */}
      {icon && (
        <div
          className={`
            flex justify-center items-center w-12 h-12
          `}
        >
          {icon}
        </div>
      )}

      {/* Link text */}
      {navMenu.isOpen && (
        <span className="text-medium tracking-wide">{text}</span>
      )}
    </Link>
  );
};

export default NavMenuLink;
