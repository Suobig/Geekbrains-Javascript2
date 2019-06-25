// const option1 = new RegExp('pattern'); //один из вариантов записи
// const option1 = /pattern/;

const rx = /(g.+?k\b)/gi;
const str = "Hello, I'm a Greek geek from Geekbrains";
console.log(str.replace(rx, 'guru')); //true
