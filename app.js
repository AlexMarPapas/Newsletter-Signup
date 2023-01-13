const express = require("express");
const { write } = require("node:fs");
const https = require("node:https");
const { resolve } = require("node:path");
const bodyParser = require("body-parser");
const request = require("request");
const port = 3000;
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});


mailchimp.setConfig({
  apiKey: "f52415661eb0f99c4398bde7f677ab66-us21",
  server: "us21",
});


app.post("/", function (req, res) {

  const listId = "3ed9d63076";
  
  const subscribingUser = {
    firstName: req.body.fName,
    lastName: req.body.lName,
    email: req.body.email,
  };

 async function run() {
   try {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName,
      },
    });
    console.log(response);
    res.sendFile(__dirname + "/success.html");
  } catch (error) {
    console.log(error.status);
    res.sendFile(__dirname + "/failure.html");
  }
  };


run();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(port, function () {
    console.log("The server's running on the port " + port);
  });

//My api key f52415661eb0f99c4398bde7f677ab66-us21, My listID 3ed9d63076



/// Angelas Code Below(but probably deprecated , coz it doesnt work!!! )///


// const firstName =  req.body.fName;
// const lastName = req.body.lName;
// const email = req.body.email;

//     const data = {
//         members: [
//            {
//              email_address: email,
//              status: "subscribe",
//              merge_fields: {
//                 FNAME: firstName,
//                 LNAME: lastName
//               }
//            }
//         ]
//     };
//     const jsonData = JSON.stringify(data);
//     const url = "https://us21.api.mailchimp.com/3.0/lists/3ed9d63076"

//     const options = {
//         method: "POST",
//         auth: "Alex:f52415661eb0f99c4398bde7f677ab66-us21"
//     }

//    const request = https.request(url, options, function(response) {
//         response.on("data", function(data) {
//             console.log(JSON.parse(data));
//         })
//     })
//     request.write(jsonData);
// request.end();

// });
