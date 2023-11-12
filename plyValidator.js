const fs = require('fs');
const path = require('path');
// const parsePlyData = require('plyparser');
const parsePlyData = require('./PLYParser')
const directoryPath = '3ddata';

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach((file) => {
    if (path.extname(file) === '.ply') {
      const filePath = path.join(directoryPath, file);
      const data = fs.readFileSync(filePath, 'utf-8');
      console.log(`File: ${file}`);
      const result = parsePlyData(data);

      // console.log(`Vertices = [${result.vertices}]`);
      // console.log(`Faces = [${result.faces}]`);
      console.log(`Vertices Length = ${result.vertices.length}`);
      console.log(`Faces Length = ${result.faces.length}`);
      console.log('\n');
    }
  });
});