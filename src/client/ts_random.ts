export default function RandomNumberProvider(maxNum: number, noOfRandom: number) :number[] {
  function getRandom(minNum: number, maxNum: number) :number {
      return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
  }

  var result = [];

  for (var i = 0; i < noOfRandom; i++) {
      var j = getRandom(1, maxNum);
      while (result.indexOf(j) > -1) {
        j = getRandom(1, maxNum);
      }
      result.push(j);
  }
  return result;
}
