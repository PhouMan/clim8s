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
const AllComp = document.body.getElementsByClassName("VuuXrf");

for (let i = 0; i < AllComp.length; i++) {
    //let Link = AllLinks[i];
    let Company = AllComp[i];
    Company.addEventListener("mouseenter", (e) => {
        tagInfo.innerHTML = Company.innerHTML;
        tagInfo.className = "display";
        tagInfo.style.left = e.pageX + "px";
        tagInfo.style.top = e.pageY + "px";
    });
    console.log(Company.innerHTML);
}



tagInfo.className = "hide";
document.body.insertBefore(tagInfo, null);