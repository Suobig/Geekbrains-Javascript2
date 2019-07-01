const text = 
"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut odio vero quidem \
magnam maiores quaerat quisquam 'modi' similique ea aren't dolorem labore error cupiditate \
provident ('aperiam') reprehenderit, gro'ß voluptates tempore Ким'Чи adipisci architecto assumenda \
ipsa nulla 'dolor'? 'Atque ipsum laborum qui, necessitatibus perferendis, ab amet \
corrupti tempora, mollitia fugiat esse fugit magni'! Perspiciatis."

const regExp1 = /'/gm;
const regExp2 = /(\p{L})"(\p{L})/gmu;

const returnText = text.replace(regExp1, '"').replace(regExp2, "$1'$2");

console.log(text);
console.log(returnText);