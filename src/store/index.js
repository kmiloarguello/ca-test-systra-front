import { createSquare } from "../Utils";


const initialState = {
    cellsX: 10,
    cellsY: 10,
    colorsNumber: 3,
    square: createSquare(10, 10, 3),
    cells: [],
};

export default initialState;
