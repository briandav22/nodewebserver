const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');



app.use((req,res,next)=>{
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('unable to append')
		}
	});

	next();
});

// app.use((req,res,next)=>{
// 	res.render('maintenance')

// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
	return text.toUpperCase();
});

app.get('/', (req,res) => {
	// res.send('<h1>hello</h1>')
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to the Homepage'
	});	

});

app.get('/about', (req,res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
		});
});

app.get('/bad', (reg,res) => {
	res.send({
		errorMessage: 'unable to handle request'})
});

app.listen(3000, ()=>{
	console.log('server is up on port 3000')
});