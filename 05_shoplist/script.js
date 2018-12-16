var enter = document.getElementById("enter");
var input = document.getElementById("input");
var list = document.getElementById("list");
var delButtons = document.getElementsByClassName("delete");

// Function to create delete button
function createDelButton() {
	var delButton = document.createElement("button");
	delButton.innerHTML = "Delete";
	delButton.setAttribute("class", "delete");
	delButton.addEventListener("click", removeListItem);
	return delButton;
}

// Adding an event listener to each pre-existing list item
for (var i = 0; i < list.children.length; i++) {
	delButtons[i].addEventListener("click", removeListItem);
}

// Function to check length of input
function checkLength() {
	return input.value.length;
}

// Function to add input to list
function createListElement() {
	var li = document.createElement("li");
	li.appendChild(document.createTextNode(input.value));
	li.appendChild(createDelButton());
	list.appendChild(li);
	input.value = "";
}

// Run on button Click
function addListAfterClick() {
	if (checkLength() > 0) {
		createListElement();
	} 
}
// Run on Enter keypress
function addListAfterKeypress(event) {
	if (checkLength() > 0 && event.which === 13) {
		createListElement();
	} 
}

// To line-through list item
function toggleListElement(e) {
		e.target.classList.toggle("done");
}

// To delete list item
function removeListItem(e) {
	e.target.parentNode.remove();
}

enter.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);
list.addEventListener("click", toggleListElement);