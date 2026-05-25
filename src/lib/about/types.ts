export type AboutSectionId =
  | "hero"
  | "origin"
  | "leadership"
  | "milestones"
  | "regionScope"
  | "quality"
  | "partnerships"
  | "future"
  | "socialEngagement"
  | "values"
  | "finalCta";

export type AboutLinkKind = "internal" | "external";

export interface AboutImageData {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
}

export interface AboutFigureData extends AboutImageData {
  caption?: string;
  credit?: string;
}

export interface AboutCtaLink {
  label: string;
  href: string;
  kind: AboutLinkKind;
  trackingId?: string;
  ariaLabel?: string;
}

export interface AboutCtaGroupData {
  title?: string;
  text?: string;
  primary: AboutCtaLink;
  secondary?: AboutCtaLink;
  note?: string;
}

export interface AboutSection {
  id: AboutSectionId;
  eyebrow?: string;
  title?: string;
  intro?: string;
}

export interface AboutMilestone {
  id: string;
  year: string;
  title: string;
  body: string;
  badges?: string[];
}

export interface AboutPartner {
  id: "hoening" | "kilbinger" | "immobilienverwaltung";
  name: string;
  body: string;
  logo: AboutImageData;
  href?: string;
  hrefLabel?: string;
}

export interface AboutQualityPrinciple {
  id: string;
  title: string;
  body: string;
}

export interface AboutSocialEngagement {
  title: string;
  body: string;
  figure?: AboutFigureData;
  legalNote?: string;
  imageTodo?: string;
}

export interface AboutPageData {
  hero: AboutSection & {
    title: string;
    intro: string;
    figure: AboutImageData;
    ctas: AboutCtaGroupData;
  };
  origin: AboutSection & {
    paragraphs: string[];
    figure: AboutFigureData;
  };
  leadership: AboutSection & {
    paragraphs: string[];
    figure: AboutFigureData;
  };
  milestones: AboutSection & {
    items: AboutMilestone[];
  };
  regionScope: AboutSection & {
    regions: string[];
    b2cServices: string[];
    b2bServices: string[];
  };
  quality: AboutSection & {
    principles: AboutQualityPrinciple[];
    toolsNote?: string;
  };
  partnerships: AboutSection & {
    partners: AboutPartner[];
  };
  future: AboutSection & {
    paragraphs: string[];
    disclaimer: string;
  };
  socialEngagement: AboutSection & AboutSocialEngagement;
  values: AboutSection & {
    principles: AboutQualityPrinciple[];
  };
  finalCta: AboutSection & {
    ctas: AboutCtaGroupData;
  };
}
