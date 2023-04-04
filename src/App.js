import { useReducer } from 'react';
import initialState from './store';
import reducer from './reducer';
import ColorAreaCtx from './context';
import './App.css';
import TableContainer from './Components/TableContainer';
import Input from './Components/Input';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ColorAreaCtx.Provider value={{ state, dispatch }}>
      <div className="ca-app container mx-auto">
      <div className="py-20">
        <h1 className="font-sans text-3xl font-normal text-center">CA Color Area</h1>
        <hr className="my-5" />
        <div>
          <Input />
          <TableContainer />
        </div>
      </div>
    </div>    
    </ColorAreaCtx.Provider>
  );
}

export default App;
