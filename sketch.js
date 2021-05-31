let i, y, maxRunningOffset; //Global variable
let offset, trueOffset = 0;
let room = 1;
let ZIG, ZIG_CLEAR, CLICK, SELECT; // Preparing for the font and sounds
let begin = true;
let completed = false;



function preload() {
  soundFormats('wav'); // set sound file type
  CLICK = loadSound('click.wav'); // load files
  SELECT = loadSound('enter.wav');
  CLICK.setVolume(0.5); // Lower Volume
  SELECT.setVolume(0.5);
  ZIG = loadFont('zig.ttf'); //load in the font
  ZIG_CLEAR = loadFont('zigClear.ttf'); //load in a version of the font where are the charecters are empty, except "<"
}

let textLogPlayer = []; // Contain all text that is displayed on the text
let textLogGame = []; // One of these arrays is for the player, the other is for the game

function setup() {
  i = new inputBox(); // Create the input at the bottom of the screen
  
  createCanvas(880, 700);
  i.locate(70, height-100); // Set the location of the input, bottom of the screen
  textFont(ZIG); // Sets the font

  window.parent.document.documentElement.style.backgroundColor = "#1C254D"; // These change the back ground colors on the index page and the game page
  document.documentElement.style.backgroundColor = "#1C254D";
  window.parent.document.body.style.backgroundColor = "#1C254D";
  document.body.style.backgroundColor = "#1C254D";

  noCursor();
}


function mouseWheel(event) { // Called when the mouse wheel is moved. I am using it to set an offset for display so that you can look at older entries.
  if(textLogPlayer.length <= 4){return;} // This stops the function in case that the text is not overflowing on the screen and so that the constrain does not have a min great then it's max
  trueOffset += event.delta; // Delta represents the amount the wheel has moved, or in other words, the difference.
  trueOffset = constrain(trueOffset, 400-(textLogPlayer.length*100)-maxRunningOffset, 0);// Constrains the value so that you can't scroll past all of the text
  offset = Math.floor(trueOffset/30)*30; // This make the scrolling blockier, adds to the feeling of an old computer
}


function draw() {
  background(50, 70, 160);
  textSize(17);

  let RunningOffset = 0; // An additional offset the handle extra height of text
  for (let i = 0; i < textLogPlayer.length; i++){ // Cycle through all pairs of text, input and output
    RunningOffset += textLogGame[textLogGame.length-1-i].getOffset() // Get the extra offset of the text
    if (1000-(i*100)-offset-RunningOffset < 0){break;}// stops drawing text if off screen
    if ((i*100)+offset+RunningOffset < -120) {continue;}
    stroke(255);
    fill(255);
    text("> " + textLogPlayer[textLogPlayer.length-1-i], 70, 500-(i*100)-offset-RunningOffset); // Player's input

    // This next patch of code displays the game's output by calling a function of the GameText class to get it's Value
    stroke(190);
    fill(190);
    textAlign(RIGHT);
    text(textLogGame[textLogGame.length-1-i].getValue(), 305, 500-(i*100)-offset-RunningOffset+50, 500); // Gets value from class to be displayed
    textFont(ZIG_CLEAR); // Sets the font
    text(textLogGame[textLogGame.length-1-i].getValue().slice(0, -1)+"<", 325, 500-(i*100)-offset-RunningOffset+50, 500); //To correctly place the cursor,
    textFont(ZIG); // Sets the font
    //text("<", 825, 500-(i*100)-offset-RunningOffset+27+textLogGame[textLogGame.length-1-i].getOffset())
    textAlign(LEFT);

  }

  maxRunningOffset = RunningOffset-100; // Set maxRunningOffset to be used in the mouseWheel function
  
  i.draw(); // Draws text input

  if (begin) { // Overlay at start, gives players the first command
    fill(10, 10, 10, 140);
    stroke(0, 0, 0, 0);
    rect(0,0, 880, 700)
    stroke(162);
    fill(162);
    textAlign(CENTER);
    text("Type \"Look Around\" to start the game", 0, height/2, width)
    textAlign(LEFT);
  }
}

function keyTyped() { // Get the players keyboard input
  if (key === "Enter"){ // Checks if the enter key has been pressed, if it has, calls the submit function of the input class
    i.Submit();
    SELECT.play();
    return;
  }

  CLICK.play();
  i.update(key.toLowerCase()); // Passes a lowercase letter to the input box
}

function keyPressed() {if (keyCode === BACKSPACE || keyCode === DELETE) {i.delete(); CLICK.play();}} // checks if the delete or backspace key have been pressed, if they have been, it deletes the past character in the input box



class inputBox { // Input box
  constructor() { // Initialize variables
    let self = this; // Set a self value to be used in timing events
    this.cursorValue = "";
    this.x = 0;
    this.y = 0;
    this.width = 740;
    this.heigth = 40;
    this.fill = color(70, 90, 180);
    this.line = color(0, 0, 0);
    this.text = '';
    this.func = function() {return function () {if (self.cursorValue === ""){return self.cursorValue = "_";} else {return self.cursorValue = "";}};} // Function for timing event

    setInterval(this.func(), 500); // Timing event
  }
  
  draw() { // Draws the input box

    // Adds a cursor
    let suffix = ""
    if (this.text.length <= 33){
      suffix += this.cursorValue;
    }


    textSize(26);
    fill(50, 70, 160);
    noStroke();
    rect(0, this.y, width, height-this.y); //Covers up the area next to and underneath the box, hides the text logs.
    fill(this.fill);
    stroke(this.line);
    rect(this.x, this.y, this.width, this.heigth);
    fill(this.line);
    stroke(255);
    fill(255);
    text(" "+this.text+suffix, this.x+8, this.y+30);
    text(">", this.x+5, this.y+30); // Place the ">" and extra 3 pixels away from the text
  }
  
  update(letter) { // Adds a letter to the end of the text
    if (this.text.length > 33){return;}
    this.text += letter;
  }
  
  
  locate(x, y){ // sets the position of the button
    this.x = x
    this.y = y
  }
  
  Submit(){ // Run when the enter buttons is presed
    if (textLogPlayer.length > 0){textLogGame[textLogGame.length-1].Skip();}
    if (this.text === ""){return;}

    textLogPlayer.push(this.text.replace(/\s\s+/g, ' ')); // Converts multiple space with a since space
    this.text = ""; // Resets the text value
    textLogGame.push(new GameText(textLogPlayer[textLogPlayer.length-1], textLogGame.length)); // Adds the player input to their array
    offset = 0; // Resets the offset
    begin = false; // Makes the overlay invisible

    window.parent.document.documentElement.style.backgroundColor = "#3246A0"; // These change the back ground colors on the index page and the game page
    document.documentElement.style.backgroundColor = "#3246A0";
    window.parent.document.body.style.backgroundColor = "#3246A0";
    document.body.style.backgroundColor = "#3246a0";
  }
  
  delete(){
    this.text = this.text.slice(0, -1) // Removes the last character
  }
  

}



  