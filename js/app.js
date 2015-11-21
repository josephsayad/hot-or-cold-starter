var DEBUG = true;
var victoryCount = 0;

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
    var watchOut = hybridCase(numericalGuess);
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
    // hybridCase will return false if not all characters of the userInput 
    // evaluates to true when passed into parseInt(). This means a
    // conditional that restricts normal program behaviors should be at play
    // when watchOut is false; hence, else if !watchOut
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

    guessCount = 0;
    $('#guessList').find('li').remove();
    $('#count').replaceWith('<span id="count">'+ guessCount +'</span>');
    if (DEBUG) console.log('Random Number: '+ randomNumber + '\tGame: ' + gameNumber);

    $('.not-number').hide();
    $('.out-of-range').hide();
    $('.feedback-output').hide();
    $('.prompt').show();

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

  msg = feedback(range);

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

function restrictGamePlay(countRestriction) {
  if (victoryCount >= 2) {
    $('#guessList').find('li:last').hide();
    $('.feedback-output').replaceWith('<h2 class = "feedback-output">You have already won! Start a New Game.</h2>');
    $('.feedback-output').show();
    $('.out-of-range').hide();
    $('.not-number').hide();
  }
}