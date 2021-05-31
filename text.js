
class GameText{ // object that handles all the game logic

  // This system is designed so that, except is certain cases, there is no need to know the users previous actions
  // Action that can be stopped have an "actionable" value, is true, action is available, else, they are not
  // Other action can set the "actionable" value to true, so that the action does not need to know what happened, only that it can be done

  constructor(Value, id){ // Runs once, handles the bulk of the game logic.
    this.timeOuts = []; // an array of all the delays, used to stop them
    this.id = id; // It's id in the array
    this.Override = false; // Active if the action has an second input. It is presently only used for the unlock command for now
    let self = this;
    this.offset = 0; // Value of the offset based on the text length
    this.Value = Value; // Player input
    this.out = ""; // Output text
    this.complete = ""; // The complete output text

    this.lines = 1;
    this.text_length = 0;
    textFont(ZIG);
    textSize(17);

    this.func = function(char) {return function() { // Function used in the delay to add a character to the output and calculate offset
      textFont(ZIG);
      textSize(17);

      self.out += char;

      self.text_length += textWidth(char); // Calculating the amount of lines with the width restraint. This is used to calculate the height of the text box and is used in runningOffset

      if(self.text_length > 480) { // New line
        self.lines ++;
        self.text_length = textWidth(char) * (self.out.split(" ")[self.out.split(" ").length - 1].length);
      }
    };}

    this.action = this.Value.split(" ")[0]; // Gets the first word in the player input
    this.obj = this.Value.split(" ")[this.Value.split(" ").length-1]; // Gets the last word in the players input

    if (completed && this.action == "sleep"){window.parent.change("end.html"); return;}

    if (this.id > 0){ // This code gets the values of the previous GameText
      let preOverride = textLogGame[this.id-1].getOverride();
      let preAction = textLogGame[this.id-1].getAction();
      let preObj = textLogGame[this.id-1].getObj();
      if (preOverride){ // If override is in effect
        if (preAction === "unlock"){ // Override for the unlock command
          let correct = true;
          for (let i = 0; i < story["room"+room][preObj][preAction].DigitSum; i++){ // Checks if the correct password was entered
            if (story["room"+room][preObj][preAction]["code"+i] !== this.Value.split(" ")[i]){
              correct = false; // if part of the code is incorrect
              break;
            }
          }
          if (correct){
            this.displayText(story["room"+room][preObj][preAction].correct); // Outputs text when unlock

            story["room"+room][preObj][preAction].effect(); // Runs the effect which changes values in the JSON
          }
          else {this.displayText(story["room"+room][preObj][preAction].wrong);} // Outputs text for incorrect password

        }
        return;
    }}


    if (checkAction(this.action, this.obj, "room"+room)){ // Checks if valid action
      this[this.action](this.obj, this.action, this.Value); // Runs the action
      return;
    }

    let notRecognized = "This action is not recognized";

    this.displayText(notRecognized); // Output error text
  }



  getValue() {return this.out;} // get Function GET values
  getOffset() {return Math.floor(this.lines)*textLeading();} // Returns the height of the text box

  getOverride() {return this.Override;}

  getObj() {return this.obj;}

  getAction() {return this.action;}

  Skip() { // Completes the text
    for (let i = 0; i < this.timeOuts.length; i++){clearTimeout(this.timeOuts[i]);} // Stops all the timers
    this.out = this.complete; // Completes the output

    textFont(ZIG);
    textSize(17);

    let words = this.out.split(" ");
    this.lines = 1;
    this.text_length = 0;


    for (let i = 0; i < words.length; i ++) { // similar the offset calculator above, except it uses entire words at a time.
      this.text_length += textWidth(words[i]);
      if (this.text_length > 480) {
        this.lines++;
        this.text_length = textWidth(words[i]);
      } else {
        this.text_length += textWidth(" ");
      }
    }
  }

  go(obj, action) { // Go action
    if (story["room"+room][obj][action].openable){ // Checks if action is "actionable"
      this.displayText(story["room"+room][obj][action].open); // Send text to be displayed
      story["room"+room][obj][action].effect(); // Runs the effect, swaps rooms
    }
    else { // Run if action if unavailable
      this.displayText(story["room"+room][obj][action].closed); // Send text to be displayed
    }
  }

  look(obj, action){ // Look action
    if (story["room"+room][obj][action].readable){this.displayText(story["room"+room][obj][action].text);} // If action is "actionable" sends the text to be displayed
    else {this.displayText(story["room"+room][obj][action].unable);} // Displays the "unavailable" text option
  }

  unlock(obj, action){ // The unlock command, handled in the Override loop
    if (story["room"+room][obj][action].codeNeeded){
      this.Override = true; // Set Override for the next input
      this.displayText("Enter code:"); // Send text to be displayed
      return;
    }
    this.displayText(story["room"+room][obj][action].correct);
    story["room"+room][obj][action].effect();
  }

  pick(obj, action){ // The pick up command, outputs text and has an effect
    if (story["room"+room][obj][action].pickable){ // If action is "actionable" sends the text to be displayed
      this.displayText(story["room"+room][obj][action].text); // Sends text to be displayed
      story["room"+room][obj][action].effect(); // Runs the effect, makes something "actionable"
    }
    else {
      this.displayText(story["room"+room][obj][action].unable);
      story["room"+room][obj][action].effect(); // Runs the effect which changes values in the JSON
    }
  }


  displayText(text){ // Displays the text
    this.complete = text; // Set complete text
    for (let i = 0; i < text.length; i++){this.timeOuts.push(setTimeout(this.func(text[i]), i*140));} // Sets delay for each letter
  }
}