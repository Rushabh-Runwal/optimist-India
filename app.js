require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();


app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static("public"));

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/index.html");

});

app.get("/signUp", function (req, res) {
	res.sendFile(__dirname + "/signUpPage.html");

});

app.post("/signUp", function (req, res) {
	const Name = req.body.YourName;
	const email = req.body.Email;
	//	console.log(Name,email);
	const data = {
		members: [
			{
				email_address: email,
				status: "subscribed",
				merge_fields: {
					FNAME: Name,
				}
		}	
	   ]
	};


	const jsondata = JSON.stringify(data);

    const api_key = process.env.API_KEY;
    const audience_id = process.env.audience_id;
    console.log(api_key +" "+audience_id);
	const url = "https://us18.api.mailchimp.com/3.0/lists/"+audience_id;
	const option = {
		method: "POST",
		auth: "rushabh22:"+api_key,
	};

	const request = https.request(url, option, function (response) {
		if(response.statusCode===200) {
			res.sendFile(__dirname + "/Success.html");
		}
		else {
			res.sendFile(__dirname + "/failure.html");
		}	
		
		response.on("data", function (data) {
			console.log(JSON.parse(data));
		});
	});

	request.write(jsondata);
	request.end();
});



app.post("/failure",function(req,res){
	res.redirect("/");
});




let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function () {
	console.log("Server Started Successfully");
});



