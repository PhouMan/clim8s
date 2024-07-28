const { CohereClient } = require('cohere-ai');
require('dotenv').config();

// asks cohere AI to check for some sort of sustainability report
const askReport = async function(company) {
    // create cohere client using API key
    const cohere = new CohereClient({
        token: process.env.API_KEY,
    });

    try {
        // query the LLM
        const response = await cohere.chat({
            message: `Does ${company} have an ESG environment grade? Please provide ONLY the letter grade and null if there is no data available`
        });
        
        // return Cohere's message as a string instead of JSON 
        return response.chatHistory[1].message;
    } catch (error) {
        console.error(`Error querying Cohere: ${error}`);
        return null;
    }
};


// test function, remove later
// (async () => {
//     const result = await askReport("adsoadsoasd");
//     console.log(result);
// })();