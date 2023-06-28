// Given an array of integers and a target value, you must determine which two integers' sum
//equals the target and return a 2D array. Then merge the array into a single array with sorting (
//ascending ) order, in the next step double the target value and find again the combination of
//digits (can be multiple digits ) that are equal to the double targeted value and returned into a 2D
//array.
//Sample Input : [1, 3, 2, 2, -4, -6, -2, 8];
//Target Value = 4,
//Output: First Combination For “4” : [ [1,3],[2,2],[-4,8],[-6,2] ];
//Merge Into a single Array : [-6,-4,1,2,2,2,3,8];
//Second Combination For “8” : [ [ 1,3,2,2], [8,-4,2,2],....,[n,n,n,n] ]//







function findCombinations(array, target) {
  const combinations = [];
  const map = new Map();

  for (let num of array) {
    const complement = target - num;
    if (map.has(complement)) {
      for (let pair of map.get(complement)) {
        combinations.push([num, pair]);
      }
    }

    if (!map.has(num)) {
      map.set(num, []);
    }
    map.get(num).push(num);
  }

  return combinations;
}

function mergeAndSort(array) {
  return array.sort((a, b) => a - b);
}

function findDoubleCombinations(array, target) {
  const doubledTarget = target * 2;
  const combinations = [];

  for (let i = 0; i < array.length; i++) {
    const currentNum = array[i];
    const remainingArray = array.slice(i + 1);
    const tempResult = findCombinations(remainingArray, doubledTarget - currentNum);
    for (let pair of tempResult) {
      pair.unshift(currentNum);
      combinations.push(pair);
    }
  }

  return combinations;
}

// Sample input
const input = [1, 3, 2, 2, -4, -6, -2, 8];
const target = 4;

// Find first combinations
const firstCombinations = findCombinations(input, target);
console.log("First Combination For", target + ":", firstCombinations);

// Merge and sort the array
const mergedArray = mergeAndSort(input);
console.log("Merge Into a single Array:", mergedArray);

// Find second combinations
const doubleCombinations = findDoubleCombinations(mergedArray, target);
console.log("Second Combination For", target * 2 + ":", doubleCombinations);
