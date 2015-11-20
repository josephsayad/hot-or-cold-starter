var DEBUG = true;

$(document).ready(function(){
  infoModalBox();
  newGame();
});

function infoModalBox() {
  $('.what').click(function(){
    $('.overlay').fadeIn(1000);
  });
  $('a.close').click(function(){
    $('.overlay').fadeOut(1000);
  });
}

function newGame() {
  var randomNumber = randomNumberGenerator();
  var guessCount = 0, gameNumber = 1;
  if (DEBUG) console.log('Random Number: '+ randomNumber + '\tGame: ' + gameNumber);
  
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
      hotOrCold(numericalGuess, randomNumber);
      addItem(numericalGuess);
      guessCount++;
      $('#count').replaceWith('<span id="count">'+ guessCount +'</span>');
    }
  });

  $('.new').on('click', function(){
    gameNumber++;
    randomNumber = randomNumberGenerator();

    guessCount = 0;
    $('#guessList').find('li').remove();
    $('#count').replaceWith('<span id="count">'+ guessCount +'</span>');
    if (DEBUG) console.log('Random Number: '+ randomNumber + '\tGame: ' + gameNumber);

    $('.not-number').hide();
    $('.out-of-range').hide();
    $('.feedback-output').hide();
    $('.prompt').show();
  });

  $('#number-input-form').submit(function(event){
      event.preventDefault();
  });
}

function randomNumberGenerator() {
  return Math.floor((Math.random() * 100) + 1);
}

function hotOrCold(numericalGuessParameter, randomNumberParameter) {

  var range = undefined, victoryCount = 0;

  var feedback = function(rangeParameter) {

    if (rangeParameter == 0) {
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
  else if (numericalGuessParameter < randomNumberParameter) {
    range = randomNumberParameter - numericalGuessParameter;
  }

  msg = feedback(range);

  if (DEBUG) console.log('Guess: ' + numericalGuessParameter + '\tRange: ' + range + '\nFeedback: ' + msg);
  $('.prompt').hide();
  $('.not-number').hide();
  $('.out-of-range').hide();
  $('.feedback-output').replaceWith('<h2 class = "feedback-output">'+ msg +'</h2>');
  $('.feedback-output').show();
}

function addItem(numericalGuessParameter) {
  $('#guessList').append('<li>'+ numericalGuessParameter +'</li>');
}
