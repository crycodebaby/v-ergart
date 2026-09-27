// src/components/about/CTAGroup.tsx
/**
 * Handlungsblock: primärer CTA, optional ein zweiter Weg, darunter eine Zeile
 * Erwartungsmanagement.
 *
 * Die `inverted`-Variante ist entfallen — sie existierte nur für den dunklen
 * Bild-Hero, den die Seite nicht mehr hat. Ein Sonderfall weniger.
 *
 * Zeigt der sekundäre Link auf die Google-Terminbuchung, übernimmt der
 * bestehende GoogleCalendarButton: er trägt das `data-track`-Attribut, an dem
 * das Lead-Tracking hängt.
 */
import GoogleCalendarButton from "@/components/GoogleCalendarButton";
import { SITE_LINKS } from "@/lib/site-links";
import type { AboutCtaGroupData } from "@/lib/about/types";

import ButtonLink from "./ButtonLink";

type CTAGroupProps = {
  data: AboutCtaGroupData;
};

export default function CTAGroup({ data }: CTAGroupProps) {
  const secondaryIsCalendar =
    data.secondary?.href === SITE_LINKS.external.googleCalendarBooking;

  return (
    <div>
      {data.title ? (
        <h3 className="text-xl font-bold text-foreground">{data.title}</h3>
      ) : null}
      {data.text ? (
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{data.text}</p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <ButtonLink link={data.primary} />
        {data.secondary ? (
          secondaryIsCalendar ? (
            <GoogleCalendarButton
              label={data.secondary.label}
              variant="outline"
              className="h-12 rounded-lg border-input px-6 text-base font-semibold"
            />
          ) : (
            <ButtonLink link={data.secondary} variant="outline" />
          )
        ) : null}
      </div>

      {data.note ? (
        <p className="mt-4 text-sm text-muted-foreground">{data.note}</p>
      ) : null}
    </div>
  );
}
