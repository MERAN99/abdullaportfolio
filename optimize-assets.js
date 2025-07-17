// This script optimizes assets for faster loading
// Note: This is a Node.js script that requires additional packages
// Run: npm install sharp gltf-pipeline fs-extra glob --save-dev

import fs from 'fs-extra';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Paths
const publicDir = path.join(__dirname, 'public');
const optimizedDir = path.join(__dirname, 'public/optimized');

// Create optimized directory if it doesn't exist
fs.ensureDirSync(optimizedDir);
fs.ensureDirSync(path.join(optimizedDir, 'images'));
fs.ensureDirSync(path.join(optimizedDir, 'models'));

// Function to optimize images
async function optimizeImages() {
  console.log('Optimizing images...');
  
  try {
    // This requires the sharp package to be installed
    const sharp = (await import('sharp')).default;
    const glob = (await import('glob')).glob;
    
    // Find all images
    const imageFiles = await glob('public/images/**/*.{png,jpg,jpeg,gif}');
    
    for (const file of imageFiles) {
      const filename = path.basename(file);
      const outputPath = path.join(optimizedDir, 'images', filename);
      
      console.log(`Optimizing: ${filename}`);
      
      // Create optimized version
      await sharp(file)
        .resize({ width: 1200, withoutEnlargement: true }) // Limit max width
        .webp({ quality: 80 }) // Convert to WebP for better compression
        .toFile(outputPath.replace(/\.(png|jpg|jpeg|gif)$/i, '.webp'));
      
      // Create thumbnail version
      await sharp(file)
        .resize({ width: 50 })
        .webp({ quality: 30 })
        .toFile(path.join(optimizedDir, 'images', `${path.parse(filename).name}-thumb.webp`));
    }
    
    console.log('Image optimization complete!');
  } catch (error) {
    console.error('Error optimizing images:', error);
    console.log('Make sure to install required packages: npm install sharp glob --save-dev');
  }
}

// Function to optimize 3D models
async function optimizeModels() {
  console.log('Optimizing 3D models...');
  
  try {
    // This requires the gltf-pipeline package to be installed
    const gltfPipeline = await import('gltf-pipeline');
    const glob = (await import('glob')).glob;
    
    // Find all GLB/GLTF models
    const modelFiles = await glob('public/models/**/*.{glb,gltf}');
    
    for (const file of modelFiles) {
      const filename = path.basename(file);
      const outputPath = path.join(optimizedDir, 'models', filename);
      
      console.log(`Optimizing: ${filename}`);
      
      const data = fs.readFileSync(file);
      
      // Optimize the model
      const options = {
        dracoOptions: {
          compressionLevel: 7,
        },
        resourceDirectory: path.dirname(file),
      };
      
      const results = await gltfPipeline.processGlb(data, options);
      fs.writeFileSync(outputPath, results.glb);
    }
    
    console.log('Model optimization complete!');
  } catch (error) {
    console.error('Error optimizing models:', error);
    console.log('Make sure to install required packages: npm install gltf-pipeline --save-dev');
  }
}

// Run optimizations
async function runOptimizations() {
  console.log('Starting asset optimization...');
  
  try {
    await optimizeImages();
    await optimizeModels();
    
    console.log('All assets optimized successfully!');
    console.log('Optimized assets are available in the public/optimized directory.');
    console.log('To use them, update your asset paths in the code.');
  } catch (error) {
    console.error('Error during optimization:', error);
  }
}

runOptimizations(); 