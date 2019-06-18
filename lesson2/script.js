// function TestOuter(val1, val2) {
//   const self = this;

//   let innerVal = val1;
//   self.publicVal = val2; 


//   self.report = function() {
//     innerLevel1Report = function() {
//       console.log(`Inner level 1 function reporting inner: ${innerVal}`);
//       console.log(`Inner level 1 function reporting public: ${self.publicVal}`);
//       privateReport();
//     };

//     console.log(`Outer function reporting: ${innerVal}`);
//     console.log(`Outer function reporting public: ${self.publicVal}`);
//     innerLevel1Report();
//     privateReport();
//   }

//   function privateReport() {
//     console.log(`Private function reporting inner: ${innerVal}`);
//     console.log(`Private function reporting public: ${self.publicVal}`);
//   }
// }


// class TestOuter {
//   #privateVal;

//   constructor(val1, val2) { 
//     this.#privateVal = val1;
//     this.publicVal = val2;
//   }

//   report() { 
//     console.log(`Outer function reporting private: ${this.#privateVal}`);
//     console.log(`Outer function reporting public: ${this.publicVal}`);
//   }
// }

// const outer = new TestOuter("foo", "bar");
// outer.report();
// // outer.privateReport();