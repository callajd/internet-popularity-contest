"use strict";
var APP_ID = "amzn1.ask.skill.546859eb-0fc8-4116-93eb-432a6867c816";

var GAME_LENGTH = 5;  // The number of questions per trivia game.
var GAME_STATES = {
    TRIVIA: "_TRIVIAMODE", // Asking trivia questions.
    START: "_STARTMODE", // Entry point, start the game.
    HELP: "_HELPMODE" // The user is asking for help.
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
            "REPEAT_QUESTION_MESSAGE": "To repeat the last question, say, repeat. ",
            "ASK_MESSAGE_START": "Would you like to start playing?",
            "HELP_REPROMPT": "To give an answer to a question, respond with the name of who you think has the most followers on that social network. ",
            "STOP_MESSAGE": "Would you like to keep playing?",
            "CANCEL_MESSAGE": "Ok, let\'s play again soon.",
            "NO_MESSAGE": "Ok, we\'ll play another time. Goodbye!",
            "TRIVIA_UNHANDLED": "Try saying one of the given names.",
            "HELP_UNHANDLED": "Say yes to continue, or no to end the game.",
            "START_UNHANDLED": "Say start to start a new game.",
            "NEW_GAME_MESSAGE": "It's time to play the great %s! ",
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
    }/**,
    "en-GB": {
        "translation": {
            "QUESTIONS" : questions["QUESTIONS_EN_GB"],
            "GAME_NAME" : "Internet Popularity Contest" // Be sure to change this for your skill.
        }
    },
    "de": {
        "translation": {
            "QUESTIONS" : questions["QUESTIONS_DE_DE"],
            "GAME_NAME" : "Wissenswertes über Rentiere in Deutsch", // Be sure to change this for your skill.
            "HELP_MESSAGE": "Ich stelle dir %s Multiple-Choice-Fragen. Antworte mit der Zahl, die zur richtigen Antwort gehört. " +
            "Sage beispielsweise eins, zwei, drei oder vier. Du kannst jederzeit ein neues Spiel beginnen, sage einfach „Spiel starten“. ",
            "REPEAT_QUESTION_MESSAGE": "Wenn die letzte Frage wiederholt werden soll, sage „Wiederholen“ ",
            "ASK_MESSAGE_START": "Möchten Sie beginnen?",
            "HELP_REPROMPT": "Wenn du eine Frage beantworten willst, antworte mit der Zahl, die zur richtigen Antwort gehört. ",
            "STOP_MESSAGE": "Möchtest du weiterspielen?",
            "CANCEL_MESSAGE": "OK, dann lass uns bald mal wieder spielen.",
            "NO_MESSAGE": "OK, spielen wir ein andermal. Auf Wiedersehen!",
            "TRIVIA_UNHANDLED": "Sagt eine Zahl beispielsweise zwischen 1 und %s",
            "HELP_UNHANDLED": "Sage ja, um fortzufahren, oder nein, um das Spiel zu beenden.",
            "START_UNHANDLED": "Du kannst jederzeit ein neues Spiel beginnen, sage einfach „Spiel starten“.",
            "NEW_GAME_MESSAGE": "Willkommen bei %s. ",
            "WELCOME_MESSAGE": "Ich stelle dir %s Fragen und du versuchst, so viele wie möglich richtig zu beantworten. " +
            "Sage einfach die Zahl, die zur richtigen Antwort passt. Fangen wir an. ",
            "ANSWER_CORRECT_MESSAGE": "Richtig. ",
            "ANSWER_WRONG_MESSAGE": "Falsch. ",
            "CORRECT_ANSWER_MESSAGE": "Die richtige Antwort ist %s: %s. ",
            "ANSWER_IS_MESSAGE": "Diese Antwort ist ",
            "TELL_QUESTION_MESSAGE": "Frage %s. %s ",
            "GAME_OVER_MESSAGE": "Du hast %s von %s richtig beantwortet. Danke fürs Mitspielen!",
            "SCORE_IS_MESSAGE": "Dein Ergebnis ist %s. "
        }
    } */
};

