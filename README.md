#### PLYParser
PLYParser is a javascript library that parses PLY (Polygon File Format) files. 

It currently considers and extracts:
- Vertices
- Faces

###### EXAMPLE USAGE

###### Installing and Using with npm
```
npm install plyparser@latest

// Require the package in your code:
const plyParser = require('plyparser');

```

###### Using in the browser
```
// add a script tag 
<script src="https://unpkg.com/plyparser@latest/PLYParser.js" type="text/javascript"></script>
```


###### Sample usage can be seen in the file sampleUsage.js
```nodejs
const fs = require('fs');
// const parsePlyData = require('./PLYParser')
const parsePlyData = require('plyparser')
const filePath = 'cube.ply';
const data = fs.readFileSync(filePath, 'utf-8');
const result = parsePlyData(data);

console.log("vertices", result.vertices)
console.log("faces", result.faces)
console.log("colors", result.colors)
console.log(`Vertices Length = ${result.vertices.length}`)
console.log(`Faces Length = ${result.faces.length}`)

```
###### to run do ```node sampleUsage.js```  Which will show an output that looks like this:

```text
vertices [
  [ -1, -1, 1 ],
  [ -1, 1, 1 ],
  [ -1, 1, -1 ],
  [ 1, 1, 1 ],
  [ 1, 1, -1 ],
  [ 1, -1, 1 ],
  [ 1, -1, -1 ],
  [ -1, -1, -1 ]
]
faces [
  [ 0, 1, 2 ], [ 1, 3, 4 ],
  [ 3, 5, 6 ], [ 0, 7, 5 ],
  [ 7, 2, 4 ], [ 5, 3, 1 ],
  [ 7, 0, 2 ], [ 2, 1, 4 ],
  [ 4, 3, 6 ], [ 5, 7, 6 ],
  [ 6, 7, 4 ], [ 0, 5, 1 ]
]
colors []
Vertices Length = 8
Faces Length = 12
```

##### Tests
```
nyc mocha PLYParserTest.js
```

#### Test Results
```
 npm test

> plyparser@5.0.0 test
> nyc mocha PLYParserTest.js

  PLYParser
    ✔ should parse PLY data with vertices and faces
    ✔ should parse PLY data with vertices, colors, and faces
    ✔ should correctly distinguish and count lines that represent vertices and faces
    ✔ should correctly distinguish and handle face lines that start with 4
    ✔ should parse PLY data with no vertices or faces
File format is not ascii! It is: binary
    ✔ should handle PLY data with invalid format
Error: total vertices read: 2 does not match expected vertices: 3
    ✔ should handle incomplete vertex data
Error: total faces read: 1 does not match expected faces: 2
    ✔ should handle incomplete face data
    ✔ should parse PLY colors data if it is described in the header
    ✔ should not parse colors if color property is not described in the header
    ✔ should parse PLY data with vertices, colors, faces
    ✔ should handle PLY data with negative coordinates


  12 passing (17ms)

------------------|---------|----------|---------|---------|-------------------
File              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------|---------|----------|---------|---------|-------------------
All files         |     100 |    95.74 |     100 |     100 |                   
 PLYParser.js     |     100 |    95.74 |     100 |     100 | 83,110            
 PLYParserTest.js |     100 |      100 |     100 |     100 |                   
------------------|---------|----------|---------|---------|-------------------

```