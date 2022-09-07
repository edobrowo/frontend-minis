const bytesFromCodePoints = function(codePoint) {
  // 1 byte
  if (0 <= codePoint && codePoint <= 127) 
    return [codePoint];

  // 00000000 000WWWXX XXXXYYYY YYZZZZZZ
  const W = (0b111    << 18 & codePoint) >> 18;
  const X = (0b111111 << 12 & codePoint) >> 12;
  const Y = (0b111111 << 6  & codePoint) >> 6;
  const Z = (0b111111       & codePoint);

  const skip = 0b10000000;
  // 2 bytes
  if (0 <= codePoint && codePoint <= 2047)
    return [0b11000000 | Y, skip | Z];
  // 3 bytes
  else if (codePoint <= 65535)
    return [0b11100000 | X, skip | Y, skip | Z];
  // 4 bytes
  else if (codePoint <= 1114111)
    return [0b11110000 | W, skip | X, skip | Y, skip | Z];
  // null otherwise
  return [0];
}

document.querySelector("#input-character").addEventListener
("input", function() {
  const inputCharacter = document.querySelector("#input-character");
  const codePointNumber = document.querySelector("#code-point-number");
  const codePointBits = document.querySelector("#code-point-bits");
  const encodingBits = document.querySelector("#encoding-bits");
  const encodingHex = document.querySelector("#encoding-hex");

  // enforce 1 character
  if (inputCharacter.value.length > 1) {
    inputCharacter.value = inputCharacter.value[0];
    return;
  } else if (inputCharacter.value.length < 1) {
    return;
  }

  const codePoint = inputCharacter.value.codePointAt();
  const codePointNumberString = `U+${codePoint.toString(16).padStart(6, "0")}`;

  const bytes = bytesFromCodePoints(codePoint);
  let encodingBitString = "";
  let encodingHexString = "";
  for (const byte of bytes) {
    encodingBitString += `${byte.toString(2)} `;
    encodingHexString += `${byte.toString(16)} `;
  }

  if (encodingBitString.length < 8) encodingBitString = encodingBitString.padStart(8, "0").trim();
  encodingHexString = encodingHexString.trim();

  const codePointBitString = codePoint.toString(2).padStart(24, "0").replace(/.{8}/g, '$& ').trim();

  codePointNumber.textContent = codePointNumberString;
  codePointBits.textContent = codePointBitString;
  encodingBits.textContent = encodingBitString;
  encodingHex.textContent = encodingHexString;
});
