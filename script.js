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

const infoDiv = document.getElementById('info');
const scrambleButton = document.getElementById('scramble-btn');
const solveButton = document.getElementById('solve-btn');
const reverseButton = document.getElementById('reverse-btn');
const resetButton = document.getElementById('reset-btn');

const cube = new Cube();

const lock = function (f) {
    if (!gLock) {
        gLock = true;
        f();
        gLock = false;
    } else {
        console.log("Locked");
    }
}

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

function solve() {
    const n = cube.prevMoves.length;
    for (let i = 0; i < n; i++) {
        let move = cube.getReverseLastMove();
        cube.sequence([move], true);
        renderCube(cube);
    }
}

solveButton.addEventListener('click', () => {
    lock(() => solve());
});

reverseButton.addEventListener('click', () => {
    const move = cube.getReverseLastMove();
    lock(() => {
        cube.sequence([move], true);
        renderCube();
    })
});

resetButton.addEventListener('click', () => {
    lock(() => {
        cube.reset();
        renderCube(cube);
    })
});
