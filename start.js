let ZIG, CLICK, SELECT; // Constants

let option = 0; // Option select

function preload() {
    soundFormats('wav'); // Set sound type
    CLICK = loadSound('click.wav');
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

    let BackSlash =
        "██████   █████   ██████ ██   ██     ███████ ██       █████  ███████ ██   ██ \n" +
        "██   ██ ██   ██ ██      ██  ██      ██      ██      ██   ██ ██      ██   ██ \n" +
        "██████  ███████ ██      █████       ███████ ██      ███████ ███████ ███████ \n" +
        "██   ██ ██   ██ ██      ██  ██           ██ ██      ██   ██      ██ ██   ██ \n" +
        "██████  ██   ██  ██████ ██   ██     ███████ ███████ ██   ██ ███████ ██   ██ \n" +
        "                                                                            "

    let N = "\n" +
        "███    ██ \n" +
        "████   ██ \n" +
        "██ ██  ██ \n" +
        "██  ██ ██ \n" +
        "██   ████ \n" +
        "          "

    let Again = "\n" +
        " █████   ██████   █████  ██ ███    ██ \n" +
        "██   ██ ██       ██   ██ ██ ████   ██ \n" +
        "███████ ██   ███ ███████ ██ ██ ██  ██ \n" +
        "██   ██ ██    ██ ██   ██ ██ ██  ██ ██ \n" +
        "██   ██  ██████  ██   ██ ██ ██   ████ \n" +
        "                                      \n"
    text(BackSlash + N + Again, 0, 100, width); // Title

    textFont(ZIG); // Sets the font
    fill(210);
    stroke(210);
    text("Play Game", width/2, 500); // Options

    text("Instructions", width/2, 530);

    text("Source", width/2, 560);

    text(">", width/2-80, 500+30*option); // Cursor
}

function keyPressed() {
    if (keyCode === DOWN_ARROW) {option = (option+1)%3} // Go down an option
    else if(keyCode === UP_ARROW){option = (3+(option-1)%3)%3} // Go up and option
    else if(keyCode === ENTER){ // Select option
        SELECT.play(); // Play sound effect
        SELECT.onended(window["option"+option]); // When sound is done playing
        return;
    }
    else {return;}

    CLICK.play(); // Play sound effect
}

function option0() {window.parent.change("game.html");} // Start Game

function option1() {window.parent.change("rules.html");} // View instructions

function option2() {window.parent.location.href = "https://github.com/qas-source/qas-source.github.io";} // View credits