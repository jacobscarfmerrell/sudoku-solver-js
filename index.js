// define function to deliver cross product

function cross(rows, cols) {
  const squares = [];
  rows.forEach(row => cols.forEach(col => squares.push(row + col)));
  return squares;
}

const columns = "123456789".split(""),
  digits = columns;
const rows = "ABCDEFGHI".split("");
const squareNames = cross(rows, columns);

function makeSquare(square) {
  const unitList = (function() {
    const unitsFromNineSquare = [];
    ["ABC", "DEF", "GHI"].forEach(rs =>
      ["123", "456", "789"].forEach(cs =>
        unitsFromNineSquare.push(cross(rs.split(""), cs.split("")))
      )
    );

    return [
      ...columns.map(c => cross(rows, [c])),
      ...rows.map(r => cross([r], columns)),
      ...unitsFromNineSquare
    ];
  })();

  function getUnitsOfSquare(square) {
    return unitList.filter(candidate => candidate.includes(square));
  }
  function getPeersOfSquare(square) {
    return [...new Set(getUnitsOfSquare(square).flat(1))];
  }
  function getCandidatesForSquare(square) {
    const peers = getPeersOfSquare(square);

    return digits.filter(digit =>
      peers.some(peer => peer.includes(digit))
    );
  }

  return {
    candidates: getCandidatesForSquare(square),
    peers: getPeersOfSquare(square),
    units: getUnitsOfSquare(square)
  };
}

const EMPTY_GRID = squareNames.reduce(
  (acc, square) => ({
    ...acc,
    [square]: makeSquare(square)
  }),
  {}
);

