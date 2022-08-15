const log = msg => console.log(msg);

import {Log} from './jslog.js';

class JslogApp {
    constructor(){
      
        this.wEditor = document.getElementById('log_qso_editor'); 
        this.wList = document.getElementById('log_item_list');
        this.wListTable = document.getElementById('log_item_list_table');
        this.wSaveButton = document.getElementById('log_qso_editor_save'); 
        this.wMenuResetLog = document.getElementById('menu_reset_log'); 

        // use logo for mode switching for the moment
        this.modeSwitch = document.getElementById('logo');

        this.editValues = {
            callsign: {id: 'i1'},
            date: {id: 'i2'},
            utc: {id: 'i3'},
            mode: {id: 'i4', use_previous: 1},
            freq: {id: 'i5', use_previous: 1},
            rst_sent: {id: 'i6', use_previous: 1},
            rst_rcvd: {id: 'i7', use_previous: 1},
            note: {id: 'i8'}
        };
    }

    init(){
        this.switchMode('editor');
        this.modeSwitch.addEventListener('click', () => this.switchMode());
        this.wSaveButton.addEventListener('click', () => this.saveQso());
        this.wMenuResetLog.addEventListener('click', () => this.resetLog());
        this.wEditor.addEventListener('keypress', event => {
            if (event.keyCode === 13) this.saveQso();
        });

        this.log = new Log();
        this.listRedraw();
        this.currentQsoCache = undefined;
        this.editingQsoIndex = undefined;
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

    // process save event - gather values from UI, create a QSO record, log it,
    // reset editor fields and draw QSO entry to the list
    saveQso(){
        // gather values
        const qsoData =
            Object.keys(this.editValues).reduce((acc, cur) => ({ ...acc,
                [cur]: document.getElementById(this.editValues[cur].id).value }
            ), {})
        ;

        this.log.addQso(qsoData, this.editingQsoIndex);
        this.resetQsoEditor(qsoData);

        if (this.editingQsoIndex !== undefined){
            this.editingQsoIndex = undefined // reset current index
            this.listRedraw();
            this.switchMode('list');
        } else {
            this.listDrawQso(qsoData, this.log.state.qsos.length - 1); // use log length as new index
        }
    }

    resetQsoEditor(previousQso){

        for (let field of Object.keys(this.editValues)){
            document.getElementById(this.editValues[field].id).value = 
                (this.editValues[field].use_previous === 1) ?
                    previousQso[field] : '';
        }
    }

    listDrawQso(qsoData, index){
        const tr = document.createElement('tr');

        const tdDate = document.createElement('td');
            tdDate.appendChild(document.createTextNode(qsoData.date));
        const tdUTC = document.createElement('td');
            tdUTC.appendChild(document.createTextNode(qsoData.utc));
        const tdCall = document.createElement('td');
            tdCall.appendChild(document.createTextNode(qsoData.callsign));
            tdCall.setAttribute('class', 'callsign');
        const tdMode = document.createElement('td');
            tdMode.appendChild(document.createTextNode(qsoData.mode));
        const tdFreq = document.createElement('td');
            tdFreq.appendChild(document.createTextNode(qsoData.freq));
        const tdButton = document.createElement('button');
            tdButton.setAttribute('type', 'button');
            tdButton.setAttribute('data-qso-id', index);
            tdButton.appendChild(document.createTextNode('Edit'));
            tdButton.addEventListener('click', () => this.editQso(index));
        
        tr.append(tdDate, tdUTC, tdCall, tdMode, tdFreq, tdButton);
        this.wListTable.appendChild(tr);
    }

    listRedraw(){
        // remove all elements from table
        while (this.wListTable.firstChild){
            this.wListTable.removeChild(this.wListTable.firstChild);
        }

        // draw qsos from the log
        for (let [index, item] of this.log.state.qsos.entries()){
            this.listDrawQso(item, index);
        }
    }

    editQso(index){
        this.switchMode('editor');

        let qsoToEdit = this.log.state.qsos[index];
        this.editingQsoIndex = index;

        for (let field of Object.keys(this.editValues)){
            document.getElementById(this.editValues[field].id).value = qsoToEdit[field];
        }
    }

    resetLog(){
        this.log.clear();
        this.listRedraw();
    }
}

document.addEventListener("DOMContentLoaded", () => {

    const jslog = new JslogApp();
    jslog.init();
});

