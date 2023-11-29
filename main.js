const letters = "abcdefghijklmnopqrstuvwxyz";

let lettersArray = Array.from(letters);

let lettersContainer = document.querySelector(".letters");

lettersArray.forEach((letter) => {
  let span = document.createElement("span");
  let theLetter = document.createTextNode(letter);
  span.appendChild(theLetter);

  span.className = "letter-box";
  lettersContainer.appendChild(span);
});

fetch("/words.json")
  .then((response) => response.json())
  .then((data) => {
    const words = data;
    let allKeys = Object.keys(words);

    let randomKey = Math.floor(Math.random() * allKeys.length);
    let randomName = allKeys[randomKey];
    let randomValue = words[randomName];

    let randomWordNum = Math.floor(Math.random() * randomValue.length);
    let randomWordName = randomValue[randomWordNum];

    document.querySelector(".game-info .category span").innerHTML = randomName;

    let letterGuessCont = document.querySelector(".letter-guess");

    let letterAndSpace = Array.from(randomWordName);

    letterAndSpace.forEach((letter) => {
      let emptySpan = document.createElement("span");

      if (letter === " ") {
        emptySpan.className = "has-space";
      }

      letterGuessCont.appendChild(emptySpan);
    });

    let guessSpans = document.querySelectorAll(".letter-guess span");

    let wrongAttempts = 0;

    let theDraw = document.querySelector(".hangman-draw");

    document.addEventListener("click", (e) => {
      let theStatus = false;

      if (e.target.className === "letter-box") {
        e.target.classList.add("clicked");

        let theclickedLetter = e.target.innerHTML.toLowerCase();

        letterAndSpace.forEach((wordLetter, wordIndex) => {
          if (theclickedLetter === wordLetter.toLowerCase()) {
            theStatus = true;

            guessSpans.forEach((span, spanIndex) => {
              if (wordIndex === spanIndex) {
                span.innerHTML = theclickedLetter;
              }
            });
          }
        });
        if (theStatus !== true) {
          wrongAttempts++;

          theDraw.classList.add(`wrong-${wrongAttempts}`);
          document.getElementById("wrong").play();
          if (wrongAttempts === 8) {
            endGameLose();
            lettersContainer.classList.add("finished");
          }
        } else {
          document.getElementById("correct").play();
        }
        if (checkWordGuessed()) {
          endGameWin();
          lettersContainer.classList.add("finished");
        }
      }
    });

    function checkLevel() {
      if (wrongAttempts === 0) {
        return `Hero`;
      } else if (wrongAttempts > 0 && wrongAttempts < 3) {
        return `Diamond`;
      } else if (wrongAttempts > 3 && wrongAttempts < 6) {
        return `Gold`;
      } else if (wrongAttempts > 6 && wrongAttempts < 7) {
        return `Silver`;
      } else if (wrongAttempts >= 8) {
        return `Bronze`;
      }
    }

    function checkWordGuessed() {
      const wordGuessed = Array.from(randomWordName.toLowerCase()).every(
        (letter) =>
          Array.from(letterGuessCont.textContent.toLowerCase()).includes(letter)
      );
      return wordGuessed;
    }

    function endGameLose() {
      let gameOver = document.createElement("div");

      document.getElementById("lose").play();
      let msg = document.createTextNode(
        `The Game Is Over, The Word Is ${randomWordName}`
      );
      gameOver.appendChild(msg);

      gameOver.className = "popup";
      document.body.appendChild(gameOver);
    }

    function endGameWin() {
      let gameOver = document.createElement("div");
      document.getElementById("win").play();
      let msg = document.createTextNode(
        `Congratulations! You've Guessed the Word "${randomWordName}" with ${wrongAttempts} Mistakes. Your Level Is ${checkLevel()}`
      );
      gameOver.appendChild(msg);

      gameOver.className = "popup";
      document.body.appendChild(gameOver);
    }
  });

