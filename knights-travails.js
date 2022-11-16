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

// get every square a knight can move to
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

const knightMoves = (startPos, destiPos) => {
  // get chessboard with all knight moves
  const allKnightMoves = getAllKnightMoves();

  // find start and destination nodes in chessboard
  const [startX, startY] = startPos;
  const [destiX, destiY] = destiPos;
  const startNode = findNode(allKnightMoves, startX, startY);
  const destiNode = findNode(allKnightMoves, destiX, destiY);

  const queue = [startNode];
  let i = 0;

  let result;

  while (i < queue.length) {
    // for every adjacent node to current node
    for (const adjNode of queue[i].adjacents) {
      // if node isn't already present in queue
      if (!queue.find((node) => node === adjNode)) {
        // link node from its origin node
        adjNode.comingFrom = queue[i];

        if (adjNode === destiNode) {
          result = adjNode;
          break;
        } else {
          queue.push(adjNode);
        }
      }
    }
    i++;
  }

  return cleanResult(result);
};

const cleanResult = (result) => {
  const path = [];

  const getOriginNode = (result) => {
    path.unshift([result.x, result.y]);
    if (result.comingFrom) {
      getOriginNode(result.comingFrom);
    }
  };

  getOriginNode(result);

  return { path, nbOfMoves: path.length };
};
