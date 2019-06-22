const prom = function(init) {
  return new Promise((resolve, reject) => {
    if (init === 1) {
      resolve(init);
    } else {
      reject(init);
    }
  });
}

const add1 = val => val + 1;
const log = function(val) {
  console.log(val);
}

prom(1).then( val => add1(val) )
       .then( val => add1(val) )
       .then( val => log(val) )
       .catch( err => console.error(err))
