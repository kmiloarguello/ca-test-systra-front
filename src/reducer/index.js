import initialState from "../store";

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_CELLS_X':
            return {
                ...state,
                cellsX: action.payload,
            };
        case 'SET_CELLS_Y':
            return {
                ...state,
                cellsY: action.payload,
            };
        case 'SET_COLORS_NUMBER':
            return {
                ...state,
                colorsNumber: action.payload,
            };
        case 'SET_SQUARE':
            return {
                ...state,
                square: action.payload,
            };
        case 'SET_CELLS':
            return {
                ...state,
                cells: action.payload,
            };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
}

export default reducer;