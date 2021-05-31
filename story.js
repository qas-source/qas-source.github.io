let story = { // Json that contains all the values used by the GameText
  room1: { // room1, room2 ... represent the "rooms" in the game.
    around: { // These rooms contain "objects"
      actions: ["look"], // Each object has actions
      look: { // the look action simply sends text to be displayed.
        text: "You find your self in a dark and damp room, there is a door to the south of you. In the room, you can see a table, a chair and a bookshelf.",
        unable: "",
        readable: true
      }
    },

    chair: {
      actions: ["look"],
      look: {
        text: "After closely looking at the chair, you see that there is a small marking on it, two parallel blue lines.",

        unable: "",

        readable: true
      }
    },
    table: {
      actions: ["look"],

      look: {
        text: "You see that one the table, there is a small grey plate with the number one on it. Also on the table is a small book with a lock on it.",

        unable: "",

        readable: true
      }

    },
    bookshelf: {
      actions: ["look"],

      look: {
        text: "All that is on this ornate book self, is multiple of the same three volume. On each of the books is the name Fredrickson in yellow.",

        unable: "",

        readable: true
      }
    },

    book: {
      actions: ["look"],

      look: {
        text: "All the pages are plank, except one. On which is written the following: \"The answer the the question you seek is the solution to his riddle. I can tell you even from odd. I can also tell what remains after any split. What am I?\"",

        unable: "You first need to find the key.",

        readable: false

      }
    },

    lock: {
      actions: ["unlock", "look"],


      unlock: { // unlock involves inputting passwords

        effect: function () {
          story.room1.south.go.openable = true;
        }, // The effect value is a simple function that changes other values in the JSON

        codeNeeded: true,

        DigitSum: 3, // The amount of digits

        code0: "grey", // And the digits

        code1: "blue",

        code2: "yellow",

        correct: "As the lock pops open and the door is unlocked.", // Displayed if password is correct

        wrong: "The lock stays closed and the door stays closed." // Displayed if the text is incorrect
      },

      look: {
        text: "On the door is a three digit color lock.",

        unable: "",

        readable: true
      }
    },

    east: {
      actions: ["look", "go"],

      look: {
        text: "There seams to be a hidden door that leads south. Sadly, it is locked from the other side.",

        unable: "",

        readable: true
      },


      go: { // Go simply changes the room number
        effect: function () {
          room = 4;
        }, // effect changes the room number

        open: "You open the hidden door and enter the adjacent room.", // Displayed if the door is open

        closed: "The door is locked from the other side.", // Displayed is the door is locked

        openable: false // is the door locked
      },

    },

    south: {
      actions: ["look", "go"],

      look: {
        text: "Before you is a door that leads to a room south of you. It is locked by a small color lock.",

        unable: "",

        readable: true
      },


      go: {
        effect: function () {
          room = 2;
        },

        open: "With the lock unlocked. You open the door and pass through it.",

        closed: "Since the lock is locked, the door does not budge.",

        openable: false
      },

    }
  },
  room2: {
    around: {
      actions: ["look"],

      look: {
        text: "As you look around the room, you a wooden floor, a computer and a door to the east of you",

        unable: "",

        readable: true
      }
    },

    floor: {
      actions: ["look"],

      look: {
        text: "This is the floor of the second room. It is made of wood. In the far corner, you see a small piece of paper.",

        unable: "",

        readable: true
      },

    },

    computer: {
      actions: ["look"],

      look: {
        text: "You place the paper in the slot, the computer slowly eats it up, you hear some busing from the inside. It then spits out the paper and displays 0100111110100010 on the grimy display.",

        unable: "The computer seems to be sleeping, there are no buttons or other input devices on it except for a slot underneath the screen.",

        readable: false
      },

    },

    paper: {
      actions: ["look", "pick"],

      look: {
        text: "On the floor, near the computer is a hard piece of paper, on it are a bunch of holes on a grid.",

        unable: "",

        readable: true
      },

      pick: {
        text: "You pick up the paper and place it in your pocket.",

        unable: "",

        pickable: true,

        effect: function () {
          story.room2.computer.look.readable = true;
        }
      }
    },

    lock: {
      actions: ["unlock", "look"],


      unlock: {

        effect: function () {
          story.room2.east.go.openable = true;
        },

        codeNeeded: true,

        DigitSum: 1,

        code0: "4f2a",

        correct: "As you enter the code, you hear strange noises coming from not only the inside of the door, but also the from the previous room.",

        wrong: "Nothing happens, the door does not change."
      },

      look: {
        text: "The lock has a 4 letter word Vacuum Floresent Display. Underneath it is are 16 buttons with the characters 0-9 and a-f on it.",

        unable: "",

        readable: true
      }
    },

    north: {
      actions: ["look", "go"],

      look: {
        text: "This is the door you used to get into this room, it is still open.",

        unable: "",

        readable: true
      },

      go: {
        effect: function () {
          room = 1;
        },

        open: "You pass through the door again and enter the previous room.",

        closed: "Error",

        openable: true
      },

    },

    east: {
      actions: ["look", "go"],

      look: {
        text: "This door seems to be half made of electronic, the other half is an oddly colored steal. Where you would expect there to be a doorknob, there is a lock. It has a small screen and 16 buttons.",

        unable: "",

        readable: true
      },

      go: {
        effect: function () {
          room = 3;
        },

        open: "With a few buzzes and clicks, the door slowly opens, as you through it, you feel a chill go down your spine as you pass through the door.",

        closed: "Error",

        openable: false
      },

    },
  },
  room3: {
    around: {
      actions: ["look"],
      look: {
        text: "You know that this hallway is turning north, yet you can't tell where it does. There are door at both ends of the hallway.",

        unable: "",

        readable: true
      }
    },
    west: {
      actions: ["look", "go"],

      look: {
        text: "This is the electronic door, it does look different though.",

        unable: "N/A",

        readable: true
      },

      go: {
        effect: function () {
          room = 2;
        },

        open: "You pass through the metal door, this time, you get no chills",

        closed: "Error",

        openable: true
      },
    },
    north: {
      actions: ["look", "go"],

      look: {
        text: "A plain looking door with an odd looking door handle.",

        unable: "N/A",

        readable: true
      },

      go: {
        effect: function () {
          room = 4;
        },

        open: "You open the door and enter a small damp room.",

        closed: "The handle does not move.",

        openable: false
      },
    },
    handle: {
      actions: ["look", "unlock"],
      look: {
        text: "One the rather plain looking door is a well polished doorknob. Around it's base is a rotating ring of metal with text inscribed on it. The text read \"These four two digits add to 172. The first and last numbers are the value of life or 101010. The value of the first number plus the thrid number is the same as 5 times 11.\".",

        unable: "",

        readable: true
      },

      unlock: {

        effect: function () {story.room3.north.go.openable = true;},

        codeNeeded: true,

        DigitSum: 4,

        code0: "42",
        code1: "75",
        code2: "13",
        code3: "42",

        correct: "You turn the nob and open up the door.",

        wrong: "Nothing happens, the handle stays still."
      },
    }
  },
  room4: {
    around: {
      actions: ["look"],
      look: {
        text: "The room is rather small, the wall paper is moldy and the floor boards squeak with each step. There is a door to the north, south and west. Also, next to the door to the west is a key.",

        unable: "",

        readable: true
      }
    },
    key: {
      actions: ["look", "pick"],

      look: {
        text: "This is small a key, such as the one used to lock a diary or other books.",

        unable: "Error",

        readable: true
      },

      pick: {
        text: "You pick up this ornate key, as you pick it up, you feel how heavy, even though it is so small",

        unable: "",

        pickable: true,

        effect: function () {
          story.room1.book.look.readable = true;
        }
      }

    },
    deadbolt: {
      actions: ["look", "unlock"],

      look: {
        text: "The dead bolt is rather plain looking and has seen better day",

        unable: "Error",

        readable: true
      },

      unlock: {

        effect: function () {
          console.log("Effect");
          story.room1.east.go.openable = true;
          story.room4.west.go.openable = true;
          story.room1.around.look.text = "You find yourself back in a dark and damp room, there is a door to the south of you and a hidden door to the east. Also the room, you can see a table, a chair and a bookshelf. Though every thing seems to be the same, something is different about this room.";
        },

        codeNeeded: false,

        DigitSum: 0,

        code0: "N/A",

        code1: "N/A",

        code2: "N/A",

        correct: "You unlock the deadbolt",

        wrong: "Error"
      },


    },
    lock: {
      actions: ["look", "unlock"],

      look: {
        text: "This lock has two inputs, the operation symbols: +, -, +=, -=, =, ++, --, %, () and their corresponding names. The order is symbol then name.",

        unable: "",

        readable: true
      },

      unlock: {

        effect: function () {story.room4.north.go.openable = true;},

        codeNeeded: true,

        DigitSum: 2,

        code0: "%",
        code1: "modulus",

        correct: "You hear some busing from around the room, the door open up.",

        wrong: "Nothing happens, the doors stays still."
      },
    },
    south: {
      actions: ["look", "go"],

      look: {
        text: "A plain looking door with an odd looking door handle.",

        unable: "N/A",

        readable: true
      },

      go: {
        effect: function () {
          room = 3
        },

        open: "You open the door and enter a long hallway.",

        closed: "",

        openable: true
      },
    },

    north: {
      actions: ["look", "go"],

      look: {
        text: "A large door made of iron and copper, it resembles one of the walls from the first room.",

        unable: "N/A",

        readable: true
      },

      go: {
        effect: function () {
          room = 5
        },

        open: "As you pass through these large door is to this dimly light room, the doors slam shut.",

        closed: "The lock in the center of the left door is still locked.",

        openable: false
      },
    },
    west: {
      actions: ["look", "go"],

      look: {
        text: "A section of the wall seems to be a hidden door, on it is a dead bolt.",

        unable: "N/A",

        readable: true
      },

      go: {
        effect: function () {
          room = 1;
        },

        open: "You pass through the wall, exposed nails and rat attempt to eat at your flesh, but you push them away. You emerge on the other side after unlocking it from the inside. You find yourself in the room from the start, though it seems off.",

        closed: "You need to open the deadbolt first.",

        openable: false
      },
    },
  },
  room5: {
    around: {
      actions: ["look"],
      look: {
        text: "The room is rather dark except for it's center, where there is a soft spotlight on a piece of rope. Behind you, the door are sealed shut.",

        unable: "",

        readable: true
      }
    },

    rope: {
      actions: ["look", "pick"],
      look: {
        text: "A piece of rope is lying on the floor, it does not seem to e attached to anything.",

        unable : "",

        readable: true
      },

      pick: {
        text: "As you lift up the rope, you find a note attached to it, but before you can read it, the rope end and you hear a pop noise. You pick back up the note and it reads \"Welcome back, again. We hope that you enjoyed slash hated your time here. For you continuing please, in about 30 seconds, your will fall asleep, this will all become a dream, as you return through the shifting of time.\". The lights in the room back on in the room, you find that you are back in the original room, the hidden dor is even open. Enter \"sleep\" to finish the game",

        unable: "",

        pickable: true,

        effect: function () {
          completed = true;
        }
      }
    },

    south: {
      actions: ["look", "go"],
      look: {
        text: "The door seems to be locked, there is no handle or any other ways of opening it.",

        unable: "",

        readable: true
      },

      go: {
        effect: function () {},

        open: "",

        closed: "These door are locked shut, there is no way of opening them",

        openable: false

      }
    }
  }

}

function checkAction(action, obj, room){ // checks is action is available
  if (obj in story[room]){
    if (action in story[room][obj]) {
      return true;
    }
  }
  return false;
}

