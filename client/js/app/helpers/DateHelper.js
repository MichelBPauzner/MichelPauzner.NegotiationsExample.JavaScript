class DateHelper{

    constructor(){
        throw new Error('A classe não pode ser instanciada.');
    }

    static toDate(text){

       if(!/\d{4}-\d{2}-\d{2}/.test(text)) 
            throw new Error('Texto deve estar no formato aaaa-mm-dd');

      return new Date(...text
                .split('-')
                .map((item, index) => item - index % 2));

    }

    static toText(date){
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    }
}