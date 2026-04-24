'use client';

type Props = {
  message: string;
  ariaLabel: string;
  acceptAll: string;
  rejectNonEssential: string;
  managePreferences: string;
  onAcceptAll: () => void;
  onReject: () => void;
  onManagePreferences: () => void;
};

export function CookieBanner({
  message,
  ariaLabel,
  acceptAll,
  rejectNonEssential,
  managePreferences,
  onAcceptAll,
  onReject,
  onManagePreferences,
}: Props) {
  return (
    <div
      role="dialog"
      aria-label={ariaLabel}
      className="fixed bottom-0 left-0 right-0 z-[200] safe-area-pb bg-white border-t border-gray-light shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <p className="text-sm text-brand-black mb-4 pr-2">{message}</p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onAcceptAll}
            className="px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-accent-red transition"
          >
            {acceptAll}
          </button>
          <button
            type="button"
            onClick={onReject}
            className="px-4 py-2.5 bg-gray-light text-brand-black text-sm font-medium rounded-lg hover:bg-gray-300 transition border border-gray-300"
          >
            {rejectNonEssential}
          </button>
          <button
            type="button"
            onClick={onManagePreferences}
            className="px-4 py-2.5 text-primary text-sm font-medium rounded-lg hover:bg-primary/5 transition border border-primary/30"
          >
            {managePreferences}
          </button>
        </div>
      </div>
    </div>
  );
}
