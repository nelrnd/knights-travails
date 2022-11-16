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

// get every squares a knight can move
// from every square in the chessboard
const getAllKnightMoves = () => {
  // all the moves a knight can take
  const moves = [
    { x: 1, y: 2 },
    { x: 2, y: 1 },
    { x: 2, y: -1 },
    { x: 1, y: -2 },
    { x: -1, y: -2 },
    { x: -2, y: -1 },
    { x: -2, y: 1 },
    { x: -1, y: 2 },
  ];

  // initialize a chessboard
  const chessboard = createChessboard();

  // for every square node in the chessboard
  for (const node of chessboard) {
    // get all its moves
    for (const move of moves) {
      // get new square from current square
      const newX = node.x + move.x;
      const newY = node.y + move.y;

      // find corresponding node in chessboard
      const newNode = findNode(chessboard, newX, newY);

      // if move isn't possible, skip to next move
      if (!newNode) break;

      // else, link new node to current node
      node.adjacents.push(newNode);
    }
  }

  return chessboard;
};
