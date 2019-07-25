class NegotiationService {

    constructor(){
        this._http = new HttpService();
    }

    getNegotiationsOfWeek() {
           return this._http
                .get('negotiations/week')
                .then(negotiations => {
                    return negotiations.map(res => new Negotiation(new Date(res.date), res.quantity, res.value));
                })
                .catch(err=> {
                    console.log(err);
                    throw new Error('Não foi possível importar as negociações da semana do servidor.');
                });
        }
        //  let xhr = new XMLHttpRequest();
        //     xhr.open('GET', 'negotiations/week');
    
        //     xhr.onreadystatechange = () => {
        //         if(xhr.readyState == 4){
        //             if(xhr.status == 200){
        //                 console.log('Importing negotiations from API Server');
                        
        //                 resolve(
        //                     JSON
        //                         .parse(xhr.responseText)
        //                         .map( res => new Negotiation(new Date(res.date), res.quantity, res.value)));
        //                         //.forEach(negotiation => this._negotiationsList.add(negotiation));
        //                         // this._message.message = 'Negociações importadas com sucesso do servidor.';
    
        //             } else {
        //                 console.log('Error attempting to get data from API Server...');
        //                 console.log(`Response: ${xhr.responseText}`);
        //                 reject('Não foi possível importar as negociações da semana do servidor.');
        //                 //this._message.message = 'Não foi possível importar as negociações do servidor.';
        //             }
        //         }
    
        //     };
        //     xhr.send();

        // });
   
    getNegotiationsOfPreviousWeek() {
        return this._http
                .get('negotiations/previous')
                .then(negotiations => {
                    return negotiations.map(res => new Negotiation(new Date(res.date), res.quantity, res.value));
                })
                .catch(err=> {
                    console.log(err);
                    throw new Error('Não foi possível importar as negociações da semana do servidor.');
                });
        }

    getNegotiationsOfLastWeek() {
        //pure ajax
            return this._http
                .get('negotiations/last')
                .then(negotiations => {
                    return negotiations.map(res => new Negotiation(new Date(res.date), res.quantity, res.value));
                })
                .catch(err=> {
                    console.log(err);
                    throw new Error('Não foi possível importar as negociações da semana do servidor.');
                });
        }

    getAllNegotiations(){
        return Promise.all([
            this.getNegotiationsOfWeek(),
            this.getNegotiationsOfPreviousWeek(),
            this.getNegotiationsOfLastWeek()
        ]).then(res => {

            let negotiations = res
                .reduce((result, res) => result.concat(res), []);

            return negotiations;

        }).catch(err => {
            throw new Error(err);
        });
    } 

}