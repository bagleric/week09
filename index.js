var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.get('/', function (request, response) {
  response.render('pages/index');
});
app.get('/mailPrice', function (request, response) {
  handleMail(request, response);
});
app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});

function handleMail(request, response) {
  var weight = Number(request.query.weight);
  var type = request.query.packageType;
  if (type == "stamped") {
    handleStamped(weight, response);
  }
  if (type == "metered") {
    handleMetered(weight, response);
  }
  if (type == "flat") {
    handleFlat(weight, response);
  }
  if (type == "parcel") {
    handleParcel(weight, response);
  }
}

function handleStamped(weight, response) {
  var cost = "0.00";
  if (weight > 3.5) {
    response.render('pages/weightError', {
      "type": "Letters (Stamped)"
      , "weight": weight
      , "max":3.5
    });
  }
  else if (weight <= 1) {
    cost = "0.49";
  }
  else if (weight <= 2) {
    cost = "0.70";
  }
  else if (weight <= 3) {
    cost = "0.91";
  }
  else if (weight <= 3.5) {
    cost = "1.12";
  }
  else {
    response.render('pages/error');
  }
  
  response.render('pages/ordersummary', {
    "type": "Letters (Stamped)"
    , "weight": weight
    , "cost": cost
  })
}

function handleMetered(weight, response) {
  var cost = "0.00";
  if (weight > 3.5) {
    response.render('pages/weightError', {
      "type": "Letters (Metered)"
      , "weight": weight
      , "max": 3.5
    });
  }
  else if (weight <= 1) {
    cost = "0.46";
  }
  else if (weight <= 2) {
    cost = "0.67";
  }
  else if (weight <= 3) {
    cost = "0.88";
  }
  else if (weight <= 3.5) {
    cost = "1.09";
  }
  else {
    response.render('pages/error');
  }
  response.render('pages/ordersummary', {
    "type": "Letters (Metered)"
    , "weight": weight
    , "cost": cost
  })
}

function handleFlat(weight, response) {
  var cost = "0.00";
  if (weight > 13) {
    response.render('pages/weightError', {
      "type": "Large Envelopes (Flats)"
      , "weight": weight
      , "max": 13
    });
  }
  else if (weight <= 1) {
    cost = "0.98";
  }
  else if (weight <= 2) {
    cost = "1.19";
  }
  else if (weight <= 3) {
    cost = "1.40";
  }
  else if (weight <= 4) {
    cost = "1.61";
  }
  else if (weight <= 5) {
    cost = "1.82";
  }
  else if (weight <= 6) {
    cost = "2.03";
  }
  else if (weight <= 7) {
    cost = "2.24";
  }
  else if (weight <= 8) {
    cost = "2.45";
  }
  else if (weight <= 9) {
    cost = "2.66";
  }
  else if (weight <= 10) {
    cost = "2.87";
  }
  else if (weight <= 11) {
    cost = "3.08";
  }
  else if (weight <= 12) {
    cost = "3.29";
  }
  else if (weight <= 13) {
    cost = "3.50";
  }
  else {
    response.render('pages/error');
  }
  response.render('pages/ordersummary', {
    "type": "Large Envelopes (Flats)"
    , "weight": weight
    , "cost": cost
  })
}

function handleParcel(weight, response) {
  var cost = "0.00";
  if (weight > 13) {
    response.render('pages/weightError', {
      "type": "Parcel"
      , "weight": weight
      , "max":13
    });
  }
  else if (weight <= 1) {
    cost = "3.00";
  }
  else if (weight <= 2) {
    cost = "3.00";
  }
  else if (weight <= 3) {
    cost = "3.00";
  }
  else if (weight <= 4) {
    cost = "3.00";
  }
  else if (weight <= 5) {
    cost = "3.16";
  }
  else if (weight <= 6) {
    cost = "3.32";
  }
  else if (weight <= 7) {
    cost = "3.48";
  }
  else if (weight <= 8) {
    cost = "3.64";
  }
  else if (weight <= 9) {
    cost = "3.80";
  }
  else if (weight <= 10) {
    cost = "3.96";
  }
  else if (weight <= 11) {
    cost = "4.19";
  }
  else if (weight <= 12) {
    cost = "4.36";
  }
  else if (weight <= 13) {
    cost = "4.53";
  }
  else {
    response.render('pages/error');
  }
  response.render('pages/ordersummary', {
    "type": "Parcel"
    , "weight": weight
    , "cost": cost
  })
}