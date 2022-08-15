// ES6

let globalList = [];

const log = msg => console.log(msg);

const DEFAULT_KEY = 'globalList2';

export class Log {

    constructor(storageName){
        this.state = {
            qsos: []
        };

        log('contructor');
        log(this.state);

        this.storageName =
            (storageName === undefined) ? DEFAULT_KEY : storageName;

        // try to restore from localStorage
        const savedString = localStorage.getItem(this.storageName);

        if (savedString !== null){
            log(savedString);
            try {
                this.state = JSON.parse(savedString);
            }catch(e){
                log(`Unable to init state, broken JSON: ${e}`);
            }
        }

        log(this.state);
    }

    addQso(qso, index){
        if (index === undefined){
            this.state.qsos.push(qso);
        } else {
            this.state.qsos[index] = qso;
        }
        this.store();
    }

    store(){
        log('store to local storage');
        log(this.storageName);

        localStorage.setItem(this.storageName, JSON.stringify(this.state));
    }

    clear(){
        this.state.qsos = [];
        this.store();
    }
}
