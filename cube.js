class Cube {
    constructor() {
        this.u = ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'];
        this.l = ['orange', 'orange', 'orange', 'orange', 'orange', 'orange', 'orange', 'orange', 'orange'];
        this.f = ['green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green',];
        this.r = ['red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red'];
        this.b = ['blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue'];
        this.d = ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow'];
        this.prevMoves = [];
    }

    reset() {
        this.u = ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'];
        this.l = ['orange', 'orange', 'orange', 'orange', 'orange', 'orange', 'orange', 'orange', 'orange'];
        this.f = ['green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green',];
        this.r = ['red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red'];
        this.b = ['blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue'];
        this.d = ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow'];
        this.prevMoves = [];
    }

    // takes a list of moves and performs the moves on the cube
    // moves can be of the {face}{optional modifier}
    // e.g. R, F2, B'
    // If there is an invalid move (string) in the sequence, it will skip it and console.log an error message
    sequence(moves) {
        for (let i = 0; i < moves.length; i++) {
            switch (moves[i][0]) {
                case 'U':
                    if (moves[i] == 'U') {
                        this.U(1);
                        this.prevMoves.push(moves[i]);
                        break;
                    } else if (moves[i] == 'U2') {
                        this.U(2);
                        this.prevMoves.push(moves[i]);
                        break;
                    } else if (moves[i] == "U'") {
                        this.U(3);
                        this.prevMoves.push(moves[i]);
                        break;
                    } else {
                        console.log(`${moves[i]} is not a valid move`);
                        break;
                    }
                case 'L':
                    if (moves[i] == 'L') {
                        this.L(1);
                        this.prevMoves.push(moves[i]);
                        break;
                    } else if (moves[i] == 'L2') {
                        this.L(2);
                        this.prevMoves.push(moves[i]);
                        break;
                    } else if (moves[i] == "L'") {
                        this.L(3);
                        this.prevMoves.push(moves[i]);
                        break;
                    } else {
                        console.log(`${moves[i]} is not a valid move`);
                        break;
                    }
                case 'F':
                    if (moves[i] == 'F') {
                        this.F(1);
                        this.prevMoves.push(moves[i]);
                        break;
                    } else if (moves[i] == 'F2') {
                        this.F(2);
                        this.prevMoves.push(moves[i]);
                        break;
                    } else if (moves[i] == "F'") {
                        this.F(3);
                        this.prevMoves.push(moves[i]);
                        break;
                    } else {
                        console.log(`${moves[i]} is not a valid move`);
                        break;
                    }
                case 'R':
                    if (moves[i] == 'R') {
                        this.R(1);
                        this.prevMoves.push(moves[i]);
                        break;
                    } else if (moves[i] == 'R2') {
                        this.R(2);
                        this.prevMoves.push(moves[i]);
                        break;
                    } else if (moves[i] == "R'") {
                        this.R(3);
                        this.prevMoves.push(moves[i]);
                        break;
                    } else {
                        console.log(`${moves[i]} is not a valid move`);
                        break;
                    }
                case 'B':
                    if (moves[i] == 'B') {
                        this.B(1);
                        this.prevMoves.push(moves[i]);
                        break;
                    } else if (moves[i] == 'B2') {
                        this.B(2);
                        this.prevMoves.push(moves[i]);
                        break;
                    } else if (moves[i] == "B'") {
                        this.B(3);
                        this.prevMoves.push(moves[i]);
                        break;
                    } else {
                        console.log(`${moves[i]} is not a valid move`);
                        break;
                    }
                case 'D':
                    if (moves[i] == 'D') {
                        this.D(1);
                        this.prevMoves.push(moves[i]);
                        break;
                    } else if (moves[i] == 'D2') {
                        this.D(2);
                        this.prevMoves.push(moves[i]);
                        break;
                    } else if (moves[i] == "D'") {
                        this.D(3);
                        this.prevMoves.push(moves[i]);
                        break;
                    } else {
                        console.log(`${moves[i]} is not a valid move`);
                        break;
                    };
                default:
                    console.log(`${moves[i]} is not a valid move`);
                    break;
            }
        }
    }

    // Picks a random move and performs it on the cube
    // Possible moves are the same as in sequence()
    randomMove() {
        const moves = ["U", "U2", "U'", "L", "L2", "L'", "F", "F2", "F'", "R", "R2", "R'", "B", "B2", "B'", "D", "D2", "D'"];
        const random = moves[(Math.floor(Math.random() * moves.length))];
        this.sequence([random]);
    }

    // reverse the last move that was done to the cube
    reverseLastMove() {
        if (this.prevMoves.length == 0) {
            return;
        }

        const lastMove = this.prevMoves.pop();
        const lastMoveFace = lastMove[0];
        const lastMoveMod = lastMove.length == 1 ? "" : lastMove[1];

        const modInverse = {};
        modInverse[""] = "'";
        modInverse["'"] = "";
        modInverse["2"] = "2";

        const reverseMove = lastMoveFace + modInverse[lastMoveMod];
        this.sequence([reverseMove]);
        this.prevMoves.pop();
    }

    // returns the nth row from face
    // returns nothing if n is not 0, 1, or 2
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

    // returns the nth column from face
    // returns nothing if n is not 0, 1, or 2
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

    // replaces row n in face with repl
    // if flip is true, repl will be flipped before replacing row n
    // returns a new list (face)
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

    // replaces column n in face with repl
    // if flip is true, repl will be flipped before replacing column n
    // returns a new list (face)
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

    // rotates a face 90 degrees n times
    // 0 --> 2 // 1 --> 5 // 2 --> 8 // 3 --> 1 // 4 --> 4 // 5 --> 7 // 6 --> 0 // 7 --> 3 // 8 --> 6//
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

const uFace = [];
const lFace = [];
const fFace = [];
const rFace = [];
const bFace = [];
const dFace = [];

uFace.push(document.querySelector('#u0'));
uFace.push(document.querySelector('#u1'));
uFace.push(document.querySelector('#u2'));
uFace.push(document.querySelector('#u3'));
uFace.push(document.querySelector('#u4'));
uFace.push(document.querySelector('#u5'));
uFace.push(document.querySelector('#u6'));
uFace.push(document.querySelector('#u7'));
uFace.push(document.querySelector('#u8'));

lFace.push(document.querySelector('#l0'));
lFace.push(document.querySelector('#l1'));
lFace.push(document.querySelector('#l2'));
lFace.push(document.querySelector('#l3'));
lFace.push(document.querySelector('#l4'));
lFace.push(document.querySelector('#l5'));
lFace.push(document.querySelector('#l6'));
lFace.push(document.querySelector('#l7'));
lFace.push(document.querySelector('#l8'));

fFace.push(document.querySelector('#f0'));
fFace.push(document.querySelector('#f1'));
fFace.push(document.querySelector('#f2'));
fFace.push(document.querySelector('#f3'));
fFace.push(document.querySelector('#f4'));
fFace.push(document.querySelector('#f5'));
fFace.push(document.querySelector('#f6'));
fFace.push(document.querySelector('#f7'));
fFace.push(document.querySelector('#f8'));

rFace.push(document.querySelector('#r0'));
rFace.push(document.querySelector('#r1'));
rFace.push(document.querySelector('#r2'));
rFace.push(document.querySelector('#r3'));
rFace.push(document.querySelector('#r4'));
rFace.push(document.querySelector('#r5'));
rFace.push(document.querySelector('#r6'));
rFace.push(document.querySelector('#r7'));
rFace.push(document.querySelector('#r8'));

bFace.push(document.querySelector('#b0'));
bFace.push(document.querySelector('#b1'));
bFace.push(document.querySelector('#b2'));
bFace.push(document.querySelector('#b3'));
bFace.push(document.querySelector('#b4'));
bFace.push(document.querySelector('#b5'));
bFace.push(document.querySelector('#b6'));
bFace.push(document.querySelector('#b7'));
bFace.push(document.querySelector('#b8'));

dFace.push(document.querySelector('#d0'));
dFace.push(document.querySelector('#d1'));
dFace.push(document.querySelector('#d2'));
dFace.push(document.querySelector('#d3'));
dFace.push(document.querySelector('#d4'));
dFace.push(document.querySelector('#d5'));
dFace.push(document.querySelector('#d6'));
dFace.push(document.querySelector('#d7'));
dFace.push(document.querySelector('#d8'));

let GLOBAL_LOCK = false;
let MOVE_DELAY = 50;
let NUM_SCRAMBLE_MOVES = 20;

function replaceSticker(sticker, colour) {
    const og = sticker.className;
    sticker.classList.replace(og, colour);
}

function replaceFace(face, newFace) {
    for (let i = 0; i < 9; i++) {
        replaceSticker(face[i], newFace[i]);
    }
}

function renderCube(newCube) {
    replaceFace(uFace, newCube.u);
    replaceFace(lFace, newCube.l);
    replaceFace(fFace, newCube.f);
    replaceFace(rFace, newCube.r);
    replaceFace(bFace, newCube.b);
    replaceFace(dFace, newCube.d);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function scramble(n) {
    GLOBAL_LOCK = true;
    for (let i = 0; i < n; i++) {
        cube.randomMove();
        renderCube(cube);
        await sleep(MOVE_DELAY);
    }
    GLOBAL_LOCK = false;
}

async function solve(n) {
    GLOBAL_LOCK = true;
    for (let i = 0; i < n; i++) {
        cube.reverseLastMove();
        renderCube(cube);
        await sleep(MOVE_DELAY);
    }
    GLOBAL_LOCK = false;
}

const cube = new Cube();

const infoDiv = document.getElementById('info');

document.addEventListener('keypress', function (event) {
    const key = event.key;
    const validKeys = ["u", "l", "f", "r", "b", "d"];
    if (validKeys.includes(key)) {
        const move = event.shiftKey ? key.toUpperCase() + "'" : key.toUpperCase();
        cube.sequence([move]);
        renderCube(cube);
        infoDiv.innerHTML = "Last move: " + move;
    }
});

const scrambleButton = document.getElementById('scramble-btn');
const solveButton = document.getElementById('solve-btn');
const randomMoveButton = document.getElementById('random-move-btn');
const reverseButton = document.getElementById('reverse-btn');
const resetButton = document.getElementById('reset-btn');

scrambleButton.addEventListener('click', () => {
    if (!GLOBAL_LOCK) {
        scramble(NUM_SCRAMBLE_MOVES);
    } else {
        console.log("Locked");
    }
});
solveButton.addEventListener('click', () => {
    const n = cube.prevMoves.length;
    if (!GLOBAL_LOCK) {
        solve(n);
    } else {
        console.log("Locked");
    }
});
randomMoveButton.addEventListener('click', () => {
    cube.randomMove();
    renderCube(cube);
});
reverseButton.addEventListener('click', () => {
    cube.reverseLastMove();
    renderCube(cube);
});
resetButton.addEventListener('click', () => {
    cube.reset();
    renderCube(cube);
    infoDiv.innerHTML = "";
});
