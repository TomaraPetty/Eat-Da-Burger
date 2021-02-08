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
    },
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
    },
    update: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;
    
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
    
        console.log(queryString);
        connection.query(queryString, function(err, result) {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
      }
}

module.exports = orm;