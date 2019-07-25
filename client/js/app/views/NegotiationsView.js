class NegotiationsView extends View {

    constructor(element){
        super(element);

    }

    template(model){

        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th onclick="negotiationController.orderBy('date')">DATA</th>
                        <th onclick="negotiationController.orderBy('quantity')">QUANTIDADE</th>
                        <th onclick="negotiationController.orderBy('value')">VALOR</th>
                        <th onclick="negotiationController.orderBy('volume')">VOLUME</th>
                    </tr>
                </thead>
                
                <tbody>
                    ${model.negotiations.map(n => 
                        `
                            <tr>
                                <td>${DateHelper.toText(n.date)}</td>
                                <td>${n.quantity}</td>
                                <td>${n.value}</td>
                                <td>${n.volume}</td>
                            </tr>
                        `
                    ).join('')}
                </tbody>
                
                <tfoot>
                    <td colspan="3"></td>
                    <td>${
                        // (function(){
                        //     let total = 0;
                        //     model.negotiations.forEach(n => total += n.volume);
                        //     return total;
                        // })() Immediately-invoked function expression (IIFE)
                        //model.negotiations.reduce((total, n) => total + n.volume, 0.0)
                        model.totalVolume
                    }
                    </td>
                </tfoot>
            </table>
        `;

    }

}