"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";

type LogoLinkProps = {
  className?: string;
};

const LogoLink: React.FC<LogoLinkProps> = ({ className }) => {
  const routesT = useTranslations("routes");
  const pathname = usePathname();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Link
      className={`
        ${className}
      `}
      href={routesT("home.href")}
      onClick={(e) => {
        if (pathname === "/") {
          e.preventDefault();
          scrollToTop();
        }
      }}
    >
      {/* Logo Placeholder */}
      <div className="text-2xl font-bold text-gray-800">Logo</div>
    </Link>
  );
};

export default LogoLink;
