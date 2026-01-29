#!/usr/bin/env node
/**
 * Bild-Optimierungs-Script für Hero-Images
 * 
 * Komprimiert große Bilder für bessere Core Web Vitals (LCP)
 * Ziel: < 200KB pro Bild bei 80% WebP Qualität
 * 
 * Usage:
 *   node scripts/optimize-hero-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Konfiguration
const CONFIG = {
    quality: 80,
    maxWidth: 1920,
    maxHeight: 1080,
    targetFormat: 'webp',
    targetSizeKB: 200,
};

// Bilder die optimiert werden sollen
const IMAGES_TO_OPTIMIZE = [
    'public/bilder_ordner/office-ergart.webp',
    'public/bilder_ordner/startbilder/hausmeister-neuss-fensterservice.webp',
    'public/bilder_ordner/startbilder/hausmeisterdienste neuss.webp',
    'public/bilder_ordner/startbilder/Reinigungsservice und Objektreinigung Neuss.webp',
    'public/bilder_ordner/startbilder/hausmeister-neuss-handwerksloesungen.webp',
    'public/bilder_ordner/startbilder/treppenhausreinigung neuss und reinigungsservice neuss.webp',
    'public/bilder_ordner/hoening/fenster/fenster-baustellenprozess/fertig-installierte-scheibe-neue-saubere-fensterfront.webp',
];

/**
 * Optimiert ein einzelnes Bild
 */
async function optimizeImage(inputPath) {
    try {
        // Prüfe ob Datei existiert
        if (!fs.existsSync(inputPath)) {
            console.warn(`⚠️  Überspringe: ${inputPath} (nicht gefunden)`);
            return;
        }

        // Original-Größe
        const originalStats = fs.statSync(inputPath);
        const originalSizeKB = (originalStats.size / 1024).toFixed(2);

        // Backup erstellen
        const backupPath = inputPath.replace(/\.webp$/, '.backup.webp');
        if (!fs.existsSync(backupPath)) {
            fs.copyFileSync(inputPath, backupPath);
            console.log(`📦 Backup erstellt: ${backupPath}`);
        }

        // Optimierung
        await sharp(inputPath)
            .resize(CONFIG.maxWidth, CONFIG.maxHeight, {
                fit: 'inside',
                withoutEnlargement: true,
            })
            .webp({ quality: CONFIG.quality })
            .toFile(inputPath.replace('.webp', '.optimized.webp'));

        // Ersetze Original durch optimierte Version
        fs.renameSync(inputPath.replace('.webp', '.optimized.webp'), inputPath);

        // Neue Größe
        const newStats = fs.statSync(inputPath);
        const newSizeKB = (newStats.size / 1024).toFixed(2);

        // Erfolg
        const savings = ((1 - newStats.size / originalStats.size) * 100).toFixed(1);
        console.log(
            `✅ ${path.basename(inputPath)}: ${originalSizeKB}KB → ${newSizeKB}KB (${savings}% gespart)`
        );

        // Warnung wenn immer noch zu groß
        if (newSizeKB > CONFIG.targetSizeKB) {
            console.warn(`⚠️  Datei ist immer noch > ${CONFIG.targetSizeKB}KB, erwäge weitere Optimierung`);
        }

    } catch (error) {
        console.error(`❌ Fehler bei ${inputPath}:`, error.message);
    }
}

/**
 * Hauptfunktion
 */
async function main() {
    console.log('🚀 Starte Bild-Optimierung für Hero-Images...\n');
    console.log(`Konfiguration:`);
    console.log(`  - Max. Breite: ${CONFIG.maxWidth}px`);
    console.log(`  - Max. Höhe: ${CONFIG.maxHeight}px`);
    console.log(`  - Qualität: ${CONFIG.quality}%`);
    console.log(`  - Zielgröße: < ${CONFIG.targetSizeKB}KB\n`);

    let optimizedCount = 0;

    for (const imagePath of IMAGES_TO_OPTIMIZE) {
        await optimizeImage(imagePath);
        optimizedCount++;
    }

    console.log(`\n✨ ${optimizedCount} Bilder verarbeitet!`);
    console.log(`\n💡 Tipp: Backups (.backup.webp) kannst du nach erfolgreicher Prüfung löschen.`);
    console.log(`   Führe einen Lighthouse-Test durch, um die Verbesserungen zu messen.\n`);
}

// Script ausführen
main().catch(console.error);
