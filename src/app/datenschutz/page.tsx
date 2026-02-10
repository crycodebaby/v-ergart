// src/app/datenschutz/page.tsx
import { ContentPage } from "@/components/ContentPage";
import Link from "next/link";
import { generateSEOMetadata } from "@/lib/seo-utils";

export const metadata = generateSEOMetadata({
  title: "Datenschutzerklärung | Alexander Ergart",
  description: "Datenschutzerklärung von Alexander Ergart Hausmeister- & Fensterservice. Informationen zur Datenverarbeitung gemäß DSGVO und Verarbeitung auf Vercel.",
  path: "/datenschutz",
});

export default function DatenschutzPage() {
  return (
    <ContentPage title="Datenschutzerklärung">
      <section>
        <h2>1. Datenschutz auf einen Blick</h2>

        <h3>Einleitung</h3>
        <p>
          Der Schutz Ihrer persönlichen Daten ist uns ein zentrales Anliegen. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
        </p>
        <p>
          Wir informieren Sie hiermit transparent darüber, welche Daten wir erheben, wie wir sie nutzen und welche Rechte Sie haben. Die Verarbeitung erfolgt auf Basis der Datenschutz-Grundverordnung (DSGVO), des Bundesdatenschutzgesetzes (BDSG) und des Telekommunikation-Digitale-Dienste-Datenschutz-Gesetzes (TDDDG).
        </p>

        <h3>Verantwortlicher</h3>
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der DSGVO ist:
        </p>
        <p>
          <strong>Alexander Ergart</strong><br />
          Further Straße 89B<br />
          41462 Neuss<br />
          Deutschland
        </p>
        <p>
          Telefon: <a href="tel:+4917666825889">0176 – 668 25 889</a><br />
          E-Mail: <a href="mailto:aergart@gmail.com">aergart@gmail.com</a>
        </p>
      </section>

      <section>
        <h2>2. Hosting und technische Bereitstellung</h2>

        <h3>Hosting durch Vercel</h3>
        <p>
          Wir hosten unsere Website bei dem externen Dienstleister Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA (&bdquo;Vercel&ldquo;).
        </p>
        <p>
          Damit unsere Website sicher und schnell aufgerufen werden kann, werden personenbezogene Daten (z. B. IP-Adressen) auf den Servern von Vercel verarbeitet. Vercel verwendet Content Delivery Networks (CDNs), die Daten weltweit auf Servern zwischenspeichern, um Ladezeiten zu optimieren.
        </p>
        <p>
          <strong>Rechtsgrundlage:</strong> Die Nutzung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren, effizienten und schnellen Bereitstellung des Online-Angebots).
        </p>
        <p>
          <strong>US-Datentransfer:</strong> Soweit Daten in die USA übertragen werden, stützen wir uns auf die Standardvertragsklauseln (Standard Contractual Clauses – SCCs) der EU-Kommission, die ein angemessenes Datenschutzniveau gewährleisten. Weitere Details finden Sie in der{" "}
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
            Datenschutzerklärung von Vercel
          </a>.
        </p>
        <p>
          <strong>Auftragsverarbeitung:</strong> Wir haben einen Vertrag über die Auftragsverarbeitung (AVV) mit Vercel geschlossen, um sicherzustellen, dass Ihre Daten nur nach unseren Weisungen und unter Einhaltung der DSGVO verarbeitet werden.
        </p>

        <h3>Server-Logfiles</h3>
        <p>
          Bei jedem Aufruf unserer Website erfasst das System automatisch Daten und Informationen vom Computersystem des aufrufenden Rechners. Diese Daten werden in sogenannten Server-Logfiles gespeichert:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>IP-Adresse (ggf. anonymisiert)</li>
          <li>Datum und Uhrzeit des Zugriffs</li>
          <li>Browsertyp und Browserversion</li>
          <li>Verwendetes Betriebssystem</li>
          <li>Referrer URL (die zuvor besuchte Seite)</li>
          <li>Hostname des zugreifenden Rechners</li>
        </ul>
        <p>
          Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO zur Gewährleistung der technischen Sicherheit und Fehlerbehebung.
        </p>
      </section>

      <section>
        <h2>3. Datenerfassung durch Eingaben</h2>

        <h3>Kontaktformular und E-Mail-Kontakt</h3>
        <p>
          Wenn Sie uns per Kontaktformular Anfragen zukommen lassen oder uns per E-Mail schreiben, werden Ihre Angaben aus dem Anfrageformular (z. B. Name, E-Mail-Adresse, Telefonnummer, Nachrichtentext) inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
        </p>
        <p>
          <strong>Rechtsgrundlage:</strong> Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO).
        </p>
        <p>
          <strong>Speicherdauer:</strong> Die von Ihnen eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Aufbewahrungsfristen bleiben unberührt.
        </p>
      </section>

      <section>
        <h2>4. Webanalyse und Statistik (Plausible)</h2>
        <p>
          Wir verwenden auf dieser Website <strong>Plausible Analytics</strong>, einen datenschutzfreundlichen Webanalysedienst der Plausible Insights OÜ, Västriku tn 2, 50403, Tartu, Estland.
        </p>

        <h3>Warum Plausible?</h3>
        <p>
          Plausible ermöglicht uns, die Nutzung unserer Website zu verstehen und zu optimieren, ohne Ihre Privatsphäre zu verletzen.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Keine Cookies:</strong> Plausible setzt keine Cookies auf Ihrem Endgerät.</li>
          <li><strong>Keine personenbezogenen Daten:</strong> Es werden keine persönlichen Daten (wie IP-Adressen) dauerhaft gespeichert.</li>
          <li><strong>EU-Hosting:</strong> Alle Daten werden auf Servern in Deutschland/der EU verarbeitet.</li>
        </ul>

        <h3>Was wird erfasst?</h3>
        <p>
          Plausible erfasst aggregierte Informationen wie:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Seitenaufrufe und Verweildauer</li>
          <li>Ungefährer Standort (Land/Region) basierend auf der anonymisierten IP</li>
          <li>Gerätetyp (Desktop/Mobil), Browser und Betriebssystem</li>
          <li>Herkunftsquelle (über welche Website oder Kampagne Sie zu uns kamen)</li>
        </ul>

        <h3>Event-Tracking & Offline-Kampagnen</h3>
        <p>
          Zusätzlich messen wir anonyme Interaktionen (&quot;Events&quot;), um den Erfolg unserer Marketingmaßnahmen zu bewerten. Dazu gehören:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Klicks auf Kontakt-Buttons (Telefon, E-Mail, Formular)</li>
          <li>Nutzung von Formularen (Start und Absenden)</li>
          <li>Besuche über QR-Codes oder Flyer (z. B. über Parameter wie utm_source=flyer)</li>
        </ul>
        <p>
          Diese Daten helfen uns zu erkennen, ob unsere Offline-Werbung (z. B. Flyer) funktioniert, ohne dass wir Sie persönlich identifizieren können.
        </p>

        <p>
          <strong>Rechtsgrundlage:</strong> Die Nutzung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der statistischen Analyse des Nutzerverhaltens zur Optimierung des Webangebots und der Werbung). Da das Tracking vollständig anonym und ohne Cookies erfolgt, ist keine Einwilligung (Consent-Banner) erforderlich.
        </p>
        <p>
          Weitere Informationen finden Sie in der{" "}
          <a href="https://plausible.io/privacy" target="_blank" rel="noopener noreferrer">
            Datenschutzerklärung von Plausible
          </a>.
        </p>
      </section>

      <section>
        <h2>5. Externe Tools und Inhalte</h2>

        <h3>Terminbuchung über Google Kalender</h3>
        <p>
          Auf unserer Website bieten wir die Möglichkeit, Online-Termine über Google Kalender (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland) zu vereinbaren.
        </p>
        <p>
          Wenn Sie einen Termin buchen, werden die eingegebenen Daten (Name, E-Mail, Terminwunsch) an Google übertragen.
        </p>
        <p>
          <strong>Rechtsgrundlage:</strong> Die Verarbeitung erfolgt zur Durchführung vorvertraglicher Maßnahmen oder zur Vertragserfüllung gemäß Art. 6 Abs. 1 lit. b DSGVO.
        </p>
        <p>
          <strong>Datentransfer:</strong> Weitere Details finden Sie unter{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            https://policies.google.com/privacy
          </a>.
        </p>

        <h3>Externe Links (Partner & Social Media)</h3>
        <p>
          Unsere Website enthält Verlinkungen zu externen Webseiten Dritter. Hierzu gehören:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Partnerseiten:</strong> HÖNING ({" "}
            <a href="https://www.hoening.de" target="_blank" rel="noopener noreferrer">
              www.hoening.de
            </a>, {" "}
            <a href="https://haustuerkonfigurator.hoening.de" target="_blank" rel="noopener noreferrer">
              haustuerkonfigurator.hoening.de
            </a>)
          </li>
          <li><strong>Social Media:</strong> Profile auf Plattformen wie TikTok oder Instagram</li>
        </ul>
        <p>
          Dies sind einfache Links, keine eingebetteten Plugins. Erst wenn Sie auf den Link klicken, werden Sie zum jeweiligen Anbieter weitergeleitet. Ab diesem Zeitpunkt unterliegt die Datenverarbeitung den Datenschutzerklärungen des Ziel-Anbieters. Wir haben keinen Einfluss auf die dortige Verarbeitung.
        </p>
      </section>

      <section>
        <h2>6. Sicherheit</h2>

        <h3>SSL-/TLS-Verschlüsselung</h3>
        <p>
          Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von &bdquo;http://&ldquo; auf &bdquo;https://&ldquo; wechselt und an dem Schloss-Symbol in Ihrer Browserzeile. Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
        </p>
      </section>

      <section>
        <h2>7. Ihre Rechte als Betroffener</h2>
        <p>
          Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Auskunft</strong> über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung (Art. 15 DSGVO).
          </li>
          <li>
            <strong>Berichtigung</strong> unrichtiger oder Vervollständigung Ihrer bei uns gespeicherten Daten (Art. 16 DSGVO).
          </li>
          <li>
            <strong>Löschung</strong> Ihrer gespeicherten Daten, sofern nicht gesetzliche Aufbewahrungspflichten entgegenstehen (Art. 17 DSGVO).
          </li>
          <li>
            <strong>Einschränkung der Datenverarbeitung</strong> unter bestimmten Voraussetzungen (Art. 18 DSGVO).
          </li>
          <li>
            <strong>Datenübertragbarkeit</strong> (Herausgabe Ihrer Daten in einem gängigen, maschinenlesbaren Format) (Art. 20 DSGVO).
          </li>
          <li>
            <strong>Widerspruch</strong> gegen die Verarbeitung Ihrer Daten, sofern diese auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse) erfolgt (Art. 21 DSGVO).
          </li>
          <li>
            <strong>Beschwerde</strong> bei der zuständigen Aufsichtsbehörde (Art. 77 DSGVO).
          </li>
        </ul>
        <p className="mt-3">
          Zuständige Aufsichtsbehörde für unseren Sitz in Nordrhein-Westfalen ist die{" "}
          <a href="https://www.ldi.nrw.de/" target="_blank" rel="noopener noreferrer">
            Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen
          </a>{" "}
          (Postfach 20 04 44, 40102 Düsseldorf).
        </p>
      </section>

      <section>
        <h2>8. Aktualität und Änderung</h2>
        <p>
          Diese Datenschutzerklärung ist aktuell gültig und hat den Stand Oktober 2025.
        </p>
        <p>
          Durch die Weiterentwicklung unserer Website und Angebote darüber oder aufgrund geänderter gesetzlicher beziehungsweise behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern.
        </p>
      </section>

      <p className="mt-8 text-sm text-muted-foreground">
        Weitere Informationen zu Haftung und Urheberrechten finden Sie im{" "}
        <Link href="/impressum">Impressum</Link>.
      </p>
    </ContentPage>
  );
}
