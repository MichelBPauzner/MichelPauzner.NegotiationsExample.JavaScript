class NegotiationList {

    constructor(){
        this._negotiations = [];
    }

    add(negotiation){
        this._negotiations.push(negotiation);
    }

    get negotiations() {
        return [].concat(this._negotiations);
    }

    clear(){
        this._negotiations = [];
    }

    orderBy(criteria){
        this._negotiations.sort(criteria);
    }

    reverseOrder(){
        this._negotiations.reverse();
    }

    get totalVolume() {
        return this._negotiations.reduce( (total, n) => total + n.volume, 0.0);
    }

}