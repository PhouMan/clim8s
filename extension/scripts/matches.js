const style = document.createElement("style");
style.innerHTML = ".hide {display: none;}"
    + ".display {"
    + " position: absolute;"
    + " border: 2px solid red;"
    + " background-color: white;"
    + "}";

document.head.insertBefore(style, null);

const tagInfo = document.createElement("span");
const AllCompanyTitle = document.body.getElementsByClassName(".VuuXrf");

for (let i = 0; i < AllCompanyTitle.length; i++) {
    let Company = AllCompanyTitle[i];

    Company.addEventListener("mouseenter", (e) => {
        let outerHTML = Company.outerHTML;
        outerHTML = outerHTML.substring(0,200)
    });
}