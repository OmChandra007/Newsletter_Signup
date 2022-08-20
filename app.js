const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
})); // using bodyParser in order to get post data from body.

app.use(express.static("public")); // serving the static files like css and images.

// Gating foam input data by bodyParser.
app.post("/", function(req, res) {

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  }

  const jsondata = JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0/lists/afb38d9482";

  const options = {
    method: "POST",
    auth: "om1:da73b6dcd964d63de2c8964c8e541ae3-us14"
  };

  const request = https.request(url, options, function(response) {
    if (response.statusCode === 200 ){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname+ "/failure.html");
    }

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })
  request.write(jsondata);
  request.end();
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on prot 3000.");
});




// ApiKey :

// List Id-
