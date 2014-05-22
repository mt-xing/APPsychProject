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
    setTimeout(function(){document.getElementById(CredName).style.background = null}, 3000);
}



//Feature Detection, Stolen From: http://demosthenes.info/blog/680/Feature-Detection-and-Styling-For-The-HTML5-details-Element
function supports_details() {
    if (!('open' in document.createElement('details'))) {
        return false;
    }
}


function FadeIn(){
    var Title = document.getElementById("MainTitle");
    Title.style.fontSize = "600%";
    setTimeout(function(){FadeIn2()}, 1000);
}
function FadeIn2(){
    var Paras = document.getElementsByTagName("p");
    for(i = 0; i < Paras.length; i++){
        Paras[i].style.opacity = 1;
    }
    var Vids = document.getElementsByClassName("YouTubeVid");
    for(i = 0; i < Vids.length; i++){
        Vids[0].style.opacity = 1;
    }
    
    setTimeout(function(){FadeIn3()}, 1000);
}
function FadeIn3(){
    document.getElementsByTagName("body")[0].style.height = "initial";
    document.getElementsByTagName("body")[0].style.overflow = "initial";
}