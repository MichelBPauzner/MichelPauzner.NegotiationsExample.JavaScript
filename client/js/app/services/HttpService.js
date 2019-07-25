class HttpService{
    get(url){
        return new Promise((resolve, reject) => {
            
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
    
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        console.log('Importing negotiations from API Server');
                        resolve(JSON.parse(xhr.responseText));
                        //.forEach(negotiation => this._negotiationsList.add(negotiation));
                                // this._message.message = 'Negociações importadas com sucesso do servidor.';
                    } else {
                        console.log('Error attempting to get data from API Server...');
                        console.log(`Response: ${xhr.responseText}`);
                        reject(xhr.responseText);
                         //this._message.message = 'Não foi possível importar as negociações do servidor.';
                    }
                }
            };
            xhr.send();
        });
    }

    post(url, data) {
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {

                        resolve(JSON.parse(xhr.responseText));
                    } else {

                        reject(xhr.responseText);
                    }
                }
            };
            xhr.send(JSON.stringify(data)); // usando JSON.stringifly para converter objeto em uma string no formato JSON.
        });

    }
}