lightdm.autologin_guest = false;

$(".action-link").click(function(event){
    event.preventDefault();
    var action = this.dataset.action;
    if(action == "shutdown"){
        doShutdown();
    }else if(action == "restart"){
        doRestart();
    }else if(action == "suspend"){
        doSuspend();
    }else if(action == "hibernate"){
        doHibernate();
    }
});

$("#loginBox").hide();
$("#brandText").hide();

$(document).ready(function() {
    
    $("#loginBox").fadeIn("slow");
    $("#brandText").fadeIn(2000);

  $('input').blur(function() {

    // check if the input has any value (if we've typed into it)
    if ($(this).val())
      $(this).addClass('used');
    else
      $(this).removeClass('used');
  });
  
});

$(".submit-login-form").click(function(event){
    event.preventDefault();
   $("#loginForm").submit(); 
});

$("#loginForm").submit(function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    if($("#username").val() != "" && $("#password").val() != ""){
        doLogin($("#username").val(), $("#password").val());
    }else{
        show_message("You must enter a username <b>and</b> a password!", "error");
    }
    
    return false;
});

function updateUserImage(){
    var user = lightdm.users.filter(function( obj ) {
        return obj.name == $("#username").val();
    })[0];
    
    
    
    if(user != undefined && user.image != ""){
        $("#profileImage").attr('src', user.image);
    }else{
        $("#profileImage").attr('src', "assets/img/ui/unknownUser.png");
    }
}

$(document).ready(function(){
    var user;
    for(user in lightdm.users){
        $("#username").append('<option>' + lightdm.users[user].name + "</option>");
    }
    
    if(lightdm.has_guest_account){
        $("#username").append("<option>Guest User</option>");
    }
    
    $("#username").append("<option>Other...</option>");
    
    //$("#username").val("Choose a user...");
    
    updateUserImage();
});

$("#username").change(function(){
    updateUserImage();
    
    if($("#username").val() != "Guest User"){
        $("#passwordBox").removeClass("invisible");
    }
    
    if($("#username").val() == "Other..."){
        //Make it a textbox
        $("#usernameBox").replaceWith( '<div class="group">' +
                    '<input type="username" name="username" id="username" autocomplete="off" autocorrect="false" autocapitalize="off" required></input>' +
                    '<span class="highlight"></span>' +
                    '<span class="bar"></span>' +
                    '<label for="username">Username</label>' +
        '</div>' );
    }else if($("#username").val() == "Guest User"){
        $("#passwordBox").addClass("invisible");
    }
});
