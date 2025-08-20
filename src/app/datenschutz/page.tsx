// src/app/datenschutz/page.tsx
import { ContentPage } from "@/components/ContentPage";

export default function DatenschutzPage() {
  return (
    <ContentPage title="Datenschutzerklärung">
      <p>
        Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Wir
        behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der
        gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
      </p>
      <p>
        Die Nutzung unserer Website ist in der Regel ohne Angabe
        personenbezogener Daten möglich. Soweit auf unseren Seiten
        personenbezogene Daten (z.B. Name, Anschrift oder E-Mail-Adressen)
        erhoben werden, erfolgt dies stets auf freiwilliger Basis. Diese Daten
        werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.
      </p>
      <h3>Hosting</h3>
      <p>
        Diese Website wird bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA
        91789, USA, gehostet. Bei jedem Zugriff auf unsere Website werden
        Nutzungsdaten durch Ihren Browser übermittelt und in Protokolldaten
        (Server-Logfiles) gespeichert. Zu diesen Daten gehören: IP-Adresse,
        Datum und Uhrzeit des Abrufs, übertragene Datenmenge und der anfragende
        Provider. Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO auf
        Basis unseres berechtigten Interesses an der Verbesserung der Stabilität
        und Funktionalität unserer Website.
      </p>
      {/* Hier folgen die weiteren Abschnitte aus deiner alten Datei, z.B. zu Calendly, TikTok, etc. */}
      <h3>Terminvereinbarung über Calendly</h3>
      <p>
        Auf unserer Website nutzen wir ein Kalender-Widget des Anbieters
        Calendly LLC, 271 17th St NW, Atlanta, GA 30363, USA zur Vereinbarung
        von Gesprächsterminen. Wenn Sie einen Termin buchen, werden
        personenbezogene Daten (wie Name und E-Mail) von Ihnen verarbeitet und
        an Calendly übertragen.
      </p>
      <h3>SSL-Verschlüsselung</h3>
      <p>
        Diese Website nutzt aus Sicherheitsgründen und zum Schutz der
        Übertragung vertraulicher Inhalte eine SSL-Verschlüsselung.
      </p>
    </ContentPage>
  );
}
