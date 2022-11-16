const SquareNode = (x, y) => {
  return { x, y, adjacents: [] };
};

// initialize chessboard with its square nodes
const createChessboard = () => {
  const chessboard = [];

  // push 64 square nodes to chessboard
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      const node = SquareNode(x, y);
      chessboard.push(node);
    }
  }

  return chessboard;
};

// find a node in a chessboard with x and y
const findNode = (chessboard, x, y) => {
  return chessboard.find((node) => node.x === x && node.y === y);
};
