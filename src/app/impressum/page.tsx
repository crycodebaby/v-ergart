// src/app/impressum/page.tsx
import { ContentPage } from "@/components/ContentPage";
import Link from "next/link";

export default function ImpressumPage() {
  return (
    <ContentPage title="Impressum">
      <h2>Angaben gemäß § 5 TMG:</h2>
      <p>
        Alexander Ergart
        <br />
        Further Straße 89B
        <br />
        41462 Neuss
        <br />
        Deutschland
      </p>

      <h2>Kontakt:</h2>
      <p>
        Telefon: 0176-66825889
        <br />
        E-Mail: <a href="mailto:aergart@gmail.com">aergart@gmail.com</a>
      </p>

      <h2>Umsatzsteuer-ID:</h2>
      <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: nicht vergeben</p>

      <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</h2>
      <p>
        Alexander Ergart
        <br />
        Further Straße 89B
        <br />
        41462 Neuss
      </p>

      <h2>Hinweis zur Online-Streitbeilegung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit:
        <a
          href="https://ec.europa.eu/consumers/odr"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://ec.europa.eu/consumers/odr
        </a>
        <br />
        Wir sind nicht verpflichtet und nicht bereit, an einem
        Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
        teilzunehmen.
      </p>
      <p>
        Unsere Datenschutzerklärung finden Sie{" "}
        <Link href="/datenschutz">hier</Link>.
      </p>
    </ContentPage>
  );
}
