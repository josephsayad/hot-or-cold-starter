// Switching the value of DEBUG will cease the firing of logs,
// or accounts, of the code being executed: Used for debugging
var DEBUG = true;

// victoryCount is declared a global variable to be used as a means 
// of restricting further gameplay: used in newGame(), restrictGamePlay()
// victoryCount is incremented at each instance the user submits the 
// proper guessed number and is re-assigned to zero after clicking a.new
var victoryCount = 0;

$(document).ready(function() {
  infoModalBox();
  newGame();
});

function infoModalBox() {
  $('.what').click(function() {
    $('.overlay').fadeIn(1000);
  });
  $('a.close').click(function() {
    $('.overlay').fadeOut(1000);
  });
}

function newGame() {
  // randomNumber is declared and, proceeding function invocation, is assigned 
  // to the return value of randomNumberGenerator(): occurs only one time in 
  // this instance of the program
  var randomNumber = randomNumberGenerator();
  var guessCount = 0, gameNumber = 1;

  if (DEBUG) console.log('Random Number: '+ randomNumber + ' Game: ' + gameNumber);

  $('#guessButton').on('click', function() {
    var numericalGuess = $('input').val();
    var watchOut = hybridCase(numericalGuess);
    // watchOut is a variable declared in the intention of tracking any string 
    // values that contain both letters and numbers: it is assigned to the return
    // value of the hybridCase() function, which assesses all userInput

    if (numericalGuess == '') {
      $('.prompt').show();
      $('.out-of-range').hide();
      $('.feedback-output').hide();
      $('.not-number').hide();
    }
    else if (!parseInt(numericalGuess) && numericalGuess != '0') {
      $('.prompt').hide();
      $('.out-of-range').hide();
      $('.feedback-output').hide();
      $('.not-number').show();
    }
    else if (numericalGuess <= 0 || numericalGuess > 100) {
      $('.prompt').hide();
      $('.not-number').hide();
      $('.feedback-output').hide();
      $('.out-of-range').show();
    }
    else if (!watchOut) {
      $('.prompt').hide();
      $('.feedback-output').hide();
      $('.out-of-range').hide();
      $('.not-number').show();
    }
    else {
      hotOrCold(numericalGuess, randomNumber);
      if (victoryCount < 2) {guessCount++;}
      addItem(numericalGuess);
      $('#count').replaceWith('<span id="count">'+ guessCount +'</span>');
    }
    restrictGamePlay(guessCount);
  });

  $('.new').on('click', function(){
    victoryCount = 0;
    gameNumber++;
    randomNumber = randomNumberGenerator();
    // games two through n recieve their random numbers at this instance of
    // the program: at each instance the user opts to play a new game, a new 
    // random number is returned and assigned to this variable  

    guessCount = 0;
    $('#guessList').find('li').remove();
    $('#count').replaceWith('<span id="count">'+ guessCount +'</span>');
    if (DEBUG) console.log('Random Number: '+ randomNumber + ' Game: ' + gameNumber);

    $('.not-number').hide();
    $('.out-of-range').hide();
    $('.feedback-output').hide();
    $('.prompt').show();
    
    // Clears text field, input#userGuess, at each instance the user opts to 
    // play a new game
    $('.text').val('');
  });

  $('#number-input-form').submit(function(event){
      event.preventDefault();
  });
}

function randomNumberGenerator() {
  return Math.floor((Math.random() * 100) + 1);
}

function hotOrCold(numericalGuessParameter, randomNumberParameter) {
  var range = undefined;

  var feedback = function(rangeParameter) {
    if (rangeParameter == 0) {
      victoryCount++;
      return 'You Got It! Champ.'
    }
    else if (rangeParameter >= 1 && rangeParameter <= 10) {
      return 'You\'re Guess is Very Hot';
    }
    else if (rangeParameter >= 10 && rangeParameter <= 20) {
      return 'You\'re Guess is Hot';
    }
    else if (rangeParameter >= 20 && rangeParameter <= 30) {
      return 'You\'re Guess is Warm';
    }
    else if (rangeParameter >= 30 && rangeParameter <= 50) {
      return 'You\'re Guess is Cold';
    }
    else if (rangeParameter > 50) {
      return 'You\'re Guess is Ice Cold';
    }
    else {
      return 'No luck! I only accept numbers!';
    }
  }

  if (numericalGuessParameter > randomNumberParameter) {
    range = numericalGuessParameter - randomNumberParameter;
  } 
  else {
    range = randomNumberParameter - numericalGuessParameter;
  }

  var msg = feedback(range);
  if (DEBUG) console.log('Guess: ' + numericalGuessParameter);
  $('.prompt').hide();
  $('.not-number').hide();
  $('.out-of-range').hide();
  $('.feedback-output').replaceWith('<h2 class = "feedback-output">'+ msg +'</h2>');
  $('.feedback-output').show();
}

function addItem(numericalGuessParameter) {
  $('#guessList').append('<li>'+ numericalGuessParameter +'</li>');
}

// When the user enters a value, such as '2ej,' hybridCase() takes this value, as its
// arguement, and assesses the string of three characters: hybridCase() takes each 
// character, via for loop, and passes the individual characters into parseInt()
// If parseInt() returns false, one of our three characters is a letter: hybridCase() 
// returns 'false'; otherwise, it is 'true' our three letter string is a proper numerical 
// guess 
function hybridCase(userInput) {
  for (var i = 0, len = userInput.length; i < len; i++) {
    if (userInput[i] != 0) {
      if (!parseInt(userInput[i])) {
        return false;
      }
    }
  }
  return true;
}

// Limits game play after the user submits the proper random number
function restrictGamePlay(countRestriction) {
  if (victoryCount >= 2) {
    $('#guessList').find('li:last').hide();
    $('.feedback-output').replaceWith('<h2 class = "feedback-output">You have already won! Start a New Game.</h2>');
    $('.feedback-output').show();
    $('.out-of-range').hide();
    $('.not-number').hide();
  }
}
