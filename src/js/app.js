class JslogApp {
    constructor(){
      
       // basic variables
       this.wEditor = document.getElementById('log_qso_editor'); 
       this.wList = document.getElementById('log_list'); 

    }

    init(){

    }
}
document.addEventListener("DOMContentLoaded", () => {

    const jslog = new JslogApp();
    jslog.init();
});

