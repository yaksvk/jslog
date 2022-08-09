const log = msg => console.log(msg);

import {Log} from './jslog.js';

class JslogApp {
    constructor(){
      
        this.wEditor = document.getElementById('log_qso_editor'); 
        this.wList = document.getElementById('log_item_list');
        this.wListTable = document.getElementById('log_item_list_table');
        this.wSaveButton = document.getElementById('log_qso_editor_save'); 

        // use logo for mode switching for the moment
        this.modeSwitch = document.getElementById('logo');
    }

    init(){
        this.switchMode('editor');
        this.modeSwitch.addEventListener('click', () => this.switchMode());
        this.wSaveButton.addEventListener('click', () => this.saveQso());
        this.wEditor.addEventListener('keypress', event => {
            if (event.keyCode === 13) this.saveQso();
        });

        this.log = new Log();
    }

    // switch application modes between editing a qso and showing the whole log
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

    saveQso(){
        // gather values
        const editValues = {
            callsign: 'i1',
            date: 'i2',
            utc: 'i3',
            mode: 'i4',
            rst_sent: 'i5',
            rst_rcvd: 'i6',
            note: 'i7'
        };

        const qsoData =
            Object.keys(editValues).reduce((acc, cur) => ({ ...acc,
                [cur]: document.getElementById(editValues[cur]).value }
            ), {})
        ;

        this.log.addQso(qsoData);
        this.listDrawQso(qsoData);

    }

    listDrawQso(qsoData){
        const tr = document.createElement('tr');
        
        const tdDate = document.createElement('td');
            tdDate.appendChild(document.createTextNode(qsoData.date));
        const tdUTC = document.createElement('td');
            tdUTC.appendChild(document.createTextNode(qsoData.utc));
        const tdCall = document.createElement('td');
            tdCall.appendChild(document.createTextNode(qsoData.callsign));
        const tdButton = document.createElement('button');
            tdButton.setAttribute('type', 'button');
            tdButton.appendChild(document.createTextNode('Edit'));
        
        tr.append(tdDate, tdUTC, tdCall, tdButton);
        this.wListTable.appendChild(tr);
        
    }
}
document.addEventListener("DOMContentLoaded", () => {

    const jslog = new JslogApp();
    jslog.init();
});

