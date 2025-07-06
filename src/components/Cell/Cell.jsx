
import { useCellContext } from './contexts/features/useCellContext';
import kingIcon from "../../assets/images/king.png"

const Cell = ({ col, r, c }) => {
    // console.log(col, i, j, empty, player1, player2, king1, king2);
    // console.log("heoo");
    const { bgCell, bgPlayer, showSelected, handleClick, empty, j, king1, king2 } = useCellContext();

    return (
        <div key={j} onClick={() => handleClick(r, c)}
            className={`w-12 h-12 flex justify-center items-center rounded-md shadow-inner shadow-slate-800
                  ${bgCell} ${showSelected} `}>
            {col !== empty && (
                <div className={`w-10 h-10 rounded-full border-4 shadow-inner shadow-white 
                      ${bgPlayer}`}>{col === king1 || col === king2 ? <img src={`${kingIcon}`} alt='king' className='w-fit h-fit' /> : ""}
                </div>

            )}
        </div >
    )
}

export default Cell;