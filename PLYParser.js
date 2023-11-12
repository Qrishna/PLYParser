
function parsePlyData(data) {
    const lines = data.split('\n');
    const vertices = [];
    const faces = [];
    const ply_data_object = {};

    let isVertices = false;

    let expectedVertexCount = 0;
    let expectedFaceCount = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line === 'end_header') {
            isVertices = true;
            continue;
        }
        // Skip empty lines
        if (line === '') {
            continue;
        }
        // Check for element vertex and element face lines
        if (line.startsWith('element vertex')) {
            expectedVertexCount = parseInt(line.split(' ')[2]);
        } else if (line.startsWith('element face')) {
            expectedFaceCount = parseInt(line.split(' ')[2]);
        }

        if (isVertices) {
            if (/^\d+\s+((\d+\s+)+\d+)?$/.test(line)) {
                const faceVertices = line.split(' ').slice(1).map(Number);
                faces.push(faceVertices);
            } else {
                const vertex = line.split(' ').map(Number);
                vertices.push(vertex);
            }
        }
    }
    // Validate vertex and face counts
    if (vertices.length !== expectedVertexCount) {
        console.log(`Vertices count: ${vertices.length}, Expected vertices count: ${expectedVertexCount}`);
        throw new Error('Vertex count does not match the specified counts in the file. ');
    }
    if (faces.length !== expectedFaceCount) {
        console.log(`Faces count: ${vertices.length}, Expected faces count: ${expectedVertexCount}`);
        throw new Error('Face count does not match the specified counts in the file.');
    }

    ply_data_object.vertices = vertices.flat();
    ply_data_object.faces = faces.flat();
    return ply_data_object;
}

// to ensure compatibility with browser
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = parsePlyData;
}
// module.exports = parsePlyData
