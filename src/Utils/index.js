/**
 * 
 * @returns {string} - random color in hex format
 */

export const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

/**
 * @description - Create an array of random colors
 * @param {Number} colorsNumber 
 * @returns {Array<String>}
 */
export const createColors = (colorsNumber) => {
    let _colors = [];
    for (let i = 0; i < colorsNumber; i++) {
        _colors.push(getRandomColor());
    }
    return _colors;
}

/**
 * @description - Create a square with random colors
 * - It returns an array of arrays of objects
 * @param {Number} cellsX 
 * @param {Number} cellsY 
 * @returns {Array<Array<Object>>}
 */
export const createSquare = (cellsX, cellsY, colorsNumber) => {
    const square = [];

    // create array [cellsX.length][cellsY.length]
    Array.from({ length: cellsX }, (_, i) => i).forEach((i) => {
        const row = [];
        Array.from({ length: cellsY }, (_, j) => j).forEach((j) => {
            row.push([i, j]);
        });
        square.push(row);
    });

    const colors = createColors(colorsNumber);

    // fill array with random colors
    square.forEach((row, i) => {
        row.forEach((col, j) => {
            square[i][j] = {
                color: colors[Math.floor(Math.random() * colors.length)],
                x: i,
                y: j,
            };
        });
    });

    return square;
};


/**
 * @description - Find area of the largest connected component
 * @see https://en.wikipedia.org/wiki/Flood_fill
 * @param {Array} square [[],[],[]]
 * @param {Number} x 
 * @param {Number} y 
 * @param {Array} visited [[Boolean],[Boolean],[Boolean]]
 * @param {String} initialColor
 * @param {Array} cells 
 * @returns {Number} - area of the largest connected component
 */
export const findArea = (square, x, y, visited, initialColor, cells) => {
    // 1. If node is not in the square, return 0
    if (x < 0 || 
        y < 0 || 
        x >= square.length || 
        y >= square[x].length ||
        visited[x][y] !== false) return 0;

    // To collect only cells with the same color
    // We skip the cell if its color is different to the current one
    if (square[x][y].color !== initialColor) return 0;

    // 2. Set the node visited
    visited[x][y] = true;
    cells.push({x, y}); // Add the cell to the array of cells with the max area (render purposes)

    // 3..6 Perform Flood fill one step to south, north, east and west
    const area = 
        1 + 
        findArea(square, x + 1, y, visited, initialColor, cells) + 
        findArea(square, x - 1, y, visited, initialColor, cells) + 
        findArea(square, x, y + 1, visited, initialColor, cells) + 
        findArea(square, x, y - 1, visited, initialColor, cells);

    // 7. Return the area
    return area;
}