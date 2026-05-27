import type { AboutCtaGroupData } from "@/lib/about/types";
import ButtonLink from "./ButtonLink";
import GoogleCalendarButton from "@/components/GoogleCalendarButton";
import { SITE_LINKS } from "@/lib/site-links";

type CTAGroupProps = {
  data: AboutCtaGroupData;
  align?: "left" | "center";
  inverted?: boolean;
};

export default function CTAGroup({ data, align = "left", inverted = false }: CTAGroupProps) {
  const secondaryIsCalendar =
    data.secondary?.href === SITE_LINKS.external.googleCalendarBooking;

  return (
    <div className={align === "center" ? "text-center" : undefined}>
      {data.title ? <h3 className="text-2xl font-bold text-foreground">{data.title}</h3> : null}
      {data.text ? (
        <p
          className={[
            "mt-3 max-w-2xl text-base leading-relaxed",
            inverted ? "text-slate-200" : "text-muted-foreground",
            align === "center" ? "mx-auto" : "",
          ].join(" ")}
        >
          {data.text}
        </p>
      ) : null}
      <div
        className={[
          "mt-6 flex flex-wrap gap-3",
          align === "center" ? "justify-center" : "justify-start",
        ].join(" ")}
      >
        <ButtonLink
          link={data.primary}
          className={inverted ? "!bg-white !text-foreground hover:!bg-white/90" : undefined}
        />
        {data.secondary ? (
          secondaryIsCalendar ? (
            <GoogleCalendarButton
              label={data.secondary.label}
              variant="outline"
              className={[
                "h-10 font-semibold",
                inverted
                  ? "!border-white/60 !bg-transparent !text-white hover:!bg-white/10"
                  : "",
              ].join(" ")}
            />
          ) : (
            <ButtonLink
              link={data.secondary}
              variant="outline"
              className={
                inverted
                  ? "!border-white/60 !bg-transparent !text-white hover:!bg-white/10"
                  : undefined
              }
            />
          )
        ) : null}
      </div>
      {data.note ? (
        <p className={["mt-3 text-sm", inverted ? "text-slate-200" : "text-muted-foreground"].join(" ")}>
          {data.note}
        </p>
      ) : null}
    </div>
  );
}
