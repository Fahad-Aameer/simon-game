var buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var gameStart = false;
var level = 0;

$(".btn").click(function (e) {
    var userChosenColour = $(e.target).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

$('body').keydown(function () {
    if (!gameStart) {
        nextSequence();
        gameStart = true;
        $('h1').text("Level " + level);
    }
});

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);

    $("." + randomChosenColour).fadeOut().fadeIn();
    level++;
    $('h1').text("Level " + level);
}

function playSound(name) {
    var audio = new Audio('sounds/' + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        var wrongAudio = new Audio('sounds/wrong.mp3');
        wrongAudio.play();
        $('body').addClass('game-over');
        setTimeout(function () {
            $('body').removeClass("game-over");
        }, 200);
        $('h1').text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver()
{
    level = 0;
    gamePattern = [];
    gameStart = false;
}