/*{
  "programming": [
    {
      "word": "Python",
      "hint": "A popular programming language known for its simplicity and readability."
    },
    {
      "word": "Java",
      "hint": "An object-oriented programming language widely used for building applications."
    },
    {
      "word": "JavaScript",
      "hint": "A scripting language used for web development to add interactivity to websites."
    },
    {
      "word": "C++",
      "hint": "An extension of the C programming language often used for systems programming and game development."
    },
    {
      "word": "C#",
      "hint": "A Microsoft-developed language used for developing Windows applications."
    },
    {
      "word": "Ruby",
      "hint": "A dynamic and object-oriented programming language known for its simplicity and productivity."
    },
    {
      "word": "Swift",
      "hint": "Apple's programming language for building iOS, macOS, watchOS, and tvOS applications."
    },
    {
      "word": "PHP",
      "hint": "A server-side scripting language commonly used for web development."
    },
    {
      "word": "Go (Golang)",
      "hint": "A statically typed, compiled programming language developed by Google."
    },
    {
      "word": "Rust",
      "hint": "A systems programming language known for its memory safety and performance."
    },
    {
      "word": "TypeScript",
      "hint": "A superset of JavaScript that adds static typing to the language."
    },
    {
      "word": "Dart",
      "hint": "A language used for building web and mobile apps, developed by Google."
    },
    {
      "word": "R",
      "hint": "A programming language for statistical computing and data analysis."
    },
    {
      "word": "Assembly",
      "hint": "A low-level programming language that closely represents machine code."
    },
    {
      "word": "SQL",
      "hint": "A language used for managing and querying relational databases."
    },
    {
      "word": "VHDL",
      "hint": "A hardware description language used for designing digital circuits."
    },
    {
      "word": "Bash",
      "hint": "A Unix shell and command language used for scripting and automation."
    },
    {
      "word": "PowerShell",
      "hint": "A Microsoft-developed shell and scripting language for Windows."
    },
    {
      "word": "BASIC",
      "hint": "A family of high-level programming languages known for simplicity and ease of use."
    },
    {
      "word": "F#",
      "hint": "A functional-first programming language developed by Microsoft."
    },
    {
      "word": "Scheme",
      "hint": "A minimalist Lisp programming language known for its simplicity and elegance."
    },
    {
      "word": "BASIC",
      "hint": "A family of high-level programming languages known for simplicity and ease of use."
    }
  ],
  "movies": [
    {
      "word": "The Shawshank Redemption",
      "hint": "A classic film about hope and friendship."
    },
    {
      "word": "The Godfather",
      "hint": "An iconic crime drama film series."
    },
    {
      "word": "Pulp Fiction",
      "hint": "A Quentin Tarantino film known for its nonlinear storytelling."
    },
    {
      "word": "The Dark Knight",
      "hint": "A superhero film featuring Batman and the Joker."
    },
    {
      "word": "Schindler's List",
      "hint": "A powerful film about the Holocaust."
    },
    {
      "word": "Forrest Gump",
      "hint": "A heartwarming film about a man with a low IQ."
    },
    {
      "word": "The Matrix",
      "hint": "A science fiction action film known for its special effects."
    },
    {
      "word": "Inception",
      "hint": "A mind-bending science fiction film."
    },
    {
      "word": "Gladiator",
      "hint": "A historical action film set in ancient Rome."
    },
    {
      "word": "Titanic",
      "hint": "A romance and disaster film set on the ill-fated RMS Titanic."
    },
    {
      "word": "Avatar",
      "hint": "A visually stunning science fiction film directed by James Cameron."
    },
    {
      "word": "Jurassic Park",
      "hint": "A dinosaur-themed adventure film."
    },
    {
      "word": "The Lord of the Rings",
      "hint": "A fantasy film trilogy based on J.R.R. Tolkien's novels."
    },
    {
      "word": "Star Wars",
      "hint": "An epic space opera franchise created by George Lucas."
    },
    {
      "word": "The Avengers",
      "hint": "A superhero team-up film featuring Marvel Comics characters."
    },
    {
      "word": "The Lion King",
      "hint": "An animated classic from Disney."
    },
    {
      "word": "The Terminator",
      "hint": "A science fiction franchise featuring killer robots."
    },
    {
      "word": "Fight Club",
      "hint": "A cult film known for its underground fight clubs."
    },
    {
      "word": "The Silence of the Lambs",
      "hint": "A psychological thriller featuring Hannibal Lecter."
    }
  ],
  "people": [
    {
      "word": "Tom Hanks",
      "hint": "A renowned actor known for his roles in Forrest Gump and Cast Away."
    },
    {
      "word": "Meryl Streep",
      "hint": "An iconic actress with multiple Academy Awards."
    },
    {
      "word": "Leonardo DiCaprio",
      "hint": "A versatile actor known for Titanic and Inception."
    },
    {
      "word": "Brad Pitt",
      "hint": "An actor and producer known for roles in Fight Club and Inglourious Basterds."
    },
    {
      "word": "Jennifer Lawrence",
      "hint": "An Academy Award-winning actress known for The Hunger Games."
    },
    {
      "word": "Denzel Washington",
      "hint": "An acclaimed actor known for Training Day and Glory."
    },
    {
      "word": "Emma Stone",
      "hint": "An Academy Award-winning actress known for La La Land and The Help."
    },
    {
      "word": "Robert De Niro",
      "hint": "A legendary actor known for Taxi Driver and The Godfather Part II."
    },
    {
      "word": "Cate Blanchett",
      "hint": "An actress known for her roles in Elizabeth and Blue Jasmine."
    },
    {
      "word": "Johnny Depp",
      "hint": "An actor known for his eccentric roles in Pirates of the Caribbean."
    },
    {
      "word": "Scarlett Johansson",
      "hint": "An actress known for her role as Black Widow in the Marvel Cinematic Universe."
    },
    {
      "word": "Harrison Ford",
      "hint": "An actor known for his iconic roles as Han Solo and Indiana Jones."
    },
    {
      "word": "Natalie Portman",
      "hint": "An Academy Award-winning actress known for Black Swan and V for Vendetta."
    },
    {
      "word": "Sandra Bullock",
      "hint": "An actress known for The Blind Side and Gravity."
    },
    {
      "word": "Matt Damon",
      "hint": "An actor known for the Bourne series and Good Will Hunting."
    },
    {
      "word": "Julia Roberts",
      "hint": "An actress known for Pretty Woman and Erin Brockovich."
    },
    {
      "word": "Keanu Reeves",
      "hint": "An actor known for The Matrix and John Wick series."
    },
    {
      "word": "Angelina Jolie",
      "hint": "An actress known for Tomb Raider and Maleficent."
    },
    {
      "word": "Morgan Freeman",
      "hint": "An actor known for The Shawshank Redemption and Bruce Almighty."
    }
  ],
  "countries": [
    {
      "word": "Saudi Arabia",
      "hint": "A Middle Eastern country known for its oil reserves."
    },
    {
      "word": "Egypt",
      "hint": "An African country known for its ancient history and pyramids."
    },
    {
      "word": "Iraq",
      "hint": "A country in the Middle East known for its historical significance."
    },
    {
      "word": "Syria",
      "hint": "A Middle Eastern country known for its complex history and conflicts."
    },
    {
      "word": "Lebanon",
      "hint": "A country in the Middle East known for its cuisine and culture."
    },
    {
      "word": "Jordan",
      "hint": "A Middle Eastern country with historical sites like Petra."
    },
    {
      "word": "Tunisia",
      "hint": "A North African country known for its Mediterranean beaches."
    },
    {
      "word": "Morocco",
      "hint": "A North African country with diverse landscapes and cultures."
    },
    {
      "word": "Algeria",
      "hint": "A North African country known for its Sahara Desert."
    },
    {
      "word": "Kuwait",
      "hint": "A Middle Eastern country known for its oil wealth."
    },
    {
      "word": "Oman",
      "hint": "A country on the Arabian Peninsula known for its natural beauty."
    },
    {
      "word": "Qatar",
      "hint": "A Middle Eastern country known for its wealth and modern architecture."
    },
    {
      "word": "Bahrain",
      "hint": "A small island nation in the Persian Gulf."
    },
    {
      "word": "United Arab Emirates",
      "hint": "A federation of seven emirates known for its modern cities."
    },
    {
      "word": "Yemen",
      "hint": "A country in the Arabian Peninsula known for its historical sites."
    },
    {
      "word": "Libya",
      "hint": "A North African country with a diverse geography."
    },
    {
      "word": "Sudan",
      "hint": "A country in North Africa known for the Nile River."
    },
    {
      "word": "Mauritania",
      "hint": "A country in West Africa known for its deserts."
    },
    {
      "word": "Somalia",
      "hint": "A country in the Horn of Africa known for its coastline."
    },
    {
      "word": "Djibouti",
      "hint": "A small country in the Horn of Africa."
    }
  ]
}
*/
