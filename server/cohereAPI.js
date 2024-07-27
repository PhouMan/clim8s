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
            message: `Does ${company} have a ESG environment grade? Please respond in either "yes" or "no"`
        });
        
        return response;
    } catch (error) {
        console.error(`Error querying Cohere: ${error}`);
        return null;
    }
};

const checkHasReport = function(company){
    askReport(company).then(response => {
        console.log(response);
    }).catch(error => {
        console.error('Error:', error);
    });
}

checkHasReport("Disney");