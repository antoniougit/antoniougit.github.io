var h3 = document.querySelector("h3");
var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var body = document.getElementById("gradient");
var random = document.getElementById("random");


// Set the background of body to the values from the inputs
// Display the background colour in the h3, removing unnecessary text
var setGradient = function() {
	body.style.background = 
	"linear-gradient(to right, " 
	+ color1.value + ", " 
	+ color2.value + ")";
	h3.textContent = body.style.background.substring(26,body.style.background.length - 1);
}


// Random colour function
// You need to pad with zeros when the random value is less than 0×100000
// That replaces each of six 0s with a random hex digit, so it's sure to end up with a full six-digit valid color value.
// from https://stackoverflow.com/questions/5092808/how-do-i-randomly-generate-html-hex-color-codes-using-javascript/5092872#5092872
var randomColor = function() { 
	return "#000000".replace(/0/g, function() {
		return (~~(Math.random()*16)).toString(16);
	});
}

// Set random color1
var randomColor1 = function() {
	   color1.value = randomColor();
	   setGradient();
 }

// Set random color2
var randomColor2 = function() {
	  color2.value = randomColor();
	  setGradient();
}

// Call setGradient to match background colour and input colours on first page load
setGradient();

// Add event listeners to inputs (to set background) and to the random button (to generate random colours)
color1.addEventListener("input", setGradient);
color2.addEventListener("input", setGradient);
random.addEventListener("click", randomColor1);
random.addEventListener("click", randomColor2);