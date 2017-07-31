"use strict";
var APP_ID = "amzn1.ask.skill.546859eb-0fc8-4116-93eb-432a6867c816";

var GAME_LENGTH = 5;  // The number of questions per trivia game.
var GAME_STATES = {
    SELECT_MODE: "_SELECTMODE", // Choose game type.
    START: "_STARTMODE", // Setup and start the game.
    TRIVIA: "_TRIVIAMODE", // Asking trivia questions.
    HELP: "_HELPMODE" // The user is asking for help.
};
var GAME_MODES = {
  STREAK: "Streak",
  STANDARD: "Standard"
};
var questions = require("./questions");

var languageString = {
    "en": {
        "translation": {
            "QUESTION_TEMPLATES" : questions["QUESTION_TEMPLATES"],
            "ACCOUNTS" : questions["ACCOUNTS"],
            "SOCIAL_NETWORKS" : questions["SOCIAL_NETWORKS"],
            "QUESTIONS" : questions["QUESTIONS_EN_US"],
            "GAME_NAME" : "Internet Popularity Contest",

            "HELP_MESSAGE": "I will ask you who has more followers on a specific social network.  Respond with the name of who you think has the most followers on that social network. " +
            " For example, say Katy Perry. To start a new game at any time, say, start game. ",
            "HELP_REPROMPT": "To give an answer to a question, respond with the name of who you think has the most followers on that social network. ",
            "REPEAT_QUESTION_MESSAGE": "To repeat the last question, say, repeat. ",

            "ASK_MESSAGE_START": "Would you like to start playing?",
            "STOP_MESSAGE": "Would you like to keep playing?",
            "CANCEL_MESSAGE": "Ok, let\'s play again soon.",
            "NO_MESSAGE": "Ok, we\'ll play another time. Goodbye!",

            "TRIVIA_UNHANDLED": "Try saying one of the given names.",
            "HELP_UNHANDLED": "Say yes to continue, or no to end the game.",
            "START_UNHANDLED": "Say start to start a new game.",

            "NEW_GAME_MESSAGE": "This is the great Internet Popularity Contest!",
            "WELCOME_MESSAGE": "I will ask you some multiple choice questions, just say your answer's name. Let's do this.  ",

            "ANSWER_CORRECT_MESSAGE": "correct. ",
            "ANSWER_WRONG_MESSAGE": "wrong. ",
            "CORRECT_ANSWER_MESSAGE": "It's %s. ",
            "ANSWER_IS_MESSAGE": "That answer is ",
            "TELL_QUESTION_MESSAGE": "Question %s. %s ",

            "GAME_OVER_MESSAGE": "You got %s out of %s questions correct.  %s",
            "SCORE_IS_MESSAGE": "Your score is %s. ",

            "CARD_ANSWER_TEXT": "%s has %s %s followers.",

            "SCORE5": "Please slowly step away from the social media.",
            "SCORE4": "Not bad I guess, unless you're a perfectionist like I am.",
            "SCORE3": "I've never really been a big fan of mediocrity myself.",
            "SCORE2": "That's closer to getting none right than it is getting them all right.",
            "SCORE1": "There's this thing called the internet.  You might want to look in to it.",
            "SCORE0": "My annoying sister Siri could do better than that."
        }
    },
    "en-US": {
        "translation": {
          "QUESTION_TEMPLATES" : questions["QUESTION_TEMPLATES"],
          "ACCOUNTS" : questions["ACCOUNTS"],
          "SOCIAL_NETWORKS" : questions["SOCIAL_NETWORKS"],
          "QUESTIONS" : questions["QUESTIONS_EN_US"],
          "GAME_NAME" : "Internet Popularity Contest"
        }
    }
};

var Alexa = require("alexa-sdk");

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageString;
    alexa.registerHandlers(newSessionHandlers, selectModeStateHandlers, startStateHandlers, triviaStateHandlers, helpStateHandlers);
    alexa.execute();
};

var newSessionHandlers = {
    "LaunchRequest": function () {
        this.handler.state = GAME_STATES.SELECT_MODE;
        this.emitWithState("SelectMode", true);
    },
    "AMAZON.StartOverIntent": function() {
        this.handler.state = GAME_STATES.SELECT_MODE;
        this.emitWithState("SelectMode", false);
    },
    "AMAZON.HelpIntent": function() {
        this.handler.state = GAME_STATES.HELP;
        this.emitWithState("helpTheUser", true);
    },
    "Unhandled": function () {
        var speechOutput = this.t("START_UNHANDLED");
        this.emit(":ask", speechOutput, speechOutput);
    }
};

var selectModeStateHandlers = Alexa.CreateStateHandler(GAME_STATES.SELECT_MODE, {
    "SelectMode" : function (onLaunch) {
      var speechOutput = onLaunch ? this.t("NEW_GAME_MESSAGE", this.t("GAME_NAME")) + this.t("WELCOME_MESSAGE") : "";
      var repromptText = "Would you like to play a standard game or play in streak mode?";
      speechOutput += repromptText;

      this.handler.state = GAME_STATES.START;

      this.emit(":ask", speechOutput, repromptText);
    }
});

