// This script verifies that public assets are included in the build
import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public');
const distDir = path.join(process.cwd(), 'dist');

// Function to check if a directory exists
const directoryExists = (dir) => {
  try {
    return fs.statSync(dir).isDirectory();
  } catch (err) {
    return false;
  }
};

// Function to check if important directories are copied
const checkDirectories = () => {
  const importantDirs = ['models', 'images'];
  
  console.log('Checking if important directories are copied to the build...');
  
  importantDirs.forEach(dir => {
    const sourceDir = path.join(publicDir, dir);
    const targetDir = path.join(distDir, dir);
    
    if (directoryExists(sourceDir)) {
      console.log(`Source directory exists: ${dir}`);
      
      if (directoryExists(targetDir)) {
        console.log(`✅ ${dir} directory successfully copied to build`);
        
        // Check if files exist in the directory
        const files = fs.readdirSync(targetDir);
        console.log(`   Files in ${dir}: ${files.length > 0 ? files.join(', ') : 'None'}`);
      } else {
        console.log(`❌ ${dir} directory NOT found in build`);
      }
    } else {
      console.log(`⚠️ Source directory does not exist: ${dir}`);
    }
  });
};

// Run the checks
if (directoryExists(distDir)) {
  checkDirectories();
} else {
  console.log('❌ Build directory not found. Please run "npm run build" first.');
} 