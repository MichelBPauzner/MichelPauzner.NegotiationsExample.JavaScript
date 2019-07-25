class ProxyFactory{


    static create(obj, props, action){
        return new Proxy(obj,{
            get(target, prop, receiver){
                if(props.includes(prop) && ProxyFactory._isFunction(target[prop])){

                    return function(){
                        console.log(`Proxy interceptor on getter. Function: "${prop}"`);
                        let result = Reflect.apply(target[prop], target, arguments);
                        action(target);
                        return result;
                    }
                }

                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver){
                let result = Reflect.set(target,prop, value, receiver);
                if(props.includes(prop)){
                    console.log(`Proxy interceptor on setter. Prop: "${prop}"`);
                    // target[prop] = value;
                    action(target);
                }
                return result;
            }
        });
    }

    static _isFunction(func){
       return typeof(func) == typeof(Function);
    }
}