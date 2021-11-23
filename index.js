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
            res.setHeader("Content-Type", "text/html");   // res.write not working properly. It's showing output including HTML tags --- to FIX this problem
            res.write("<body style='background-image: url(images/background.png); background-size: cover; background-attachment: fixed; background-repeat: no-repeat;'>")
            res.write("<h1 style='text-align:center;color:#fff;font-size:5rem;'>" + charName + "</h1>");
            res.write("<img style='width:30rem;height:35rem;margin: auto;display: block;' src=" + charImg + "><br>");
            res.write("<p style='text-align:center;color:#fff;;font-size:1.5rem;'>Nickname: " + charNick + "</p>");
            res.write("<p style='text-align:center;color:#fff;;font-size:1.5rem;'>Date of birth: " + charBirthday + "</p>");
            res.write("<p style='text-align:center;color:#fff;;font-size:1.5rem;'>Occupation: " + charOccupation + "</p>");
            res.write("<p style='text-align:center;color:#fff;;font-size:1.5rem;'>Status: " + charStatus + "</p>");
            res.write("<p style='text-align:center;color:#fff;;font-size:1.5rem;'>Portrayed by: " + charPortrayed + "</p>");
            res.write("<p style='text-align:center;color:#fff;;font-size:1.5rem;'>Appeared in seasons: " + charAppearance + "</p>");
            res.send();
        })
    });
})

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000");
})