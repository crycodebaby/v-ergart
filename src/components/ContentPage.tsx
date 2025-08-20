// src/components/ContentPage.tsx
import React from "react";

type Props = {
  title: string;
  children: React.ReactNode;
};

export const ContentPage = ({ title, children }: Props) => {
  return (
    <div className="bg-background py-16 sm:py-24">
      <div className="container max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-foreground">{title}</h1>
        {/* Die `prose`-Klasse kommt vom Typography-Plugin.
                  Sie stylt automatisch alle Kind-Elemente (p, h2, a, ul etc.).
                  `dark:prose-invert` sorgt für perfekte Lesbarkeit im Dark Mode.
                */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {children}
        </div>
      </div>
    </div>
  );
};
