(function() {
    document.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
        var eventDoc, doc, body;
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;
            event.pageX = event.clientX +
                (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
                (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
                (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }
		mouseX = event.clientX
        mouseY = event.clientY
        mouseRelative()
    }
})();

// global variables to hold coords
mouseX = 0
mouseY = 0

function mouseRelative(){
    img = document.getElementsByTagName("img")[0]
    if (img){
        var pictureX = Math.floor(mouseX - $('img').offset().left);
        var pictureY = Math.floor(mouseY - $('img').offset().top + window.pageYOffset);
        getPixel(pictureX, pictureY)
    }
}