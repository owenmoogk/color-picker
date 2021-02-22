function toGreyscale(data){
    myLen = data.length
    for (i = 0; i < Math.floor(myLen); i+=4){
        first = data[i]
        second = data[i+1]
        third = data[i+2]
        avg = Math.floor((first + second + third) / 3)
        data[i] = avg
        data[i+1] = avg
        data[i+2] = avg
    }
    drawImage(data, img.naturalWidth, img.naturalHeight)
}

function drawImage(arr, width, height) {
    c = document.getElementsByTagName("canvas")[0]
    c.style.display = "block"
    ctx = c.getContext("2d")
    // set your canvas width/height
    c.width = width;
    c.height = height;
    myImg = document.getElementsByTagName("img")[0]
    myImg.style.display = "none"
    // create the imageData object, you'll need the width and height of your image
    var dataImage = ctx.createImageData(width, height);
    // browsers supporting TypedArrays
    if (dataImage.data.set) {
      dataImage.data.set(arr);
    } else {
      // IE9
      arr.forEach(function(val, i) {
        dataImage.data[i] = val;
      });
    }
    ctx.putImageData(dataImage, 0, 0);
}
  