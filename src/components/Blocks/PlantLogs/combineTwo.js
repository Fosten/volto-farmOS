export function combineTwo(inputArray) {
  //Starting with the beginning of the array, this function combines index 0 with 1, 2 with 3, and so on for the entire length of the array
  var result = []; //this will the variable that we store our result in
  for (var i = 0; i < inputArray.length; i += 2) {
    //This for loop iterates through every other index of the array... for example: 0, 2, 4, etc.
    result.push([inputArray[i], inputArray[i + 1]]); //Adds i and i+1 as a new array to the result array
  }
  return result;
}
