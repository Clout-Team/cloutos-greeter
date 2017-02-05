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
