const fs = require('fs').promises;
const Papa = require('papaparse');
const PARSED_PATH = 'parsed.json';
const fileExists = path => fs.stat(path).then(() => true, () => false);  // consider moving to lib later
const mysql = require('mysql2/promise');
require('dotenv').config();

// TODO: implement check if obtained permission to store data
// parses the csv data file
const parseFile = async function () {

    // read csv file and reformat into json
    try {
        const data = await fs.readFile('data.csv', 'utf-8');
        console.log("we get here");

        const results = Papa.parse(data, {
	    header: true,
	    skipEmptyLines: true
	})

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

    const insertQuery = `
        INSERT INTO companyINFO (ticker, name, environment_grade, 
        environment_level, environment_score, social_grade, 
        social_level, social_score, governance_grade, governance_level, 
        governance_score, total_score, total_grade, total_level) 
        VALUES ? 
        ON DUPLICATE KEY UPDATE 
        name = VALUES(name), 
        environment_grade = VALUES(environment_grade), 
        environment_level = VALUES(environment_level), 
        environment_score = VALUES(environment_score), 
        social_grade = VALUES(social_grade), 
        social_level = VALUES(social_level), 
        social_score = VALUES(social_score), 
        governance_grade = VALUES(governance_grade), 
        governance_level = VALUES(governance_level), 
        governance_score = VALUES(governance_score), 
        total_score = VALUES(total_score), 
        total_grade = VALUES(total_grade), 
        total_level = VALUES(total_level)
    `;
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

const main = async () => {
    if (await !fileExists(PARSED_PATH)) {
	parseFile().then(
	    data => {
		fs.writeFile(PARSED_PATH, JSON.stringify(data), function (err) {
		    if (err) throw err;
		    console.log('saved');
		});
	    }
	).catch(
	    error => console.log(error)
	)
    }
    // maybe add error handling?
    // this is a path and not a sting
    insertData(await fs.readFile(PARSED_PATH));
}

main();