var Alexa = require("alexa-sdk");
// var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageString;
    alexa.registerHandlers(newSessionHandlers, startStateHandlers, triviaStateHandlers, helpStateHandlers);
    alexa.execute();
};

var newSessionHandlers = {
    "LaunchRequest": function () {
        this.handler.state = GAME_STATES.START;
        this.emitWithState("StartGame", true);
    },
    "AMAZON.StartOverIntent": function() {
        this.handler.state = GAME_STATES.START;
        this.emitWithState("StartGame", true);
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

var startStateHandlers = Alexa.CreateStateHandler(GAME_STATES.START, {
    "StartGame": function (newGame) {
        var speechOutput = newGame ? this.t("NEW_GAME_MESSAGE", this.t("GAME_NAME")) + this.t("WELCOME_MESSAGE", GAME_LENGTH.toString()) : "";

        var question = getRandomElements(this.t("QUESTION_TEMPLATES"), 1);
        var accounts = getRandomElements(this.t("ACCOUNTS"), 2);
        var socialNetwork = getRandomElements(this.t("SOCIAL_NETWORKS"), 1);

        var repromptText = question[0].replace("NAME_ONE", accounts[0].name).replace("NAME_TWO", accounts[1].name).replace("SOCIAL_NETWORK", socialNetwork[0]);

        var sortedAccounts = accounts.sort(function(a, b) {
                                               return parseInt(a[socialNetwork].Count) - parseInt(b[socialNetwork].Count);
                                           });

        speechOutput += repromptText;

        Object.assign(this.attributes, {
            "speechOutput": repromptText,
            "repromptText": repromptText,
            "currentQuestionIndex": 0,
            "score": 0,
            "correctAccount" : sortedAccounts[1],
            "incorrectAccount" : sortedAccounts[0],
            "socialNetwork" : socialNetwork
        });

        // Set the current state to trivia mode. The skill will now use handlers defined in triviaStateHandlers
        this.handler.state = GAME_STATES.TRIVIA;
        this.emit(":ask", speechOutput, repromptText);
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
    var answerSlotValid = isAnswerSlotValid(this.event.request.intent);
    var speechOutput = "";
    var speechOutputAnalysis = "";
    var gameQuestions = this.attributes.questions;
    var correctAnswerIndex = parseInt(this.attributes.correctAnswerIndex);
    var currentScore = parseInt(this.attributes.score);
    var currentQuestionIndex = parseInt(this.attributes.currentQuestionIndex);
    var correctAnswerText = this.attributes.correctAnswerText;
    var translatedQuestions = this.t("QUESTIONS");
    var previousQuestion = this.attributes.repromptText;
    var userWasCorrect = false;

    if (this.event.request.intent.slots.Answer.value.toLowerCase() == this.attributes.correctAccount.name.toLowerCase()) {
        currentScore++;
        userWasCorrect = true;
        speechOutputAnalysis = this.t("ANSWER_CORRECT_MESSAGE");
    } else {
        if (!userGaveUp) {
            speechOutputAnalysis = this.t("ANSWER_WRONG_MESSAGE");
        }

        speechOutputAnalysis += this.t("CORRECT_ANSWER_MESSAGE", this.attributes.correctAccount.name);
    }

    // Check if we can exit the game session after GAME_LENGTH questions (zero-indexed)
    if (this.attributes["currentQuestionIndex"] == GAME_LENGTH - 1) {
        speechOutput = userGaveUp ? "" : this.t("ANSWER_IS_MESSAGE");
        var scoreRemark = this.t("SCORE" + currentScore.toString());
        speechOutput += speechOutputAnalysis + this.t("GAME_OVER_MESSAGE", currentScore.toString(), GAME_LENGTH.toString(), scoreRemark);

        var previousAccount = this.attributes.correctAccount;
        var cardAnswerText = this.t("CARD_ANSWER_TEXT", previousAccount.name, previousAccount[this.attributes.previousSocialNetwork].Description, this.attributes.previousSocialNetwork);

        /*var cardImage = {
                          //"smallImageUrl" : "https://s3.amazonaws.com/internet-popularity-contest/lilwayne_small.png",
                          //"smallImageUrl" : "https://pbs.twimg.com/profile_images/712863751/lil-wayne-gq-2_400x400.jpg",
                          "smallImageUrl" : "https://scontent-sea1-1.cdninstagram.com/t51.2885-19/11085128_896424373733633_1338923514_a.jpg",
                          "largeImageUrl" : "https://s3.amazonaws.com/internet-popularity-contest/lilwayne_large.png"
                        }; */
        this.emit(":tellWithCard", speechOutput, cardAnswerText, previousQuestion/*, cardImage */);
    } else {
        currentQuestionIndex++;

        // First, build card from previous round

        var card = getCard(this.attributes.correctAccount, this.attributes.incorrectAccount, this.attributes.socialNetwork, userWasCorrect);

        // Then, build next question and answer

        var question = getRandomElements(this.t("QUESTION_TEMPLATES"), 1)[0];
        var accounts = getRandomElements(this.t("ACCOUNTS"), 2);
        var socialNetwork = getRandomElements(this.t("SOCIAL_NETWORKS"), 1)[0];

        var repromptText = question.replace("NAME_ONE", accounts[0].name).replace("NAME_TWO", accounts[1].name).replace("SOCIAL_NETWORK", socialNetwork);

        var sortedAccounts = accounts.sort(function(a, b) {
                                               return parseInt(a[socialNetwork].Count) - parseInt(b[socialNetwork].Count);
                                           });

        speechOutput += speechOutputAnalysis + " " + repromptText;

        Object.assign(this.attributes, {
            "speechOutput": repromptText,
            "repromptText": repromptText,
            "currentQuestionIndex": currentQuestionIndex,
            "questions": gameQuestions,
            "score": currentScore,
            "correctAnswerText": sortedAccounts[1].name,
            "correctAccount": sortedAccounts[1],
            "incorrectAccount": sortedAccounts[0],
            "previousSocialNetwork" : socialNetwork
        });

        // Set the current state to trivia mode. The skill will now use handlers defined in triviaStateHandlers
        this.handler.state = GAME_STATES.TRIVIA;
        var cardImage = {
                          //"smallImageUrl" : "https://s3.amazonaws.com/internet-popularity-contest/lilwayne_small.png",
                          //"smallImageUrl" : "https://pbs.twimg.com/profile_images/712863751/lil-wayne-gq-2_400x400.jpg",
                          "smallImageUrl" : "https://scontent-sea1-1.cdninstagram.com/t51.2885-19/11085128_896424373733633_1338923514_a.jpg",
                          "largeImageUrl" : "https://s3.amazonaws.com/internet-popularity-contest/lilwayne_large.png"
                        };
        this.emit(":askWithCard", speechOutput, repromptText, card.Title, card.Content/*, cardImage*/);
    }
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

function populateGameQuestions(translatedQuestions) {
    var gameQuestions = [];
    var indexList = [];
    var index = translatedQuestions.length;

    if (GAME_LENGTH > index){
        throw new Error("Invalid Game Length.");
    }

    for (var i = 0; i < translatedQuestions.length; i++){
        indexList.push(i);
    }

    // Pick GAME_LENGTH random questions from the list to ask the user, make sure there are no repeats.
    for (var j = 0; j < GAME_LENGTH; j++){
        var rand = Math.floor(Math.random() * index);
        index -= 1;

        var temp = indexList[index];
        indexList[index] = indexList[rand];
        indexList[rand] = temp;
        gameQuestions.push(indexList[index]);
    }

    return gameQuestions;
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

function isAnswerSlotValid(intent) {
    return true;
}
