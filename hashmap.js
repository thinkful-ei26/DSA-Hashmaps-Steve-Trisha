'use strict';

class HashMap {
  constructor(initialCapacity=8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      throw new Error('Key error');
    }
    return this._slots[index].value;
  }

  //1. hash item using the hash fn, to determine the slot index
  //2. go to index, and insert item (if there are no collision)
  //3. Best O(1), O(n) traverse list (like linked list)

  // Binary Search Sort Tree, to increase the runtime at O(n) for collisions
  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    const index = this._findSlot(key);
    this._slots[index] = {
      key,
      value,
      deleted: false
    };
    this.length++;
  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }
    slot.deleted = true;
    this.length--;
    this._deleted++;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    for (let i=start; i<start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._slots[index];
      if (slot === undefined || (slot.key === key && !slot.deleted)) {
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.deleted) {
        this.set(slot.key, slot.value);
      }
    }
  }

  //input 'tauhida'
  //output 'lhdkahdflig20398hlk'
  static _hashString(string) {
    let hash = 5381;
    for (let i=0; i<string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

const lor = new HashMap(20);

lor.set('Hobbit', 'Bilbo');
lor.set('Hobbit', 'Frodo');
lor.set('Wizard', 'Gandolf');
lor.set('Human', 'Aragon');
lor.set('Elf', 'Legolas');
lor.set('Maiar', 'The Necromancer');
lor.set('Maiar', 'Sauron');
lor.set('RingBearer', 'Gollum');
lor.set('LadyOfLight', 'Galadriel');
lor.set('HalfElven', 'Arwen');
lor.set('Ent', 'Treebeard');
// lor.set('Hobbit', 'Samwise');
//console.log(lor.get('Maiar'));
//console.log(lor);

/* ===== PALINDROME ===== */
//length of character
//correct characters
//array of permutations, check each one to see if they match

// O(!n)
// car 3 x 2 x 1
// care 4 x 3 x 2 x 1

const regPalindrome = str => {
  //const reg = /[a-zA-Z0-9]/ig;
  const regex = /[\W_]/g;
  //give me all the str with just the alphaNumeric
  const trimStr = str.toLowerCase().replace(regex, '');

  const reversed = trimStr.split('').reverse().join('');
  if(reversed === trimStr) return true;
  return false;
};

// console.log(regPalindrome('eye'));

const isPalindrome = str => {
  if(str.length === 0) {return true;}
  if(str[0] !== str[str.length -1]){
    return false;
  }
  return isPalindrome(str.slice(1, str.length-1));
};

//console.log(isPalindrome('abccba'));


//input: racecar
//output: true
// |r | a | c | e  | |
// key: r, value: 2
const palindrome = str => {
  const hash = new Map();

  const regex = /[a-z]/ig;
  //normalize the string
  const trimStr = str.toLowerCase().replace(regex, '');
  
  for (let i =0; i < str.length; i++){
    let count = hash.get(str[i]);
    if(hash.has(str[i])) { //
      hash.set(str[i], count+1);
    } else {
      hash.set(str[i], 1);
    }
  }

  //iterate through hash table 
  let oddCount = 0;
  hash.forEach(value => {
    //if it is odd, increment odd
    if(value % 2 !== 0){
      oddCount ++;
    } 
  });

  if(oddCount > 1) {
    return false;
  }
  return true;
};

// console.log(palindrome('racecar'));
// console.log(palindrome('north'));

/* ===== ANAGRAM GROUPING ===== */
//input:['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']
//output: [['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']]

// hashmap: | 'east' | 'teas' | 'eats' | | | | |
// 1) check to see if the next iteration has all of the characters 
// 2) if not, go to next iteration 'acre'
// 3) if all characters match, push to hashmap 'teas'
// 'east', 'cars',
// group them, and then pust to another array

//Better implementation:
/* 
1. Normalize and sort the word, if both words are equal then its an anagram
2. Use a try...catch block to group words of the same keys, and array value => ('aest', [east, teas, eats])
3. In the catch block, if the hashmap is initially empty, then just push the word as its first instance. you also need a way to capture the keys so you can retrieve the values and push it to a multidimensional array. 
4. Using .push & .get (w/ keys array), push values in a multi-dimensional array
*/

const anagram = wordArray => {
  const hashmap = new Map();
  let keysArr = [];
  let anagramArr = [];
  wordArray.forEach( word => { //iterate through the entire array sorting each word
    let sortedWord = word
      .toLowerCase()
      .split('')
      .sort()
      .join('');
    //console.log('sortedWord',sortedWord);
   
    try { //check the entire sorted array for duplicates, which means that the word at that position is an anagram
      let groupedArr = hashmap.get(sortedWord);
      hashmap.set(sortedWord, [...groupedArr, word]); //if sortedWord is an anagram, then return the value as the array of those words
      //console.log('hashmap',hashmap);
    } catch(e) { 
      hashmap.set(sortedWord, [word]); //in the first iteration, whent he hashmap is empty, just push the word in the hashmap
      keysArr.push(sortedWord); //also push the keys so we can use it later to get the anagramArr
    }
  });
  //using the keys array, push the values in the current hashmap
  for (let key of keysArr) {
    anagramArr.push(hashmap.get(key));
  }
  return anagramArr;
};

console.log(anagram(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));

