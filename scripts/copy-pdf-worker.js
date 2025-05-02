const fs = require('fs');
const path = require('path');

const workerSrc = path.join(
  __dirname,
  '../node_modules/pdfjs-dist/build/pdf.worker.min.js'
);
const workerDest = path.join(__dirname, '../public/pdf.worker.min.js');

// Create directories if they don't exist
const destDir = path.dirname(workerDest);
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy the file
fs.copyFileSync(workerSrc, workerDest);
console.log('PDF worker copied successfully'); 