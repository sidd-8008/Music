/* Load the Express library */
const express = require("express");
const mongoose = require("mongoose");
var request = require('request');
var querystring = require('querystring');
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config({path: '../.env'});

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const spotifyRoutes = require("./routes/spotify");


/*--------------------------------Create an HTTP server to handle responses--------------------------------*/
// Connect to MongoDB
mongoose
	.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
	.then(() => console.log("MongoDB connected..."))
	.catch(err => console.log(err));

const app = express();

// Init middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Logger
app.use("/", (req, res, next) => {
	console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}`);
	next();
});

// Routes:
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", spotifyRoutes);


// Listen to req
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running at Port ${PORT}`);
	authSpotifyApi();
});



const client_id = process.env.SPOTIFY_CLIENT_ID; // Your client id
const client_secret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret
access_token='';

function authSpotifyApi() {
	// access_token = 'BQBTD4Nd8dbavVg0XRSK7w-6Fp8cLi8o42woIvAB5aWVrjoR0NazMJv-eE7wYVZ3Q21Uw1Wv_-FapDC_B1U';
	/* 
		The access token expires after 1 hour. Uncomment the code below to request a new token (gets logged in the console).
		Replcae the token value with the `access_token` variable above and comment the code below again to prevent spams for 
		access token request to Spotify API if you are using hot-reload
	*/
	let options = {
		url: 'https://accounts.spotify.com/api/token',
		form: {
			grant_type: 'client_credentials'
		},
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
		}
	}
	request.post(options, (err, res, body) => {
		// console.log(res.data)
		access_token = JSON.parse(body).access_token;
	});
};