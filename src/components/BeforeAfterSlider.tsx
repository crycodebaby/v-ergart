// src/components/BeforeAfterSlider.tsx
"use client";

import Image from "next/image";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";

const BEFORE_IMAGE = {
  imageUrl:
    "/bilder_ordner/hoening/fenster/fenster-baustellenprozess/vorherige-alte-fenster.webp",
};
const AFTER_IMAGE = {
  imageUrl:
    "/bilder_ordner/hoening/fenster/fenster-baustellenprozess/fertig-installierte-scheibe-neue-saubere-fensterfront.webp",
};

export const BeforeAfterSlider = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Die beeindruckende Transformation
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Sehen Sie selbst, welchen Unterschied neue Fenster für die Ästhetik
            und den Lichteinfall machen können.
          </p>
        </div>
        <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-border">
          <ReactBeforeSliderComponent
            firstImage={BEFORE_IMAGE}
            secondImage={AFTER_IMAGE}
          />
        </div>
      </div>
    </section>
  );
};
