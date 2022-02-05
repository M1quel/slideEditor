var openButtons = document.querySelectorAll("button.openButton");
var editorContainer = document.querySelector("section.editor");
var editorContentContainer = document.querySelector("section.editor .editorContentWrapper")
var imageEditMenu = document.querySelector("div.imageEditMenu");
var currentEditElem;
var handle = document.querySelector("div.handle");
var handleLayer = {
    x: 0,
    y: 0
}



let editorBounding = editorContentContainer.getBoundingClientRect();
var mouseDownData = {};
for (let i = 0; i < openButtons.length; i++) {
    let item = openButtons[i];
    item.addEventListener("click", function (e) {
        e.currentTarget.parentElement.classList.toggle("menuOpen");
    })
}


function handleAdd(elem) {
    let addType = elem.getAttribute("type");
    let tempElem;
    if (addType == "image") {
        tempElem = document.createElement("img")
        tempElem.src = "https://via.placeholder.com/100";
        tempElem.setAttribute("editType", "image")
    }
    if (addType == "text") {
        tempElem = document.createElement("p");
        tempElem.innerText = "Det her er en test";
        tempElem.setAttribute("editType", "text")
    }
    tempElem.style.cursor = "pointer";
    editorContentContainer.appendChild(tempElem);
};

editorContentContainer.addEventListener("click", function (e) {
    let target = e.target;

    if (target.classList.contains("editorContentWrapper")) {
        console.log("Det var editoren");
        handle.style.display = "none";
        imageEditMenu.style.display = "none";
        return;
    }
    currentEditElem = target;
    let targetBounding = target.getBoundingClientRect();
    if (target.getAttribute("edittype") == "image") {
        imageEditMenu.style.left = targetBounding.left - editorBounding.left + 10 + "px";
        imageEditMenu.style.top = targetBounding.bottom - editorBounding.top + 10 + "px";
        imageEditMenu.style.display = "flex";
        setHandle(currentEditElem);
       


    }
})


function setHandle (elem) {
    let elemBounding = elem.getBoundingClientRect();
    handle.style.display = "block";
    handle.style.left = elemBounding.left - editorBounding.left + "px";
    handle.style.top = elemBounding.top - editorBounding.top + "px";
    handle.style.height = elemBounding.height + "px";
    handle.style.width = elemBounding.width + "px";
    handle.style.cursor = "grab";

}

handle.addEventListener("mousedown", function (e) {
    let handleBounding = handle.getBoundingClientRect();
    handleLayer = {
        x: e.clientX - (handleBounding.left - editorBounding.left),
        y: e.clientY - (handleBounding.top - editorBounding.top)
    }
    handle.style.cursor = "grabbing";
    handle.addEventListener("mousemove", handleMove);
    if (currentEditElem.getAttribute("edittype") == "image") {
        imageEditMenu.style.display = "none";
    } else if (currentEditElem.getAttribute("edittype") == "text") {
        // display none text edit menu
    }
})
handle.addEventListener("mouseup", function (e) {
    handle.removeEventListener("mousemove", handleMove);
    let newBounding = currentEditElem.getBoundingClientRect()
    if(currentEditElem.getAttribute("edittype") == "image") {
        imageEditMenu.style.left = newBounding.left - editorBounding.left + 10 + "px";
        imageEditMenu.style.top = newBounding.bottom - editorBounding.top + 10 + "px";
        imageEditMenu.style.display = "flex";
    }
    handle.style.cursor = "grab";
    handleLayer = {}
})


function handleMove(e) {
    let values = {
        x: e.clientX,
        y: e.clientY
    }
    console.log(values, handleLayer)
    console.log(parseInt(values.x) - parseInt(handleLayer.x))

    handle.style.left = (parseInt(values.x) - parseInt(handleLayer.x)) + "px";
    handle.style.top = (parseInt(values.y) - parseInt(handleLayer.y)) + "px";
    currentEditElem.style.left = (parseInt(values.x) - parseInt(handleLayer.x)) + "px";
    currentEditElem.style.top = (parseInt(values.y) - parseInt(handleLayer.y)) + "px";

}