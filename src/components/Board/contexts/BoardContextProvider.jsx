/* eslint-disable no-unused-vars */
import { useState } from "react";
import BoardContext from "./BoardContext";

export const BoardContextProvider = ({ children }) => {
    const generateGame = (size, empty, player1, player2) => {
        let initialPlayground = Array(size).fill(null).map(() =>
            Array(size).fill(empty)
        );

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if ((i + j) % 2 === 1) {
                    if (i < 3) {
                        initialPlayground[i][j] = player2;
                    }
                    else if (i > 4) {
                        initialPlayground[i][j] = player1;
                    }
                }

            }
        }

        return initialPlayground;
    }

    const size = 8;
    const empty = 0;
    const player1 = 1;
    const player2 = 2;
    const king1 = 3;
    const king2 = 4;

    const [playground, setPlayground] = useState(generateGame(size, empty, player1, player2));
    const [playerTurn, setPlayerTurn] = useState(player1);
    const [winner, setWinner] = useState(false);
    const [selected, setSelected] = useState(null);
    const [redCut, setRedCut] = useState([]);
    const [goldCut, setGoldCut] = useState([]);
    const [showWinModel, setShowWinModel] = useState("");
    // console.log(goldCut, redCut);
    let redPlayer = "bg-red-800 border-red-950";
    let goldPlayer = "bg-yellow-600 border-yellow-900";
    const [mode, setMode] = useState(true);
    const [computerMove, setComputerMove] = useState();

    const restart = () => {
        setShowWinModel("");
        window.location.reload();
    }
    const checkWin = () => {
        let gold = 0;
        let red = 0;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (playground[i][j] === player1 || playground[i][j] === king1) {
                    red++;
                }
                else if (playground[i][j] === player2 || playground[i][j] === king2) {
                    gold++;
                }
            }
        }
        if (red === 0) {
            setShowWinModel("Gold");
            setWinner(true);
        }
        else if (gold === 0) {
            setShowWinModel("Red");
            setWinner(true);
        }
    }

    const vsComputer = () => {
        setComputerMove(true);
        setMode(false);
    }
    const vsFriend = () => {
        setComputerMove(false);
        setMode(false);
    }

    return (<BoardContext.Provider value={
        {
            size, empty, player1, player2, king1, king2, playground,
            winner, setPlayground, playerTurn, setPlayerTurn, selected, setSelected, redCut, goldCut, redPlayer, goldPlayer, restart,
            showWinModel, setShowWinModel, checkWin, mode, vsComputer, vsFriend, computerMove
        }
    }>
        {children}
    </BoardContext.Provider>
    );
};

export default BoardContextProvider;