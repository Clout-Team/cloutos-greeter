var clockVisible = false;

function updateTime(){
    var date = new Date();
    
    var time = date.toISOString().substr(11, 8);
    $(".clock").text(time);
    
    if(!clockVisible){
        $(".clock").fadeIn("slow");
        clockVisible = true;
    }
    
}

$(".clock").hide();

$(document).ready(function(){
    setInterval(updateTime, 100);
});
