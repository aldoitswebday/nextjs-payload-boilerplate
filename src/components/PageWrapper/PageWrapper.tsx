"use client";

import { ReactNode, useEffect } from "react";

import { usePage } from "@/contexts/PageProvider/PageProvider";

type PageWrapperProps = {
  children: ReactNode;
  pageLabel: string;
  pageSlug?: string;
};

const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  pageLabel,
  pageSlug = "",
}: PageWrapperProps) => {
  const page = usePage();

  useEffect(() => {
    page.setCurrentPage(pageLabel);
    page.setCurrentSlug(pageSlug);
  }, [pageLabel, pageSlug, page]);

  return <>{children}</>;
};

export default PageWrapper;
