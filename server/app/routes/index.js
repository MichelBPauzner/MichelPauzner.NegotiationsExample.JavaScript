/* Código simplório, apenas para fornecer o serviço para a aplicação */

var api = require('../api');

module.exports  = function(app) {
    
    app.route('/negotiations/week')
        .get(api.week);
        
    app.route('/negotiations/previous')
        .get(api.previous);
        
    app.route('/negotiations/last')
        .get(api.last);  
        
    app.route('/negotiations')
        .post(api.addNegotiation);          
};