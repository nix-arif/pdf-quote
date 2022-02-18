const { parse, stringify } = require('flatted');

const mycar = {};
mycar.a = mycar;

stringify(mycar);
console.log(mycar);

const a = [{}];
a[0].a = a;
a.push(a);

stringify(a);
