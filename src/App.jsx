import { useState } from "react";
import confetti from "canvas-confetti";
import Square from "./components/Square.jsx";
import { TURNS } from "./constants.js";
import { checkWinner, checkEndGame } from "./logic/board.js";
import "./App.css";
import WinnerModal from "./components/WinnerModal.jsx";
import Board from "./components/Board.jsx";
import Turn from "./components/Turn.jsx";
import { saveGameToStorage,resetGameStorage } from "./storage/index.js";

const App = () => {
    const [board, setBoard] = useState(() => { // inicializamos con una funcion ( solo inicializa 1 vez )
        const boardFromStorage = window.localStorage.getItem("board");
        return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
    });
    const [turn, setTurn] = useState(() => { // inicializamos con una funcion ( solo inicializa 1 vez )
        const turnsFromStorage = window.localStorage.getItem("turn");
        return turnsFromStorage ? JSON.parse(turnsFromStorage) : TURNS.X;
    });
    const [winner, setWinner] = useState(null); // null no hay ganador  - false hay un empate

    const updateBoard = (index) => {
        if (board[index] || winner) return;
        const newBoard = [...board];
        // update board
        newBoard[index] = turn;
        setBoard(newBoard);
        // update turn
        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
        setTurn(newTurn);
        // save match
        saveGameToStorage({board:newBoard,turn:newTurn});
        // check winner
        const newWinner = checkWinner(newBoard);
        const boardChecked = checkEndGame(newBoard);
        if (newWinner) {
            setWinner(newWinner);
            confetti();
        } else if (boardChecked) {
            setWinner(false);
        }
    };

    const resetBoard = () => {
        setBoard(Array(9).fill(null));
        setTurn(TURNS.X);
        setWinner(null);
        resetGameStorage();
    };

    return (
        <main className="board">
            <h1>Ta te ti</h1>
            <button onClick={resetBoard}>Empezar de nuevo</button>
            <Board board={board} updateBoard={updateBoard} />
            <Turn turn={turn} />
            <WinnerModal winner={winner} resetBoard={resetBoard} />
        </main>
    );
};

export default App;
