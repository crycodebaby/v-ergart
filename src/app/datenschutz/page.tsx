// src/app/datenschutz/page.tsx
import { ContentPage } from "@/components/ContentPage";
import Link from "next/link";

export default function DatenschutzPage() {
  return (
    <ContentPage title="Datenschutzerklärung">
      <p>
        Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Wir
        verarbeiten Ihre personenbezogenen Daten ausschließlich im Rahmen der
        gesetzlichen Datenschutzvorschriften (DSGVO, BDSG, TTDSG) und nur soweit
        dies zur Bereitstellung einer funktionsfähigen Website sowie unserer
        Inhalte und Leistungen erforderlich ist.
      </p>

      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist:
        <br />
        <strong>Alexander Ergart</strong>
        <br />
        Further Straße 89B
        <br />
        41462 Neuss / Deutschland
        <br />
        Telefon: <a href="tel:+4917666825889">0176 – 668 25 889</a>
        <br />
        E-Mail: <a href="mailto:aergart@gmail.com">aergart@gmail.com</a>
      </p>

      <h2>2. Hosting durch Vercel Inc.</h2>
      <p>
        Diese Website wird von Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA
        91789, USA, gehostet. Vercel erhält in diesem Zusammenhang technische
        Zugriffsdaten (z. B. IP-Adresse, Browserinformationen, Zeitstempel).
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
        an einer sicheren und effizienten Bereitstellung). Ein
        EU-Standardvertrags- mechanismus (SCCs) gem. Art. 46 DSGVO stellt beim
        Datentransfer in die USA ein angemessenes Schutzniveau sicher. Weitere
        Informationen finden Sie in der{" "}
        <a
          href="https://vercel.com/legal/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Datenschutzerklärung von Vercel
        </a>
        .
      </p>

      <h2>3. Server-Logfiles</h2>
      <p>
        Bei jedem Seitenaufruf werden automatisch Zugriffsdaten durch den
        Browser übermittelt und von unserem Hosting-Anbieter in sogenannten
        Server-Logfiles gespeichert (z. B. IP-Adresse, Datum und Uhrzeit,
        angeforderte Datei, Referrer-URL, User-Agent). Die Verarbeitung erfolgt
        gem. Art. 6 Abs. 1 lit. f DSGVO zur technischen Bereitstellung,
        Systemsicherheit und Fehleranalyse. Eine Zusammenführung dieser Daten
        mit anderen Datenquellen findet nicht statt.
      </p>

      <h2>4. Verwendung externer Links (HÖNING-Webseiten)</h2>
      <p>
        Auf einigen Unterseiten verlinken wir zu unserem Partner HÖNING (z. B.{" "}
        <a
          href="https://www.hoening.de/unternehmen/ueber-uns/"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.hoening.de
        </a>{" "}
        und{" "}
        <a
          href="https://haustuerkonfigurator.hoening.de/"
          target="_blank"
          rel="noopener noreferrer"
        >
          haustuerkonfigurator.hoening.de
        </a>
        ). Es handelt sich dabei um externe Webseiten, für deren Inhalte und
        Datenschutzbestimmungen ausschließlich HÖNING verantwortlich ist. Beim
        Anklicken dieser Links werden Sie auf fremde Server weitergeleitet, auf
        deren Datenverarbeitung wir keinen Einfluss haben.
      </p>

      <h2>5. Terminbuchung über Calendly</h2>
      <p>
        Für die Online-Terminvereinbarung nutzen wir das Tool{" "}
        <a
          href="https://calendly.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Calendly LLC
        </a>
        , 271 17th St NW, Atlanta, GA 30363, USA. Bei der Terminbuchung werden
        die von Ihnen eingegebenen Daten (z. B. Name, E-Mail, gewählter Termin)
        verarbeitet und an Calendly übermittelt. Rechtsgrundlage ist Art. 6 Abs.
        1 lit. b DSGVO (Vertragserfüllung bzw. vorvertragliche Maßnahmen). Die
        Datenübermittlung in die USA erfolgt auf Basis der EU-
        Standardvertragsklauseln. Details finden Sie unter{" "}
        <a
          href="https://calendly.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://calendly.com/privacy
        </a>
        .
      </p>

      <h2>6. Einbindung externer Plattformen (z. B. TikTok-Link)</h2>
      <p>
        Unsere Website enthält Links zu Social-Media-Profilen oder externen
        Plattformen (z. B. TikTok). Beim Aufruf dieser Links werden ggf. Daten
        an den jeweiligen Anbieter übertragen (z. B. IP-Adresse, Referrer-URL).
        Eine automatische Datenübertragung von unserer Website an diese
        Plattformen findet jedoch nicht statt. Bitte beachten Sie die
        Datenschutzhinweise der jeweiligen Anbieter.
      </p>

      <h2>7. Cookies & Tracking</h2>
      <p>
        Unsere Website setzt aktuell keine Cookies zu Analyse- oder
        Marketingzwecken ein. Technisch notwendige Cookies können zur
        Sicherstellung der Funktionalität verwendet werden (Art. 6 Abs. 1 lit. f
        DSGVO).
      </p>

      <h2>8. SSL-/TLS-Verschlüsselung</h2>
      <p>
        Diese Website nutzt zum Schutz der Übertragung vertraulicher Inhalte
        eine SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen
        Sie an „https://“ und dem Schloss-Symbol in der Browserzeile.
      </p>

      <h2>9. Ihre Rechte</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Auskunft über die von uns verarbeiteten personenbezogenen Daten</li>
        <li>Berichtigung unrichtiger Daten</li>
        <li>
          Löschung bzw. Einschränkung der Verarbeitung (Art. 17 und 18 DSGVO)
        </li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
        <li>Beschwerderecht bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
      </ul>
      <p className="mt-3">
        Zuständige Aufsichtsbehörde für Nordrhein-Westfalen ist die{" "}
        <a
          href="https://www.ldi.nrw.de/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Landesbeauftragte für Datenschutz und Informationsfreiheit NRW
        </a>
        .
      </p>

      <h2>10. Aktualität dieser Datenschutzerklärung</h2>
      <p>
        Wir behalten uns vor, diese Datenschutzerklärung bei Änderungen unserer
        Website oder der gesetzlichen Vorgaben anzupassen. Gültig ab Oktober
        2025.
      </p>

      <p className="mt-8 text-sm text-muted-foreground">
        Weitere Informationen zu Haftung und Urheberrechten finden Sie im{" "}
        <Link href="/impressum">Impressum</Link>.
      </p>
    </ContentPage>
  );
}
