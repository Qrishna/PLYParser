#### PLYParser
PLYParser is a javascript library that parses PLY (Polygon File Format) files. 


###### EXAMPLE USAGE
###### Sample usage can be seen in the file sampleUsage.js
```nodejs
const fs = require('fs');
const parsePlyData = require('./PLYParser')
const filePath = 'cube.ply';
const data = fs.readFileSync(filePath, 'utf-8');
const result = parsePlyData(data);

console.log(`Vertices = [${result.vertices}]`)
console.log(`Faces = [${result.faces}]`)
console.log(`Vertices Length = ${result.vertices.length}`)
console.log(`Faces Length = ${result.faces.length}`)

```
###### to run do ```node sampleUsage.js```  Which will show an output that looks like this:

```text
Vertices = [-1,-1,1,-1,1,1,-1,1,-1,1,1,1,1,1,-1,1,-1,1,1,-1,-1,-1,-1,-1]
Faces = [0,1,2,1,3,4,3,5,6,0,7,5,7,2,4,5,3,1,7,0,2,2,1,4,4,3,6,5,7,6,6,7,4,0,5,1]
Vertices Length = 24
Faces Length = 36
```

##### Tests
```
npx mocha PLYParserTest.js
```