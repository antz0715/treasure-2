// Set up the game's main variables
const gridSize = 6; // Defines the size of the game grid - a 6x6 grid means we have 36 cells to play with.
const treasureCount = 4; // This is the number of treasures hidden on the grid that players need to find.
let map = []; // This array will hold information about what's in each cell of the grid (empty or treasure).
let treasuresFound = 0; // Keeps track of how many treasures the player has found so far.
let totalClicks = 0; // Counts how many cells the player has clicked on. It's like a score of how many tries it took to find all treasures.

// This function prepares the game board for playing.
function generateMap() {
    let gridElement = document.getElementById('grid'); // This finds the HTML element where our game grid will be displayed.
    gridElement.innerHTML = ''; // Clears out any existing elements in our game grid, useful for resetting the game.

    // Creating the grid cells using nested loops.
    // The outer loop (i) creates rows, and the inner loop (j) fills those rows with cells.
    for (let i = 0; i < gridSize; i++) {
        map[i] = []; // Prepares this row in our 'map' array to hold cell data.
        for (let j = 0; j < gridSize; j++) {
            map[i][j] = ' '; // Marks this cell as empty to start with.
            let cell = document.createElement('div'); // Creates the visual representation of a cell.
            
            cell.className = 'cell'; // Adds CSS styling to make it look like a grid cell.
            cell.id = `cell-${i}-${j}`; // Gives a unique ID based on its row and column—helps us find it again later.
            
            cell.addEventListener('click', function() { cellClicked(i, j); }); // Makes the cell respond to mouse clicks. When clicked, it will run the 'cellClicked' function.

            gridElement.appendChild(cell); // Adds this newly created cell to our grid on the webpage.
        }
    }

    // Hiding treasures in random cells
    for (let i = 0; i < treasureCount; i++) {
        let x, y;
        do {
            x = Math.floor(Math.random() * gridSize); // Picks a random row for the treasure.
            y = Math.floor(Math.random() * gridSize); // Picks a random column for the treasure.
        } while (map[x][y] === 'T'); // Keeps picking new spots if we've already placed a treasure here.

        map[x][y] = 'T'; // Places a treasure in this random cell.
    }
}

// Responds to clicks on each cell
function cellClicked(x, y) {
    totalClicks++; // Every click on a cell increases our click count.
    const cell = document.getElementById(`cell-${x}-${y}`); // Finds the clicked cell in the grid.

    if (map[x][y] === 'T') { // Checks if the clicked cell hides a treasure.
        cell.innerText = 'T'; // Reveals the treasure by showing a 'T'.
        treasuresFound++; // Increases our found treasure count.
        alert('You found a treasure!'); // Lets the player know they've found a treasure.

        if (treasuresFound === treasureCount) { // Checks if all treasures have been found.
            alert(`Congratulations! You found all the treasures in ${totalClicks} clicks!`); // Celebrates the win.
            
        }
    } else {
        cell.innerText = 'X'; // Marks cells without treasure as checked.
        cell.style.backgroundColor = '#f0f0f0'; // Changes the background to show it's been clicked.
    }

    cell.style.pointerEvents = 'none'; // Prevents any more clicks on this cell.
}

// Sets up and starts a new game
function startGame() {
    treasuresFound = 0; // Resets the count of found treasures.
    totalClicks = 0; // Resets the click counter.
    generateMap(); // Calls generateMap to create a new game grid.
}
