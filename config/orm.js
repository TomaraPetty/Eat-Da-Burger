const connection = require('../config/connection')

const orm = {
    selectAll: function(table, cb) {
        var dbQuery = "SELECT * FROM " + table + ';';

        connection.query(dbQuery, function(err, res) {
            if (err) {
                throw err;
            }
            cb(res);
        })
    }
    insertOne: function(table, cols, vals, cb) {
        var dbQuery = "INSERT INTO " +
        table +
        ') ' +
        'VALUES (' +
        createQmarks(vals.length) +
        ') ';

        console.log(dbQuery);
        connection.query(dbQuery, vals, function(err, res) {
            if (err) {
                throw (err);
            }
            cb(res)
        })
    }
}