var TimeMult = 1000;

function getScrollingPosition(){      
    //Code Stolen From: http://www.sitepoint.com/javascript-from-scratch/6/
  var position = [0, 0];      
      
  if (typeof window.pageYOffset != 'undefined')      
  {      
    position = [      
        window.pageXOffset,      
        window.pageYOffset      
    ];      
  }      
      
  else if (typeof document.documentElement.scrollTop      
      != 'undefined' && document.documentElement.scrollTop > 0)      
  {      
    position = [      
        document.documentElement.scrollLeft,      
        document.documentElement.scrollTop      
    ];      
  }      
      
  else if (typeof document.body.scrollTop != 'undefined')      
  {      
    position = [      
        document.body.scrollLeft,      
        document.body.scrollTop      
    ];      
  }

  return position;
}


//Most of following code from: http://stackoverflow.com/questions/5353934/check-if-element-is-visible-on-screen
function posY(elm) {
    var test = elm, top = 0;

    while(!!test && test.tagName.toLowerCase() !== "body") {
        top += test.offsetTop;
        test = test.offsetParent;
    }

    return top;
}

function viewPortHeight() {
    var de = document.documentElement;

    if(!!window.innerWidth)
    { return window.innerHeight; }
    else if( de && !isNaN(de.clientHeight) )
    { return de.clientHeight; }

    return 0;
}

function checkvisible( elm ) {
    var vpH = viewPortHeight(), // Viewport Height
        st2 = getScrollingPosition(), // Scroll Top
        st = st2[1],
        y = posY(elm);

    return (y > st && y < (st + vpH));
}


//My Code
function FixScroll(){
    
    var AV = getScrollingPosition();
    var CV = AV[1];
    //AV = Array Value (Value Returned)
    //CV = Current Value (Scroll Location)
    
    if(checkvisible(document.getElementById("Sec1"))){
        document.getElementById("SB1").checked = true;
    } else if(checkvisible(document.getElementById("Sec2"))){
        document.getElementById("SB2").checked = true;
    } else if(checkvisible(document.getElementById("Sec3"))){
        document.getElementById("SB3").checked = true;
    } else if(checkvisible(document.getElementById("Sec4"))){
        document.getElementById("SB4").checked = true;
    } else if (checkvisible(document.getElementById("Sec5"))){
        document.getElementById("SB5").checked = true;
    } else{
        document.getElementById("SB1").checked = false;   
        document.getElementById("SB2").checked = false;  
        document.getElementById("SB3").checked = false;  
        document.getElementById("SB4").checked = false;  
        document.getElementById("SB5").checked = false;  
    }
}

function ShowLink(CredName){
    document.getElementById(CredName).style.background = "yellow";
    setTimeout(function(){document.getElementById(CredName).style.background = null}, 3*TimeMult);
}



//Feature Detection, Stolen From: http://demosthenes.info/blog/680/Feature-Detection-and-Styling-For-The-HTML5-details-Element
function supports_details() {
    if (!('open' in document.createElement('details'))) {
        return false;
    }
}








function Startup(){
    var CookieValue = readCookie("XingVisit");
    
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    
    smoothScroll.init({
        speed: 1000, // Integer. How fast to complete the scroll in milliseconds
        easing: 'easeInOutCubic', // Easing pattern to use
        updateURL: false, // Boolean. Whether or not to update the URL with the anchor hash on scroll
        offset:110, // Integer. How far to offset the scrolling anchor location in pixels
        /*callbackBefore: function ( toggle, anchor ) {}, // Function to run before scrolling
        callbackAfter: function ( toggle, anchor ) {} // Function to run after scrolling*/
    });
    var TheTimer = window.setInterval(function(){FixScroll()}, 500);
    
    document.getElementsByTagName("body")[0].style.height = "100%";
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
    
    if(supports_details() == false){
        document.getElementById("BadBrowser").style.display = "block";
    } else{
        DetermineCookie();
    }
}


function DetermineCookie(){
    var CookieValue = readCookie("XingVisit");
    
    if(CookieValue == 1){
        document.getElementById("Cover").style.transition = "initial";
        document.getElementById("MainTitle").style.transition = "initial";
        var Paras = document.getElementsByTagName("p");
        for(i = 0; i < Paras.length; i++){
            Paras[i].style.transition = "initial";
        }
        var Vids = document.getElementsByClassName("YouTubeVid");
        for(i = 0; i < Vids.length; i++){
            Vids[i].style.transition = "initial";
        }
        
        TimeMult = 0;
        
        RemoveFrog();
        
    }
}



function FadeIn(){
    document.getElementById("Cover").style.opacity = 0;
    setTimeout(function(){FadeInRest()}, 3*TimeMult);
}
function FadeInRest(){
    var Title = document.getElementById("MainTitle");
    Title.style.fontSize = "600%";
    setTimeout(function(){FadeIn2()}, TimeMult);
}
function FadeIn2(){
    var Paras = document.getElementsByTagName("p");
    for(i = 0; i < Paras.length; i++){
        Paras[i].style.opacity = 1;
    }
    var Vids = document.getElementsByClassName("YouTubeVid");
    for(i = 0; i < Vids.length; i++){
        Vids[i].style.opacity = 1;
    }
    
    setTimeout(function(){FadeIn3()}, TimeMult);
}
function FadeIn3(){
    document.getElementsByTagName("body")[0].style.height = "initial";
    document.getElementsByTagName("body")[0].style.overflow = "initial";
    document.getElementById("Cover").style.display = "none";
}

function RemoveFrog(){
    
    if(document.getElementById("FrogNoShow").checked == true){
        createCookie("XingVisit", 1, 30);
    }
    
    FadeIn();
    document.getElementById("FrogWarn").style.display = "none";
}





//Cookie Setting Cr@p - Thanks to http://www.quirksmode.org/js/cookies.html
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}