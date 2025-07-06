
import Cell from "../Cell/Cell";
import CellContextProvider from "../Cell/contexts/CellContextProvider";
import { useBoardContext } from "./contexts/features/useBoardContext";
import wooden from "../../assets/images/bg.avif";
import Win from "../Model/Win";
import Mode from "../Model/Mode";


const Board = () => {
    const { playground, playerTurn, redCut, goldCut, redPlayer, goldPlayer, restart, showWinModel, winner, mode,
        vsComputer, vsFriend
    } = useBoardContext();
    // console.log(playground);

    return (
        <div className={`h-screen w-screen flex flex-col justify-around items-center bg-cover overflow-y-hidden`}
            style={{ backgroundImage: `url(${wooden})` }}>
            <button onClick={restart} className=" p-2 rounded-md shadow-inner shadow-sky-100 bg-green-500 text-white
            hover:text-red-800 outline-none">RESTART</button>
            <h1 className="text-white flex gap-2">Turn:
                <span className={playerTurn === 1 ? 'text-red-500' : 'text-yellow-500'}>
                    {playerTurn === 1 ? "PLAYER RED" : "PLAYER Gold"}
                </span>
            </h1>
            <div className="flex flex-row items-center text-yellow-500 gap-2">GOLD: {goldCut.map((row, i) => (
                <span key={i} className={`w-5 h-5 rounded-full border-2 shadow-inner shadow-white ${redPlayer}`}></span>
            ))}</div>
            <div className="grid grid-rows-8 h-auto border-8 border-black shadow-md shadow-slate-300  bg-slate-800 w-auto rounded-2xl">
                {playground.map((row, i) => (
                    <div key={i} className="grid grid-cols-8 ">
                        {row.map((col, j) => (
                            <CellContextProvider key={`${i}-${j}`} i={i}
                                j={j} col={col}>
                                < Cell col={col} r={i} c={j}
                                />
                            </CellContextProvider>

                        ))}
                    </div>
                ))}
            </div>
            {mode && <Mode vsComputer={vsComputer} vsFriend={vsFriend} />}
            {winner && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#373e44b1] p-4 sm:p-6 md:p-8 outline-2 outline-offset-2 outline-dashed outline-white">
                    <Win restart={restart} win={showWinModel} />
                </div>
            )}
            <div className="flex flex-row items-center text-red-500 gap-2">RED:{redCut.map((row, i) => (
                <span key={i} className={`w-5 h-5 rounded-full border-2 shadow-inner shadow-white ${goldPlayer}`}></span>
            ))}</div>

        </div>
    )
}


export default Board;