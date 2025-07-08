"use client";

import Link from "next/link";
import { useState } from "react";

import { useNavMenu } from "@/contexts/NavMenuProvider/NavMenuProvider";

export type ButtonLinkProps = {
  className?: string;
  variant:
    | "gradientBackground"
    | "whiteBackground"
    | "blackBackground"
    | "whiteBorder"
    | "blackBorder"
    | "greenBackground"
    | "blueBackground"
    | "greenBorder"
    | "blueBorder";
  text: string;
  href?: string;
  target?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  closesNavMenu?: boolean;
  onClick?: () => void;
};

const ButtonLink: React.FC<ButtonLinkProps> = ({
  className,
  variant,
  text,
  href,
  target = "_self",
  type,
  disabled,
  closesNavMenu = true,
  onClick,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const navMenu = useNavMenu();

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // Close nav menu if it is open
    if (closesNavMenu) {
      navMenu.close();
    }

    // Scroll to the target element if it is a hash link
    if (href && href.startsWith("#")) {
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

    // Call the on click function if it is provided
    if (onClick) {
      onClick();
    }
  };

  // Generate variant-specific styles
  const getVariantStyles = () => {
    switch (variant) {
      case "gradientBackground":
        return "text-white bg-gradient-to-r from-primary-green to-primary-blue";
      case "whiteBackground":
        return "text-black bg-white border-white";
      case "blackBackground":
        return "text-white bg-black border-black";
      case "greenBackground":
        return "text-white bg-primary-green border-primary-green";
      case "blueBackground":
        return "text-white bg-primary-blue border-primary-blue";
      case "greenBorder":
        return "text-primary-green border-primary-green";
      case "blueBorder":
        return "text-primary-blue border-primary-blue";
    }
  };

  const attributes = {
    className: `
      flex justify-center items-center rounded-full
      transition-opacity duration-200
      ${
        variant === "gradientBackground"
          ? "px-8 py-4 border-0"
          : "px-6 py-3 border-2"
      }
      ${getVariantStyles()}
      ${
        isClicked ? "hover:opacity-100 pointer-events-none" : "hover:opacity-80"
      }
      ${className}
    `,
    onClick: handleClick,
  };

  // Render either a link or a div based on whether an href is provided
  return href ? (
    <Link
      {...attributes}
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
    >
      {/* Text */}
      <span className="text-mediumsmall font-medium tracking-wide">{text}</span>
    </Link>
  ) : (
    <button {...attributes} aria-label={text} type={type} disabled={disabled}>
      {/* Text */}
      <span className="text-mediumsmall font-medium tracking-wide">{text}</span>
    </button>
  );
};

export default ButtonLink;
