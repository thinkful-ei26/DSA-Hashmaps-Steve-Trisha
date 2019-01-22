'use strict';

class HashMap {
  constructor(initialCapacity =10){
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
  }

  //input 'tauhida'
  //output 'lhdkahdflig20398hlk'
  static _hashString(string) {
    let hash = 5381;
    for (let i=0; i<string.length; i++){
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }

  set(key, value){

  }
} 

//if the slots are getting full then resize the array, so that there are more slots
//why? to reduce # of collisions
HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;