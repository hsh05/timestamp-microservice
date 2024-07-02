// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  let dateInput = req.params.date;

  if (dateInput && /^\d+$/.test(dateInput)) {
    dateInput = parseInt(dateInput);
  } else if (!dateInput) {
    dateInput = new Date();
  } else {
    let parsedDate = new Date(dateInput);

    if (isNaN(parsedDate.getTime())) {
      res.json({ error: "Invalid Date" });
      return;
    }

    dateInput = parsedDate;
  }

  let unixTimestamp = dateInput instanceof Date ? dateInput.getTime() : dateInput;
  let utcString = new Date(unixTimestamp).toUTCString();
  
  res.json({ unix: unixTimestamp, utc: utcString });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
