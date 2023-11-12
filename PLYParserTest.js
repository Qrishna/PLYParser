const {expect} = require('chai');
const {parsePlyData, readPLYFile} = require('./PLYParser');


describe('PLYParser', () => {
    it('should parse PLY data with valid counts correctly', () => {
        const plyData = `
        element vertex 3
        element face 1
        end_header
        1.0 2.0 3.0
        4.0 5.0 6.0
        7.0 8.0 9.0
        3 0 1 2
        `;

        const result = parsePlyData(plyData);

        expect(result).to.deep.equal({
            vertices: [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0],
            faces: [0, 1, 2],
        });
    });
    it('should parse PLY data with valid counts correctly', () => {
        const plyData = `
        element vertex 3
        element face 1
        end_header
        1.0 2.0 3.0
        4.0 5.0 6.0
        7.0 8.0 9.0
        3 0 1 2
        `;

        const result = parsePlyData(plyData);

        expect(result).to.deep.equal({
            vertices: [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0],
            faces: [0, 1, 2],
        });
    });
    it('should throw an error for mismatched vertex count', () => {
        const plyData = `
        element vertex 3
        element face 1
        end_header
        1.0 2.0 3.0
        4.0 5.0 6.0
        `;
        expect(() => parsePlyData(plyData)).to.throw('Vertex count does not match');
    });

    it('should throw an error for mismatched face count', () => {
        const plyData = `
        element vertex 3
        element face 2
        end_header
        1.0 2.0 3.0
        4.0 5.0 6.0
        7.0 8.0 9.0
        3 0 1 2
        `;
        expect(() => parsePlyData(plyData)).to.throw('Face count does not match');
    });

    it('should read the cube.ply file and parse correctly', () => {
        const filePath = 'cube.ply'; // Replace with the actual path
        const result = readPLYFile(filePath);

        expect(result.faces).to.deep.equal([0, 1, 2, 1, 3, 4, 3, 5, 6, 0, 7, 5, 7, 2, 4, 5, 3, 1, 7, 0, 2, 2, 1, 4, 4, 3, 6, 5, 7, 6, 6, 7, 4, 0, 5, 1])
        expect(result.vertices).to.deep.equal([-1, -1, 1, -1, 1, 1, -1, 1, -1, 1, 1, 1, 1, 1, -1, 1, -1, 1, 1, -1, -1, -1, -1, -1])
        expect(result).to.deep.equal({
            vertices: [-1, -1, 1, -1, 1, 1, -1, 1, -1, 1, 1, 1, 1, 1, -1, 1, -1, 1, 1, -1, -1, -1, -1, -1],
            faces: [0, 1, 2, 1, 3, 4, 3, 5, 6, 0, 7, 5, 7, 2, 4, 5, 3, 1, 7, 0, 2, 2, 1, 4, 4, 3, 6, 5, 7, 6, 6, 7, 4, 0, 5, 1]
        })

    });
});