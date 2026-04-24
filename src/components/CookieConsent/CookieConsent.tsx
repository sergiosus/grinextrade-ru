'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import type { Locale } from '@/lib/i18n/config';
import type { Translations } from '@/lib/i18n/translations';
import { getConsent, setConsent, hasConsent, isServer } from '@/lib/consent';
import { CookieBanner } from './CookieBanner';
import { CookieModal } from './CookieModal';

type Props = {
  locale: Locale;
  translations: Translations;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
};

export function CookieConsent({ locale, translations, modalOpen, setModalOpen }: Props) {
  const [bannerVisible, setBannerVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || isServer()) return;
    setBannerVisible(!hasConsent());
  }, [mounted]);

  const handleAcceptAll = useCallback(() => {
    setConsent({ necessary: true, analytics: true, marketing: true });
    setBannerVisible(false);
    setModalOpen(false);
  }, [setModalOpen]);

  const handleReject = useCallback(() => {
    setConsent({ necessary: true, analytics: false, marketing: false });
    setBannerVisible(false);
    setModalOpen(false);
  }, [setModalOpen]);

  const handleSavePreferences = useCallback(
    (analytics: boolean, marketing: boolean) => {
      setConsent({ necessary: true, analytics, marketing });
      setBannerVisible(false);
      setModalOpen(false);
    },
    [setModalOpen]
  );

  if (!mounted) return null;

  const t = translations.cookies;

  return (
    <>
      {bannerVisible && (
        <CookieBanner
          ariaLabel={t.bannerAriaLabel}
          message={t.bannerMessage}
          acceptAll={t.acceptAll}
          rejectNonEssential={t.rejectNonEssential}
          managePreferences={t.managePreferences}
          onAcceptAll={handleAcceptAll}
          onReject={handleReject}
          onManagePreferences={() => setModalOpen(true)}
        />
      )}
      {modalOpen && (
        <CookieModal
          title={t.modalTitle}
          necessary={t.necessary}
          necessaryDesc={t.necessaryDesc}
          analytics={t.analytics}
          analyticsDesc={t.analyticsDesc}
          marketing={t.marketing}
          marketingDesc={t.marketingDesc}
          save={t.save}
          close={t.close}
          initialAnalytics={getConsent()?.analytics ?? false}
          initialMarketing={getConsent()?.marketing ?? false}
          onSave={handleSavePreferences}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
