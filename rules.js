let ZIG, SELECT; // Constants



function preload() {
    soundFormats('wav'); // Set sound type
    SELECT = loadSound('enter.wav');
    ZIG = loadFont('zig.ttf'); //load in the font
}

function setup() {
    createCanvas(880, 700);
    textAlign(CENTER);
    fill(255);
    stroke(255);
    noCursor();
}

function draw() {
    background(50, 70, 160);
    textSize(11);
    fill(255);
    stroke(255);
    textFont("monospace"); // Sets the font
    text("\n" +
        "██ ███    ██ ███████ ████████ ██████  ██    ██  ██████ ████████ ██  ██████  ███    ██ ███████ \n" +
        "██ ████   ██ ██         ██    ██   ██ ██    ██ ██         ██    ██ ██    ██ ████   ██ ██      \n" +
        "██ ██ ██  ██ ███████    ██    ██████  ██    ██ ██         ██    ██ ██    ██ ██ ██  ██ ███████ \n" +
        "██ ██  ██ ██      ██    ██    ██   ██ ██    ██ ██         ██    ██ ██    ██ ██  ██ ██      ██ \n" +
        "██ ██   ████ ███████    ██    ██   ██  ██████   ██████    ██    ██  ██████  ██   ████ ███████ \n" +
        "                                                                                              \n" +
        "                                                                                              \n", 0, 200, width); // Title

    textSize(15);
    textFont(ZIG); // Sets the font
    fill(210);
    stroke(210);
    text("The game is simple. You enter text in and get a response from the game, and to find your way to the final room. For example, the player could enter \"Look at chair\" and the game would respond \"In front of you is a small chair, it has three legs and has the number 6 engraved on it\". While the objects you can interact with depend on the room, the list of possible actions is look, unlock, go and pick up. The last rule is that, to move from one room to another is by entering go then either north, south, east or west.", 50, 350 , width-100)
    text("> Return", width/2, height-100); // Return


}

function keyPressed() {
    if(keyCode === ENTER) { // Select option
        SELECT.play(); // Play sound effect
        SELECT.onended(Return); // When sound is done playing
    }

}

function Return(){
    window.parent.change("start.html");
}