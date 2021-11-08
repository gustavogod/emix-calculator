
/**
 * Receives a String, remove the last digit, and returns the new string
 * @param {String} s 
 * @returns 
 */
export function backspace(s) {
  let newString = '';

  if (s.length > 1) {
    newString = s.slice(0, -1);
    return newString;
  }
  else {
    return '0';
  }
}

/**
 * Receives an operation name and returns the respective symbol
 * @param {String} op must be one of: 'plus', 'minus', 'multiplication' or 'division'
 */
 export function getOperationSymbol(op) {
  if (op === 'plus'){
    return '+';
  }
  else if (op === 'minus') {
    return '-';
  }
  else if (op === 'multiplication') {
    return '×';
  }
  else if (op === 'division') {
    return '÷';
  }
}