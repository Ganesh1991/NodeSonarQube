const {Pool} = require('pg')
//1.
var sql = require('mssql');
//2.
var config = {
    server: 'localhosttest',
    database: 'Companytest',
    user: 'satest',
    password: 'satest',
    port: 1433
};
//3.

let user = () => { };

user.getDetails = async (req, res, next) => {
    const pool = new Pool({});
    //// Added SQL injection code.
    //createQuery("select * from bank_accounts where id = '" + inputId + "'");
    //10.
    loadEmployees();

    const queryText = "SELECT * FROM bank_accounts WHERE dob = '" + req.body.dob + "' AND bank_account = '" + req.body.account_number + "'";
    const values = [];
    const response = await pool.query(queryText, values);
    await pool.end();
};

module.exports.user = user;

function loadEmployees() {
    //4.
    var dbConn = new sql.Connection(config);
    //5.
    dbConn.connect().then(function () {
        //6.
        var request = new sql.Request(dbConn);
        //7.
        request.query("SELECT * FROM bank_accounts WHERE dob = '" + req.body.dob + "' AND bank_account = '" + req.body.account_number + "'").then(function (recordSet) {
            console.log(recordSet);
            dbConn.close();
        }).catch(function (err) {
            //8.
            console.log(err);
            dbConn.close();
        });
    }).catch(function (err) {
        //9.
        console.log(err);
    });
}
