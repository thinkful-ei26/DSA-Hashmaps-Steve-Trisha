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

  _findSlot(key){
    //to find the slot, you gotta use the hashString fn
    const hash = ChainedHashMap._hashString(key);
    return hash % this.capacity;
  }

  _resize(size) {
    const oldSlots = this.slots;

    this.capacity = size;
    this.length = 0;
    this.slots = [];

    for (const slot of oldSlots) {
      if (slot) {
        for (const item of slot) {
          this.set(item.key, item.value);
        }
      }
    }
  }

  get(key) {
    const index = this._findSlot(key);
    if (this.slots[index] === undefined) {
      throw new Error('KeyError: Could not find key');
    }

    const found = this.slots[index].find((item) => item.key === key);

    if (!found) {
      throw new Error('KeyError: Could not find key');
    }

    return found.value;
  }
  remove(key) {
    const index = this._findSlot(key);
    const slot = this.slots[index];
    if (!slot) {
      throw new Error('KeyError: Unknown key');
    }

    const found = this.slots[index].find((item) => item.key === key);
    if (!found) {
      throw new Error('KeyError: Unknown key');
    }

    const indexToDelete = slot.indexOf(found);
    slot.splice(indexToDelete, 1);

    this.length -= 1;
  }

  set(key, value) {
    //check to see if we're overcapacity 
    const loadRatio = (this.length +1) / this.capacity;
    if(loadRatio > ChainedHashMap.MAX_LOAD_RATIO) {
      this._resize(this.capacity * ChainedHashMap.RESIZE_RATIO);
    }

    //if we're still in capacity, you have to find the index using the hash fn, & set the slot
    const index = this._findSlot(key);
    const slot = this._slots[index];
   
    //check if slot has a list in it
    if(!slot){
      //no collisions
      this._slots[index] = [{key, value}];
      this.length += 1;
    } else {
      //Figure out if colliding or overwriting
      // Collide: there is no object in the list slot that has a key of `key`
      // Overwrite: there is such an object
      const object = slot.find(item => item.key === key);
      if(!object) {
        //collision
        slot.push({key, value});
        this.length += 1;
      } else {
        object.value = value;
      }
    }
  }

}

ChainedHashMap.MAX_LOAD_RATIO = 0.9;
ChainedHashMap.RESIZE_RATIO = 3;

function main() {
  const lor = new ChainedHashMap();

  lor.set('Hobbit', 'Bilbo');
  lor.set('Hobbit', 'Frodo');
  lor.set('Wizard', 'Gandolf');
  lor.set('Human', 'Aragorn');
  lor.set('Elf', 'Legolas');
  lor.set('Maiar', 'The Necromancer');
  lor.set('Maiar', 'Sauron');
  lor.set('RingBearer', 'Gollum');
  // console.log(lor);
  //console.log(lor.capacity, lor.length);
  //lor.set('LadyOfLight', 'Galadriel');
  //console.log(lor.capacity, lor.length);
  //console.log(lor);
  //lor.set('HalfElven', 'Arwen');
  // console.log(lor.capacity, lor.length);
  console.log(lor);
  //lor.set('Ent', 'Treebeard');

  // console.log(lor.get('Maiar'));
  // console.log(lor);
}

main();