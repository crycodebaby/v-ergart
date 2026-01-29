#!/usr/bin/env node
/**
 * Script zum manuellen Umbenennen der optimierten Bilder
 * 
 * Problem: Dev-Server blockiert das Überschreiben der Originaldateien
 * Lösung: Dev-Server stoppen, dieses Script ausführen, Dev-Server neu starten
 * 
 * Usage:
 *   1. Strg+C um npm run dev zu stoppen
 *   2. node scripts/rename-optimized-images.js
 *   3. npm run dev wieder starten
 */

const fs = require('fs');
const path = require('path');

// Alle .optimized.webp Dateien finden und umbenennen
function renameOptimizedImages(dir) {
    let renamed = 0;
    let errors = 0;

    function walkDir(currentPath) {
        const files = fs.readdirSync(currentPath);

        files.forEach(file => {
            const filePath = path.join(currentPath, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                walkDir(filePath);
            } else if (file.endsWith('.optimized.webp')) {
                // Original-Pfad
                const originalPath = filePath.replace('.optimized.webp', '.webp');

                try {
                    // Lösche Original (wurde bereits als .backup gesichert)
                    if (fs.existsSync(originalPath)) {
                        fs.unlinkSync(originalPath);
                    }

                    // Benenne optimierte Version um
                    fs.renameSync(filePath, originalPath);

                    const originalSize = fs.existsSync(originalPath.replace('.webp', '.backup.webp'))
                        ? fs.statSync(originalPath.replace('.webp', '.backup.webp')).size
                        : 0;
                    const newSize = fs.statSync(originalPath).size;
                    const savings = originalSize > 0
                        ? ((1 - newSize / originalSize) * 100).toFixed(1)
                        : '?';

                    console.log(`✅ ${path.basename(originalPath)} umbenannt (${savings}% kleiner)`);
                    renamed++;
                } catch (err) {
                    console.error(`❌ Fehler bei ${file}:`, err.message);
                    errors++;
                }
            }
        });
    }

    walkDir(dir);

    return { renamed, errors };
}

console.log('🚀 Starte Umbenennung der optimierten Bilder...\n');

const { renamed, errors } = renameOptimizedImages('public/bilder_ordner');

console.log(`\n✨ ${renamed} Bilder erfolgreich umbenannt!`);
if (errors > 0) {
    console.log(`⚠️  ${errors} Fehler aufgetreten.`);
}

console.log('\n💡 Nächste Schritte:');
console.log('  1. Starte den Dev-Server neu: npm run dev');
console.log('  2. Prüfe die Website auf korrekte Bilddarstellung');
console.log('  3. Lösche Backups nach erfolgreicher Prüfung (optional)\n');
