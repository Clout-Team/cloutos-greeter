/***********************************************************************/
/*                             LightDM Callbacks                       */
/***********************************************************************/
        
/*
 *  show_prompt callback.
 *  This tells the application whether it should show a username (plaintext) or password entry box
 */
function show_prompt(text, type){
    // type is either "text" or "password"
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
 *  authentication_complete callback
 *  This tells the application that the credentials have been used by lightdm
 *  and either work or don't work
 */
function authentication_complete(){
    if(lighdm.is_authenticated){
        //authentication was successful
        lightdm.start_session_sync();
    }else{
        //authentication wasn't 
        show_message("It seems you've got something wrong...", "error");
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

function doShutdown(){
    lightdm.shutdown();
}

function doRestart(){
    lightdm.restart();
}

function doSuspend(){
    lightdm.suspend();
}

function doHibernate(){
    lightdm.hibernate();
}

function doLogin(username, password){
    clear_messages();
    show_message("Authenticating...", "info");
    lightdm.authenticate(username);
    lightdm.respond(password);
}
