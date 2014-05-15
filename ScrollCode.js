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