import { DoorOpen, Paintbrush, Leaf, Wrench, Home, Shield } from "lucide-react";

export const CORE_SERVICES = [
    {
        // Batch 2: Diese Karte beschreibt den Einbau NEUER Elemente und zeigte
        // trotzdem auf /fensterservice (Reparaturseite). Sie zeigt jetzt auf
        // die Verkaufsseite. Der Reparatur-Einstieg steht separat unten.
        title: "Neue Fenster & Türen",
        description:
            "Hochwertige HÖNING Fenster und Türen – Beratung, Aufmaß und fachgerechte Montage aus einer Hand.",
        icon: DoorOpen,
        link: "/fenster",
        image: "/bilder_ordner/hoening/fenster/fenstersanierung/fertige-terassen-fensterwand.webp",
    },
    {
        title: "Innenausbau & Renovierung",
        description:
            "Böden, Wände, Decken – wir realisieren Trockenbau und frische Anstriche. Von der Idee bis zum bezugsfertigen Raum.",
        icon: Paintbrush,
        link: "/leistungen/innenausbau",
        image: "/bilder_ordner/leistungen/hausmeisterreparaturen.webp",
    },
    {
        title: "Garten- & Landschaftspflege",
        description:
            "Wir gestalten neue Grünflächen und pflegen bestehende Anlagen mit verlässlichen Intervallen.",
        icon: Leaf,
        link: "/leistungen/gartenpflege",
        image: "/bilder_ordner/leistungen/gartenpflege.webp",
    },
    {
        title: "Hausmeisterdienste",
        description:
            "Zuverlässige Betreuung Ihrer Immobilie. Kontrollen, Reparaturen, Winterdienst und Handwerker-Koordination.",
        icon: Wrench,
        link: "/leistungen/hausmeister",
        image: "/bilder_ordner/leistungen/hausmeisterarbeit.webp",
    },
    {
        title: "Gebäudereinigung",
        description:
            "Makellose Sauberkeit für Privat und Gewerbe mit geschultem Team und klaren Qualitätsstandards.",
        icon: Home,
        link: "/leistungen/reinigung",
        image: "/bilder_ordner/leistungen/objektreinigung.webp",
    },
    {
        title: "Sicherheitstechnik",
        description:
            "Moderne Schließsysteme und wirksamer Einbruchschutz. Beratung, fachgerechter Einbau und Einweisung inklusive.",
        icon: Shield,
        link: "/leistungen/sicherheit",
        image: "/bilder_ordner/leistungen/arbeitsschutz.webp",
    },
] as const;
