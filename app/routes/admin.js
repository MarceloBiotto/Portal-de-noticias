const { format } = require("mysql2");

module.exports = function(application){

    application.get('/formulario_inclusao_noticia', function(req, res){
    res.render("admin/form_add_noticia")
    });

    
     application.post('/noticias/salvar', function(req, res){
        var noticia = req.body;


        req.assert('titulo','Título é obrigatório!').notEmpty();
        req.assert('resumo','Resumo é obrigatório!').notEmpty();
        req.assert('resumo','Resumo deve conter entre 10 e 100 caracteres!').len(10,100);
        req.assert('autor','Autor é obrigatório!').notEmpty();
        req.assert('data_noticia','Data é obrigatório!').notEmpty().isDate({format: 'YYY-MM-DD'});
        req.assert('noticia','Noticia é obrigatório!').notEmpty();

        var erros= req.validationErrors();

        if(erros){
            res.render("admin/form_add_noticia")
            return;
        }
        
        var connection = application.config.dbConnection();
        var noticiasModel = new application.app.models.NoticiasDAO(connection);

        noticiasModel.salvarNoticia(noticia, function(error, result){
            if (error) {
                console.error('Erro ao executar a query:', error);
                return res.status(500).send('Erro no banco de dados');
            }
            
            res.redirect('/noticias')
                
        });
    });



}