var board = Chessboard("board", {
  draggable: true,
  position: "start",
  onDragDtart,
  onDrop,
});

const game = new Chess();

function onDragDtart(_source, piece) {
    if (game.game_over()) return false;

    if (piece && piece.search(/^b/) !== -1) return false;
}
function onDrop(source, target) {
    const move = game.move({
        from: source,
        to: target,
        promotion:'q'
    });

    if (move === null) return 'snapback';
    setTimeout(makeComputerMove, 250);
}

function makeComputerMove() {
    const possibleMoves = game.moves();

    if (possibleMoves.length === 0) {
        alert('LA PARTI EST TERMINER');
        resetGame();
        return;
    };

    const randomMove = Math.floor(Math.random() * possibleMoves.length);
    game.move(possibleMoves[randomMove]);
    board.position(game.fen());
};

function resetGame() {
    game.reset();
    board.start()
};

document.getElementById('resetButton').addEventListener('click', resetGame)