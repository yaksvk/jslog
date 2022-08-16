const ADIF_FIELDS = [
    {id: 'date',     var: 'DATE'},
    {id: 'utc',      var: 'TIME_ON'},
    {id: 'callsign', var: 'CALL'},
    {id: 'mode',     var: 'MODE'}, 
    {id: 'freq',     var: 'FREQ'}, 
    {id: 'rst_sent', var: 'RST_SENT'}, 
    {id: 'rst_rcvd', var: 'RST_RCVD'}, 
    {id: 'note',     var: 'COMMENT'}, 
];

export class ExportAdif {

    constructor(){
    }

    export(log){
        let body =
            log.state.qsos.map(qso => this.transformQso(qso)).join("\n");

        return body;
    }

    transformQso(qso){

        const qsoText = ADIF_FIELDS.map(adifField => this.adifVariable(adifField.var, qso[adifField.id])).join('');
        return `${qsoText}<EOR>`;
    }

    adifVariable(name, value){
        return `<${name}:${value.length}>${value}`;
    }
}
