import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";

import type { Metadata } from "next";

import { NavMenuProvider } from "@/contexts/NavMenuProvider/NavMenuProvider";
import NavBarNavMenu from "@/components/NavBarNavMenu/NavBarNavMenu";
import { PageProvider } from "@/contexts/PageProvider/PageProvider";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Next.js Payload Boilerplate",
  description:
    "A Next.js boilerplate with Payload CMS and i18n internationalization",
};

const HomeLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider>
      <html lang={locale}>
        <head>
          <link
            href="/favicon.ico"
            rel="icon"
            type="image/x-icon"
            sizes="any"
          />
          <link href="/apple-icon.png" rel="apple-touch-icon" sizes="125x125" />
        </head>

        <body className="font-roboto">
          <PageProvider initialPage="home">
            <NavMenuProvider>
              <NavBarNavMenu />
              <main>{children}</main>
            </NavMenuProvider>
          </PageProvider>
          <Footer />
        </body>
      </html>
    </NextIntlClientProvider>
  );
};

export default HomeLayout;
