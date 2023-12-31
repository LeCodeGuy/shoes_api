// Import ExpressJS framework
import express from 'express';

// Import middleware
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
import flash from 'express-flash';
import session from 'express-session';

// Import modules
import services from './services/shoe-catalog-services.js';
import db from './routes/database-connection.js';
import routes from './routes/shoe-catalog-routes.js';

import productRoutes from './routes/product-routes.js';
import productAPI from './api/product-api.js';
import productService from './services/product-service.js';

// Setup a simple ExpressJS server
const app = express();

// Initialise session middleware - flash-express depends on this don't let it down
app.use(session({
    secret : '<add a secret string here>',
    resave: false,
    saveUninitialized: true
  }));

// Initialise flash middleware
app.use(flash());

// Make public folder available to the app
app.use(express.static('public'));

// handlebar engine settings
const handlebarSetup = exphbs.engine({
    // Define custom helpers
    helpers: {
        eq: function (v1, v2) {
            return v1 === v2;
        },
        lte: function (v1, v2) {
            return v1 <= v2;
        },
        gte: function (v1, v2) {
            return v1 >= v2;
        }
    },
    partialsDir: './views/partials',
    viewPath: './views',
    layoutsDir: './views/layouts'
})

// setup handlebars
app.engine('handlebars', handlebarSetup);
// set handlebars as the view engine
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));
// parse application/json
app.use(bodyParser.json());

// Instantiate the app
let productServices  = productService(db);
let productRoute = productRoutes(productServices);
let productsAPI = productAPI(productServices)

function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', { error: err });
}

// *Routes
// Landing page
// app.get('/',productRoutes.home);

// *API Routes
app.get('/api/shoes', productsAPI.showAll);
app.get('/api/shoes/brand/:brandname', productsAPI.filterByBrand);
app.get('/api/shoes/size/:size', productsAPI.filterBySize);
app.get('/api/shoes/color/:color', productsAPI.filterByColor);
app.get('/api/shoes/brand/:brandname/size/:size', productsAPI.filterByBrandSize);
app.post('/api/shoes/sold/:id', productsAPI.saleMade);
app.post('/api/shoes', productsAPI.addStock);

app.use(errorHandler);

// Set PORT variable
let port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('App starting on port', port);
});