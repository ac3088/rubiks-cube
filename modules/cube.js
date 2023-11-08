class Cube {
    constructor() {
        this.u = ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'];
        this.l = ['orange', 'orange', 'orange', 'orange', 'orange', 'orange', 'orange', 'orange', 'orange'];
        this.f = ['green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green',];
        this.r = ['red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red'];
        this.b = ['blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue'];
        this.d = ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow'];
        this.validMoves = {
            "U": 1,
            "U'": 1,
            "U2": 1,
            "L": 1,
            "L'": 1,
            "L2": 1,
            "F": 1,
            "F'": 1,
            "F2": 1,
            "R": 1,
            "R'": 1,
            "R2": 1,
            "B": 1,
            "B'": 1,
            "B2": 1,
            "D": 1,
            "D'": 1,
            "D2": 1,
        };
        this.prevMoves = [];
    }

    /**
     * Resets the cube back to its initial state (solved and no previous moves).
     */
    reset() {
        this.u = ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'];
        this.l = ['orange', 'orange', 'orange', 'orange', 'orange', 'orange', 'orange', 'orange', 'orange'];
        this.f = ['green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green',];
        this.r = ['red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red'];
        this.b = ['blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue'];
        this.d = ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow'];
        this.prevMoves = [];
    }

    /**
     * Takes a list of moves and performs them on the cube one by one.
     * Valid moves are defiend in this.prevMoves.
     * If an invalid move is encountered in the list it will be ignored.
     * @param {string[]} moves List of moves to be performed on the cube.
     * @param {boolean} undo True if the move is an 'undo' (i.e. move was gotten from getReverseLastMove).
     */
    sequence(moves, undo) {
        for (let i = 0; i < moves.length; i++) {
            let currentMove = moves[i];
            if (this.validMoves[currentMove] != null) {
                switch (currentMove) {
                    case "U":
                        this.U(1);
                        break;
                    case "U'":
                        this.U(3);
                        break;
                    case "U2":
                        this.U(2);
                        break;
                    case "L":
                        this.L(1);
                        break;
                    case "L'":
                        this.L(3);
                        break;
                    case "L2":
                        this.L(2);
                        break;
                    case "F":
                        this.F(1);
                        break;
                    case "F'":
                        this.F(3);
                        break;
                    case "F2":
                        this.F(2);
                        break;
                    case "R":
                        this.R(1);
                        break;
                    case "R'":
                        this.R(3);
                        break;
                    case "R2":
                        this.R(2);
                        break;
                    case "B":
                        this.B(1);
                        break;
                    case "B'":
                        this.B(3);
                        break;
                    case "B2":
                        this.B(2);
                        break;
                    case "D":
                        this.D(1);
                        break;
                    case "D'":
                        this.D(3);
                        break;
                    case "D2":
                        this.D(2);
                        break;
                    default:
                        break;
                }
                if (undo) {
                    this.prevMoves.pop();
                } else {
                    this.prevMoves.push(currentMove);
                }
            } else {
                console.log(`${currentMove} is not a valid move`);
            }
        }
    }

    /**
     * Chooses and returns a random move chosen from this.validMoves.
     * @returns {string} A random move from this.validMoves.
     */
    getRandomMove() {
        const moves = Object.keys(this.validMoves);
        const random = moves[(Math.floor(Math.random() * moves.length))];
        return random;
    }

    /**
     * Uses the last move in this.prevMoves to determine the reverse of that move
     * and then returns it.
     * The moves returned by this function are essentially 'undo' moves.
     * @returns {string} The reverse/undo of the last move done to the cube.
     */
    getReverseLastMove() {
        const n = this.prevMoves.length;

        if (n == 0) {
            return;
        }

        const lastMove = this.prevMoves[n - 1];
        const lastMoveFace = lastMove[0];
        const lastMoveMod = lastMove.length == 1 ? "" : lastMove[1];

        const modInverse = {};
        modInverse[""] = "'";
        modInverse["'"] = "";
        modInverse["2"] = "2";

        const reverseMove = lastMoveFace + modInverse[lastMoveMod];
        return reverseMove;
    }

    /**
     * Returns the nth row of face.
     * The returned array is a newly-constructed array.
     * If n is not 0, 1, or 2 nothing will be returned.
     * @param {string[]} face The face from which the row will be taken. (e.g. this.u)
     * @param {number} n The row to return. Must be 0, 1, or 2.
     * @returns A new array containing the values (colours) of the nth row of face.
     */
    getRow(face, n) {
        switch (n) {
            case 0:
                return [face[0], face[1], face[2]];
            case 1:
                return [face[3], face[4], face[5]];
            case 2:
                return [face[6], face[7], face[8]];
            default:
                return;
        }
    }

    /**
     * Returns the nth column of face.
     * The returned array is a newly-constructed array.
     * If n is not 0, 1, or 2 nothing will be returned.
     * @param {string[]} face The face from which the column will be taken. (e.g. this.u)
     * @param {number} n The column to return. Must be 0, 1, or 2.
     * @returns A new array containing the values (colours) of the nth column of face.
     */
    getCol(face, n) {
        switch (n) {
            case 0:
                return [face[0], face[3], face[6]];
            case 1:
                return [face[1], face[4], face[7]];
            case 2:
                return [face[2], face[5], face[8]];
            default:
                return;
        }
    }

    /**
     * Constructs and returns a new array using face but replaces row n with repl.
     * Returns nothing if n is not 0, 1, or 2.
     * @param {string[]} face The face whose row is gonig to be replaced (e.g. this.u).
     * @param {number} n The row number to be replaced. Must be 0, 1, or 2.
     * @param {string[]} repl A list of three values (colours) that will replace row n in face.
     * @param {boolean} flip If flip is true, the order of elements in repl will be reversed before replacement.
     * @returns A new array with row n in face replaced with repl.
     */
    replaceRow(face, n, repl, flip) {
        let newRow = [...face];
        switch (n) {
            case 0:
                newRow[0] = flip ? repl[2] : repl[0];
                newRow[1] = repl[1];
                newRow[2] = flip ? repl[0] : repl[2];
                return newRow;
            case 1:
                newRow[3] = flip ? repl[2] : repl[0];
                newRow[4] = repl[1];
                newRow[5] = flip ? repl[0] : repl[2];
                return newRow;
            case 2:
                newRow[6] = flip ? repl[2] : repl[0];
                newRow[7] = repl[1];
                newRow[8] = flip ? repl[0] : repl[2];
                return newRow;
            default:
                return;
        }
    }

    /**
     * Constructs and returns a new array using face but replaces column n with repl.
     * Returns nothing if n is not 0, 1, or 2.
     * @param {string[]} face The face whose column is gonig to be replaced (e.g. this.u).
     * @param {number} n The column number to be replaced. Must be 0, 1, or 2.
     * @param {string[]} repl A list of three values (colours) that will replace column n in face.
     * @param {boolean} flip If flip is true, the order of elements in repl will be reversed before replacement.
     * @returns A new array with column n in face replaced with repl.
     */
    replaceCol(face, n, repl, flip) {
        let newCol = [...face];
        switch (n) {
            case 0:
                newCol[0] = flip ? repl[2] : repl[0];
                newCol[3] = repl[1];
                newCol[6] = flip ? repl[0] : repl[2];
                return newCol;
            case 1:
                newCol[1] = flip ? repl[2] : repl[0];
                newCol[4] = repl[1];
                newCol[7] = flip ? repl[0] : repl[2];
                return newCol;
            case 2:
                newCol[2] = flip ? repl[2] : repl[0];
                newCol[5] = repl[1];
                newCol[8] = flip ? repl[0] : repl[2];
                return newCol;
            default:
                return;
        }
    }

    /**
     * Constructs a new array by rotating face 90 degrees clockwise n times and then returns it.
     * @param {string[]} face The face to be rotated (e.g. this.u).
     * @param {number} n The number of times for face to be rotated 90 degrees clockwise.
     * @returns A new array representing face that has been rotated n times.
     */
    rotateFace(face, n) {
        let copy = [...face];
        let newFace = [...face];

        for (let i = 0; i < n; i++) {
            newFace[2] = copy[0]
            newFace[5] = copy[1]
            newFace[8] = copy[2]
            newFace[1] = copy[3]
            newFace[4] = copy[4]
            newFace[7] = copy[5]
            newFace[0] = copy[6]
            newFace[3] = copy[7]
            newFace[6] = copy[8]
            copy = [...newFace];
        }

        return newFace;
    }

    /**
     * Rotates the top (U) face of the cube 90 degrees clockwise n times.
     * @param {number} n The number of times to rotate the top face 90 degrees clockwise. 
     */
    U(n) {
        for (let i = 0; i < n; i++) {
            this.u = this.rotateFace(this.u, 1);

            let oldL = this.getRow(this.l, 0);
            let oldF = this.getRow(this.f, 0);
            let oldR = this.getRow(this.r, 0);
            let oldB = this.getRow(this.b, 0);

            this.r = this.replaceRow(this.r, 0, oldB, false);
            this.l = this.replaceRow(this.l, 0, oldF, false);
            this.b = this.replaceRow(this.b, 0, oldL, false);
            this.f = this.replaceRow(this.f, 0, oldR, false);
        }
    }

    /**
     * Rotates the left (L) face of the cube 90 degrees clockwise n times.
     * @param {number} n The number of times to rotate the left face 90 degrees clockwise. 
     */
    L(n) {
        for (let i = 0; i < n; i++) {
            this.l = this.rotateFace(this.l, 1);

            let oldU = this.getCol(this.u, 0);
            let oldF = this.getCol(this.f, 0);
            let oldB = this.getCol(this.b, 2);
            let oldD = this.getCol(this.d, 0);

            this.u = this.replaceCol(this.u, 0, oldB, true);
            this.f = this.replaceCol(this.f, 0, oldU, false);
            this.b = this.replaceCol(this.b, 2, oldD, true);
            this.d = this.replaceCol(this.d, 0, oldF, false);
        }
    }

    /**
     * Rotates the front (F) face of the cube 90 degrees clockwise n times.
     * @param {number} n The number of times to rotate the front face 90 degrees clockwise. 
     */
    F(n) {
        for (let i = 0; i < n; i++) {
            this.f = this.rotateFace(this.f, 1);

            let oldU = this.getRow(this.u, 2);
            let oldL = this.getCol(this.l, 2);
            let oldR = this.getCol(this.r, 0);
            let oldD = this.getRow(this.d, 0);

            this.u = this.replaceRow(this.u, 2, oldL, true);
            this.l = this.replaceCol(this.l, 2, oldD, false);
            this.r = this.replaceCol(this.r, 0, oldU, false);
            this.d = this.replaceRow(this.d, 0, oldR, true);
        }
    }

    /**
     * Rotates the right (R) face of the cube 90 degrees clockwise n times.
     * @param {number} n The number of times to rotate the right face 90 degrees clockwise. 
     */
    R(n) {
        for (let i = 0; i < n; i++) {
            this.r = this.rotateFace(this.r, 1);

            let oldU = this.getCol(this.u, 2);
            let oldF = this.getCol(this.f, 2);
            let oldB = this.getCol(this.b, 0);
            let oldD = this.getCol(this.d, 2);

            this.u = this.replaceCol(this.u, 2, oldF, false);
            this.f = this.replaceCol(this.f, 2, oldD, false);
            this.b = this.replaceCol(this.b, 0, oldU, true);
            this.d = this.replaceCol(this.d, 2, oldB, true);
        }
    }

    /**
     * Rotates the back (B) face of the cube 90 degrees clockwise n times.
     * @param {number} n The number of times to rotate the back face 90 degrees clockwise. 
     */
    B(n) {
        for (let i = 0; i < n; i++) {
            this.b = this.rotateFace(this.b, 1);

            let oldU = this.getRow(this.u, 0);
            let oldL = this.getCol(this.l, 0);
            let oldR = this.getCol(this.r, 2);
            let oldD = this.getRow(this.d, 2);

            this.u = this.replaceRow(this.u, 0, oldR, false);
            this.l = this.replaceCol(this.l, 0, oldU, true);
            this.r = this.replaceCol(this.r, 2, oldD, true);
            this.d = this.replaceRow(this.d, 2, oldL, false);
        }
    }

    /**
     * Rotates the bottom (D) face of the cube 90 degrees clockwise n times.
     * @param {number} n The number of times to rotate the bottom face 90 degrees clockwise. 
     */
    D(n) {
        for (let i = 0; i < n; i++) {
            this.d = this.rotateFace(this.d, 1);

            let oldF = this.getRow(this.f, 2);
            let oldL = this.getRow(this.l, 2);
            let oldR = this.getRow(this.r, 2);
            let oldB = this.getRow(this.b, 2);

            this.f = this.replaceRow(this.f, 2, oldL, false);
            this.l = this.replaceRow(this.l, 2, oldB, false);
            this.r = this.replaceRow(this.r, 2, oldF, false);
            this.b = this.replaceRow(this.b, 2, oldR, false);
        }
    }
}

export { Cube };