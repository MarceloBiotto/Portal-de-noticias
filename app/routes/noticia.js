module.exports = function(app) {

    app.get('/noticia', function(req, res) {

        var connection = app.config.dbConnection();
        var noticiasModel = new app.app.models.NoticiasDAO(connection);

        noticiasModel.getNoticia(function(error, result) {
            if (error) {
                console.error('Erro ao executar a query:', error);
                return res.status(500).send('Erro no banco de dados');
            }

            
            res.render("noticias/noticia", { noticias: result });
        });

        connection.end();
    });
};
