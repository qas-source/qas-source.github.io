let ZIG, SELECT; // Constants



function preload() {
    soundFormats('wav'); // Set sound type
    SELECT = loadSound('enter.wav');
    ZIG = loadFont('zig.ttf'); //load in the font
}

function setup() {
    createCanvas(880, 700);
    textAlign(CENTER);
    textFont(ZIG); // Sets the font
    fill(255);
    stroke(255);
    noCursor();
    textSize(15);
}

function draw() {
    background(50, 70, 160);
    fill(255);
    stroke(255);

    textFont("monospace"); // Sets the font
    // Text generated with https://patorjk.com/software/taag/#p=display&h=0&v=0&f=ANSI%20Regular&t=You%20WIN
    text("██    ██  ██████  ██    ██     ██     ██ ██ ███    ██ \n" +
        " ██  ██  ██    ██ ██    ██     ██     ██ ██ ████   ██ \n" +
        "  ████   ██    ██ ██    ██     ██  █  ██ ██ ██ ██  ██ \n" +
        "   ██    ██    ██ ██    ██     ██ ███ ██ ██ ██  ██ ██ \n" +
        "   ██     ██████   ██████       ███ ███  ██ ██   ████ \n" +
        "                                                     ", 50, 300 , width-100);
    textFont(ZIG); // Sets the font
    fill(210);
    stroke(210);
    text("> View Source Code", width/2, height-100); // Return


}

function keyPressed() {
    if(keyCode === ENTER) { // Select option
        SELECT.play(); // Play sound effect
        SELECT.onended(Return()); // When sound is done playing
    }

}

function Return(){
    window.parent.location.href = "https://github.com/qas-source/BackUp-Zork";;
}