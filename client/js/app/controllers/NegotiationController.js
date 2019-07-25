class NegotiationController {

    constructor(){
        let $ = document.querySelector.bind(document);
    
        this._inputDate = $('#date');
        this._inputQuantity = $('#quantity');
        this._inputValue = $('#value');
        this._actualOrder = '';
       
        // this._negotiationsList = new NegotiationList(model =>
        //      this._negotiationsView.update(model));
        
        // this._negotiationsList = ProxyFactory.create(
        //     new NegotiationList(),
        //     ['add', 'clear'], model => 
        //         this._negotiationsView.update(model));
        
        this._negotiationsList = new Bind(
            new NegotiationList(),
            new NegotiationsView($('#negotiationsView')),
            'add','clear', 'orderBy', 'reverseOrder');

        
        // this._message = ProxyFactory.create(
        //     new Message(),
        //     ['message'], model => this._messageView.update(model));

        this._message = new Bind(
            new Message(),
            new MessageView($('#messageView')),
            'message');
        
       

    }

    add(event) {
        event.preventDefault();
        this._negotiationsList.add(this._createNegotiation());
        this._message.message = 'Negociação adicionada com sucesso!';
        this._cleanupForm();
    }

    importNegotiations(){

        let service = new NegotiationService();

        service
            .getAllNegotiations()
            .then(negotiations => {
                negotiations
                    //.reduce((result, array) => result.concat(array), [])
                    .forEach(negotiation => this._negotiationsList.add(negotiation));
                this._message.message = 'Negociações importadas com sucesso do servidor.';

        })
            .catch(err => this._message.message = err);


        /*
        service.getNegotiationsOfWeek()
            .then(negotiations => {
                negotiations.forEach(negotiation => this._negotiationsList.add(negotiation));
                this._message.message = 'Negociações importadas com sucesso do servidor.';
            })
            .catch(err => this._message.message = err);
        */

       
    }

    delete(){
        this._negotiationsList.clear();
        this._message.message = 'Negociações apagadas com sucesso!';
    }

    _createNegotiation(){
        return new Negotiation(
            DateHelper.toDate(this._inputDate.value),
            this._inputQuantity.value,
            this._inputValue.value
        );
    }

    _cleanupForm(){
        this._inputDate.value = '';
        this._inputQuantity.value = 1;
        this._inputValue.value = 0;
        this._inputDate.focus();
    }

    orderBy(column){
        if(this._actualOrder == column){
            this._negotiationsList.reverseOrder();

        } else {
            this._negotiationsList.orderBy((a, b) => a[column] - b[column]);    
        }
        this._actualOrder = column;
    }

  


}