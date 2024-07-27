const fs = require('fs').promises;
const Papa = require('papaparse');
const PARSED_PATH = 'parsed.json';
const fileExists = path => fs.stat(path).then(() => true, () => false);

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


const main = async () => {
    if (await fileExists(PARSED_PATH)) {
	console.log("lol");
    } else {
	parseFile().then(
	    // data => console.log(data)
	    data => {
		let nameExists = data.filter(element => element.name == "AudioEye Inc")?.length == 1 ? true : false;
		console.log(nameExists);
		fs.writeFile(PARSED_PATH, JSON.stringify(data), function (err) {
		    if (err) throw err;
		    console.log('saved');
		});
	    }

	).catch(
	    error => console.log(error)
	)
    }
}

main();
