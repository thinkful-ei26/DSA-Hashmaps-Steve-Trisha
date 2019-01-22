'use strict';

/* 

input: flight_length = 180  movie_length = [90, 60, 30, 150, 90, 60]
output: Boolean

*/

//You would have a loop, iterate through the loop, checking to see the item that I am on and checking every other item to see if the total movie_lengths will match the flight_length
//add i + (i+1) if that is === flight_length
//loop ends
//return false

//nested loop = O(n^2)

// | | 90| 30 | 60 |
//loop through movie_lengths
// 90 (with empty hashmap)
// second_movie = 180 - 90; 180 - 120; 150 - 30;
// look for the second_movie in the hashmap
// found it => return true
// not found => hash first_movie into the hashmap

const movieFlights = (movie_lengths, flight_time) => {

  let first_movie, second_movie = 0;
  let movieSelection = new HashMap();

  for (let i = 0; i < movie_lengths.length; i++){
    first_movie = movie_lengths[i];
    second_movie = flight_time - first_movie;

    if(movieSelection.has(second_movie)) return true;
    return movieSelection.set(first_movie);
  }
  return false;

};