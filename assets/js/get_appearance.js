$(document).ready(function(){
    //Set generic properties
    $("*").css("font-family", cloutosGreeter.font);
    
    // Set body background image
    $("body").css("background-image", 'url("assets/backgrounds/' + cloutosGreeter.backgroundImage + '")');
    
    // Set login box styles
    $("#loginBox").css("background-color", cloutosGreeter.loginBox.backgroundColor);
    $("main p, main h1").css("color", cloutosGreeter.loginBox.foregroundColor);
    
    if(!cloutosGreeter.loginBox.alignCenter){
        $("main input, main p").css("text-align", "left");
        $("main p").css("padding-left", "20px");
    }
    
    // Set action bar styles
    $("#actionBar").css("height", cloutosGreeter.actionBar.height);
    $("#actionBar").css("background-color", cloutosGreeter.actionBar.backgroundColor);
    $("#actionBar *").css("color", cloutosGreeter.actionBar.foregroundColor);
    
    //Set action bar link styles
    $("#actionBar a").css("line-height", cloutosGreeter.actionBar.height);
    
    //Set action bar clock styles
    $("#actionBar .clock").css("line-height", cloutosGreeter.actionBar.height);
});
