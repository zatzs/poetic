//create database connection
module.exports = function(mysql){
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'databasesAreHard!418',
  database : 'poetic'
});


db.connect(function(err){
if(err){
  throw err;
}
console.log('Mysql is connected');
});
return db;
}
