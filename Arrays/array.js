function invoke() {

    const newFormat = Array.of(1);
    console.log(newFormat);

    const numFromArray = Array.from([2]);
    console.log(numFromArray);

    const arr = [1, 2, 3, 5, 6];
    console.log(arr);

    const arrOne = ('Hi', 'Hello', 'nice to see you');
    console.log(arrOne); //consoles the last element alone.

    const newFormatMethod = Array.from("hello");
    console.log(newFormatMethod); //output : ['h','e','l','l','o']

    const listSelector = document.querySelectorAll('li');
    console.log(listSelector);

    const arrayList = Array.from(listSelector);
    console.log(arrayList);

    const arrAddDel = Array('netflix', 'prime', 'hostar', 'series', 'movie');
    arrAddDel.push('apple tv');
    // arrAddDel.unshift('HBO');
    // console.log(arrAddDel);

    // arrAddDel.pop();
    // arrAddDel.shift();
    // console.log(arrAddDel);

    arrAddDel.splice(1, 0, 'HBO');
    console.log(arrAddDel);

    const testResults = [1, 2, 3, 4, 5];
    // let storeResults = testResults;
    let storeResults = testResults.slice();
    //storeResults array remains same though there is any change in testRseults. 
    // It is applicable only when slice() is used. 

    storeResults = testResults.concat([7, 8, 9, 10]);
    testResults.push(6);
    console.log(testResults, storeResults);

    // output : testResults => [1,2,3,4,5,6] , storeResults => [1,2,3,4,5,7,8,9,10]

    const indexArr = [1, 2, 3, 1, 4, 5, 1, 6, 7];
    console.log(indexArr.includes(2)); //true
    console.log(indexArr.indexOf(1)); //ouput : 0
    console.log(indexArr.lastIndexOf(1)); //output : 6
    console.log(indexArr.indexOf(1, 2)); //output : 3
    console.log(indexArr.lastIndexOf(1, 5)); //output : 3

    //To find an element from an object
    const personDetails = [{ name: 'max' }, { name: 'henry' }, { name: 'ben' }];
    const findName = personDetails.find((person) => {
        return person.name === 'max';
    });

    findName.name = 'Hannah';
    console.log(findName, personDetails); //output : hannah , name : hannah

    const findNameIndex = personDetails.findIndex((person) => {
        return person.name === 'ben';
    });
    console.log(findNameIndex);


    //map & forEach => same output but different approach
    const marks = [90, 99, 80, 45, 100, 10, 20];
    const InternalMark = 0.5;
    //map
    const finalMarkArr = marks.map((markValue, indx) => {
        const markObj = { index: indx, finalMarkArr: markValue * InternalMark };
        return markObj;
    });

    //foreach 
    // marks.forEach((markValue, indx) => {
    //     const markObj = { index: indx, finalMarkArr: markValue * InternalMark };
    //     finalMarkArr.push(markObj);
    // });

    console.log(finalMarkArr);

    //sort function for numbers

    // If the result is negative a is sorted before b.
    // If the result is positive b is sorted before a.
    // If the result is 0 no changes are done with the sort order of the two values.

    const sortedArray = marks.sort((a, b) => {
        if (a > b) {
            return 1;
        }
        if (a == b) {
            return 0;
        } else {
            return -1;
        }
    });

    console.log(sortedArray);
    console.log(sortedArray.reverse());
    // sort fn for string
    const strArr = ['hi', 'apple', 'orange', 'banana'];
    console.log(strArr.sort());
    console.log(strArr.reverse());

    // filter fn
    const filterArr = marks.filter((markValue) => {
        return markValue < 60;
    });
    console.log(filterArr);

    // sumof elements in an array
    const reduceFunc = marks.reduce((preValue, currentValue) => {
        return preValue + currentValue;
    }, 0);
    console.log(reduceFunc);

    // arrays & strings
    const str = 'My name is Steve 2';
    const splitArray = str.split(' ');
    splitArray[4] = parseInt(splitArray[4]); //parseInt or + => for str to int conversion
    console.log(splitArray);

    const arrStr = ['Steve', 'Rogers'];
    const toStr = arrStr.join(' ');
    console.log(toStr);

    // ... operator
    console.log(Math.min(...marks)); //without ... min value cannot be refined from the array

    const obj = [{ name: 'max', age: 30 }, { name: 'steve', age: 31 }, { name: 'hannah', age: 25 }];

    // const copyObj = obj.map((obj) => ({
    //     name: obj.name,
    //     age: obj.age
    // }));

    const copyObj = [...obj];

    obj[3] = { name: 'ana', age: 20 }; //affects only obj 
    obj[1].name = 'Rogers'; //value changes in both obj & copyObj but when map is used steve in copyObj remains the same
    console.log(obj, copyObj);

    const personData = ['Bruce', 'Wayne', 30, 'Gotham'];
    const [firstName, lastName, ...otherInfo] = personData;
    console.log(firstName, lastName, otherInfo);
}