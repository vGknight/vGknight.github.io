function Fighter(health, attackP, counterAttack, myName, fullName) {
    this.health = health;
    this.attackP = attackP;
    this.counterAttack = counterAttack;
    this.attackIncrement = attackP;
    this.myName = myName;
    this.fullName = fullName;

    this.attack = function(count) { //method takes in opponents counter attack power,
        // this.health = this.health + this.attackP; //increased health by attack power
        this.health = this.health - count; // subtract passed in counter attack from enemy
        this.attackP = this.attackP + this.attackIncrement; //increase attack power for next punch
    };

    this.defend = function(count) { // 
            this.health = this.health - count;
        },
        this.counter = function() {
            return this.counterAttack;
        };
};
//set up fighter objects


var player1_Obj = new Fighter(120, 9, 16, "odb", "Ol' Dirty B******");
var player2_Obj = new Fighter(104, 11, 18, "ghost", "Ghost Face Killah");
var player3_Obj = new Fighter(130, 7, 13, "method", "Method Man");
var player4_Obj = new Fighter(155, 5, 9, "rza", "The Rza");
var winCount = 0;

//sound effects
var beginFightSnd = document.createElement("audio");
beginFightSnd.setAttribute("src", "./assets/audio/begin_fight.mp3");
var introSound = document.createElement("audio");
introSound.setAttribute("src", "./assets/audio/intro.mp3");

// set up fight

