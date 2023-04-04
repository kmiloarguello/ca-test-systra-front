import { useContext, useMemo } from "react";
import ColorAreaCtx from "../context";

function TableContainer () {
    const { state } = useContext(ColorAreaCtx);

    return (
        <table className="flex items-center mx-auto justify-center">
            <tbody className="grid gap-y-2">
                {
                    useMemo(() => {
                        return state.square.map((row, i) => (
                            <tr key={i} className="grid gap-2" style={{ gridTemplateColumns: `repeat(${state.cellsX},1fr)` }}>
                                {
                                    row.map((col, j) => {
                                        return (<td 
                                            data-x={i}
                                            data-y={j}
                                            key={j}
                                            style={{ backgroundColor: state.square[i][j].color }}
                                            className={`w-14 h-14 rounded-lg flex items-center justify-center shadow-lg ${
                                                state.cells && 
                                                state.cells.length > 0 && 
                                                state.cells.some(cell => col.x === cell.x && col.y === cell.y)
                                                ? 'border-4 border-black' : ''
                                            }`}>
                                        </td>)
                                    })
                                }
                            </tr>
                        ))

                    }, [state.square, state.cellsX, state.cells])
                }
            </tbody>
        </table>
    )
}



/*
return Array.from({ length: state.cellsX * state.cellsY }, (_, i) => i).map((i) => {
    return <Box key={i} value={i} color={colors[Math.floor(Math.random() * colors.length)]} />
});
*/

export default TableContainer;