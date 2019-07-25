var api = {}

var actualDate = new Date();
var prevDate = new Date();
prevDate.setDate(actualDate.getDate() - 7);
var lastDate = new Date();
lastDate.setDate(actualDate.getDate() - 14);

var negotiations = [
      { date : actualDate, quantity : 1, value : 150},
      { date : actualDate, quantity : 2, value : 250},
      { date : actualDate, quantity : 3, value : 350},
      { date : prevDate, quantity : 1, value : 450},
      { date : prevDate, quantity : 2, value : 550},
      { date : prevDate, quantity : 3, value : 650},
      { date : lastDate, quantity : 1, value : 750},
      { date : lastDate, quantity : 2, value : 950},
      { date : lastDate, quantity : 3, value : 950}
    ];


api.week = function(req, res) {
    var actualNegotiations = negotiations.filter(function(negotiation) {
        return negotiation.date > prevDate;
    });
    res.json(actualNegotiations);
};

api.previous = function(req, res) {
   
   var prevNegotiations = negotiations.filter(function(negotiation) {
        return negotiation.date < actualDate && negotiation.date > lastDate;
    });
	setTimeout(function() {
		res.json(prevNegotiations);	
	}, 500);
    
};

api.last = function(req, res) {

   var lastNegotiations = negotiations.filter(function(negotiation) {
        return negotiation.date < prevDate;
    });
    res.json(lastNegotiations);
    
};

api.addNegotiation = function(req, res) {

   console.log(req.body);
   req.body.date = new Date(req.body.date.replace(/-/g,'/'));
   negotiations.push(req.body);
   res.status(200).json("Negotiation received");
};



module.exports = api;