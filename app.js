var config = require('./config.json');

var express = require('express');

var OAuth = require('oauth').OAuth
	, oauth = new OAuth(
	"https://api.twitter.com/oauth/request_token",
	"https://api.twitter.com/oauth/access_token",
	config.twitter.consumer_key,
	config.twitter.consumer_secret,
	"1.0",
	"http://localhost:4000/auth/twitter/callback",
	"HMAC-SHA1"
);

var app = express();

var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser());
app.use(session({
	secret: config.cookie_secret,
	resave: false,
	saveUninitialized: true,
	cookie: { secure: !true }
}));

app.get('/auth/twitter', function(req, res) {
	oauth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results) {
		if (error) {
			console.log(error);
			res.send("Authentication Failed!");
		}
		else {
			req.session.oauth = {
				token: oauth_token,
				token_secret: oauth_token_secret
			};
			console.log(req.session.oauth);
			res.redirect('https://twitter.com/oauth/authenticate?oauth_token='+oauth_token)
		}
	});

});

app.get('/auth/twitter/callback', function(req, res, next) {

	if (req.session.oauth) {
		req.session.oauth.verifier = req.query.oauth_verifier;
		var oauth_data = req.session.oauth;

		oauth.getOAuthAccessToken(
			oauth_data.token,
			oauth_data.token_secret,
			oauth_data.verifier,
			function(error, oauth_access_token, oauth_access_token_secret, results) {
				if (error) {
					console.log(error);
					res.send("Authentication Failure!");
				}
				else {
					req.session.oauth.access_token = oauth_access_token;
					req.session.oauth.access_token_secret = oauth_access_token_secret;
					console.log(results, req.session.oauth);
					res.send("Authentication Successful");
					// res.redirect('/'); // You might actually want to redirect!
				}
			}
		);
	}
	else {
		res.send("Authentication Failed.");
	}

});

app.use(express.static('frontend/webroot'));

var server = app.listen(4000, function(){
	console.log("PORT:" + server.address().port);
});