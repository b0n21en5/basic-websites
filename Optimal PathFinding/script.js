const gridContainer = document.getElementById("grid-container");
let currentMode = "obstacle";

let startCell = null;
let endCell = null;
let obstacleCells = [];

const gridSize = 10;
const grid = [];

for (let row = 0; row < gridSize; row++) {
  const newRow = [];
  for (let col = 0; col < gridSize; col++) {
    newRow.push(0);
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.row = row;
    cell.dataset.col = col;

    gridContainer.appendChild(cell);
  }
  grid.push(newRow);
}

// Function to change cell appearance based on current mode
function updateCellAppearance(cell) {
  cell.className = "cell";
  cell.classList.add(currentMode);
}

// Function to handle hover effect
function updateCellMouseHover(cell) {
  if (
    !cell.className.includes("start") ||
    !cell.className.includes("end") ||
    !cell.className.includes("obstacle")
  ) {
    switch (currentMode) {
      case "start":
        cell.classList.add("hover-start");
        break;
      case "end":
        cell.classList.add("hover-end");
        break;
      case "obstacle":
        cell.classList.add("hover-obstacle");
        break;
      default:
        break;
    }
  }
}

// Function to handle Cell Clicks
function handleCellClick(cell) {
  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);

  const cellPosition = { row, col };

  // Check the current mode and handle accordingly
  switch (currentMode) {
    case "start":
      if (endCell && row === endCell.row && col === endCell.col) {
        return;
      }

      // Set as start cell if not added to obstacle cells
      const isInObstacleIndex = obstacleCells.findIndex(
        (pos) => pos.row === row && pos.col === col
      );

      if (isInObstacleIndex !== -1) {
        return;
      }

      //Remove start from previous startcell (if any)
      if (startCell) {
        const prevStartCell = document.querySelector(
          `[data-row="${startCell.row}"][data-col="${startCell.col}"]`
        );
        prevStartCell.classList.remove("start");
      }

      // Add start class to new startCell
      startCell = cellPosition;
      const currStartCell = document.querySelector(
        `[data-row="${startCell.row}"][data-col="${startCell.col}"]`
      );
      currStartCell.classList.add("start");

      updateCellAppearance(cell);

      break;

    case "end":
      if (startCell && row == startCell.row && col == startCell.col) {
        return;
      }

      // Set as end cell if not added to obstacle cells
      const isAddedObstacleIndex = obstacleCells.findIndex(
        (pos) => pos.row === row && pos.col === col
      );

      if (isAddedObstacleIndex !== -1) {
        return;
      }

      //Remove end from previous endCell (if any)
      if (endCell) {
        const prevEndCell = document.querySelector(
          `[data-row="${endCell.row}"][data-col="${endCell.col}"]`
        );
        prevEndCell.classList.remove("end");
      }
      // Add end class to new endcell
      endCell = cellPosition;
      const currEndCell = document.querySelector(
        `[data-row="${endCell.row}"][data-col="${endCell.col}"]`
      );
      currEndCell.classList.add("end");

      updateCellAppearance(cell);

      break;

    case "obstacle":
      // Add cell if previously not selected as start or end cell
      if (
        (startCell && startCell.row === row && startCell.col === col) ||
        (endCell && endCell.row === row && endCell.col === col)
      ) {
        return;
      }

      // Add cell if not already added to obstacle cells
      const existingObstacleIndex = obstacleCells.findIndex(
        (pos) => pos.row === row && pos.col === col
      );

      if (existingObstacleIndex === -1) {
        obstacleCells.push(cellPosition);

        updateCellAppearance(cell);
      }

      break;

    default:
      break;
  }
}

// Add event listeners to handle cell clicks
const allCells = document.querySelectorAll(".cell");
allCells.forEach((cell) => {
  cell.addEventListener("click", () => {
    handleCellClick(cell);
  });

  cell.addEventListener("mouseenter", () => {
    updateCellMouseHover(cell);
  });

  cell.addEventListener("mouseleave", () => {
    cell.classList.remove("hover-start", "hover-end", "hover-obstacle");
  });
});

// Method to reset all cells
function resetEverything() {
  currentMode = "obstacle";
  startCell = null;
  endCell = null;
  obstacleCells = [];
  allCells.forEach((cell) => {
    cell.className = "cell";
  });
}

