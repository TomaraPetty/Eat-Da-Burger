const connection = require('../config/connection.js');

function objToSql(ob) {
    var arr = [];
  
    for (var key in ob) {
      var value = ob[key];
      
      if (Object.hasOwnProperty.call(ob, key)) {
        
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        
        arr.push(key + "=" + value);
      }
    }
  
    return arr.toString();
  }


const orm = {
    selectAll: function(table, cb) {
        var dbQuery = "SELECT * FROM " + table + ';';

        connection.query(dbQuery, function(err, res) {
            if (err) {
                throw err;
            }
            cb(res);
        });
    },
    insertOne: function(table, cols, vals, cb) {
        var dbQuery = "INSERT INTO " +
        table;

        dbQuery += " (";
        dbQuery += cols.toString();
        dbQuery += ") ";
        dbQuery += "VALUES (";
        dbQuery += printQuestionMarks(vals.length);
        dbQuery += ") ";

        console.log(dbQuery);
        
        connection.query(dbQuery, vals, function(err, res) {
            if (err) {
                throw (err);
            }
            cb(res);
        })
    },
    update: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;
    
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
    
        console.log(queryString);
        connection.query(queryString, function(err, res) {
          if (err) {
            throw err;
          }
    
          cb(res);
        });
      },
      delete: function(table, condition, cb) {
        var dbQuery = "DELETE FROM " + table;
        dbQuery += " WHERE ";
        dbQuery += condition;
    
        connection.query(dbQuery, function(err, res) {
          if (err) {
            throw err;
          }
    
          cb(res);
        });
      }

};

module.exports = orm;