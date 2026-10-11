import { siteConfig } from "@/config/site";
import { ga4MeasurementIdFromContent } from "@/lib/marketing/seo-metadata";
import type { MarketingContent } from "@/types/marketing";

export function Ga4Loader({ content }: { content: MarketingContent }) {
  if (!siteConfig.analyticsEnabled) {
    return null;
  }
  const measurementId = ga4MeasurementIdFromContent(content);
  if (!measurementId) {
    return null;
  }

  const src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;

  return (
    <>
      <script async src={src} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${measurementId}');`,
        }}
      />
    </>
  );
}
