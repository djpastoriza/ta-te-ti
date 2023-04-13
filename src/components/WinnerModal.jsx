import Square from "./Square";

const WinnerModal = ({winner,resetBoard}) => {

    if(winner === null) return null;

    const winnerText = winner === false ? "Empate" : `Gano: ${winner}`;

    return (
        <section className="winner">
            <div className="text">
                <h2>{winnerText}</h2>
                {winner && (
                    <header className="win">
                        {" "}
                        <Square>{winner}</Square>
                    </header>
                )}
                <footer>
                    <button onClick={resetBoard}>Empezar de nuevo</button>
                </footer>
            </div>
        </section>
    );
};

export default WinnerModal;
