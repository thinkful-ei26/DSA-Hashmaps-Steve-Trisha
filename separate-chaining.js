'use strict';

class ChainedHashMap {
  constructor(initialCapacity=8){
    this.length = 0;
    this._slots = [];
    this.capacity = initialCapacity;
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i += 1) {
      // get ascii character code
      // multiple the existing hash by 33
      // add the character code to it
      // convert back to integer
  
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    // zero fill the upper 32 bits to ensure it is treated like a positive number
    return hash >>> 0;
  }


}

ChainedHashMap.MAX_LOAD_RATIO = 0.9;
ChainedHashMap.SIZE_RATIO = 3;