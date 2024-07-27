const fs = require('fs').promises;
const Papa = require('papaparse');
const mysql = require('mysql2/promise');
require('dotenv').config();

// parses the csv data file
const parseFile = async function () {

    // read csv file and reformat into json
    try {
        const data = await fs.readFile('data.csv', 'utf-8');

        const results = Papa.parse(data,
            {   
                header: true,
                skipEmptyLines: true
            }
        )

        // return json file
        return results.data;

    } catch (err) {
        console.log("error reading file");
        return null;
    }
};

// populates MySQL database using data from the .json
const insertData = async function(data) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    const insertQuery = `INSERT INTO companyINFO (ticker, name, environment_grade, 
    environment_level, environment_score, social_grade, 
    social_level, social_score, governance_grade, governance_level, 
    governance_score, total_score, total_grade, total_level) VALUES ?`
    const values = data.map(item => [
        item.ticker,
        item.name,
        item.environment_grade,
        item.environment_level,
        parseInt(item.environment_score),
        item.social_grade,
        item.social_level,
        parseInt(item.social_score),
        item.governance_grade,
        item.governance_level,
        parseInt(item.governance_score),
        parseInt(item.total_score),
        item.total_grade,
        item.total_level
    ]);

    try {
        await connection.query(insertQuery, [values]);
        console.log("Data inserted successfully");
    } catch (err) {
        console.log("Error inserting data:", err);
    } finally {
        await connection.end();
    }
};

parseFile().then(
    data => {
        if (data) {
            insertData(data);
        }
    }
).catch(
    error => console.log(error)
);