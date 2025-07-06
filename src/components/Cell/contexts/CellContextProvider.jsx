/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { useBoardContext } from "../../Board/contexts/features/useBoardContext";
import CellContext from "./CellContext";

export const CellContextProvider = ({ children, i, j, col }) => {
    const { player1, player2, king1, king2, winner, playground, empty, size, setPlayground, playerTurn, setPlayerTurn,
        selected, setSelected, redCut, goldCut, checkWin, mode, computerMove
    } = useBoardContext();

    let bgPlayer = "";
    let bgCell = ((i + j) % 2 === 1) ? "bg-slate-800" : "bg-slate-300";
    let showSelected = "";
    const [possibleMoves, setPossibleMoves] = useState([]);

    const handleClick = (r, c) => {
        // console.log(r, c);

        if (winner || mode) { return; }
        if (selected) {
            console.log(selected);

            const { validMove, cutMove } = checkMove(selected, { r, c });
            if (validMove) {
                move(selected, { r, c });
                if (cutMove) {
                    const nextCutMove = checkPossibleCutMove({ r, c });
                    if (nextCutMove) {
                        setSelected({ r, c });
                    }
                    else {
                        setPlayerTurn(playerTurn === player1 ? player2 : player1);

                        setSelected(null);
                    }
                }
                else {
                    setPlayerTurn(playerTurn === player1 ? player2 : player1);

                }

            }
            setSelected(null);
        }
        else if ((playground[r][c] !== empty) && ((playground[r][c] === playerTurn) || (playground[r][c] - 2 === playerTurn))) {
            setSelected({ r, c });
        }
    }

    useEffect(() => {
        if (selected) {
            const moves = getPossibleMoves(selected);
            setPossibleMoves(moves);
        } else {
            setPossibleMoves([]);
        }
    }, [selected, playground]);

    const checkMove = (initialPosition, nextPosition) => {
        const currentPiece = playground[initialPosition.r][initialPosition.c];
        const currentPieceDirection = currentPiece === player1 ? -1 : 1;
        const currentPieceCutDirection = currentPiece === player1 ? -2 : 2;
        if (currentPiece === king1 || currentPiece === king2) {
            if ((Math.abs(nextPosition.c - initialPosition.c) === 1) && (Math.abs(nextPosition.r - initialPosition.r) === 1)
                && (playground[nextPosition.r][nextPosition.c] === empty)) {
                return { validMove: true, cutMove: false };
            }
            if ((Math.abs(initialPosition.c - nextPosition.c) === 2) && (Math.abs(nextPosition.r - initialPosition.r) === 2)
                && (playground[nextPosition.r][nextPosition.c] === empty)) {
                const midI = (initialPosition.r + nextPosition.r) / 2;
                const midJ = (initialPosition.c + nextPosition.c) / 2;
                if (currentPiece === king1 && (playground[midI][midJ] === player2 || playground[midI][midJ] === king2)) {
                    return { validMove: true, cutMove: true };
                }
                else if (currentPiece === king2 && (playground[midI][midJ] === player1 || playground[midI][midJ] === king1)) {
                    return { validMove: true, cutMove: true };
                }
            }
        }
        else {
            if ((Math.abs(nextPosition.c - initialPosition.c) === 1) &&
                ((nextPosition.r - initialPosition.r) === currentPieceDirection) &&
                (playground[nextPosition.r][nextPosition.c] === empty)) {
                return { validMove: true, cutMove: false };
            }
            if ((Math.abs(initialPosition.c - nextPosition.c) === 2) && ((nextPosition.r - initialPosition.r) === currentPieceCutDirection)
                && (playground[nextPosition.r][nextPosition.c] === empty)) {
                const midI = (initialPosition.r + nextPosition.r) / 2;
                const midJ = (initialPosition.c + nextPosition.c) / 2;
                if (currentPiece === player1 && (playground[midI][midJ] === player2 || playground[midI][midJ] === king2)) {
                    return { validMove: true, cutMove: true };
                }
                else if (currentPiece === player2 && playground[midI][midJ] === player1 || playground[midI][midJ] === king1) {
                    return { validMove: true, cutMove: true };
                }
            }
        }


        return { validMove: false, cutMove: false };
    }

    const move = (initialPosition, nextPosition) => {
        const newPlayground = [...playground];
        const currentPiece = newPlayground[initialPosition.r][initialPosition.c];
        newPlayground[initialPosition.r][initialPosition.c] = empty;
        newPlayground[nextPosition.r][nextPosition.c] = currentPiece;

        if ((currentPiece === player1 && nextPosition.r === 0) ||
            (currentPiece === player2 && nextPosition.r === size - 1)) {
            newPlayground[nextPosition.r][nextPosition.c] = currentPiece === player1 ? king1 : king2;
        }
        if ((Math.abs(initialPosition.c - nextPosition.c) === 2) && (Math.abs(nextPosition.r - initialPosition.r) === 2)) {
            const midI = (initialPosition.r + nextPosition.r) / 2;
            const midJ = (initialPosition.c + nextPosition.c) / 2;
            if (currentPiece === player1 || currentPiece === king1 && playground[midI][midJ] === player2 || playground[midI][midJ] === king2) {
                redCut.push(player2);
            }
            else if (currentPiece === player2 || currentPiece === king2 && playground[midI][midJ] === player1 || playground[midI][midJ] === king1) {
                goldCut.push(player1);
            }
            newPlayground[midI][midJ] = empty;
        }
        setPlayground(newPlayground);
        checkWin();
    }

    const checkPossibleCutMove = (initialPosition) => {
        let ways = [];
        if (playground[initialPosition.r][initialPosition.c] === player1) {
            ways = [[-2, -2], [-2, 2]];
        }
        else if (playground[initialPosition.r][initialPosition.c] === player2) {
            ways = [[2, -2], [2, 2]];
        }
        else if (playground[initialPosition.r][initialPosition.c] === king1 || playground[initialPosition.r][initialPosition.c] === king2) {
            ways = [[-2, -2], [-2, 2], [2, -2], [2, 2]];
        }
        for (let [nr, nc] of ways) {
            if ((initialPosition.r + nr) >= 0 && (initialPosition.r + nr) < size &&
                (initialPosition.c + nc) >= 0 && (initialPosition.c + nc) < size) {
                const nextPosition = { r: initialPosition.r + nr, c: initialPosition.c + nc };
                const { validMove, cutMove } = checkMove(initialPosition, nextPosition);
                if (validMove && cutMove) {
                    return true;
                }
            }
        }
        return false;
    }

    if (col === player1 || col === king1) {
        bgPlayer = "bg-red-800 border-red-950";
    }
    else if (col === player2 || col === king2) {
        bgPlayer = "bg-yellow-600 border-yellow-900";
    }
    if (selected?.r === i && selected?.c === j) {
        showSelected = "border-2 border-dotted border-cyan-500"
    }

    const getPossibleMoves = (initialPosition) => {
        const possibleMoves = [];

        let ways = [];
        if (playground[initialPosition.r][initialPosition.c] === player1) {
            ways = [[-1, -1], [-1, 1]];
        }
        else if (playground[initialPosition.r][initialPosition.c] === player2) {
            ways = [[1, -1], [1, 1]];
        }
        else if (playground[initialPosition.r][initialPosition.c] === king1 || playground[initialPosition.r][initialPosition.c] === king2) {
            ways = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
        }
        for (let [dr, dc] of ways) {
            const nextPosition = { r: initialPosition.r + dr, c: initialPosition.c + dc };
            const cutPosition = { r: initialPosition.r + 2 * dr, c: initialPosition.c + 2 * dc };
            if (nextPosition.r >= 0 && nextPosition.r < size && nextPosition.c >= 0 && nextPosition.c < size) {
                const { validMove } = checkMove(initialPosition, nextPosition);
                if (validMove) {
                    possibleMoves.push(nextPosition);
                }
            }
            if (cutPosition.r >= 0 && cutPosition.r < size && cutPosition.c >= 0 && cutPosition.c < size) {
                const { validMove, cutMove } = checkMove(initialPosition, cutPosition);
                if (validMove && cutMove) {
                    possibleMoves.push(cutPosition);
                }
            }
        }

        return possibleMoves;
    };




    if (computerMove) {
        if (playerTurn === player2) {
            const i1 = Math.floor(Math.random() * size);
            const j1 = Math.floor(Math.random() * size);
            const i2 = Math.floor(Math.random() * size);
            const j2 = Math.floor(Math.random() * size);
            handleClick(i1, j1);
            handleClick(i2, j2);
        }
    }

    if (possibleMoves.some(move => move.r === i && move.c === j)) {
        bgCell = "bg-green-500";
    }

    return (
        <CellContext.Provider value={{ bgCell, bgPlayer, selected, showSelected, handleClick, j, i, empty, king1, king2 }}>
            {children}
        </CellContext.Provider>
    );
};

export default CellContextProvider;