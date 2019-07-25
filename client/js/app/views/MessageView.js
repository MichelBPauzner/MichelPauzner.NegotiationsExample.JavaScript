class MessageView extends View{
    
    constructor(element){
        super(element);

    }

    template(model) {
        return model.message ?  `<p class="alert alert-info">${model.message}</p>` : '<p></p>';
    }

}