// Function to find the Best Path
function findBestPath(grid, startCell, endCell, CELL_OBSTACLE) {
  const rows = grid.length;
  const cols = grid[0].length;

  // Initialize memoization table with infinity distances
  const memo = new Array(rows)
    .fill(null)
    .map(() => new Array(cols).fill(Infinity));

  // Find the start and end cells
  const startRow = startCell.row;
  const startCol = startCell.col;
  const endRow = endCell.row;
  const endCol = endCell.col;
  memo[startRow][startCol] = 0;

  // Define directions for moving (up, down, left, right)
  const directions = [
    [-1, 0], // up
    [1, 0], // down
    [0, -1], // left
    [0, 1], // right
  ];

  // Priority queue for Dijkstra's algorithm
  const queue = [[startRow, startCol]];

  while (queue.length > 0) {
    const [currRow, currCol] = queue.shift();

    // Check if the current cell is the end cell
    if (currRow === endRow && currCol === endCol) {
      break; // Found the best path, stop exploring
    }

    for (const [dr, dc] of directions) {
      const newRow = currRow + dr;
      const newCol = currCol + dc;

      // Check if the new cell is within the grid bounds and not an obstacle
      if (
        newRow >= 0 &&
        newRow < rows &&
        newCol >= 0 &&
        newCol < cols &&
        grid[newRow][newCol] !== CELL_OBSTACLE
      ) {
        // Calculate the distance from the start cell to the new cell
        const distanceFromStart = memo[currRow][currCol] + 1;

        // If the new distance is smaller, update the memoization table and add the new cell to the queue
        if (distanceFromStart < memo[newRow][newCol]) {
          memo[newRow][newCol] = distanceFromStart;
          queue.push([newRow, newCol]);
        }
      }
    }
  }

  // Check if there's a valid path from the start to the end cell
  if (memo[endRow][endCol] !== Infinity) {
    // Backtrace the best path from the end cell to the start cell
    let currentRow = endRow;
    let currentCol = endCol;
    const bestPath = [];

    while (currentRow !== startRow || currentCol !== startCol) {
      bestPath.unshift([currentRow, currentCol]);

      // Find the neighbor with the smallest distance to backtrack
      for (const [dr, dc] of directions) {
        const newRow = currentRow + dr;
        const newCol = currentCol + dc;

        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
          if (memo[newRow][newCol] === memo[currentRow][currentCol] - 1) {
            currentRow = newRow;
            currentCol = newCol;
            break;
          }
        }
      }
    }

    // Add the start cell to the best path
    bestPath.unshift([startRow, startCol]);

    return bestPath;
  } else {
    // There's no valid path from the start to the end cell
    return null;
  }
}

// Function to highlight best-path on the dom
function highlightBestPath(bestPath) {
  for (let i = 1; i < bestPath.length - 1; i++) {
    const cell = document.querySelector(
      `[data-row="${bestPath[i][0]}"][data-col="${bestPath[i][1]}"]`
    );
    cell.classList.add("best-path");
  }
}

// Event listeners for all buttons
const generatePathBtn = document.getElementById("generate-path-btn");
generatePathBtn.addEventListener("click", () => {
  if (startCell && endCell) {
    for (const obstacle of obstacleCells) {
      grid[obstacle.row][obstacle.col] = 1;
    }
    const CELL_OBSTACLE = 1;
    const gridCopy = grid;
    const bestPath = findBestPath(gridCopy, startCell, endCell, CELL_OBSTACLE);

    if (bestPath) {
      highlightBestPath(bestPath);
    } else {
      alert("There's No Valid Path");
    }
  } else {
    alert('Please Select Start and End Cell"s');
  }
});

const startBtn = document.getElementById("set-start-btn");
startBtn.addEventListener("click", () => {
  currentMode = "start";
});

const endBtn = document.getElementById("set-end-btn");
endBtn.addEventListener("click", () => {
  currentMode = "end";
});

const obstacleBtn = document.getElementById("set-obstacle-btn");
obstacleBtn.addEventListener("click", () => {
  currentMode = "obstacle";
});

const clearAllBtn = document.getElementById("clear-all-btn");
clearAllBtn.addEventListener("click", () => {
  resetEverything();
});
