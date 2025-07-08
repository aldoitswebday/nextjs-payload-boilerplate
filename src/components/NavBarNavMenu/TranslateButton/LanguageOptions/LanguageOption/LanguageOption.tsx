"use client";

import { LocaleType } from "@/constants/global";
import { usePage } from "@/contexts/PageProvider/PageProvider";

import NavLink from "../../../NavLink/NavLink";

export type Messages = {
  [key in LocaleType]: {
    routes: {
      [key: string]: {
        [key in LocaleType]: string;
      };
    };
  };
};

type LocaleMessages = {
  routes: {
    [key: string]: {
      [key in LocaleType]: string;
    };
  };
};

type LanguageOptionProps = {
  className?: string;
  localizedMessages: Messages;
  locale: string;
  currentLocale: string;
};

const LanguageOption: React.FC<LanguageOptionProps> = ({
  className,
  localizedMessages,
  locale,
  currentLocale,
}) => {
  const page = usePage();

  // Check if the locale is not the current locale
  if (locale !== currentLocale) {
    const route = (
      localizedMessages[currentLocale as LocaleType] as LocaleMessages
    ).routes[page.currentPage];

    // Return a link for the translated route
    return (
      <NavLink
        className={`
          ${className}
        `}
        text={locale}
        href={`${route[locale as LocaleType]}/${page.currentSlug}`}
      />
    );
  }

  // Return the current locale that is not a link
  return (
    <div
      className={`
        px-nav-link text-mediumsmall text-primary-green
        ${className}
      `}
    >
      {locale}
    </div>
  );
};

export default LanguageOption;
