import { promises as fs } from 'fs';
import Papa from 'papaparse';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();
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


async function connect() {
    const connected = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    return connected;
};

// populates MySQL database using data from the .json
const insertData = async function(data) {
    const connection = connect();

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
//queries the companies environmental grade
async function queryCompanyEnvironmental(name) {
    const connection = await connect();
    const selectQuery = `SELECT * FROM companyINFO WHERE name LIKE "%${name}%"`;

    try {
        const [results, fields] = await connection.query(selectQuery)
        console.log(results[0].environment_grade);

    } catch (err){
        console.log("Error fetching company", err);
    } finally {
        await connection.end();
    }
};

export {queryCompanyEnvironmental};

// parseFile().then(
//     data => {
//         if (data) {
//             insertData(data);
//         }
//     }
// ).catch(
//     error => console.log(error)
// );


//TEST DELETE THIS
// queryCompanyEnvironmental("CHEEMS");