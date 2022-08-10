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

    addQso(qso){
        this.state.qsos.push(qso);
        this.store();
    }

    store(){
        log('store to local storage');
        log(this.storageName);

        localStorage.setItem(this.storageName, JSON.stringify(this.state));
    }
}


export class ListLog extends Log {

    constructor(storageName){
        super(storageName);

        log('listlog constructor');
        log(this.state);
    
        this.listElement = document.getElementById('item_list'); 
        this.textElement = document.getElementById('input_text');

        // add buttons
        document.getElementById('input_submit')
            .addEventListener('click', () => this.clickButton());
        document.getElementById('input_post')
            .addEventListener('click', () => this.clickPost());

        this.redrawList();
    }

    redrawList(){
        this.state.qsos.forEach(item => {
            const newItem = document.createElement('li');
                newItem.appendChild(document.createTextNode(item));

            this.listElement.appendChild(newItem);
        });

    }

    addQso(qso){
        this.state.qsos.push(qso);
    
        const new_item = document.createElement('li');
            new_item.appendChild(document.createTextNode(qso));
        
        this.listElement.appendChild(new_item);
        this.store();
    }

    clickButton(){
        log('click button');
        log(this.state);
        this.addQso(this.textElement.value);
    }

    clickPost(){
        log('click post');

        fetch('https://jsonplaceholder.typicode.com/users', {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'POST',
            body: JSON.stringify({
                username: 'Elon Musk',
                email: 'elonmusk@gmail.com',
            })
        })
        .then(response => response.json())
        .then(jsondata => {
            log('jsondata processed');
            log(jsondata);
        });


        log('call submitted');
    }
}
