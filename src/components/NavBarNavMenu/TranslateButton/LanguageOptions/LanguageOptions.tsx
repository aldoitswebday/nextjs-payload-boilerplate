"use client";

import { LOCALES } from "@/constants/global";
import { useNavMenu } from "@/contexts/NavMenuProvider/NavMenuProvider";

import LanguageOption, { Messages } from "./LanguageOption/LanguageOption";

type TranslateButtonProps = {
  className?: string;
  localizedMessages: Messages;
  currentLocale: string;
};

const TranslateButton: React.FC<TranslateButtonProps> = ({
  className,
  localizedMessages,
  currentLocale,
}) => {
  const navMenu = useNavMenu();

  return (
    <div
      className={`
        opacity-0 animate-fade-in
        lg:opacity-100 lg:animate-none
        ${navMenu.isOpen ? "flex" : "hidden de:flex"}
        ${className}
      `}
    >
      {/* Language options */}
      {LOCALES.map((locale, index) => (
        <div
          className={`
            flex items-center h-full uppercase
          `}
          key={index}
        >
          {/* Option */}
          <LanguageOption
            className={`
                text-small
              `}
            localizedMessages={localizedMessages}
            locale={locale}
            currentLocale={currentLocale}
          />

          {/* Separating dot */}
          {index !== LOCALES.length - 1 && (
            <div className="w-[3px] h-[3px] rounded-full bg-black mx-1" />
          )}
        </div>
      ))}
    </div>
  );
};

export default TranslateButton;
