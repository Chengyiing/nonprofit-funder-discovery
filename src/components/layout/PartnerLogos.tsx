/**
 * CMU: use public/cmu.png. KMSG: public/mksg.png (update KMSG_LOGO_SRC if renamed).
 */
export const CMU_LOGO_SRC = "/cmu.png";
export const KMSG_LOGO_SRC = "/mksg.png";

export function PartnerLogosRow({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-10 gap-y-4 sm:gap-x-12 ${className}`}
      aria-label="Partner institutions"
    >
      {/* SVG: native img avoids next/image SVG configuration */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={CMU_LOGO_SRC}
        alt="Carnegie Mellon University"
        width={152}
        height={42}
        className="h-7 w-auto max-h-7 object-contain object-left sm:h-8 sm:max-h-8"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={KMSG_LOGO_SRC}
        alt="KMSG"
        width={152}
        height={42}
        className="h-7 w-auto max-h-7 object-contain object-left sm:h-8 sm:max-h-8"
      />
    </div>
  );
}
