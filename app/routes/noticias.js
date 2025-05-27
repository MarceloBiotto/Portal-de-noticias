//var dbConnection = require('../../config/dbConnection')

module.exports = function(application){

    
    
    application.get('/noticias', function(req, res){

        var connection = application.config.dbConnection();
        var noticiasModel = new application.app.models.NoticiasDAO(connection);

        noticiasModel.getNoticias(function(error, result){
            if (error) {
                console.error('Erro ao executar a query:', error);
                return res.status(500).send('Erro no banco de dados');
            }

            res.render("noticias/noticias", {noticias : result});
        } )
   
        connection.end(); 
    });
};
