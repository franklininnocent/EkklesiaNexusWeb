"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X_EN_LOCALE_HEADER } from "@/lib/i18n/constants";
import { useI18n } from "@/lib/i18n/i18n-provider";
import type { AppLocale } from "@/lib/i18n/locale";
import { getMessages } from "@/lib/i18n/messages";
import { createTranslator } from "@/lib/i18n/translate";

export type ContactCaptchaState = {
  captchaId: string | null;
  captchaImage: string | null;
  captchaLoading: boolean;
  captchaError: string | null;
  loadCaptcha: () => Promise<void>;
};

/** Loads the marketing contact CAPTCHA via BFF; reloads when locale changes. */
export function useContactCaptcha(onChallengeLoaded?: () => void): ContactCaptchaState {
  const { locale } = useI18n();

  const onLoadedRef = useRef(onChallengeLoaded);
  useEffect(() => {
    onLoadedRef.current = onChallengeLoaded;
  }, [onChallengeLoaded]);

  const [captchaId, setCaptchaId] = useState<string | null>(null);
  const [captchaImage, setCaptchaImage] = useState<string | null>(null);
  const [captchaLoading, setCaptchaLoading] = useState(true);
  const [captchaError, setCaptchaError] = useState<string | null>(null);

  const fetchGenerationRef = useRef(0);

  const loadCaptchaForLocale = useCallback(async (activeLocale: AppLocale) => {
    const t = createTranslator(getMessages(activeLocale));
    const generation = ++fetchGenerationRef.current;

    setCaptchaLoading(true);
    setCaptchaError(null);

    try {
      const res = await fetch("/api/contact-captcha", {
        cache: "no-store",
        headers: { [X_EN_LOCALE_HEADER]: activeLocale },
      });
      if (generation !== fetchGenerationRef.current) return;

      const json = (await res.json()) as {
        success?: boolean;
        message?: string;
        data?: { challenge_id: string; image: string };
      };

      if (res.status === 429) {
        setCaptchaId(null);
        setCaptchaImage(null);
        setCaptchaError(t("forms.bff.rateLimited"));
        return;
      }

      if (!res.ok || !json.success || !json.data) {
        setCaptchaId(null);
        setCaptchaImage(null);
        const fallback =
          res.status === 503 ? t("forms.bff.contactUnavailable") : t("forms.bff.captchaLoadFailed");
        setCaptchaError(json.message ?? fallback);
        return;
      }

      setCaptchaId(json.data.challenge_id);
      setCaptchaImage(json.data.image);
      onLoadedRef.current?.();
    } catch {
      if (generation !== fetchGenerationRef.current) return;
      setCaptchaId(null);
      setCaptchaImage(null);
      setCaptchaError(t("forms.bff.captchaLoadFailed"));
    } finally {
      if (generation === fetchGenerationRef.current) {
        setCaptchaLoading(false);
      }
    }
  }, []);

  const loadCaptcha = useCallback(() => loadCaptchaForLocale(locale), [locale, loadCaptchaForLocale]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch on mount and locale change
    void loadCaptchaForLocale(locale);
    return () => {
      fetchGenerationRef.current += 1;
    };
  }, [locale, loadCaptchaForLocale]);

  return { captchaId, captchaImage, captchaLoading, captchaError, loadCaptcha };
}
