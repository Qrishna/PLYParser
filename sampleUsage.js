const fs = require('fs');
const parsePlyData = require('./PLYParser')
const filePath = 'cube.ply';
const data = fs.readFileSync(filePath, 'utf-8');
const result = parsePlyData(data);

console.log(`Vertices = [${result.vertices}]`)
console.log(`Faces = [${result.faces}]`)
console.log(`Vertices Length = ${result.vertices.length}`)
console.log(`Faces Length = ${result.faces.length}`)
