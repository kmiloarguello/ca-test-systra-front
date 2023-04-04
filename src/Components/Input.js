import { useContext, useState } from 'react';
import { Button, Stack, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import ColorAreaCtx from '../context';
import { createSquare, findArea } from '../Utils';

const findMaxArea = (square, visited ) => {
    let maxArea = 0;
    let cells = [];

    square.forEach((row, i) => {
        row.forEach((col, j) => {
            if (visited[i][j]) return; // If the cell is already visited, skip it

            let initialColor = square[i][j].color; // Get the initial color to compare with
            const currentCell = []; // Create an array to store the cells with the max area (render purposes)
            
            const area = findArea(square, i, j, visited, initialColor, currentCell);

            if (area > maxArea) {
                maxArea = area;
                cells = currentCell; 
            }
        });
    });

    return [maxArea, cells];
}

function Input () {
    const { state, dispatch } = useContext(ColorAreaCtx);
    const { control, formState, handleSubmit } = useForm({
        mode: 'onChange',
    });
    const [data, setData] = useState(state);

    /**
     * 
     * @param {Object} data 
     */
    const onSubmit = (data) => {
        dispatch({ type: 'SET_CELLS_X', payload: data.cellsX });
        dispatch({ type: 'SET_CELLS_Y', payload: data.cellsY });
        dispatch({ type: 'SET_COLORS_NUMBER', payload: data.colorsNumber });
        const square = createSquare(data.cellsX, data.cellsY, data.colorsNumber);
        dispatch({ type: 'SET_SQUARE', payload: square });
        dispatch({ type: 'SET_CELLS', payload: [] });
        setData({ ...data, square});        
    };

    /**
     * @description Calculate the max area of the square
     */
    const handleCalculateArea = () => {
        // Create a visited array and mark all cells as not visited
        const visited = Array.from({ length: data.cellsX }, () => Array.from({ length: data.cellsY }, () => false));
        // Find the maximum area
        const [area, cells] = findMaxArea(data.square, visited);
        dispatch({ type: 'SET_CELLS', payload: cells }); // Set the cells with the max area (to render purposes)
        console.log("area", area);
    };

    return (
        <form
        name="inputColorValues"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-row items-center justify-center gap-5 mt-10 mb-20"
        >
            <Controller
                name="cellsX"
                control={control}
                defaultValue={state.cellsX}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Cells X"
                        variant="outlined"
                        type="number"
                        className="mb-5"
                    />
                )}
            />
            <Controller
                name="cellsY"
                control={control}
                defaultValue={state.cellsY}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Cells Y"
                        variant="outlined"
                        type="number"
                        className="mb-5"
                    />
                )}
            />
            <Controller
                name="colorsNumber"
                control={control}
                defaultValue={state.colorsNumber}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Colors number"
                        variant="outlined"
                        type="number"
                        className="mb-5"
                    />
                )}
            />
            <Stack direction="column" spacing={2}>
                <Button
                    type="submit"
                    variant="contained"
                    disabled={!formState.isValid}
                >
                    Create Square
                </Button>
                <Button
                    type="button"
                    variant="outlined"
                    onClick={handleCalculateArea}
                    >
                        Calculate Area
                    </Button>
            </Stack>
            
        </form>
    )
}

export default Input;