class MovingGrid {
    static MOVE_LEFT = "left";
    static MOVE_RIGHT = "right";
    static STOP = "stop";

    #cells;
    #cellSize;

    #direction = MovingGrid.STOP;

    constructor(cellSize) {
        this.#cellSize = cellSize;
        this.#createEmptyGrid();
    }

    /**
     * Creates a 2D array with all the cells initially set to null (empty)
     */
    #createEmptyGrid() {
        // if the cell size doesn't fit perfectly in the dimensions of the canvas, the last row / col will extend off the canvas
        const numRows = Math.ceil(height / this.#cellSize); 
        const numCols = Math.ceil(width / this.#cellSize);
        this.#cells = [];
        for (let row = 0; row < numRows; row++) {
            this.#cells[row] = []; // add an empty row
            for (let col = 0; col < numCols; col++) {
                // Set each cell on the row to false to start with
                this.#cells[row][col] = false;
            }
        }
    }

    /**
     * Gets the x offset of the grid.
     * @returns {number}
     */
    getOffsetX() {
        return 0;
    }


    /**
     * Gets the size of cells in the grid.
     * @returns {number}
     */
    getCellSize() {
        return this.#cellSize;
    }


    /**
     * Sets the direction of movement
     * @param {string} newDirection A string corresponding to one of the static direction variables above
     */
    setDirection(newDirection) {
        this.#direction = newDirection;
    }


    /**
     * Add a stationary grid object to the grid. Assumes that obstacles are square / rectangular
     * A more complex algorithm would be needed for irregular shapes.
     * @param {StationaryGridObject} obstacle 
     */
    addToGrid(obstacle) {
        for (let col = obstacle.getCol(); col < obstacle.getCol() + obstacle.getColSpan(); col++) {
            for (let row = obstacle.getRow(); row < obstacle.getRow() + obstacle.getRowSpan(); row++) {
                this.#cells[row][col] = true;
            }
        }
    }


    /**
     * Checks if the grid cell that contains the coordinate is occupied
     * @param {number} x 
     * @param {number} y 
     * @returns {boolean} True if there is an obstacle in the cell, false otherwise
     */
    isOccupied(x, y) {
        // If the coordinate is out of bounds of the grid, return false (it should be possible for the player to fall off screen)
        if (x < 0 || x >= width || y < 0 || y >= height) {
            return false;
        }
        const row = this.#getIndexOfCoord(y, 0);
        const col = this.#getIndexOfCoord(x, 0);
        return this.#cells[row][col];
    }


    /**
     * Convert an x or y coordinate to an array index
     * @param {number} coord One coordinate - either x or y
     * @param {number} offset The grid offset on the appropriate axis
     * @returns {number} The index of the row or col that contains the coordinate
     */
    #getIndexOfCoord(coord, offset) {
        const adjustedCoord = coord - offset;
        return Math.floor(adjustedCoord / this.#cellSize);
    }

}