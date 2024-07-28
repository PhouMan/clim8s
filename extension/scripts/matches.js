

const link = document.querySelector("h3");
const style = document.createElement("style");

style.innerHTML = ".hide {display: none;}"
    + ".display {"
    + " position: absolute;"
    + " border: 2px solid white;"
    + " background-color: green;"
    + "}";

document.head.insertBefore(style, null);

const tagInfo = document.createElement("span");
//const AllLinks = document.body.getElementsByTagName("h3");
// Content script that captures the necessary data

const AllComp = document.body.getElementsByClassName("VuuXrf");

for (let i = 0; i < AllComp.length; i++) {
    let Company = AllComp[i];
    Company.addEventListener("mouseenter", (e) => {
        const companyInfo = Company.innerHTML;
        chrome.runtime.sendMessage({type: 'COMPANY_INFO', data: companyInfo});
    });
}


