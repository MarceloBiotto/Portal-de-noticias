const mysql = require('mysql2');

var connMySQL = function(){

  
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '1234',
            database: 'portal_noticia'
        });
};
module.exports = function(){
   
    return connMySQL;

}