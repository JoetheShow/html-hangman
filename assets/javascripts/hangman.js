class Hangman {
  static word;
  static lives = 6;
  static won = false;

  static newGame() {
    console.log("- Starting Hangman -");

    this.lives = 6;

    this.resetLetters();
    this.hidePerson();
    this.pickWord();
    this.drawWord();
  }

  static gameOver() {
    setTimeout(function() {
      alert("You lost");
      Hangman.revealAllLetters();
    }, 10);
  }

  static hidePerson() {
    $(".hangman-gallow").children(".man-head, .man-torso, .man-left-arm, .man-right-arm, .man-left-leg, .man-right-leg").addClass("hide");
  }

  static resetLetters() {
    $(".hangman-letters").children(".letter").removeClass("disabled");
  }

  static pickWord() {
    this.word = this.availableWords()[Math.floor(Math.random() * (this.availableWords().length - 1))].toLowerCase();
  }

  static availableWords() {
    // Random words from a website for now. Maybe find a random word API later?
    return ["clinic", "warn", "pitch", "defend", "admire", "member", "theory", "linear", "strikebreaker", "fog", "annual", "dramatic", "cabin", "map", "solo", "bind", "weigh", "proper", "evaluate", "offend", "collar", "paradox", "jury", "endorse", "thin", "habitat", "linger", "save", "brand", "bride"];
  }

  static drawWord() {
    $(".hangman-word").html("");

    for(var i = 0; i < this.word.length; i++) {
      $(".hangman-word").append(this.letterHTML());
    }
  }

  static letterHTML() {
    return `<span class="word-letter">&nbsp;</span>`;
  }

  static guessLetter(letter) {
    if(!this.lives) { return }

    letter = letter.toLowerCase();

    if(this.word.includes(letter)) {
      this.revealLetter(letter);

      if(this.allLettersRevealed()) {
        this.won = true;
        setTimeout(function() {
          alert("You won!");
        }, 10);
      }
    } else {
      this.lives -= 1;

      this.addBodyPart();

      if(!this.lives) {
        this.gameOver();
      }
    }
  }

  static revealAllLetters() {
    for(var i = 0; i < this.word.length; i++) {
      this.revealLetter(this.word[i]);
    }
  }

  static allLettersRevealed() {
    let allLetters = true;

    for(var i = 0; i < this.word.length; i++) {
      if($($(".hangman-word").children(".word-letter")[i]).html() == "&nbsp;") {
        allLetters = false;
      }
    }

    return allLetters;
  }

  static revealLetter(letter) {
    for (var i = 0; i < this.word.length; i++) {
      if(this.word[i] == letter) {
        $($(".hangman-word").children(".word-letter")[i]).html(letter);
      }
    }
  }

  static addBodyPart() {
    console.log("adding body part");
    let bodyParts = ["man-right-leg", "man-left-leg", "man-right-arm", "man-left-arm", "man-torso", "man-head"]

    $(".hangman-gallow").children("." + bodyParts[this.lives]).removeClass("hide");
  }
}
