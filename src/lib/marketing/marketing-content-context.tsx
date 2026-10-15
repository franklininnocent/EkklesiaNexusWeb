"use client";

import { createContext, useContext } from "react";
import type { MarketingContent } from "@/types/marketing";
import { getFileMarketingContent } from "@/lib/marketing/providers/file-provider";

const MarketingContentContext = createContext<MarketingContent>(getFileMarketingContent());

export function MarketingContentProvider({
  content,
  children,
}: {
  content: MarketingContent;
  children: React.ReactNode;
}) {
  return (
    <MarketingContentContext.Provider value={content}>{children}</MarketingContentContext.Provider>
  );
}

export function useMarketingContent(): MarketingContent {
  return useContext(MarketingContentContext);
}
