const fs = require('fs');
const Papa = require('papaparse');

// parses the csv data file
const parseFile = async function () {

    // read csv file and reformat into json
        try {
            const data = await fs.readFile('data.csv', 'utf-8');
            console.log("we get here");

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

parseFile().then(
    data => console.log(data)
).catch(
    error => console.log(error)
)