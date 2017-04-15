var Basic = require("./basic_constructor");
var inquirer = require("inquirer");
var fs = require("fs");
var correct = 0;
var wrong = 0;
var cardArray = [];

var pullCardInfo = (log) => {
    cardArray = [];
    
    fs.readFile(log.txt, "utf8", function(error, data) {

        var jsonContent = JSON.parse(data);

        for (let i = 0; i < jsonContent.length; i++) {
            cardArray.push(jsonContent[i]);
        }
    });
};

var study = (log, x) => {

    fs.readFile(log.txt, "utf8", function(error, data) {

        var cleanData = JSON.parse(data);

        if (x < cleanData.length) {

            if (cleanData[x].hasOwnProperty("front")) {

                var card = new SimpleCard(cleanData[x].front, cleanData[x].back);
                var gameQuestion = card.front;
                var gameAnswer = card.back.toLowerCase();

            inquirer.prompt([{
                name: "question",
                message: gameQuestion

            }]).then(function(answers) {

                if (answers.question.toLowerCase().indexOf(gameAnswer) > -1) {
                    console.log('Your Correct!');
                    correct++;
                    x++;
                    study(log, x);
                } else {
                    card.printAnswer();
                    wrong++;
                    x++;
                    study(log, x);
                }
				study();
            })

        } else {
            console.log('So take a look at your results: ');
            console.log('correct: ' + correct);
            console.log('wrong: ' + wrong);
            correct = 0;
            wrong = 0;
        }
    };
};

study();
