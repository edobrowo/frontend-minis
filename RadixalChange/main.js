const firstRadix = document.querySelector("#first-radix");
const secondRadix = document.querySelector("#second-radix");
const firstNumber = document.querySelector("#first-number");
const secondNumber = document.querySelector("#second-number");

const isRadixValid = radix => {
  return stringIsNumber(radix) && isBetween(stringToNumber(radix), 2, 36);
}

const updateNumbers = function(e) {
  const radixValid = !(isRadixValid(firstRadix.value) && isRadixValid(secondRadix.value));
  firstNumber.disabled = radixValid;
  secondNumber.disabled = radixValid;
  if (radixValid) return;

  const updateSecond = e.target.getAttribute("id") !== "second-number";
  const firstRadixValue = stringToNumber(firstRadix.value);
  const secondRadixValue = stringToNumber(secondRadix.value);

  if (updateSecond) {
    secondNumber.value = changeRadix(firstNumber.value, firstRadixValue, secondRadixValue);
  } else {
    firstNumber.value = changeRadix(secondNumber.value, secondRadixValue, firstRadixValue);
  }
}

document.querySelector(".input-wrapper").addEventListener("input", updateNumbers);
