// survivalResult.js

// ------------------------------
// Draw Result Screen
// ------------------------------
function drawSurvivalResult() {
  let title = "";
  let bgColor = color(255);

  // Determine outcome based on score
  if (finalSurvivalScore > 80) {
    title = "Survival Master";
    bgColor = color(150, 230, 150); // Success Green
  } else if (finalSurvivalScore >= 50) {
    title = "Barely Survived";
    bgColor = color(255, 230, 150); // Warning Yellow
  } else {
    title = "Perished on the Island";
    bgColor = color(255, 150, 150); // Failure Red
  }

  background(bgColor);

  fill(0);
  textAlign(CENTER, CENTER);

  // Outcome Title
  textSize(42);
  text(title, width / 2, 250);

  // Score display
  textSize(28);
  text("Final Score: " + finalSurvivalScore, width / 2, 350);

  // Restart instructions
  textSize(20);
  text("Press 'R' or Click to Try Again", width / 2, 500);
}

// ------------------------------
// Inputs
// ------------------------------
function survivalResultMousePressed() {
  resetSurvivalGame(); // defined in survival.js
  currentScreen = "start";
}

function survivalResultKeyPressed() {
  if (key === "r" || key === "R") {
    resetSurvivalGame();
    currentScreen = "start";
  }
}
