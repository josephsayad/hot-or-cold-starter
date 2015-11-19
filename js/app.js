var DEBUG = true;

$(document).ready(function(){
  infoModalBox();
  newGame();
});

// Shows and hides the Information Modal Box via 
// fadeIn and fadeOut Methods
function infoModalBox() {
  $('.what').click(function(){
    $('.overlay').fadeIn(1000);
  });
  $('a.close').click(function(){
  	$('.overlay').fadeOut(1000);
  });
}

function newGame() {
  var secretNumber = randomNumberGenerator();
  var guessCount = 0;

  $('#guessButton').on('click', function() {

    var numericalGuess = $('input').val();
    if (!parseInt(numericalGuess) && numericalGuess != '0') {
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
    else {
      hotOrCold(numericalGuess, secretNumber);
      addItem(numericalGuess, guessCount);
    }
  });

  $('#number-input-form').submit(function(event){
      event.preventDefault();
  });
}

// Returns a random number in the Range of 1 to 100
function randomNumberGenerator() {
  return Math.floor((Math.random() * 100) + 1);
}

function hotOrCold(numericalGuessParameter, secretNumberParameter) {
  // Declared and assigned to undefined as a means of reserving 
  // memory for an object with no value
  var range = undefined;

  var feedback = function(rangeParameter) {
    if (rangeParameter == 0) {
      return 'You Got It, Champ';
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

  if (numericalGuessParameter > secretNumberParameter) {
    range = numericalGuessParameter - secretNumberParameter;
  }
  else {
    range = secretNumberParameter - numericalGuessParameter;
  }

  msg = feedback(range);

  if (DEBUG) console.log('SecretNumber: '+ secretNumberParameter + ' Guess: ' + numericalGuessParameter + '\nRange: ' + range + ' feedback: ' + msg);
  $('.prompt').hide();
  $('.not-number').hide();
  $('.out-of-range').hide();
  $('.feedback-output').replaceWith('<h2 class = "feedback-output">'+ msg +'</h2>');
  $('.feedback-output').show();
}

function addItem(numericalGuessParameter, guessCountParameter) {
  guessCountParameter = guessCountParameter + 1;
  $('#guessList').append('<li>'+ numericalGuessParameter +'</li>');
  $('#count').replaceWith('<span id="count">'+ guessCountParameter +'</span>')
}