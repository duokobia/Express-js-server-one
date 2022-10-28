const express =  require('express');
const PORT = 3000;

const app = express();

// We create a simple middleware to log the responds the server receives. To create the
// middleware, we define a function that takes the parameters, req, res, and next: 
function logger(req, res, next){
//We are going to log the unit timestamp of when the request is received, the request method, and the path the request was sent to.
console.log(`[${Date.now()}] ${req.method} ${req.url}`);

// Without calling the next(), the request NEVER MOVES PAST THIS MIDDLEWARE. Request is never sent. it just hangs there. AND YOUR BROWSER JUST KEEPS LOADING INDEFINITELY.
//This is A COMMON BUG TO TAKE NOTE OF.
next();
};


// Now we will register the middleware to run for every request by passing it to app.use.
app.use(logger);

// Creating a route localhost:3000/test
app.get('/test', (req, res) => {

    res.json({ ok: true});

});

// Creating a route that accepts dynamic parameters as its path localhost:3000/greet/dynamic params
app.get('/greet/:name', (req, res) => {

    res.json({ greeting: `Hello ${req.params.name}!` });

});

app.listen(PORT, () => console.log(`Server is now listening on port ${PORT}`));


//Creating routes and handlers and middlewares is ALL there is to creating servers.

