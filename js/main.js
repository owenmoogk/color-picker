// GLOBAL VARIABLES
img = null
data = []
scale = 1
window.onresize = getScale;

function getScale(){
	htmlImage = document.getElementsByTagName("img")[0]
	defaultWidth = img.naturalWidth
	myWidth = htmlImage.offsetWidth
	scale = defaultWidth / myWidth
}

function getAverageColor(){
	r = 0
	g = 0
	b = 0
	myLen = data.length
	for (i = 0; i < myLen; i += 4){
		r += data[i]
		g += data[i+1]
		b += data[i+2]
	}
	pixels = data.length / 4
	r = Math.floor(r / pixels)
	g = Math.floor(g / pixels)
	b = Math.floor(b / pixels)
	finalColor = `rgb(${r},${g},${b})`
	averageBox = document.getElementById('averageBox')
	averageBox.style.backgroundColor = finalColor
	averageBox.innerText = finalColor
}

// passing in values relative to top corner of image
function getPixel(x, y){
	x = Math.floor(x * scale)
	y = Math.floor(y * scale)
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

function addImage(file) {
	img = document.createElement('img');
	img.src = URL.createObjectURL(file);
	img.onclick = clickPixel
	img.onload = function() {
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		var width = canvas.width = img.naturalWidth;
		var height = canvas.height = img.naturalHeight;
		ctx.drawImage(img, 0, 0);
		var imageData = ctx.getImageData(0, 0, width, height);
		data = imageData.data;
		getAverageColor()
		getScale()
	};
	
	// updating page
	myCanvas = document.getElementsByTagName("canvas")[0]
	myCanvas.style.display = "none"
	document.getElementById('image').innerHTML = '';
	document.getElementById('image').appendChild(img);
	mainBox = document.getElementById("mainBox")
	hoverBox = document.getElementById("hoverBox")
	mainBox.style.backgroundColor = hoverBox.style.backgroundColor = "black"
	mainBox.innerText = hoverBox.innerText = "rgb(0,0,0)"
	mainBox.style.color = hoverBox.style.color = "white"
	myImg = document.getElementsByTagName("img")[0]
    myImg.style.display = "block"
	x = document.getElementsByClassName("picture-only")
	for (i = 0; i < x.length; i++){
		x[i].style.display = "block"
	}

}

// UPLOADING STUFF

(function() {
	var upload = document.getElementById('upload');
	upload.onchange = function() {
		addImage(this.files[0])
	};
})();