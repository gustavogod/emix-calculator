
/**
 * Returns a float number with the result of the arithmetic operation between two numbers
 * 
 * Returns 'error' in case of division by zero
 * @param {Number} firstNumber 
 * @param {Number} secondNumber 
 * @param {String} operatorType must be one of: 'plus', 'minus', 'multiplication' or 'division'
 */
export function calcOperation(firstNumber, secondNumber, operatorType) {
  let result = 0;
  if (operatorType === 'plus') {
    result = firstNumber + secondNumber;
  }
  else if (operatorType === 'minus') {
    result = firstNumber - secondNumber;
  }
  else if (operatorType === 'multiplication') {
    result = firstNumber * secondNumber;
  }
  else if (operatorType === 'division') {
    if (firstNumber === 0 || secondNumber === 0) {
      return 'error';
    }
    else {
      result = firstNumber / secondNumber;
    }
  }
  return result;
}