var startStateHandlers = Alexa.CreateStateHandler(GAME_STATES.START, {
    "StartGame": function (newGame) {
        var gameMode = this.event.request.intent.slots.GameMode.value;
        // var speechOutput = newGame ? this.t("NEW_GAME_MESSAGE", this.t("GAME_NAME")) + this.t("WELCOME_MESSAGE") : "";


        writeAttributes(this, gameMode, /* score */ 0, /* questionCount */ 0);
        speechOutput += this.attributes.speechOutput;
        // Set the current state to trivia mode. The skill will now use handlers defined in triviaStateHandlers
        this.handler.state = GAME_STATES.TRIVIA;

        this.emit(":ask", speechOutput, this.attributes.repromptText);
    },
    "AMAZON.StartOverIntent": function () {
        this.handler.state = GAME_STATES.START;
        this.emitWithState("StartGame", false);
    },
    "AMAZON.RepeatIntent": function () {
        this.emit(":ask", this.attributes["speechOutput"], this.attributes["repromptText"]);
    },
    "AMAZON.HelpIntent": function () {
        this.handler.state = GAME_STATES.HELP;
        this.emitWithState("helpTheUser", false);
    },
    "AMAZON.StopIntent": function () {
        this.handler.state = GAME_STATES.HELP;
        var speechOutput = this.t("STOP_MESSAGE");
        this.emit(":ask", speechOutput, speechOutput);
    },
    "AMAZON.CancelIntent": function () {
        this.emit(":tell", this.t("CANCEL_MESSAGE"));
    },
    "Unhandled": function () {
        var speechOutput = this.t("TRIVIA_UNHANDLED");
        this.emit(":ask", speechOutput, speechOutput);
    },
    "SessionEndedRequest": function () {
        console.log("Session ended in trivia state: " + this.event.request.reason);
    }
});

var triviaStateHandlers = Alexa.CreateStateHandler(GAME_STATES.TRIVIA, {
    "AnswerIntent": function () {
        handleUserGuess.call(this, false);
    },
    "DontKnowIntent": function () {
        handleUserGuess.call(this, true);
    },
    "AMAZON.StartOverIntent": function () {
        this.handler.state = GAME_STATES.START;
        this.emitWithState("StartGame", false);
    },
    "AMAZON.RepeatIntent": function () {
        this.emit(":ask", this.attributes["speechOutput"], this.attributes["repromptText"]);
    },
    "AMAZON.HelpIntent": function () {
        this.handler.state = GAME_STATES.HELP;
        this.emitWithState("helpTheUser", false);
    },
    "AMAZON.StopIntent": function () {
        this.handler.state = GAME_STATES.HELP;
        var speechOutput = this.t("STOP_MESSAGE");
        this.emit(":ask", speechOutput, speechOutput);
    },
    "AMAZON.CancelIntent": function () {
        this.emit(":tell", this.t("CANCEL_MESSAGE"));
    },
    "Unhandled": function () {
        var speechOutput = this.t("TRIVIA_UNHANDLED");
        this.emit(":ask", speechOutput, speechOutput);
    },
    "SessionEndedRequest": function () {
        console.log("Session ended in trivia state: " + this.event.request.reason);
    }
});

var helpStateHandlers = Alexa.CreateStateHandler(GAME_STATES.HELP, {
    "helpTheUser": function (newGame) {
        var askMessage = newGame ? this.t("ASK_MESSAGE_START") : this.t("REPEAT_QUESTION_MESSAGE") + this.t("STOP_MESSAGE");
        var speechOutput = this.t("HELP_MESSAGE") + askMessage;
        var repromptText = this.t("HELP_REPROMPT") + askMessage;
        this.emit(":ask", speechOutput, repromptText);
    },
    "AMAZON.StartOverIntent": function () {
        this.handler.state = GAME_STATES.START;
        this.emitWithState("StartGame", false);
    },
    "AMAZON.RepeatIntent": function () {
        var newGame = (this.attributes["speechOutput"] && this.attributes["repromptText"]) ? false : true;
        this.emitWithState("helpTheUser", newGame);
    },
    "AMAZON.HelpIntent": function() {
        var newGame = (this.attributes["speechOutput"] && this.attributes["repromptText"]) ? false : true;
        this.emitWithState("helpTheUser", newGame);
    },
    "AMAZON.YesIntent": function() {
        if (this.attributes["speechOutput"] && this.attributes["repromptText"]) {
            this.handler.state = GAME_STATES.TRIVIA;
            this.emitWithState("AMAZON.RepeatIntent");
        } else {
            this.handler.state = GAME_STATES.START;
            this.emitWithState("StartGame", false);
        }
    },
    "AMAZON.NoIntent": function() {
        var speechOutput = this.t("NO_MESSAGE");
        this.emit(":tell", speechOutput);
    },
    "AMAZON.StopIntent": function () {
        var speechOutput = this.t("STOP_MESSAGE");
        this.emit(":ask", speechOutput, speechOutput);
    },
    "AMAZON.CancelIntent": function () {
        this.emit(":tell", this.t("CANCEL_MESSAGE"));
    },
    "Unhandled": function () {
        var speechOutput = this.t("HELP_UNHANDLED");
        this.emit(":ask", speechOutput, speechOutput);
    },
    "SessionEndedRequest": function () {
        console.log("Session ended in help state: " + this.event.request.reason);
    }
});

