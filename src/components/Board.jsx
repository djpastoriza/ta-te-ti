import Square from './Square'

const Board = ({board,updateBoard}) => {
  return (
    <section className="game">
    {board.map((square, index) => (
        <Square updateBoard={updateBoard} key={index} index={index}>
            {square}
        </Square>
    ))}
</section>
  )
}

export default Board