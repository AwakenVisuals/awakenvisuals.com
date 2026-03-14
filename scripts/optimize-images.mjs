#!/usr/bin/env node
/**
 * Image Optimizer for Awaken Visuals
 * ===================================
 * Converts full-res images into web-optimized versions for the 3D hero gallery.
 *
 * HOW TO USE:
 * 1. Drop your full-res images into: public/gallery/originals/
 *    (Name them hero-1.jpg, hero-2.jpg, etc.)
 * 2. Run: pnpm optimize-images
 * 3. Optimized versions appear in public/gallery/ ready for the site
 *
 * Settings:
 * - Max width: 2560px (sharp on high-res displays)
 * - Quality: 92 (high quality, no visible compression artefacts)
 * - Format: JPEG (best for photos, WebGL compatible)
 * - Typical output: 800KB-1.5MB per image (down from 3-10MB originals)
 */

import sharp from "sharp";
import { readdir, mkdir, stat } from "fs/promises";
import { join, extname, basename } from "path";

const ORIGINALS_DIR = join(process.cwd(), "public/gallery/originals");
const OUTPUT_DIR = join(process.cwd(), "public/gallery");
const MAX_WIDTH = 2560;
const QUALITY = 95;

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".tiff", ".bmp"];

async function optimizeImages() {
  // Ensure originals directory exists
  try {
    await stat(ORIGINALS_DIR);
  } catch {
    await mkdir(ORIGINALS_DIR, { recursive: true });
    console.log(`\n📁 Created: public/gallery/originals/`);
    console.log(`   Drop your full-res images there, then run this again.\n`);
    return;
  }

  const files = await readdir(ORIGINALS_DIR);
  const imageFiles = files.filter((f) =>
    IMAGE_EXTENSIONS.includes(extname(f).toLowerCase())
  );

  if (imageFiles.length === 0) {
    console.log(`\n📁 No images found in public/gallery/originals/`);
    console.log(`   Drop your full-res hero images there (hero-1.jpg, hero-2.jpg, etc.)\n`);
    return;
  }

  console.log(`\n🖼️  Optimizing ${imageFiles.length} images...\n`);

  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const file of imageFiles) {
    const inputPath = join(ORIGINALS_DIR, file);
    const outputName = basename(file, extname(file)) + ".jpg";
    const outputPath = join(OUTPUT_DIR, outputName);

    const originalStats = await stat(inputPath);
    const originalSize = originalStats.size;
    totalOriginal += originalSize;

    await sharp(inputPath)
      .resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: "inside",
      })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toFile(outputPath);

    const optimizedStats = await stat(outputPath);
    const optimizedSize = optimizedStats.size;
    totalOptimized += optimizedSize;

    const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(0);
    const originalMB = (originalSize / 1024 / 1024).toFixed(1);
    const optimizedKB = (optimizedSize / 1024).toFixed(0);

    console.log(
      `   ✅ ${outputName.padEnd(20)} ${originalMB}MB → ${optimizedKB}KB  (${savings}% smaller)`
    );
  }

  const totalOriginalMB = (totalOriginal / 1024 / 1024).toFixed(1);
  const totalOptimizedMB = (totalOptimized / 1024 / 1024).toFixed(1);
  const totalSavings = ((1 - totalOptimized / totalOriginal) * 100).toFixed(0);

  console.log(`\n   Total: ${totalOriginalMB}MB → ${totalOptimizedMB}MB (${totalSavings}% smaller)`);
  console.log(`\n✨ Done! Optimized images are in public/gallery/\n`);
}

optimizeImages().catch(console.error);