function handleUserGuess(userGaveUp) {

    var speechOutput = "";
    var speechOutputAnalysis = "";
    var gameMode = this.attributes.gameMode;
    var questionCount = parseInt(this.attributes.questionCount) + 1;
    var score = parseInt(this.attributes.score);
    //var previousQuestion = this.attributes.repromptText;
    var userWasCorrect = this.event.request.intent.slots.Answer.value.toLowerCase() == this.attributes.correctAccount.name.toLowerCase();
    var card = getCard(this.attributes.correctAccount,
                       this.attributes.incorrectAccount,
                       this.attributes.socialNetwork,
                       userWasCorrect);

    if (userWasCorrect) {
        score++;
        speechOutputAnalysis = this.t("ANSWER_CORRECT_MESSAGE");
    } else {
        if (!userGaveUp) {
            speechOutputAnalysis = this.t("ANSWER_WRONG_MESSAGE");
        }
        speechOutputAnalysis += this.t("CORRECT_ANSWER_MESSAGE", this.attributes.correctAccount.name);
    }

    // Check if we can exit the game session after GAME_LENGTH questions (zero-indexed)
    if (questionCount == GAME_LENGTH) {

        speechOutput = userGaveUp ? "" : this.t("ANSWER_IS_MESSAGE");
        var scoreRemark = this.t("SCORE" + score.toString());
        speechOutput += speechOutputAnalysis + this.t("GAME_OVER_MESSAGE", score.toString(), GAME_LENGTH.toString(), scoreRemark);

        this.emit(":tellWithCard", speechOutput, card.Title, card.Content);
    } else {

        writeAttributes(this, this.attributes.gameMode, score, questionCount);
        speechOutput += speechOutputAnalysis + " " + this.attributes.speechOutput;
        // Set the current state to trivia mode. The skill will now use handlers defined in triviaStateHandlers
        this.handler.state = GAME_STATES.TRIVIA;
        this.emit(":askWithCard", speechOutput, this.attributes.repromptText, card.Title, card.Content);
    }
}

function writeAttributes(target, gameMode, score, questionCount) {
  var question = getRandomElements(target.t("QUESTION_TEMPLATES"), 1)[0];
  var accounts = getRandomElements(target.t("ACCOUNTS"), 2);
  var socialNetwork = getRandomElements(target.t("SOCIAL_NETWORKS"), 1)[0];

  var sortedAccounts = accounts.sort(function(a, b) {
                                         return parseInt(a[socialNetwork].Count) - parseInt(b[socialNetwork].Count);
                                     });

  var repromptText = question.replace("NAME_ONE", accounts[0].name)
                             .replace("NAME_TWO", accounts[1].name)
                             .replace("SOCIAL_NETWORK", socialNetwork);

  Object.assign(target.attributes, {
      "speechOutput": repromptText,
      "repromptText": repromptText,
      "gameMode": gameMode,
      "score": score,
      "questionCount": questionCount,
      "correctAccount" : sortedAccounts[1],
      "incorrectAccount" : sortedAccounts[0],
      "socialNetwork" : socialNetwork
  });
}

function getCard(answer, wrongAnswer, socialNetwork, userWasCorrect) {
  var card = {
    "Title" : "",
    "Content": ""
  };

  if(userWasCorrect) {
    var emoji = getRandomElements(questions["CORRECT_EMOJI"], 1)[0];
    var titleMessage = getRandomElements(questions["CORRECT_TEMPLATES"], 1)[0];
    card["Title"] = emoji + " " + titleMessage;
  } else {
    var emoji = getRandomElements(questions["INCORRECT_EMOJI"], 1)[0];
    var titleMessage = getRandomElements(questions["INCORRECT_TEMPLATES"], 1)[0];
    card["Title"] = emoji + " " + titleMessage;
  }

  var answerMessage = getRandomElements(questions["CARD_CONTENT_TEMPLATES"], 1)[0];
  answerMessage = answerMessage.replace("FOLLOWER_COUNT", answer[socialNetwork].Description)
                               .replace("SOCIAL_NETWORK", socialNetwork)
                               .replace("NAME_ONE", answer.name)
                               .replace("NAME_TWO", wrongAnswer.name);
  card["Content"] = answerMessage;
  return card;
}

function getRandomElements(array, count) {
  if(count > array.length) {
    throw new Error("Count cannot be greater than the length of the array.");
  }

  var shuffledArray = array.slice();

  for(var i = 0; i < array.length; i++) {
    var rand = Math.floor(Math.random() * array.length);
    var temp = shuffledArray[i];
    shuffledArray[i] = shuffledArray[rand];
    shuffledArray[rand] = temp;
  }

  return shuffledArray.slice(0, count);
}
