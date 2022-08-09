const log = msg => console.log(msg);

import {Log} from './jslog.js';

class JslogApp {
    constructor(){
      
        this.wEditor = document.getElementById('log_qso_editor'); 
        this.wList = document.getElementById('log_item_list');

        // use logo for mode swithing for the moment
        this.modeSwitch = document.getElementById('logo');

        this.log = undefined;
        // init log
        //this.log = new Log();

    }

    init(){
        this.switchMode('editor');
        this.modeSwitch.addEventListener('click', () => this.switchMode());
    }

    switchMode(mode){
         if (mode === undefined){
             this.mode = (this.mode === 'editor') ?
                'list' : 'editor';
         } else {
             this.mode = mode;
         }

         if (this.mode === 'editor'){
             this.wEditor.style.display = 'block';
             this.wList.style.display = 'none';
         }

         if (this.mode === 'list'){
             this.wEditor.style.display = 'none';
             this.wList.style.display = 'block';
         }

    }
}
document.addEventListener("DOMContentLoaded", () => {

    const jslog = new JslogApp();
    jslog.init();
});

