//Trivia Game


var trivia = {

    questionIndex: 0, // keep track of where we are in the question array
    answerIndex: -1,
    answerTime: 15, // change this to production time once testing complete
    questionsCorrect: 0,
    questionsIncorrect: 0,
    questionsUnanswered: 0,
    gameStarted: false,
    gamePaused: false,

    questions: [{
            question: "Who is the Boss of the New York crew?",
            choices: ["Johnny Sack", "Chucky Signore", "Carmine Lupertazzi", "Junior Soprano"],
            answer: 2
        },

        {
            question: "Which two sports did Tony play in high school a teenager?",
            choices: ["Baseball and Basketball", "Baseball and Rugby", "Football and Basketball", " Football and Baseball"],
            answer: 3
        },


        {
            question: "What health problem is Junior often treated for?",
            choices: ["Liver Problem", "Pink Eye", "Heart Problem", "Bad Back"],
            answer: 2
        },

        {
            question: "What was the name of the FBI agent that Sal Bonpensireo most frequently dealt with?",
            choices: ["Agent Grasso", "Agent Harris", "Agent Skip Lapari", "Agent Marquez"],
            answer: 2
        },

        {
            question: "What medication is Tony prescribed regularly for his depression?",
            choices: ["Paxil", "Prozac", "Zoloft", "Lithium"],
            answer: 1
        },

        {
            question: "Who is the owner of the Bada Bing club?",
            choices: ["Tony Soprano", "Silvio Dante", "Moe Green", "Carmella Soprano"],
            answer: 1
        },

        {
            question: "What is the name of the rapper in the first year that invites Christopher and Adriana to his house party, and later has problems with Hesh Rabkin? ",
            choices: ["MC Lyte", "Black Magic", "Massive Genious", "Krazy eye killa"],
            answer: 2
        },

        {
            question: "Which crew member is mentioned as being Adriana's uncle?",
            choices: ["Richie Aprile", "Ralphie", "Mikey Palmice", "Paulie"],
            answer: 0
        },

        {
            question: "On the Soprano Crew trip to Italy, which member was running late on the day of departure because they were buying a gift for their girlfriend/wife?",
            choices: ["Tony", "Furio", "Paulie", "Christopher"],
            answer: 3
        },

        {
            question: "Which of the following Soprano crew members did not make the trip to Italy?",
            choices: ["Silvio", "Paulie", "Tony", "Christopher"],
            answer: 0
        },

        {
            question: "Which Soprano family friend was run over by Richie Aprile after he got out of prison?",
            choices: ["Peter 'Beansie' Gaeta", "Davey Scatino", "Hesh Rabkin", "Artie Bucco"],
            answer: 0
        },

        {
            question: "Who does Dr. Melfi most blame for Tony's panic attacks and depression?",
            choices: ["His Wife Carmella", "His father Johnny", "His daughter Meadow", "His mother Livia"],
            answer: 3
        }, {
            question: "Which famous musicians offspring makes an appearance playing in the high rollers card game in Season 2?",
            choices: ["Elvis", "John Lennon", "Frank Sinatra", "Bono"],
            answer: 2
        },

        {
            question: "Finish this opening theme song lyric... 'Woke Up This Morning, got yourself a gun.....",
            choices: ["Momma always said you'd be the chosen one", "Momma never told you about right and wrong", "Poppa always said you'd be the chosen one", "Born under a bad sign"],
            answer: 0
        },

        {
            question: "Who can almost always seen smoking a cigarette?",
            choices: ["Junior", "Paulie", "Christopher", "Johnny Sack"],
            answer: 3
        }

    ],
    //methods

    run: function() {

        intervalId = setInterval(function() { trivia.decrement(); }, 1000);
        trivia.gameStarted = true;
        $(".answer").empty();
        trivia.showQuestion();
        $("#start-game").hide();
        $("#notification").hide();


    },

    decrement: function() {

        //  Decrease number by one.

        trivia.answerTime--;
        $("#countdown").html("<h2> Time Remaining: " + trivia.answerTime + "</h2>");
        //  Once number hits zero...
        if (trivia.answerTime === 0) {
            //  ...run the stop function.
            trivia.stop();
            //  Alert the user that time is up.
            console.log("Times Up for this one :-( ");
            $("#countdown").html("<h2>Times Up for this one :-(</h2>");
            //show correct answer in div
            trivia.showCorrect();

            trivia.questionsUnanswered++;
            
            
            if (trivia.gameOver()) {

                trivia.gameStarted = false;

            } else {
                trivia.questionIndex++; 
                // wait 5 seconds then move to next question
                setTimeout(function() {
                    trivia.nextQuestion();
                }, 5000);
            }
        }
    },

    stop: function() {

        //  Clears our intervalId
        clearInterval(intervalId);
    },

    showQuestion: function() {
        answerIndex = trivia.questions[trivia.questionIndex].answer; // set 
        $("#question").html("<h2>" + trivia.questions[trivia.questionIndex].question + "</h2>");
        $("#0").html("<h2>" + trivia.questions[trivia.questionIndex].choices[0] + "</h2>");
        $("#1").html("<h2>" + trivia.questions[trivia.questionIndex].choices[1] + "</h2>");
        $("#2").html("<h2>" + trivia.questions[trivia.questionIndex].choices[2] + "</h2>");
        $("#3").html("<h2>" + trivia.questions[trivia.questionIndex].choices[3] + "</h2>");

    },

    checkAnswer: function(choice) {
        var indexCorrect = trivia.questions[trivia.questionIndex].answer;
        var indexQuestion = choice;
        if (indexQuestion === indexCorrect) {
            // winner
            return true;
        } else {
            return false;
        }
    },

    nextQuestion: function() {
        trivia.answerTime = 15; // reset timer
        trivia.gamePaused = false; // un pause to allow clicks to actually do something
        trivia.showQuestion();
        trivia.run();
        $('#correct-answer').hide();
        $('.answer').show();
    },

    showCorrect: function() {
        var answerCorrectIndex = trivia.questions[trivia.questionIndex].answer;
        var correctAnswer = trivia.questions[trivia.questionIndex].choices[answerCorrectIndex];
        $("#notification").html("<h2>Sorry, the correct answer is.</h2>").show();
        trivia.hideWrongAnswer(answerCorrectIndex);
        trivia.gamePaused = true;

    },
    showScore: function() {
        // show final score screen
        $('#Correct-Guesses').html("Correct Guesses: " + trivia.questionsCorrect);
        $('#Incorrect-Guesses').html("Incorrect Guesses: " + trivia.questionsIncorrect);
        $('#Unanswered').html("Unanswered Questions " + trivia.questionsUnanswered);
        $("#restart-game").show();
        $("#stats").show();
    },

    restartGame: function() {

        trivia.questionIndex = 0, // keep track of where we are in the question array
        trivia.answerIndex = -1,
        trivia.answerTime = 15, // change this to production time once testing complete
        trivia.questionsCorrect = 0,
        trivia.questionsIncorrect = 0,
        trivia.questionsUnanswered = 0,
        trivia.gameStarted = true,
        trivia.gamePaused = false;
        $("#restart-game").hide();
        $("#stats").hide();
        $('#countdown').empty();
        trivia.run();
        $('.answer').show(); // unhide answers
    },

    hideWrongAnswer: function(answer) {
        trivia.gamePaused = true;
        arr = [0, 1, 2, 3];
        for (var i = 0; i < arr.length; i++) {
            if (i != answer) {
                $("#" + i).hide();
            }
        }
    },
    gameOver: function() {
        if ((trivia.questions.length - 1) === trivia.questionIndex) {
            console.log("end of game");
            trivia.showScore();
            trivia.gameStarted = false;
            return true;

        } else {
            return false;
        }
    }
};

// Start Game Stuff

$(document).ready(function() {

    $("#restart-game").hide();
    $("#stats").hide();

    $("#start-game").on("click", function() {
        trivia.run()
    });

    $("#restart-game").on("click", function() {
        trivia.restartGame();

    });

    $(".answer").on("click", function() {
        if (trivia.gameStarted && !trivia.gamePaused) {
            trivia.stop() // stop timer
            trivia.gamePaused = true; // set to true to stop click functions on answer divs
            trivia.showCorrect();
            //this.id returns the 'id' of the clicked element
            //we use this to compare to the answer in the trivia obj
            // check answer to see if it correct
            if (trivia.checkAnswer(parseInt(this.id))) {
                trivia.questionsCorrect++;
                $("#notification").html("<h2>Correct, the answer is</h2>").show();

            } else {
                trivia.questionsIncorrect++;
            }
            if (!trivia.gameOver()) {
                trivia.questionIndex++;
                setTimeout(function() {
                    trivia.nextQuestion();
                }, 3000);
            }
        }
    });

});