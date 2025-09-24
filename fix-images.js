#!/usr/bin/env node

/**
 * Script pour corriger automatiquement tous les chemins d'images
 * Usage: node fix-images.js
 */

const fs = require('fs');
const path = require('path');

const filesToFix = [
  'app/page.tsx',
  'app/projects/page.tsx',
  'app/my-projects/page.tsx',
  'app/favorites/page.tsx',
  'app/validation/page.tsx',
];

function fixImagePaths(filePath) {
  const fullPath = path.join(__dirname, filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Fichier non trouvé: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');

  // Ajouter l'import getAssetPath si pas présent
  if (!content.includes('getAssetPath')) {
    const importMatch = content.match(/^(import.*from.*react.*\n)/m);
    if (importMatch) {
      content = content.replace(
        importMatch[0],
        importMatch[0] + 'import { getAssetPath } from "@/lib/utils"\n'
      );
    }
  }

  // Remplacer les chemins d'images
  const imageRegex = /image:\s*"(\/[^"]+\.(?:png|jpg|jpeg|gif|svg))"/g;
  const avatarRegex = /avatar:\s*"(\/[^"]+\.(?:png|jpg|jpeg|gif|svg))"/g;
  const srcRegex = /src:\s*"(\/[^"]+\.(?:png|jpg|jpeg|gif|svg))"/g;

  let hasChanges = false;

  content = content.replace(imageRegex, (match, imagePath) => {
    hasChanges = true;
    return `image: getAssetPath("${imagePath}")`;
  });

  content = content.replace(avatarRegex, (match, imagePath) => {
    hasChanges = true;
    return `avatar: getAssetPath("${imagePath}")`;
  });

  content = content.replace(srcRegex, (match, imagePath) => {
    hasChanges = true;
    return `src: getAssetPath("${imagePath}")`;
  });

  if (hasChanges) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Corrigé: ${filePath}`);
  } else {
    console.log(`➡️  Aucun changement: ${filePath}`);
  }
}

console.log('🔧 Correction automatique des chemins d\'images...\n');

filesToFix.forEach(fixImagePaths);

console.log('\n✨ Terminé! Pensez à tester en local avec `npm run dev`');