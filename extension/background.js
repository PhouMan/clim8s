let currentCompanyInfo = '';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'COMPANY_INFO') {
        currentCompanyInfo = request.data;
        console.log(currentCompanyInfo);
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'GET_COMPANY_INFO') {
        sendResponse({data: currentCompanyInfo});
    }
});