$(document).ready(function() {

    //hide stuff for intro
    $('#main-player-div').hide();
    hideButtons();
    $('#pick-hero').hide();
    $('#main-player-div').delay(6000).fadeIn('slow');
    $('#pick-hero').delay(7800).fadeIn('slow');
    introSound.play();

    myEnemy = "empty"; //set vars to static value to check agains for assignment not declaring global var since i need to delete this via a function and i cant delete global variables
    var myFighter = "empty";
    $("#good-guy").find("#pick-hero").addClass("callToAction");

    // populate default HP and ATtack
    var arr = [player1_Obj, player2_Obj, player3_Obj, player4_Obj];
    for (var i = 0; i < arr.length; i++) {
        theName = arr[i].myName;
        theAtk = arr[i].attackP;
        theHp = arr[i].health;
        theCA = arr[i].counterAttack;
        var myHp = $("#" + theName + "-health");
        var myAt = $("#" + theName + "-attack");
        var myCA = $("#" + theName + "-counter");
        myHp.html("HP: " + theHp);
        myAt.html("AT: " + theAtk);
        myCA.html("CA: " + theCA);

    }


    $('#main-player-div').on('click', 'div', function(e) {
        var x = this.id;

        if (myFighter === "empty") {
            myFighter = x;

            //move to fight area
            varId = this.id;
            $('#' + varId).appendTo('.hero-corner'); //move to div
            $('#' + varId).addClass("hero"); // turns hero  green

            $('#pick-hero').addClass('view-hidden');
            $('#enemy-h2').show();
            $('#enemy-h2').addClass('callToAction');
            $('.hero-corner').addClass('callToAction');
            $('.hero-corner').show();
            $('#defender').show();

            enemy = $("#main-player-div").find(".fighters");
            console.log(enemy);

            enemy.removeClass("hero");
            enemy.addClass("enemy"); //turns all enemies red
            enemy.appendTo('#bad-guy');

            // assign to correct fighter object
            if (myFighter === "box1") {
                myFighter = player1_Obj;
                console.log(myFighter);
            } else if (myFighter === "box2") {
                myFighter = player2_Obj;
                console.log(myFighter);
            } else if (myFighter === "box3") {
                myFighter = player3_Obj;
                console.log(myFighter);
            } else if (myFighter === "box4") {
                myFighter = player4_Obj;
            } else { console.log("something is wrong") };

        } else {
            // do nothing
            return;
        };


    });
    //select buttons in #bad guy div and log the id if enemy isnt already chosen

    $('#bad-guy').on('click', 'div', function(e) {

        beginFightSnd.play();
        setTimeout(showButtons,2800); // show buttons after intro sound    
        var x = this.id;
        if (myEnemy === "empty") {
            myEnemy = x;

            //move to fight area
            varId = this.id;
            $('#' + varId).prependTo('.enemy-corner'); //move to div
            $('#' + varId).addClass("enemy");
            $('#opponent').addClass('callToAction');
            $('#defender').show();
            $('#opponent').show();
            $('#opponent-area').show();
            $('#stats').show();
            $('#wage-war').show();
            $('#choose-enemy').hide();
            $('html, body').animate({
                scrollTop: ($('#defender').offset().top)
            }, 500); // turns them red
            // should create a function and call it here to secure the screens
            if (myEnemy === "box1") {
                myEnemy = player1_Obj;
                console.log(myEnemy.counter());
            } else if (myEnemy === "box2") {
                myEnemy = player2_Obj;
                console.log(myEnemy.counter());
            } else if (myEnemy === "box3") {
                myEnemy = player3_Obj;
                console.log(myEnemy.counter());
            } else if (myEnemy === "box4") {
                myEnemy = player4_Obj;
                console.log(myEnemy.counter());
            }

        } else {

            return;
        };

        // console.log("currently my enemy is " + myEnemy.myName);
        counter = myEnemy.counter();

    });


    function winCheck(myHealth, enemyHealth) {
        console.log("My Health is " + myHealth);
        console.log(myEnemy.myName + " his health is " + enemyHealth);
        if (myHealth > 0 && enemyHealth <= 0) {
            console.log("Good Guy wins");
            winCount++;
            clearStats();
            hideButtons();

            // alert(win)
            if (winCount == 3) {

                $('#hero').html("Winner");
                $('#attackBtn').hide();
                $('#resetBtn').show();
                $('#resetBtn').html("You Won! Play Again?");
                $('#stats').hide();
                $('#enemy').html("Defeated");
            } else { // show opponents to choose from
                $('#choose-enemy').show();
                $('#opponent').removeClass('callToAction');
            };

            $('html, body').animate({
                scrollTop: ($('#choose-enemy').offset().top)
            }, 500);
            cartOffEnemy();
            setTimeout(fadeEnemy, 500);
            // I lose and opponent is alive
        } else if (enemyHealth > 0 && myHealth <= 0) {
            $('#hero').html("Defeated");
            $('.hero-corner').addClass("fade");
            $('#attackBtn').hide();
            $('#resetBtn').html("You Lost :( Try Again?");
            $('#opponent').html("Winner");
            $('#stats').hide();


            // we both die
        } else if (myHealth <= 0 && enemyHealth <= 0) {
            console.log("you both died");
            alert("Game Over You Lose, But you killed this dude");
            $('#attackBtn').addClass('view-hidden');
        } else {
            console.log("Keep fighting");
        }
    }

    // on click  run attack, upate html
    $("#attackBtn").click(function() {
        console.log("myFigher var is " + myFighter.myName);


        if (myFighter && myEnemy != "empty") {


            // i attack my opponnent this increments the 
            $('#goodguy-fight').html("You attacked " + myEnemy.fullName + " for " + myFighter.attackP + " damage");


            myFighter.attack(counter); // call attack method
            // myFighter.defend(counter); // i defend myself from enemy counterAttack
            myEnemy.defend(myFighter.attackP); // hurt the enemy
            $('#badguy-fight').html(myEnemy.fullName + " attacked you back for " + myEnemy.counterAttack);
            console.log("My health is " + myFighter.health);
            console.log("Opponent health is " + myEnemy.health);

            winCheck(myFighter.health, myEnemy.health); // win/lose/continue check

            var myHp = $("#" + myFighter.myName + "-health");
            var myAt = $("#" + myFighter.myName + "-attack");
            myHp.html("HP: " + myFighter.health);
            myAt.html("Atk: " + myFighter.attackP);

            var oppHp = $("#" + myEnemy.myName + "-health");
            var oppAt = $("#" + myEnemy.myName + "-attack");
            oppHp.html("HP: " + myEnemy.health);
            oppAt.html("Atk: " + myEnemy.attackP);
            console.log("this is myenemys atk" + myEnemy.attackP)


        } else { console.log("Pick a fighter man") };




    });


    $("#resetBtn").click(function() {

        // set up reset code here
        window.location.reload(true);

    });


    $("#main-player-div").find(".btn").addClass("hero");
    $("#main-player-div").find(".fighters").addClass("hero");


});


function cartOffEnemy() {

    var fallenSoldier = $("#defender").find(".enemy");
    fallenSoldier.addClass("fade");
}


function resetEnemy() {
    delete window.myEnemy;
    window.myEnemy = "empty";
}


function fadeEnemy(id) {
    var fallenSoldier = $("#defender").find(".enemy");
    fallenSoldier.addClass("dead");
    resetEnemy();
}

function clearStats(){
    $('#goodguy-fight').empty();
    $('#badguy-fight').empty();
}

function hideButtons(){
    $("#resetBtn").hide();
    $("#attackBtn").hide();
}


function showButtons(){
    $("#resetBtn").show();
    $("#attackBtn").show();
}
