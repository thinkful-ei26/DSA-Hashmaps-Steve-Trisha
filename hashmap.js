'use strict';

class HashMap {
  constructor(initialCapacity =10){
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
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
    const loadRatio = (this.length + 1) / this._capacity;
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

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    for (let i=start; i<start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._slots[index];
      if (slot === undefined || slot.key === key) {
        return index;
      }
    }
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

  _resize(size){
    const oldSlots = this._slots;
    this._capacity = size;
    //Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._slots = [];
    this._deleted = 0;

    for(const slot of oldSlots) {
      if (slot !== undefined) {
        this.set(slot.key, slot.value);
    }
  }


} 

//if the slots are getting full then resize the array, so that there are more slots
//why? to reduce # of collisions
HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;