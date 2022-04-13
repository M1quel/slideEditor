var openButtons = document.querySelectorAll("button.openButton");
var editorContainer = document.querySelector("section.editor");
var editorContentContainer = document.querySelector("section.editor .editorContentWrapper");
var imageEditMenu = document.querySelector("div.imageEditMenu");
var textEditMenu = document.querySelector("div.textEditMenu");
var editorMoveField = document.querySelector("div.editorMoveField");
var textEditor = document.querySelector("textarea.textEditor");
var textEditorMenu = document.querySelector("div.textEditorMenu");
var currentEditElem;
var handle = document.querySelector("div.handle");
var editMode = false;
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
        tempElem.style.height = "100px";
        tempElem.style.width = "100px";
        tempElem.style.objectFit = "contain";
        tempElem.onerror = function (event) {
            event.target.src = "https://via.placeholder.com/100";
            setHandle(currentEditElem);
        }
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
        textEditMenu.style.display = "none";
        return;
    }
    currentEditElem = target;
    let targetBounding = target.getBoundingClientRect();
    if (target.getAttribute("edittype") == "image") {
        imageEditMenu.style.left = targetBounding.left - editorBounding.left + 10 + "px";
        imageEditMenu.style.top = targetBounding.bottom - editorBounding.top + 10 + "px";
        imageEditMenu.style.display = "flex";
        setHandle(currentEditElem);
    } else if (target.getAttribute("edittype") == "text") {
        textEditMenu.style.left = targetBounding.left - editorBounding.left + 10 + "px";
        textEditMenu.style.top = targetBounding.bottom - editorBounding.top + 10 + "px";
        textEditMenu.style.display = "flex";
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
    editorContentContainer.addEventListener("mousemove", handleMove);
    if (currentEditElem.getAttribute("edittype") == "image") {
        imageEditMenu.style.display = "none";
    } else if (currentEditElem.getAttribute("edittype") == "text") {
        textEditMenu.style.display = "none";
    }
})
handle.addEventListener("mouseup", function (e) {
    handle.removeEventListener("mousemove", handleMove);
    editorContentContainer.removeEventListener("mousemove", handleMove);
    let newBounding = currentEditElem.getBoundingClientRect()
    if(currentEditElem.getAttribute("edittype") == "image") {
        imageEditMenu.style.left = newBounding.left - editorBounding.left + 10 + "px";
        imageEditMenu.style.top = newBounding.bottom - editorBounding.top + 10 + "px";
        imageEditMenu.style.display = "flex";
    }else if(currentEditElem.getAttribute("edittype") == "text") {
        textEditMenu.style.left = newBounding.left - editorBounding.left + 10 + "px";
        textEditMenu.style.top = newBounding.bottom - editorBounding.top + 10 + "px";
        textEditMenu.style.display = "flex";
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
    let currentEditElemBounding = currentEditElem.getBoundingClientRect();
    mouseStartPosition = {
        x: e.clientX - editorBounding.left,
        y: e.clientY - editorBounding.top
    }
    resize_point = {
        x: currentEditElemBounding.left - editorBounding.left,
        y: currentEditElemBounding.top - editorBounding.top
    }


    if (currentEditElem.getAttribute("edittype") == "image") {
        imageEditMenu.style.display = "none";
    } else if (currentEditElem.getAttribute("edittype") == "text") {
        // display none text edit menu
    }

    knob.addEventListener("mousemove", moveKnob);
    editorContentContainer.addEventListener("mousemove", moveKnob);
    handle.addEventListener("mousemove", moveKnob);
});
knob.addEventListener("mouseup", function (e) {
    knob.removeEventListener("mousemove", moveKnob);
    editorContentContainer.removeEventListener("mousemove", moveKnob);
    handle.removeEventListener("mousemove", moveKnob);
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
    currentEditElem.style.width = newDimentions.width + "px";
    currentEditElem.style.height = newDimentions.height + "px";
    handle.style.width = newDimentions.width + "px";
    handle.style.height = newDimentions.height + "px";

}


// _____________________





function removeCurrentElem () {
    console.log(currentEditElem.getAttribute("edittype"));
    if (currentEditElem) {
        if (currentEditElem.getAttribute("edittype") == "image") {
            imageEditMenu.style.display = "none";
        } else if (currentEditElem.getAttribute("edittype") == "text") {
            console.log("Den kommer herind")
            textEditMenu.style.display = "none";
        }
        handle.style.display = "none";
        currentEditElem.remove();

    }
}





function toggleDropdown (elem, elemClass) {
    let dropdown = elem.parentElement.querySelector(`.${elemClass}`);
    dropdown.classList.toggle("hideEditDropdown");
}

function closeDropdown (elem) {
    let dropdown = elem.parentElement.classList.toggle("hideEditDropdown");
}

function handleSaveLink (elem) {
    let link = elem.parentElement.querySelector("#editLink").value;
    if (!link || link == "") return;
    currentEditElem.src = link;
    elem.parentElement.classList.toggle("hideEditDropdown");
}




function startEditText() {
    handle.style.display = "none";
    textEditMenu.style.display = "none";

    let holdValue = currentEditElem.innerText;
    let elemBounding = currentEditElem.getBoundingClientRect();
    textEditor.style.display = "block";
    textEditor.style.left = (elemBounding.left - editorBounding.left) + "px";
    textEditor.style.top = (elemBounding.top - editorBounding.top) + "px";
    textEditor.style.width = elemBounding.width + "px";
    textEditor.style.height = elemBounding.height + "px";
    textEditor.innerText = holdValue;
    textEditorMenu.style.display = "block";
    textEditorMenu.style.left = (elemBounding.left - editorBounding.left) + 10 + "px";
    textEditorMenu.style.top = (elemBounding.bottom - editorBounding.top) + 10 + "px";

}