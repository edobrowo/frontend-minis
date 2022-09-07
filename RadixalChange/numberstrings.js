let isBetween = (n, a, b) => a <= n && n <= b;

let stringIsNumber = function(str, radix = 10) {
  radix = Math.floor(radix);
  if (!isBetween(radix, 2, 36)) throw new Error(`stringIsNumber() argument radix ${radix} must be within range [2,36]`);

  const symbols = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const symbolsSubset = symbols.substring(0, radix);
  let rSymbols = new RegExp(`^-?[${symbolsSubset}]+(\.?[${symbolsSubset}]+)?$`, "i");

  return rSymbols.test(str);
}

let stringToNumber = function(str, radix = 10) {
  radix = Math.floor(radix);
  if (!isBetween(radix, 2, 36)) throw new Error(`stringToNumber() argument radix ${radix} must be within range [2,36]`);
  if (!stringIsNumber(str, radix)) return NaN;

  str = str.toUpperCase();

  let negative = false;
  if (str[0] === "-") {
    str = str.substring(1);
    negative = true;
  }
  
  let integralPart = str;
  let fractionalPart = "";
  let decimalPos = str.indexOf(".");
  if (decimalPos !== -1) {
    integralPart = str.substring(0, decimalPos);
    fractionalPart = str.substring(decimalPos + 1);
  }

  const symbolMap = 
    {"0" : 0, "1" : 1, "2" : 2, "3" : 3, "4" : 4, "5" : 5, "6" : 6, "7" : 7, "8" : 8, "9" : 9,
     "A" :10, "B" :11, "C" :12, "D" :13, "E" :14, "F" :15, "G" :16, "H" :17, "I" :18, "J" :19,
     "K" :20, "L" :21, "M" :22, "N" :23, "O" :24, "P" :25, "Q" :26, "R" :27, "S" :28, "T" :29,
     "U" :30, "V" :31, "W" :32, "X" :33, "Y" :34, "Z" :35};

  let radixPower = 1;
  let num = integralPart.split("").reduceRight(
    (accumulator, currentSymbol) => {
      accumulator += symbolMap[currentSymbol] * radixPower;
      radixPower *= radix;
      return accumulator;
    },
  0);

  if (fractionalPart !== "") {
    radixPower = 1 / radix;
    num += fractionalPart.split("").reduce(
      (accumulator, currentSymbol) => {
        accumulator += symbolMap[currentSymbol] * radixPower;
        radixPower /= radix;
        return accumulator;
      },
    0);
  }
  if (negative) num *= -1;
  return num;
}


let changeRadix = function(str, firstRadix = 10, secondRadix = 2) {
  if (!(isBetween(firstRadix, 2, 36) && isBetween(secondRadix, 2, 36))) throw new Error(`Radix ${firstRadix} or ${secondRadix} out of range [2,36]`);
  if (str === "") return "";
  let num = stringToNumber(str, firstRadix);
  return num.toString(secondRadix);
}
