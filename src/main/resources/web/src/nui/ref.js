export class Ref {

    constructor(value) {
        this._value = value
        this.observers = []
    }

    addObserver(observer) {
        this.observers.push(observer)
    }

    removeObserver(observer) {
        this.observers.pop(observer)
    }

    set value(value) {
        const oldValue = this._value
        this._value = value
        for (const observer of this.observers) {
            observer(value, oldValue)
        }
    }

    get value() {
        return this._value
    }

    get observerCount() {
        return this.observers.length
    }

    static getValue(pRef) {
        if (pRef instanceof Ref) return pRef.value
        else return pRef
    }
}

export class RefArray {

    constructor(...values) {
        this._values = []
        for (const value of values)
            this._values.push(value)
        this.observers = []
    }


    addObserver(observer) {
        this.observers.push(observer)
    }

    removeObserver(observer) {
        this.observers.pop(observer)
    }

    callObservers(event, onFun) {
        for (const observer of this.observers) {
            const fun = observer[event]
            if (fun) {
                onFun(fun)
            }
        }
    }

    callAdd(value) {
        this.callObservers('onAdd', (fun) => fun(value))
    }

    callRemove(value, index) {
        this.callObservers('onRemove', (fun) => fun(value, index))
    }

    callInsert(value, index) {
        this.callObservers('onInsert', (fun) => fun(value, index))
    }

    callReplace(index, value) {
        this.callObservers('onReplace', (fun) => fun(index, value))
    }

    callUpdate() {
        this.callObservers('onUpdate', (fun) => fun(this._values))
    }

    replaceValue(index, value) {
        this._values.splice(index, 1, value);
        this.callReplace(index, value)
        this.callUpdate()
    }

    /**
     * replaces the first value which matches with `obj` with `value` 
     * 
     * @param {*} obj 
     * @param {*} value 
     */
    replaceValueMatching(obj, value) {
        this.replaceValueFor(
            (v) => {
                for (const [key, va] of Object.entries(obj)) {
                    if (v[key] != va) {
                        return false
                    }
                }
                return true
            }
            ,
            value
        )
    }

    /**
     * 
     * @param {function} condition 
     * @param {*} value 
     */
    replaceValueFor(condition, value) {
        this.replaceValue(this.findIndex(condition), value)
    }

    /**
     * 
     * @param {function} condition 
     * @param {*} defaultValue 
     */
    findIndex(condition, defaultValue) {
        return this._values.findIndex(condition, defaultValue);
    }

    /**
     * 
     * @param {function} condition 
     */
    find(condition) {
        return this._values.find(condition);
    }

    addValue(value) {
        this._values.push(value)
        this.callAdd(value)
        this.callUpdate()
    }

    add(...values) {
        for(const value of values) {
            this.addValue(value)
        }
    }

    addAll(values) {
        for(const value of values) {
            this.addValue(value)
        }
    }

    remove(value) {
        const index = this._values.indexOf(value)
        this.removeIndex(index)
    }

    removeIndex(index) {
        const len = this._values.length
        if (index >= len || index < 0) return
        const value = this._values.splice(index, 1)[0]
        this.callRemove(value, index)
        this.callUpdate()
    }

    removeLast() {
        this.removeIndex(this._values.length - 1)
    }

    insert(value, index) {
        this._values.splice(index, 0, value);
        this.callInsert(value, index)
        this.callUpdate()
    }

    set values(values) {
        this._values = values
        this.callUpdate()
    }

    get values() {
        return this._values
    }

    get observerCount() {
        return this.observers.length
    }
}

export class RefArrayObserver {
    onUpdate(values) {}
    onAdd(value) {}
    onRemove(value, index) {}
    onInsert(value, index) {}
    onAddAll(values) {}
    onRemoveAll(values) {}
}

export class RefArrayObserverLogger extends RefArrayObserver {
    onUpdate(values) {
        console.log("onUpdate: " + values);
    }
    onAdd(value) {
        console.log("onAdd: " + value);
    }
    onRemove(value) {
        console.log("onRemove: " + value);
    }
    onAddAll(values) {
        console.log("onAddAll: " + values);
    }
    onRemoveAll(values) {
        console.log("onRemoveAll: " + values);
    }
}

export const refArray = (...values) => new RefArray(...values)

export const ref = (value) => new Ref(value)

