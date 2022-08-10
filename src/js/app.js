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
        this.listRedraw();
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
            freq: 'i5',
            rst_sent: 'i6',
            rst_rcvd: 'i7',
            note: 'i8'
        };

        const qsoData =
            Object.keys(editValues).reduce((acc, cur) => ({ ...acc,
                [cur]: document.getElementById(editValues[cur]).value }
            ), {})
        ;

        log('adding qso');
        this.log.addQso(qsoData);
        this.listDrawQso(qsoData);

    }

    resetQsoEditor(){
    }

    listDrawQso(qsoData){
        console.table(qsoData);
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

    listRedraw(){
        // remove all elements from table
        while (this.wListTable.firstChild){
            this.wListTable.removeChild(this.wListTable.firstChild);
        }

        // draw qsos from the log
        this.log.state.qsos.forEach(item => {
            this.listDrawQso(item);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {

    const jslog = new JslogApp();
    jslog.init();
});

