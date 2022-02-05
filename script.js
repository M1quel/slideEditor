var openButtons = document.querySelectorAll("button.openButton");
var editorContainer = document.querySelector("section.editor");
var editorContentContainer = document.querySelector("section.editor .editorContentWrapper")
var imageEditMenu = document.querySelector("div.imageEditMenu");
var currentEditElem;
var mouseDownData = {};
for (let i = 0; i < openButtons.length; i++) {
    let item = openButtons[i];
    item.addEventListener("click", function (e) {
        e.currentTarget.parentElement.classList.toggle("menuOpen");
    })
}


function handleAdd(elem) {
    let addType = elem.getAttribute("type");
    if (addType == "image") {
        let tempElem = document.createElement("img");
        tempElem.src = "https://via.placeholder.com/100";
        tempElem.setAttribute("editType", "image")
        editorContentContainer.appendChild(tempElem);
    }
    if (addType == "text") {
        let tempElem = document.createElement("p");
        tempElem.innerText = "Det her er en test";
        tempElem.setAttribute("editType", "text")
        editorContentContainer.appendChild(tempElem);
    }
};

editorContentContainer.addEventListener("click", function (e) {
    let target = e.target;

    if (target.classList.contains("editorContentWrapper")) {
        console.log("Det var editoren");
        return;
    }
    currentEditElem = target;
    let targetBounding = target.getBoundingClientRect();
    let editorBounding = editorContentContainer.getBoundingClientRect();
    if (target.getAttribute("edittype") == "image") {
        imageEditMenu.style.left = targetBounding.left - editorBounding.left + 10 + "px";
        imageEditMenu.style.top = targetBounding.bottom - editorBounding.top + 10 + "px";
        imageEditMenu.style.display = "flex";

    }
})