const {expect} = require('chai');
const parsePlyData = require('./PLYParser');
const fs = require('fs');


describe('PLYParser', () => {
    it('should parse PLY data with vertices and faces', () => {
        const data = `ply
format ascii 1.0
comment Some comment
element vertex 3
property float x
property float y
property float z
element face 1
end_header
1.0 2.0 3.0
4.0 5.0 6.0
7.0 8.0 9.0
3 0 1 2`;

        const result = parsePlyData(data);

        expect(result.vertices).to.have.lengthOf(3);
        expect(result.faces).to.have.lengthOf(1);
        expect(result.colors).to.have.lengthOf(0);
    });

    it('should parse PLY data with vertices, colors, and faces', () => {
        const data = `ply
format ascii 1.0
element vertex 3
property float x
property float y
property float z
property uchar red
property uchar green
property uchar blue
element face 1
property list uchar int vertex_indices
end_header
1.0 2.0 3.0 255 0 0
4.0 5.0 6.0 0 255 0
7.0 8.0 9.0 0 0 255
3 0 1 2`;

        const result = parsePlyData(data);

        expect(result.vertices).to.have.lengthOf(3);
        expect(result.faces).to.have.lengthOf(1);
        expect(result.colors).to.have.lengthOf(3);
    });

     it('should correctly distinguish and count lines that represent vertices and faces', () => {
        const data = `ply
format ascii 1.0
element vertex 3
property float x
property float y
property float z
element face 3
property list uchar int vertex_indices
end_header
1.0 2.0 3.0
4.0 5.0 6.0
7.0 8.0 9.0
3 2 1 2
3 2 2 3
3 1 2 3
`;

        const result = parsePlyData(data);
        expect(result.vertices).to.have.lengthOf(3);
        expect(result.vertices).to.deep.equal([ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ])

        expect(result.faces).to.have.lengthOf(3);
        expect(result.faces).to.deep.equal([ [ 2, 1, 2 ], [ 2, 2, 3 ], [ 1, 2, 3 ] ])

        expect(result.colors).to.have.lengthOf(0);
    });
    it('should correctly distinguish and handle face lines that start with 4', () => {
            const data = `ply
    format ascii 1.0
    element vertex 3
    property float x
    property float y
    property float z
    element face 3
    property list uchar int vertex_indices
    end_header
    1.0 2.0 3.0
    4.0 5.0 6.0
    7.0 8.0 9.0
    4 2 1 2 2
    4 2 2 3 1
    4 1 2 3 2
    `;

        const result = parsePlyData(data);
        expect(result.vertices).to.have.lengthOf(3);
        expect(result.vertices).to.deep.equal([ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ])

        expect(result.faces).to.have.lengthOf(3);
        expect(result.faces).to.deep.equal([ [ 2, 1, 2, 2 ], [ 2, 2, 3, 1 ], [ 1, 2, 3, 2] ])

        expect(result.colors).to.have.lengthOf(0);
        });


    it('should parse PLY data with no vertices or faces', () => {
        const data = `ply
format ascii 1.0
element vertex 0
element face 0
end_header`;

        const result = parsePlyData(data);

        expect(result.vertices).to.have.lengthOf(0);
        expect(result.faces).to.have.lengthOf(0);
        expect(result.colors).to.have.lengthOf(0);
    });


    it('should handle PLY data with invalid format', () => {
        const invalidFormatData = `ply
format binary 1.0
element vertex 3
property float x
property float y
property float z
end_header
1.0 2.0 3.0
4.0 5.0 6.0
7.0 8.0 9.0`;

        expect(() => parsePlyData(invalidFormatData)).to.throw('File format is not ascii! It is: binary');
    });

    it('should handle incomplete vertex data', () => {
        const incompleteVertexData = `ply
format ascii 1.0
element vertex 3
property float x
property float y
property float z
end_header
1.0 2.0 3.0
4.0 5.0 6.0`;

        expect(() => parsePlyData(incompleteVertexData)).to.throw('Error: total vertices read: 2 does not match expected vertices: 3');
    });


    it('should handle incomplete face data', () => {
        const incompleteFaceData = `ply
format ascii 1.0
element vertex 3
element face 2
end_header
1.0 2.0 3.0
4.0 5.0 6.0
7.0 8.0 9.0
3 0 1 2`;

        expect(() => parsePlyData(incompleteFaceData)).to.throw('Error: total faces read: 1 does not match expected faces: 2');
    });

    it('should parse PLY colors data if it is described in the header', () => {
        const data = `ply
format ascii 1.0
element vertex 3
property float x
property float y
property float z
property uchar red
property uchar green
property uchar blue
element face 1
end_header
1.0 2.0 3.0 255 0 0
4.0 5.0 6.0 0 255 0
7.0 8.0 9.0 0 0 255
3 0 1 2`;

        const result = parsePlyData(data);

        expect(result.vertices).to.have.lengthOf(3);
        expect(result.faces).to.have.lengthOf(1);
        expect(result.colors).to.deep.equal([[255, 0, 0], [0, 255, 0], [0, 0, 255]]);
    });


    it('should not parse colors if color property is not described in the header', () => {
        const data = `ply
format ascii 1.0
element vertex 3
property float x
property float y
property float z
element face 1
end_header
1.0 2.0 3.0 255 0 0
4.0 5.0 6.0 0 255 0
7.0 8.0 9.0 0 0 255
3 0 1 2`;

        const result = parsePlyData(data);

        expect(result.vertices).to.have.lengthOf(3);
        expect(result.faces).to.have.lengthOf(1);
        expect(result.colors).to.deep.equal([]);
    });

    it('should parse PLY data with vertices, colors, faces', () => {
        const data = `ply
format ascii 1.0
element vertex 3
property float x
property float y
property float z
property uchar red
property uchar green
property uchar blue
element face 1
end_header
1.0 2.0 3.0 255 255 0
4.0 5.0 6.0 128 128 128
7.0 8.0 9.0 0 0 0 
3 0 1 2`;

        const result = parsePlyData(data);

        expect(result.vertices).to.have.lengthOf(3);
        expect(result.faces).to.have.lengthOf(1);
        expect(result.colors).to.deep.equal([[255, 255, 0], [128, 128, 128], [0, 0, 0]]);
    });

    it('should handle PLY data with negative coordinates', () => {
        const data = `ply
format ascii 1.0
element vertex 3
property float x
property float y
property float z
element face 1
end_header
-1.0 -2.0 -3.0
-4.0 -5.0 -6.0
-7.0 -8.0 -9.0
3 0 1 2`;

        const result = parsePlyData(data);
        expect(result.vertices).to.have.lengthOf(3);
        expect(result.faces).to.have.lengthOf(1);
        expect(result.colors).to.have.lengthOf(0);
    });


});