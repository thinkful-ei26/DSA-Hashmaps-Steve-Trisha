'use strict';

const hashTable = 10;
//When the key is a number
// not good, it will not uniformaly distribute the slots
const simpleHash = number => {
  return number % hashTable.length;
};

console.log('# hash:',simpleHash(5));

//when the key is a string
/* 
  const obj = {
    key: 'trisha',
    value: 'vocals'
  };

  Take the ASCII value of each character and add them up
*/

//input:
//output
const simpleHashStr = string => {
  let total = 0;
  for (let i = 0; i < string.length; i++) {
    total += string.charCodeAt(i);
  }
  return total % hashTable.length;
};

console.log('str hash:',simpleHashStr('so'));

//put a string -> hash will give you 
// input str, hash it, get a mod by the length
const hashStr = str => {
  //there are certain prime #s that are good for hashing, set it to a variable
  let hash = 5381;
  //with each ascii val, add it to a left shift hash by 5 bits, the hash, and the ASCII code of the character
  for (let i=0; i<str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    //hash on 41 can become really large, you want the output to be a certain bit. Let's say you want to have a 32bit. But with the bit shift on line 41, line 43 will keep the number w/in the 32 bit. If it's beyond, forces it to be 32. It happens for all of the characers.
    hash = hash & hash;
  }
  //forces the overall value to be it's absolute value (it's just gonna be a positive hash, we can't have a negative index)
  return hash >>> 0;
};