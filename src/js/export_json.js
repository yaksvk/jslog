export class ExportJson {

    constructor(){
    }

    export(log){
        return JSON.stringify(log.state);
    }

}
