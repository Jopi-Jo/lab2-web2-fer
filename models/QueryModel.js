const db = require('../db')

module.exports = class Query {
    constructor(random) {
        this.random = random
    }

    static async fetchUserByQuery(query, checked) {
        let results = undefined;
        
        
        //if(checked){
            query = decodeURIComponent(query)
        //}
        
        //query = decodeURIComponent(query)

        results = await dbGetUsersByQuery(query, checked);
        
        return results
    }
}

dbGetUsersByQuery = async (query, checked) => {
    console.log(query)
    //^[A-Z][a-z]+( [A-Z][a-z]+)*$
    
    var sql = "SELECT * FROM users WHERE users.name = '" + query + "';";
    /*
    if(!checked){
        sql = encodeURIComponent(sql);
        console.log(sql);
    }
        */
    console.log(sql)
    try {
        if(!checked){
            const isValid = /^[a-zA-Z\s]+$/.test(query);
            if(!isValid) {
                return 'Wrong query. Please enter correct name using capital letters and alphabetic letters.'
            }

        }
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
};
