// survival.js

// ------------------------------
// Data: Items & Game State
// ------------------------------
// Defined with labels and values.
let survivalItems = [
  { label: "Flint", val: 25, selected: false },
  { label: "Water Purification Tablets", val: 20, selected: false },
  { label: "Swiss Army Knife", val: 15, selected: false },
  { label: "First Aid Kit", val: 15, selected: false },
  { label: "Fishing Gear", val: 10, selected: false },
  { label: "Flashlight", val: 5, selected: false },
  { label: "Thick Blanket", val: 5, selected: false },
  { label: "Bag of Snacks", val: -5, selected: false },
  { label: "Umbrella", val: -10, selected: false },
  { label: "Encyclopedia", val: -15, selected: false },
];

// Layout constants (Grid: 2 rows of 5)
const GRID_START_X = 130;
const GRID_START_Y = 200;
const GRID_GAP_X = 135;
const GRID_GAP_Y = 120;

// Initialize items with default positions once on load
survivalItems.forEach((item, index) => {
  item.w = 110;
  item.h = 80;
  item.x = GRID_START_X + (index % 5) * GRID_GAP_X;
  item.y = GRID_START_Y + Math.floor(index / 5) * GRID_GAP_Y;
});

let finalSurvivalScore = 0;

// ------------------------------
// Main Draw Function
// ------------------------------
function drawSurvival() {
  background(245, 245, 235); // Light beige background

  // Title
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Pack Your Backpack", width / 2, 80);
  textSize(18);
  text("Select exactly 5 items to survive.", width / 2, 120);

  // Draw all items
  survivalItems.forEach((item) => {
    drawSurvivalItem(item);
  });

  // Draw Backpack Bar (Background and Text)
  drawBackpackBar();

  // Draw "Embark" Button (Confirm selection)
  // Only active if exactly 5 items are selected
  const count = survivalItems.filter((i) => i.selected).length;

  if (count === 5) {
    drawEmbarkButton(true);
  } else {
    drawEmbarkButton(false);
  }
}

// ------------------------------
// Helper: Draw Individual Item
// ------------------------------
function drawSurvivalItem(item) {
  rectMode(CENTER);

  // Hover check
  const hover = isHover(item);

  if (item.selected) {
    fill(150); // Gray if selected
    stroke(100);
  } else if (hover) {
    fill(220, 230, 255); // Light blue hover
    noStroke();
  } else {
    fill(255); // White default
    stroke(200);
  }

  rect(item.x, item.y, item.w, item.h, 8);
  noStroke();

  // Text
  fill(item.selected ? 255 : 0);
  textSize(14);
  textAlign(CENTER, CENTER);
  text(item.label, item.x, item.y, item.w - 10, item.h - 10);
}

// ------------------------------
// Helper: Draw Backpack Bar
// ------------------------------
function drawBackpackBar() {
  fill(40); // Dark background
  rectMode(CORNER);

  // INCREASED SIZE: Height is now 200px (was 150) to fit button
  const barHeight = 200;
  const barY = height - barHeight;

  rect(0, barY, width, barHeight);

  fill(255);
  textSize(20);
  textAlign(LEFT, TOP);
  // Positioned at top of the bar
  text("BACKPACK CONTENTS:", 20, barY + 20);

  // List selected items
  let selected = survivalItems.filter((i) => i.selected);
  let xPos = 30;
  let yPos = barY + 60; // Positioned below the title

  textSize(16);
  selected.forEach((item, i) => {
    text(`• ${item.label}`, xPos + i * 150, yPos, 140, 60);
  });
}

// ------------------------------
// Helper: Draw Embark Button
// ------------------------------
// MOVED BUTTON: y changed from 720 to 740 to sit lower in the larger bar
const embarkBtn = { x: 400, y: 740, w: 200, h: 60, label: "EMBARK" };

function drawEmbarkButton(active) {
  rectMode(CENTER);

  if (active) {
    const hover = isHover(embarkBtn);
    fill(hover ? color(100, 200, 100) : color(80, 180, 80)); // Green
    cursor(hover ? HAND : ARROW);
  } else {
    fill(100); // Darker gray for disabled state
  }

  rect(embarkBtn.x, embarkBtn.y, embarkBtn.w, embarkBtn.h, 20);

  fill(active ? 255 : 180);
  textSize(24);
  textAlign(CENTER, CENTER);
  text(embarkBtn.label, embarkBtn.x, embarkBtn.y);
}

// ------------------------------
// Input Handler
// ------------------------------
function survivalMousePressed() {
  // 1. Check item clicks
  for (let item of survivalItems) {
    if (isHover(item)) {
      const currentlySelected = survivalItems.filter((i) => i.selected).length;

      // Toggle logic
      if (item.selected) {
        item.selected = false; // Deselect
      } else if (currentlySelected < 5) {
        item.selected = true; // Select (only if < 5)
      }
      return; // Stop checking after one click
    }
  }

  // 2. Check Embark button click
  const count = survivalItems.filter((i) => i.selected).length;
  if (count === 5 && isHover(embarkBtn)) {
    calculateAndFinish();
  }
}

function calculateAndFinish() {
  // Calculate total score
  finalSurvivalScore = survivalItems
    .filter((i) => i.selected)
    .reduce((sum, i) => sum + i.val, 0);

  // Go to result screen
  currentScreen = "survivalResult";
}

// ------------------------------
// Reset & Randomize
// ------------------------------
function resetSurvivalGame() {
  // 1. Reset selection & Score
  survivalItems.forEach((i) => (i.selected = false));
  finalSurvivalScore = 0;

  // 2. Shuffle the array to randomize order
  shuffle(survivalItems, true);

  // 3. Re-assign Grid Positions based on the NEW shuffled order
  survivalItems.forEach((item, index) => {
    item.w = 110;
    item.h = 80;

    // Calculate grid spot
    const col = index % 5;
    const row = Math.floor(index / 5);

    item.x = GRID_START_X + col * GRID_GAP_X;
    item.y = GRID_START_Y + row * GRID_GAP_Y;
  });
}
