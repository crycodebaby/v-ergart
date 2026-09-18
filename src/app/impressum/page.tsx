// src/app/impressum/page.tsx
import Link from "next/link";
import { ContentPage } from "@/components/ContentPage";
import { generateSEOMetadata } from "@/lib/seo-utils";

export const metadata = generateSEOMetadata({
  title: "Impressum | Alexander Ergart",
  description: "Impressum und rechtliche Informationen von Alexander Ergart Hausmeister- & Fensterservice, eingetragen bei der Handwerkskammer Düsseldorf.",
  path: "/impressum",
});

export default function ImpressumPage() {
  return (
    <ContentPage title="Impressum">
      {/* Anbieterkennzeichnung – § 5 DDG (Nennung der Norm optional, aber aktuell halten) */}
      <h2>Angaben zum Diensteanbieter</h2>
      <p>
        Alexander Ergart
        <br />
        Further Straße 89B
        <br />
        41462 Neuss
        <br />
        Deutschland
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon:{" "}
        <a href="tel:+4917666825889">0176&nbsp;–&nbsp;668&nbsp;25&nbsp;889</a>
        <br />
        E-Mail: <a href="mailto:info@ergart.de">info@ergart.de</a>
      </p>

      <h2>Umsatzsteuer-ID</h2>
      <p>Umsatzsteuer-Identifikationsnummer: nicht vergeben</p>
      {/* Optional: Falls Kleinunternehmerregelung (§ 19 UStG) genutzt wird, hier klarstellen. */}

      {/* Optional: Berufs-/Registerangaben, falls einschlägig */}
      {/* Eingetragenes Handwerk / HWK */}
      <h2>Eintragung in die Handwerksrolle</h2>
      <p>
        Alexander Ergart ist bei der Handwerkskammer Düsseldorf eingetragen.
        <br />
        <strong>Betriebsnummer:</strong> 1830606
        <br />
        <strong>Mitglied seit:</strong> März 2018
      </p>
      <p>
        <strong>Eingetragene Dienstleistungen:</strong>
        <br />
        Raumausstatter, Einbau von genormten Baufertigteilen (z.B. Fenster, Türen, Zargen, Regale) sowie Gebäudereiniger.
      </p>
      <p>
        <strong>Anerkennung durch:</strong>
        <br />
        Präsident Andreas Ehlert sowie Hauptgeschäftsführer Dr. Axel Fuhrmann der Handwerkskammer Düsseldorf.
      </p>
      {/* 
        Wenn Handels-/Vereinsregister:
        <h2>Registereintrag</h2>
        <p>Registergericht: [Amtsgericht …], Registernummer: [HRB/HRA …].</p>
      */}

      {/* MStV statt RStV */}
      <h2>Verantwortlich i.S.d. § 18 Abs. 2 MStV</h2>
      <p>
        {/* Nur erforderlich, wenn Inhalte journalistisch-redaktionell gestaltet sind.
           Wenn nicht zutreffend, diesen Block entfernen. */}
        Alexander Ergart
        <br />
        Further Straße 89B
        <br />
        41462 Neuss
      </p>

      {/* Partnerschaften / Werbung / externe Links */}
      <h2>Partnerschaften & externe Links</h2>
      <p>
        Auf verschiedenen Unterseiten verlinken wir auf Inhalte unseres Partners{" "}
        <a
          href="https://www.hoening.de/unternehmen/ueber-uns/"
          target="_blank"
          rel="noopener noreferrer"
        >
          HÖNING
        </a>{" "}
        sowie auf den{" "}
        <a
          href="https://haustuerkonfigurator.hoening.de/"
          target="_blank"
          rel="noopener noreferrer"
        >
          HÖNING-Haustürkonfigurator
        </a>
        . In unserer Partner-Übersicht verlinken wir außerdem auf die Websites
        unserer Lieferanten{" "}
        <a
          href="https://www.germanwindows.de/"
          target="_blank"
          rel="noopener noreferrer"
        >
          GERMAN WINDOWS
        </a>{" "}
        und{" "}
        <a
          href="https://www.wuerth.de/"
          target="_blank"
          rel="noopener noreferrer"
        >
          WÜRTH
        </a>
        . Es handelt sich um externe Angebote. Für deren Inhalte sind
        ausschließlich die jeweiligen Betreiber verantwortlich. Wir haben die
        externen Inhalte bei Verlinkung sorgfältig geprüft; eine permanente
        inhaltliche Kontrolle ohne konkrete Anhaltspunkte für eine
        Rechtsverletzung ist jedoch nicht zumutbar. Bei Bekanntwerden von
        Rechtsverletzungen entfernen wir solche Links umgehend.
      </p>
      <p>
        <strong>Werbliche Hinweise:</strong> Sofern Inhalte als Anzeige, Werbung
        oder „Partnerschaft“ gekennzeichnet sind, besteht eine wirtschaftliche
        Verbindung. Eine gesellschaftsrechtliche Verflechtung mit HÖNING besteht
        nicht. Es bestehen keine Affiliate-Programme; es erfolgt keine
        erfolgsabhängige Vergütung für Klicks oder Käufe (Stand: heute).
        {/* Falls doch Affiliate/Provision besteht, diesen Satz durch eine klare Werbe-Kennzeichnung ersetzen. */}
      </p>

      {/* Streitbeilegung: EU-ODR abgeschaltet, nationale Info bleibt */}
      <h2>Verbraucherstreitbeilegung</h2>
      <p>
        Wir sind nicht verpflichtet und nicht bereit, an
        Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
        teilzunehmen (Hinweis nach dem Verbraucherstreitbeilegungsgesetz).
      </p>
      {/* Der bisherige OS/ODR-Link der EU wurde am 20.07.2025 eingestellt und ist zu entfernen. */}

      {/* Urheber-/Markenrechtlicher Hinweis – speziell wegen Logos */}
      <h2>Urheber- & Markenrechte</h2>
      <p>
        Die auf dieser Website verwendeten Logos und Marken sind zugunsten ihrer
        jeweiligen Inhaber geschützt. Das HÖNING-Logo wird mit freundlicher
        Genehmigung des Rechteinhabers verwendet. Eigene Inhalte (Texte, Bilder,
        Grafiken) unterliegen dem deutschen Urheberrecht. Jede vom
        Urheberrechtsgesetz nicht zugelassene Verwertung bedarf unserer
        vorherigen schriftlichen Zustimmung.
      </p>

      {/* Zugriff/Erreichbarkeit – Zwei-Klick-Regel ist heute „leicht erkennbar, unmittelbar erreichbar“ */}
      <h2>Erreichbarkeit des Impressums</h2>
      <p>
        Dieses Impressum ist von jeder Unterseite unserer Website aus leicht
        erkennbar und unmittelbar erreichbar verlinkt.
      </p>

      <p>
        Unsere Datenschutzerklärung finden Sie{" "}
        <Link href="/datenschutz">hier</Link>.
      </p>
    </ContentPage>
  );
}
