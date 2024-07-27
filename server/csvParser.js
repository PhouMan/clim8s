const fs = require('fs').promises;
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
    // data => console.log(data)
    data => {
	let filtered = data.filter(element => element.name == "AudioEye Inc")?.length == 1 ? true : false;
	console.log(filtered);
    }

).catch(
    error => console.log(error)
)
