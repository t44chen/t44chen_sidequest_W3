// ------------------------------------------------------------
// main.js
// ------------------------------------------------------------

let currentScreen = "start"; // "start", "instr", "survival", "survivalResult"

// ------------------------------
// setup() runs ONCE
// ------------------------------
function setup() {
  createCanvas(800, 800);
  textFont("sans-serif");
}

// ------------------------------
// draw() runs every frame
// ------------------------------
function draw() {
  // Route to the correct screen
  if (currentScreen === "start") drawStart();
  else if (currentScreen === "instr") drawInstr();
  // New Survival Screens
  else if (currentScreen === "survival") {
    // Check if function exists to prevent crash if file is missing
    if (typeof drawSurvival === "function") drawSurvival();
    else background(255, 0, 0); // Red error screen if missing
  } else if (currentScreen === "survivalResult") {
    if (typeof drawSurvivalResult === "function") drawSurvivalResult();
  }

  // Old screens (optional, kept for safety)
  else if (currentScreen === "game") drawGame();
  else if (currentScreen === "win") drawWin();
  else if (currentScreen === "lose") drawLose();
}

// ------------------------------
// mousePressed()
// ------------------------------
function mousePressed() {
  if (currentScreen === "start") startMousePressed();
  else if (currentScreen === "instr") instrMousePressed();
  else if (currentScreen === "survival") {
    if (typeof survivalMousePressed === "function") survivalMousePressed();
  } else if (currentScreen === "survivalResult") {
    if (typeof survivalResultMousePressed === "function")
      survivalResultMousePressed();
  } else if (currentScreen === "game") gameMousePressed();
  else if (currentScreen === "win") winMousePressed?.();
  else if (currentScreen === "lose") loseMousePressed?.();
}

// ------------------------------
// keyPressed()
// ------------------------------
function keyPressed() {
  if (currentScreen === "start") startKeyPressed();
  else if (currentScreen === "instr") instrKeyPressed();
  else if (currentScreen === "survivalResult") {
    if (typeof survivalResultKeyPressed === "function")
      survivalResultKeyPressed();
  } else if (currentScreen === "game") gameKeyPressed?.();
}

// ------------------------------------------------------------
// Shared helper function: isHover()
// ------------------------------------------------------------
// REQUIRED: This function checks if mouse is over a button.
// Without this, start.js will crash and draw nothing.
function isHover({ x, y, w, h }) {
  return (
    mouseX > x - w / 2 &&
    mouseX < x + w / 2 &&
    mouseY > y - h / 2 &&
    mouseY < y + h / 2
  );
}
