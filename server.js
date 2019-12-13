const express = require("express")
const path = require("path")

const app = express();
const PORT = process.env.PORT || 3000;

const reservations = [];
const waitList = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "makeReservation.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "table.html"));
});

app.get("/api/waitlist", function (req, res) {
    res.sendFile(path.join(__dirname, "waitListApi.html"));
    res.json(waitList);
});

app.get("/api/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "makeTableApi.html"));
    res.json(reservations);
});

app.post("/api/tables", function (req, res) {
    const reservationRequest = req.body;
    if (reservations.length > 4) {
        console.log('waitlist')
        waitList.push(reservationRequest);
    } else {
        console.log('reservation')
        reservations.push(reservationRequest);
    }
})

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});