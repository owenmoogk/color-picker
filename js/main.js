// GLOBAL VARIABLES
img = null
data = []
// scale = 1

// function getScale(){

// }

function getPixel(x, y){
	if (x > img.naturalWidth || x < 0 || y < 0 || y > img.naturalHeight){return}
	index = img.naturalWidth * (y-1) + x
	index = index * 4 // for the 4 values associated with each pixel
	r = data[index]
	g = data[index+1]
	b = data[index+2]
	if (r == undefined){return}
	hoverBox = document.querySelector('#hoverBox');
	hoverBox.style.backgroundColor = `rgb(${r},${g},${b})`
	hoverBox.innerText = `rgb(${r},${g},${b})`
	if (r < 150 && b < 150 && g < 150){
		hoverBox.style.color = "white"
	}
	else{
		hoverBox.style.color = "black"
	}
}

function clickPixel(){
	hoverBox = document.querySelector('#hoverBox')
	box = document.querySelector('#mainBox');
	box.style.backgroundColor = hoverBox.style.backgroundColor
	box.innerText = hoverBox.innerText
	box.style.color = hoverBox.style.color
}

function loadImg(img) {
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	var width = canvas.width = img.naturalWidth;
	var height = canvas.height = img.naturalHeight;
	ctx.drawImage(img, 0, 0);
	var imageData = ctx.getImageData(0, 0, width, height);
	data = imageData.data;
}

function addImage(file) {
	var img = document.createElement('img');
	img.src = URL.createObjectURL(file);
	img.onclick = clickPixel
	img.onload = function() {loadImg(img)};
  	document.getElementById('image').appendChild(img);
	
	// prepping page
	document.getElementById('download-button').style.display = "block"
	mainBox = document.getElementById("mainBox")
	hoverBox = document.getElementById("hoverBox")
	mainBox.style.backgroundColor = hoverBox.style.backgroundColor = "black"
	mainBox.innerText = hoverBox.innerText = "rgb(0,0,0)"
	mainBox.style.color = hoverBox.style.color = "white"

}

function handleImages(files) {
	document.getElementById('image').innerHTML = '';
	addImage(files[0]);
}

// UPLOADING STUFF

document.ondrop = function(event) {
	event.preventDefault();
	handleImages(event.dataTransfer.files);
};

(function() {
	var upload = document.getElementById('upload');
	var target = document.getElementById('target');
	upload.onchange = function() {
		handleImages(this.files);
	};
	target.onclick = function() {
		upload.click();
	};
})();