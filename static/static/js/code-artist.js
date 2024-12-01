const canvas = document.querySelector("#art-canvas");
const ctx = canvas.getContext("2d");

const centerX = canvas.width / 2,
  centerY = canvas.height / 2;

/**
 * Generates a random number from 0 to d
 * @returns {number}
 */
const generateRandom = (d) => {
  return Math.random() * d;
};

/**
 * Draws a series of connected random lines
 *
 * @param {number} steps - The number of lines
 * @param {number} startX - Starting x-coordinate
 * @param {number} startY - Starting y-coordinate
 */
const randomWalk = (steps, startX = 0, startY = 0) => {
  // Initialize current position
  let curX = startX,
    curY = startY;

  // Start the path from current position
  ctx.moveTo(curX, curY);

  // Perform the random walk
  for (let i = 0; i < steps; i++) {
    // Update the position by adding a random value
    curX += generateRandom(Math.random() * 5);
    curY += generateRandom(Math.random() * 5);

    // Draw the line to the new position
    ctx.lineTo(curX, curY);
  }
};

/**
 * Creates a random background by performing random walks
 */
const createBackground = () => {
  const steps = 500; // Number of steps for each random walk

  // Perform random walks along with the x axis
  for (let x = 0; x < canvas.width; x++) {
    randomWalk(steps, x, 0);
  }

  // Perform random walks along with the y axis
  for (let y = 0; y < canvas.height; y++) {
    randomWalk(steps, 0, y);
  }
  ctx.stroke();
};

/**
 * Clears the canvas, resets the context state, and creates a new background.
 */
const clearCanvas = () => {
  // Clear the entire canvas area
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Reset the context state, such as strokeStyle, lineWidth and etc.
  ctx.reset();

  // Create the background
  createBackground();

  // Set the line width and color for Interactive Mode
  ctx.lineWidth = 2;
  ctx.strokeStyle = "cyan";

  // Stop any animations from running
  stopAnimation();
};

let animationRunning = false;

const colorsBlue = [
    "#0ff",
    "#0cf",
    "#09f",
    "#06f",
    "#03f",
    "#00f",
    "#03f",
    "#06f",
    "#09f",
    "#0cf",
    "#0ff",
  ],
  colorsRed = [
    "#ff0",
    "#fc0",
    "#f90",
    "#f60",
    "#f30",
    "#f00",
    "#f30",
    "#f60",
    "#f90",
    "#fc0",
    "#ff0",
  ];

let animationColorIndex = 0;

/**
 * Starts an animation that draws a line moving in random directions.
 * The animation continues until stopped and preserves the last state for continuing.
 *
 * @param {Object} lastData - The starting or last state of the animation.
 */
const startAnimation = (
  lastData = { x: canvas.width / 2, y: canvas.height / 2, angle: 0 },
) => {
  // Flag indicating whether the animation is currently running
  animationRunning = true;

  // Initialize current position and angle
  let curX = lastData.x,
    curY = lastData.y,
    deg = lastData.angle;

  // Length of the line
  const length = 10;

  const step = () => {
    // If the animation has been stopped, save the current state and exit
    if (!animationRunning) {
      lastAnimationData = { x: curX, y: curY, angle: deg };
      return;
    }
    ctx.beginPath(); // Start a new path for the line

    // Set the stroke color from colorsRed array
    ctx.strokeStyle = colorsRed[animationColorIndex++ % colorsRed.length];

    // Move to the current position
    ctx.moveTo(curX, curY);

    // Calculate the new position based on current angle and line length
    curX += Math.min(canvas.width - curX, Math.cos(radian(deg)) * length);
    curX = Math.max(curX, 0); // Ensure curX doesn't go below 0
    curY += Math.min(canvas.height - curY, Math.sin(radian(deg)) * length);
    curY = Math.max(curY, 0); // Ensure curY doesn't go below 0

    // Update angle by adding a random number between -90 and 90 degrees
    deg += Math.random() * 180 - 90;

    // Draw a line to the new position
    ctx.lineTo(curX, curY);
    ctx.stroke();

    // Recurse the function with a slight delay
    setTimeout(() => {
      requestAnimationFrame(step);
    }, 10);
  };

  // Start the animation
  requestAnimationFrame(step);
};

const stopAnimation = () => {
  // Set the animation state to false to stop it
  animationRunning = false;
};

const continueAnimation = () => {
  // Start animation from the last state
  startAnimation(lastAnimationData);
};

let mouseLineColorIndex = 0,
  mouseLineWidth = 2,
  mouseLastCoords = { x: 0, y: 0 };
lastAnimationData = {}; // lastAnimationData is for #continueAnimation button

const togglePressableButtons = () => {
  document
    .querySelector("#startAnimation")
    .classList.toggle("btn--active", animationRunning);
  document
    .querySelector("#stopAnimation")
    .classList.toggle("btn--active", !animationRunning);
  document
    .querySelector("#continueAnimation")
    .classList.toggle(
      "btn--active",
      !(!animationRunning && lastAnimationData?.x !== null),
    );
};

document.querySelector("#startAnimation").onclick = function () {
  if (animationRunning) return;
  startAnimation();
  togglePressableButtons();
};
document.querySelector("#stopAnimation").onclick = function () {
  if (!animationRunning) return;
  stopAnimation();
  togglePressableButtons();
};
document.querySelector("#continueAnimation").onclick = function () {
  if (animationRunning) return;
  continueAnimation();
  togglePressableButtons();
};
document.querySelector("#interactiveMode").onclick = function () {
  this.classList.toggle("btn--active");
  if (!canvas.onmousedown)
    canvas.onmousedown = (e) => {
      mouseLastCoords = { x: e.offsetX, y: e.offsetY };
      canvas.addEventListener("mousemove", drawMouseLine);
    };
  else canvas.onmousedown = null;
};
document.querySelector("#clearCanvas").onclick = () => clearCanvas();

clearCanvas();

/**
 * Draws a gradient line following the mouse's movement
 *
 * @param {MouseEvent} e - The mouse event containing current position and previous mouse coordinates
 */
const drawMouseLine = (e) => {
  // Start a new path
  ctx.beginPath();

  // Set the width of the line
  ctx.lineWidth = mouseLineWidth;

  // Create a gradient effect using colors from colorsBlue array
  ctx.strokeStyle = colorsBlue[mouseLineColorIndex++ % colorsBlue.length];

  // Calculate the previous mouse position
  ctx.moveTo(mouseLastCoords.x, mouseLastCoords.y);

  // Set current coords
  mouseLastCoords = { x: e.offsetX, y: e.offsetY };

  // Draw a line to the current mouse position
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
};

canvas.onmouseout = canvas.onmouseup = () =>
  canvas.removeEventListener("mousemove", drawMouseLine);
