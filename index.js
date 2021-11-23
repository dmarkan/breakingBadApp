const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
    const name = req.body.characterName;
    const url = "https://www.breakingbadapi.com/api/characters?name=" + name;

    https.get(url, function (response) {
    console.log(response.statusCode);
        response.on("data", function (data) {
            const breakingBadData = JSON.parse(data);
            const charName = breakingBadData[0].name;
            const charNick = breakingBadData[0].nickname;
            const charImg = breakingBadData[0].img;
            const charBirthday = breakingBadData[0].birthday;
            const charOccupation = breakingBadData[0].occupation;
            const charStatus = breakingBadData[0].status;
            const charPortrayed = breakingBadData[0].portrayed;
            const charAppearance = breakingBadData[0].appearance;
            res.write("<h2>" + charName + "</h2>");
            res.write("<img src=" + charImg + ">");
            res.write("<p>Nickname: " + charNick + "</p>");
            res.write("<p>Date of birth: " + charBirthday + "</p>");
            res.write("<p>Occupation: " + charOccupation + "</p>");
            res.write("<p>Status: " + charStatus + "</p>");
            res.write("<p>Portrayed by: " + charPortrayed + "</p>");
            res.write("<p>Appeared in seasons: " + charAppearance + "</p>");
            res.send();
        })
    })
})

app.listen(3000, function () {
    console.log("Server is running on port 3000");
})