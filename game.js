var started = false;
var givenColours = ["red", "green", "blue", "yellow"];
var userPattern = [];
var gamePattern = [];
var level = 0;

$("body").keypress(function() {
    if(!started) {
        $("h1").text("Level "+level);
        nextSequence();
        started = true;
    }
})

function nextSequence() {
    userPattern = [];
    level++;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomColour = givenColours[randomNumber];
    gamePattern.push(randomColour);
    playSound(randomColour);
    animate(randomColour);
}
function playSound(currentColor) {
    var audio = new Audio("./Public/sounds/"+currentColor+".mp3");
    audio.play();
}

function animate(currentColor) {
    $("#"+currentColor).fadeOut(200).fadeIn(200);
}

$(".btn").click(function() {
    var userColour = this.id;
    playSound(userColour);
    animate(userColour);
    userPattern.push(userColour);
    checkPatter(userPattern.length-1);
})

function checkPatter(currLength) {
    if(gamePattern[currLength] == userPattern[currLength]) {
        if(gamePattern.length == userPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000)
        }
    }
    else {
        $("h1").text("Game Over! Press any key to restart");
        playSound("wrong");
        $("body").addClass("extra");
        level = 0;
        started = false;
        gamePattern = [];
        userPattern = [];
        setTimeout(function() {
            $("body").removeClass("extra");
        }, 200)
    }
}