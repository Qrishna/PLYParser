const { parsePlyData, readPLYFile } = require('./PLYParser')

const filePath = 'cube.ply'; // Replace with the actual path
const result = readPLYFile(filePath);

console.log(`Vertices = [${result.vertices}]`)
console.log(`Faces = [${result.faces}]`)
console.log(`Vertices Length = ${result.vertices.length}`)
console.log(`Faces Length = ${result.faces.length}`)
