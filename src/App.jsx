
import Board from "./components/Board/Board";
import BoardContextProvider from "./components/Board/contexts/BoardContextProvider";


export default function App() {

  return (
    <BoardContextProvider>
      <Board />
    </BoardContextProvider>

  )
}


