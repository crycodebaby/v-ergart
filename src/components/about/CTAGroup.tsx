import type { AboutCtaGroupData } from "@/lib/about/types";
import ButtonLink from "./ButtonLink";
import GoogleCalendarButton from "@/components/GoogleCalendarButton";
import { SITE_LINKS } from "@/lib/site-links";

type CTAGroupProps = {
  data: AboutCtaGroupData;
  align?: "left" | "center";
};

export default function CTAGroup({ data, align = "left" }: CTAGroupProps) {
  const secondaryIsCalendar =
    data.secondary?.href === SITE_LINKS.external.googleCalendarBooking;

  return (
    <div className={align === "center" ? "text-center" : undefined}>
      {data.title ? <h3 className="text-2xl font-bold text-foreground">{data.title}</h3> : null}
      {data.text ? (
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {data.text}
        </p>
      ) : null}
      <div
        className={[
          "mt-6 flex flex-wrap gap-3",
          align === "center" ? "justify-center" : "justify-start",
        ].join(" ")}
      >
        <ButtonLink link={data.primary} />
        {data.secondary ? (
          secondaryIsCalendar ? (
            <GoogleCalendarButton
              label={data.secondary.label}
              variant="outline"
              className="h-10"
            />
          ) : (
            <ButtonLink link={data.secondary} variant="outline" />
          )
        ) : null}
      </div>
      {data.note ? <p className="mt-3 text-sm text-muted-foreground">{data.note}</p> : null}
    </div>
  );
}
