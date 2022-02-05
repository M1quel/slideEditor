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
    document.getElementsByClassName("menuOpen")[0].classList.remove("menuOpen")
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
    if (e.target.classList.contains("handleCorner")) {
        return;
    }
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

    handle.style.left = (parseInt(values.x) - parseInt(handleLayer.x)) + "px";
    handle.style.top = (parseInt(values.y) - parseInt(handleLayer.y)) + "px";
    currentEditElem.style.left = (parseInt(values.x) - parseInt(handleLayer.x)) + "px";
    currentEditElem.style.top = (parseInt(values.y) - parseInt(handleLayer.y)) + "px";

}




// RESIZE IMAGES
var knob = document.querySelector("div.handleCorner");
var mouseStartPosition = {
    x: 0,
    y: 0
}
var resize_direction;
var resize_point = {
    x: 0,
    y: 0
};
    
knob.addEventListener("mousedown", function (e) {
    let corner = e.currentTarget.dataset.position;
    console.log(corner)
    let currentEditElemBounding = currentEditElem.getBoundingClientRect();
    mouseStartPosition = {
        x: e.clientX - editorBounding.left,
        y: e.clientY - editorBounding.top
    }


    if (currentEditElem.getAttribute("edittype") == "image") {
        imageEditMenu.style.display = "none";
    } else if (currentEditElem.getAttribute("edittype") == "text") {
        // display none text edit menu
    }

    knob.addEventListener("mousemove", moveKnob);
});
knob.addEventListener("mouseup", function (e) {
    knob.removeEventListener("mousemove", moveKnob);
    if (currentEditElem.getAttribute("edittype") == "image") {
        imageEditMenu.style.display = "flex";
    } else if (currentEditElem.getAttribute("edittype") == "text") {
        // display none text edit menu
    }
});


function moveKnob (e) {
    let position = {
        x: (e.clientX - editorBounding.left),
        y: (e.clientY - editorBounding.top)
    }
    let newDimentions = {
        width: Math.abs(position.x - resize_point.x),
        height: Math.abs(position.y - resize_point.y)
    }
    console.log("moving")
    currentEditElem.style.width = newDimentions.width + "px";
    currentEditElem.style.height = newDimentions.height + "px";
    handle.style.width = newDimentions.width + "px";
    handle.style.height = newDimentions.height + "px";

}


// _____________________