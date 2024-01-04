import { Cube } from "./modules/cube.js";

const empty = ['', '', '', '', '', '', '', '', ''];
const uFace = empty.map((_, i) => document.querySelector(`#u${i}`));
const lFace = empty.map((_, i) => document.querySelector(`#l${i}`));
const fFace = empty.map((_, i) => document.querySelector(`#f${i}`));
const rFace = empty.map((_, i) => document.querySelector(`#r${i}`));
const bFace = empty.map((_, i) => document.querySelector(`#b${i}`));
const dFace = empty.map((_, i) => document.querySelector(`#d${i}`));

const NUM_SCRAMBLE_MOVES = 20;
let gLock = false;

const scrambleButton = document.getElementById('scramble-btn');
const reverseButton = document.getElementById('reverse-btn');
const resetButton = document.getElementById('reset-btn');

const uButton = document.getElementById('u-btn');
const lButton = document.getElementById('l-btn');
const fButton = document.getElementById('f-btn');
const rButton = document.getElementById('r-btn');
const bButton = document.getElementById('b-btn');
const dButton = document.getElementById('d-btn');

const cube = new Cube();

/**
 * Use this function when you want to lock the global lock before calling a certain function.
 * @param {function} f The function to be called after the global lock has been locked.
 */
const lock = function (f) {
    if (!gLock) {
        gLock = true;
        f();
        gLock = false;
    } else {
        console.log("Locked");
    }
}

/**
 * Changes a sticker's colour by replacing its old class with a new class.
 * @param {HTMLElement} sticker The sticker to be changed.
 * @param {string} colour The colour to change it to.
 */
function replaceSticker(sticker, colour) {
    const og = sticker.className;
    sticker.classList.replace(og, colour);
}

/**
 * Replaces all of the stickers in face with the colours in newFace.
 * @param {string[]} face The face to be changed.
 * @param {string[]} newFace A list of colours to replace the old face.
 */
function replaceFace(face, newFace) {
    for (let i = 0; i < 9; i++) {
        replaceSticker(face[i], newFace[i]);
    }
}

/**
 * Re-renders the cube on the screen based on newCube.
 * @param {Cube} newCube The cube to be rendered on the screen.
 */
function renderCube(newCube) {
    replaceFace(uFace, newCube.u);
    replaceFace(lFace, newCube.l);
    replaceFace(fFace, newCube.f);
    replaceFace(rFace, newCube.r);
    replaceFace(bFace, newCube.b);
    replaceFace(dFace, newCube.d);
}

document.addEventListener('keypress', function (event) {
    const key = event.key.toUpperCase();
    lock(() => {
        const validKeys = ["U", "L", "F", "R", "B", "D"];
        if (validKeys.includes(key)) {
            const move = event.shiftKey ? key + "'" : key;
            cube.sequence([move], false);
            renderCube(cube);
        }
    });
});

/**
 * Performs n random moves on the cube and renders the moves on the screen.
 * @param {*} n The number of random moves to be performed.
 */
function scramble(n) {
    for (let i = 0; i < n; i++) {
        let move = cube.getRandomMove();
        cube.sequence([move], false);
        renderCube(cube);
    }
}

scrambleButton.addEventListener('click', () => {
    lock(() => scramble(NUM_SCRAMBLE_MOVES));
});

reverseButton.addEventListener('click', () => {
    const move = cube.getReverseLastMove();
    lock(() => {
        cube.sequence([move], true);
        renderCube(cube);
    })
});

resetButton.addEventListener('click', () => {
    lock(() => {
        cube.reset();
        renderCube(cube);
    })
});

uButton.addEventListener('click', () => {
    lock(() => {
        cube.U(1);
        renderCube(cube);
    })
})

lButton.addEventListener('click', () => {
    lock(() => {
        cube.L(1);
        renderCube(cube);
    })
});

fButton.addEventListener('click', () => {
    lock(() => {
        cube.F(1);
        renderCube(cube);
    })
});

rButton.addEventListener('click', () => {
    lock(() => {
        cube.R(1);
        renderCube(cube);
    })
});

bButton.addEventListener('click', () => {
    lock(() => {
        cube.B(1);
        renderCube(cube);
    })
});

dButton.addEventListener('click', () => {
    lock(() => {
        cube.D(1);
        renderCube(cube);
    })
});
