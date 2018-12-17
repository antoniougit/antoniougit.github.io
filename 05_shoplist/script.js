var enter = document.getElementById("enter");
var input = document.getElementById("input");
var list = document.getElementById("list");
var delButtons = document.getElementsByClassName("delete");

// To delete list item
var removeListItem = function(e) {
	e.target.parentNode.remove();
}

// Function to line-through list item
var toggleListElement = function(e) {
	e.target.classList.toggle("done");
}

// Function to create delete button
var createDelButton = function() {
	var delButton = document.createElement("button");
	delButton.innerHTML = "Delete";
	delButton.setAttribute("class", "delete");
	delButton.addEventListener("click", removeListItem);
	return delButton;
}

// Add event listener to each pre-existing list item
for (var i = 0; i < list.children.length; i++) {
	delButtons[i].addEventListener("click", removeListItem);
}

// Function to check length of input
var checkLength = function() {
	return input.value.length;
}

// Function to add input to list
var createListElement = function() {
	var li = document.createElement("li");
	li.appendChild(document.createTextNode(input.value));
	li.appendChild(createDelButton());
	list.appendChild(li);
	input.value = "";
}

// Run on button Click
var addListAfterClick = function() {
	if (checkLength() > 0) {
		createListElement();
	} 
}
// Run on Enter keypress
var addListAfterKeypress = function(e) {
	if (checkLength() > 0 && e.which === 13) {
		createListElement();
	} 
}

// To clear all list items
var clearAll = function() {
	while (list.firstChild) {
		list.removeChild(list.firstChild);
	}
}

enter.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);
list.addEventListener("click", toggleListElement);
clear.addEventListener("click", clearAll);
