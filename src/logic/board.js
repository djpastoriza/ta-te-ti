import { WINNER_CONBINATIONS, TURNS } from "../constants";

export const checkWinner = (boardChecked) => {
    for (const combo of WINNER_CONBINATIONS) {
        const [a, b, c] = combo;
        if (
            boardChecked[a] &&
            boardChecked[a] === boardChecked[b] &&
            boardChecked[a] === boardChecked[c]
        ) {
            return boardChecked[a];
        }
    }
};

export const checkEndGame = (boardChecked) => {
    return !boardChecked.includes(null);
};