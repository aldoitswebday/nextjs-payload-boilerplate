import { getLocale, getMessages } from "next-intl/server";

import { LOCALES, LocaleType } from "@/constants/global";

import { Messages } from "./LanguageOptions/LanguageOption/LanguageOption";
import LanguageOptions from "./LanguageOptions/LanguageOptions";

type TranslateButtonProps = {
  className?: string;
};

const TranslateButton: React.FC<TranslateButtonProps> = async ({
  className,
}) => {
  const getLocalizedMessages = async () => {
    const messagesMap: Messages = {} as Messages;

    for (const locale of LOCALES as LocaleType[]) {
      const messages = await getMessages({ locale });
      messagesMap[locale] = messages as Messages[LocaleType];
    }

    return messagesMap;
  };

  // Get the messages in all locales and the current locale
  const localizedMessages = await getLocalizedMessages();
  const currentLocale = await getLocale();

  return (
    <div
      className={`
        ${className}
      `}
    >
      {/* Language options */}
      <LanguageOptions
        localizedMessages={localizedMessages}
        currentLocale={currentLocale}
      />
    </div>
  );
};

export default TranslateButton;
