/* GLOBAL VARIABLES */
var passwd;


/***********************************************************************/
/*                             LightDM Callbacks                       */
/***********************************************************************/
        
/*
 *  show_prompt callback.
 *  This tells the application whether it should show a username (plaintext) or password entry box
 */
function show_prompt(text, type){
    // type is either "text" or "password"
	if(type == "password" || text.toLowerCase().includes("password")){
		lightdm.respond(passwd);
	}
}

/*
 *  show_message callback.
 *  This tells the application to show a message to the user.
 *  type defines whether the message is an "error" or "info"
 */
function show_message(text, type){
    // type is either "error" or "info"
    $("#message").html(text);
    $("#message").removeClass();
    $("#message").addClass(type);
}

/*
 * show_error callback.
 * This tells the application to show an error message to the user.
 * It's a dummy function. It just calls show_message
 */
function show_error(text){
    show_message(text, "error");
}
 
/*
 *  authentication_complete callback
 *  This tells the application that the credentials have been used by lightdm
 *  and either work or don't work
 */
function authentication_complete(){
    if(lightdm.is_authenticated){
        //authentication was successful
        
        var user = lightdm.users.filter(function( obj ) {
            return obj.name == lightdm.authentication_user;
        })[0];
        
        try {
            lightdm.login(
                lightdm.authentication_user,
                user.session
            );
        }catch(err){
            show_error("Application Error: -02 : " + err);
        }
    }else{
        //authentication wasn't 
        show_message("It seems you've entered the wrong password...", "error");
    }
}
        
function autologin_timer_expired(){
    /* Does nothing. */
}

function clear_messages(){
    show_message("Please enter your login details to continue.", "info");
}
        
/***********************************************************************/
/*                         Application Callbacks                       */
/***********************************************************************/

function debug(message){
    $("#debugBox").append('<p style="line-">' + message + "</p>");
}

function doShutdown(){
    if(lightdm.can_shutdown){
        lightdm.shutdown();
    }
}

function doRestart(){
    if(lightdm.can_restart){
        lightdm.restart();
    }
}

function doSuspend(){
    if(lightdm.can_suspend){
        lightdm.suspend();
    }
}

function doHibernate(){
    if(lightdm.can_hibernate){
        lightdm.hibernate();
    }
}

function doLogin(username, password){
    passwd = password;
    clear_messages();
    lightdm.cancel_timed_login();
    show_message("Authenticating...", "info");
    try {
        lightdm.start_authentication(username);
    } catch(err) {
        lightdm.cancel_authentication();
        lightdm.start_authentication(username);
    }
}
