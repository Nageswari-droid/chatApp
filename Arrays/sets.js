function invoke() {
    const setNew = new Set([1, 2, 3, 'hi', 'hello', 'world']);
    setNew.add(4);

    if (setNew.has(2)) {
        setNew.delete(2);
    }

    for (const entryVal of setNew.entries()) {
        console.log(entryVal[0]);
    }

    // maps
    const person1 = { name: 'Max' };
    const person2 = { name: 'Steve' };

    const personInfo = new Map([
        [person1, [{ date: 'yesterday', price: 10 }]]
    ]);

    personInfo.set(person2, [{ date: 'today,price:20' }]);

    // console.log(personInfo);

    for (const key of personInfo.keys()) {
        console.log(key);
    }

    for (const [key, value] of personInfo.entries()) {
        console.log(key, value);
    }

    for (const value of personInfo.values()) {
        console.log(value);
    }


    let name = { name: 'Max' };
    const newWeakSet = new WeakSet(); //WeakMap similar
    newWeakSet.add(name);

    name = null;

    console.log(newWeakSet);
}