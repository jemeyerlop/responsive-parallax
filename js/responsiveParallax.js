function parallaxMove(){
	var scrolltop = window.pageYOffset;
	var parallaxElements = document.getElementsByClassName("parallax");
	for (var i = parallaxElements.length - 1; i >= 0; i--) {
//common variables (X and Y)
		var offsetTop=parallaxElements[i].offsetTop;
		var parallaxImage=parallaxElements[i].getElementsByTagName("img")[0];
		var parallaxElementHeight=parallaxElements[i].clientHeight;
//Y movement
		var positionY=parallaxImage.getAttribute('data-y-position');
		var speedY=parallaxImage.getAttribute('data-y-speed');
		var directionY=parallaxImage.getAttribute('data-y-direction');
			if (directionY=='up') {directionY=-1} else if (directionY=='down'){directionY=1};//'up' and 'down' are directions related to the image container and not necessarily to the rest of the page. To generate a movement against the rest of the page direction, when it is scrolling down, is necessary a "down" direction in combination with a high enough speed (as in the fourth example given in this demo in 'img/4.jpg').
	//reverse effect		
		if (parallaxImage.hasAttribute("data-y-reverse")) {
			var reversePositionY=parseInt(parallaxImage.getAttribute("data-y-reverse"))*parallaxElementHeight;
			if (offsetTop<scrolltop+reversePositionY) {var reverseY=-1} else {var reverseY=1}
		}else{
			var reversePositionY=0;
			var reverseY=1
		}
	//speed change effect
		if (parallaxImage.hasAttribute("data-y-speed-change-position") && parallaxImage.hasAttribute("data-y-speed-change-speed")) {
			var speedChangePositionY=parseInt(parallaxImage.getAttribute("data-y-speed-change-position"))*parallaxElementHeight;
			if (offsetTop<scrolltop+speedChangePositionY) {var speedY=parseInt(parallaxImage.getAttribute("data-y-speed-change-speed"))}
		}else{
			var speedChangePositionY=0;
		}
	//movement formula
		var imgPositionY=(((parallaxElementHeight*(offsetTop-scrolltop-reversePositionY-speedChangePositionY))/1000)*speedY*directionY*reverseY)-(parallaxElementHeight*positionY);
		parallaxImage.style.bottom=imgPositionY+'px';
//X movement
		var positionX=parallaxImage.getAttribute('data-x-position');
		var speedX=parallaxImage.getAttribute('data-x-speed');
		var directionX=parallaxImage.getAttribute('data-x-direction');
			if (directionX=='left') {directionX=1} else if (directionX=='right'){directionX=-1};
	//reverse effect	
		if (parallaxImage.hasAttribute("data-x-reverse")) {
			var reversePositionX=parseInt(parallaxImage.getAttribute("data-x-reverse"))*parallaxElementHeight;
			if (offsetTop<scrolltop+reversePositionX) {var reverseX=-1} else {var reverseX=1}
		}else{
			var reversePositionX=0;
			var reverseX=1
		}
	//speed change effect
		if (parallaxImage.hasAttribute("data-x-speed-change-position") && parallaxImage.hasAttribute("data-x-speed-change-speed")) {
			var speedChangePositionX=parseInt(parallaxImage.getAttribute("data-x-speed-change-position"))*parallaxElementHeight;
			if (offsetTop<scrolltop+speedChangePositionX) {var speedX=parseInt(parallaxImage.getAttribute("data-x-speed-change-speed"))}
		}else{
			var speedChangePositionX=0;
		}
	//movement formula		
		var imgPositionX=(((parallaxElementHeight*(offsetTop-scrolltop-reversePositionX-speedChangePositionX))/1000)*speedX*directionX*reverseX)-(parallaxElementHeight*positionX);			
		parallaxImage.style.left=imgPositionX+'px';
	}
};
function parallaxStart(){
	parallaxMove();
    window.addEventListener('scroll', function(){
		requestAnimationFrame(parallaxMove)
	}, false);
}