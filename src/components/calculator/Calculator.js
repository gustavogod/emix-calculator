import styled from 'styled-components';
import { BUTTONS, ERROR_MESSAGE } from '../../utils';
import { Button } from '..';
import { useRef, useState, useEffect } from 'react';
import * as StrFn from '../../utils/stringFunctions';
import * as CalcFn from '../../utils/calcFunctions';

export const Calculator = () => {
  const displayResult = useRef('0');
  const topDisplay = useRef('');
  
  const initCalcState = {
    clickButton: false,
    firstNumber: 0,
    secondNumber: 0,
    calcOperator: '',
    result: 0
  }

  const initLastPressedButtonState = {
    type: '',
    name: '',
    content: ''
  }
  
  const [calcState, setCalcState] = useState(initCalcState);
  const firstOperatorWasClicked = useRef(false);

  const [lastPressedButtonState, setLastPressedButtonState] = useState(initLastPressedButtonState);
  const [errorState, setErrorState] = useState(false);


  const handleClick = (button) => {
    
    //handles NUMBER 
    if (button.type === 'number' ||
        (button.type === 'point' &&  !displayResult.current.includes('.'))
        ) {
          
      if (lastPressedButtonState.type === 'equal') {
        displayResult.current = '0';
        topDisplay.current = '';
        //firstOperatorWasClicked.current = true;
        setCalcState( { initCalcState } );
      }
      if (displayResult.current.includes('-')){
        displayResult.current = displayResult.current.slice(1);
      }
  
      if (button.type === 'point'){

        if (displayResult !== '0'){
          displayResult.current += button.content; 
        }
        else {
          displayResult.current = '0' + button.content;
        }

      }
      else if (displayResult.current === '0' && button.content !== '0') {
          displayResult.current = button.content; 
      }
      else if (displayResult.current === '0' && button.content === '0') {
        //does nothing
      }
      else {
        displayResult.current += button.content; 
      }

      setLastPressedButtonState( { ...button } );
    }

    //handles OPERATORS
    if (button.type === 'operator') {
        
      //if operators are pressed sequentially, then just replace the operator at the end of topDisplay
      if (lastPressedButtonState.content.includes('+') ||
          lastPressedButtonState.content.includes('-') ||
          lastPressedButtonState.content.includes('×') ||
          lastPressedButtonState.content.includes('÷') ||
          lastPressedButtonState.type === 'backspace' 
        ) {

        topDisplay.current = topDisplay.current.slice(0, -2);
        topDisplay.current += button.content + " ";

      } 
      else if (lastPressedButtonState.content.includes('.')) {
        topDisplay.current += displayResult.current.slice(0, -1) + " " + button.content + " ";
      }
      else {
        topDisplay.current += displayResult.current + " " + button.content + " ";
      }

      // Calculate parcial results
      let partialResult = getCalcPartialResult(button);
      
      if (partialResult === 'error') { 
        setLastPressedButtonState( { ...initLastPressedButtonState } );
      }
      else {
        setLastPressedButtonState( { ...button } );
      }
    }
    
    //handles NEGATION
    if (button.name === 'negation') {
      if (displayResult.current[0] === '-') {
        displayResult.current = displayResult.current.slice(1);
      } 
      else {
        displayResult.current = "-" + displayResult.current;
      }

      setLastPressedButtonState( { ...lastPressedButtonState } );
    }

    //handles SQUARE
    if (button.type === 'square') {
      let square = 0;

      if (lastPressedButtonState.type === 'number') {
        square = Math.sqrt(Number(displayResult.current));
      }
      
      if(lastPressedButtonState.type === 'operator') {
        square = Math.sqrt(calcState.result);
      }

      displayResult.current = square;
      setLastPressedButtonState( { ...lastPressedButtonState } );
    }

    //handles EQUAL
    if (button.type === 'equal') {
      firstOperatorWasClicked.current = true;

      let calcResult = 0;
      let firstNumberToCalc = 0;
      let secondNumberToCalc = 0;
      let operator = '';

      firstNumberToCalc = calcState.result;
      operator = calcState.calcOperator;

      if (lastPressedButtonState.type === 'number') {
        secondNumberToCalc = Number(displayResult.current);
      }
      else if (lastPressedButtonState.type === 'equal') {
        secondNumberToCalc = calcState.secondNumber;
      }
      else if (lastPressedButtonState.type === 'operator') {
        secondNumberToCalc = firstNumberToCalc;
      }

      calcResult = CalcFn.calcOperation(firstNumberToCalc, secondNumberToCalc, operator);        
      
      if (calcResult === 'error') {
        
        setCalcState( {
          ...initCalcState
        } );

        setErrorState(true); //changes result display span component
        setLastPressedButtonState( { ...initLastPressedButtonState } );
      }
      else {
        displayResult.current = calcResult;
        topDisplay.current = `${firstNumberToCalc} ${StrFn.getOperationSymbol(operator)} ${secondNumberToCalc} =`;

        setCalcState( {
          ...calcState, 
          firstNumber: firstNumberToCalc,
          secondNumber: secondNumberToCalc,
          result: calcResult
        } );

        setLastPressedButtonState( { ...button } );
      }
    }

    //handles RESET
    if (button.type === 'reset') { 
      displayResult.current = '0';

      if (lastPressedButtonState.type === 'reset') { //reset pressed two times in a row
        topDisplay.current = '';
        
        firstOperatorWasClicked.current = false;

        setCalcState( {
          ...initCalcState,
        } );

      }
      setErrorState(false);
      setLastPressedButtonState( { ...button} );
    }

    //handles BACKSPACE
    if (button.type === 'backspace') {
        displayResult.current = StrFn.backspace(displayResult.current);

        setCalcState( {
          ...calcState,
          clickButton: !calcState.clickButton
        } );
    }
    
  }

  const getCalcPartialResult  = (button) => {
    if (lastPressedButtonState.type === 'number' || lastPressedButtonState.type === 'point' || !firstOperatorWasClicked.current) {
      let partialResult = 0;
      let firstNumberToCalc = 0;
      let secondNumberToCalc = 0;
      let operator = '';
      
      if (firstOperatorWasClicked.current === false) {
        partialResult = Number(displayResult.current);
        operator = button.name;
      }
      else {
        firstNumberToCalc = calcState.result;
        secondNumberToCalc = Number(displayResult.current);
        operator = calcState.calcOperator;
        partialResult = CalcFn.calcOperation(firstNumberToCalc, secondNumberToCalc, operator);
        
        console.log(firstNumberToCalc + operator + secondNumberToCalc + '=' + partialResult);
        
      }
      
      if (partialResult === 'error') {
        //displayResult.current = ERROR_MESSAGE;
        setCalcState( {
          ...initCalcState
        } );

        setErrorState(true); //changes result display span component
        console.log('ERROR')
      }
      else {
        if (firstOperatorWasClicked.current === false) {
          setCalcState( {
            ...calcState,
            firstNumber: partialResult,
            calcOperator: operator,
            secondNumber: partialResult,
            result: partialResult
          } );

          firstOperatorWasClicked.current = true;
        }
        else {
          setCalcState( {
            ...calcState, 
            firstNumber: firstNumberToCalc,
            secondNumber: secondNumberToCalc,
            calcOperator: button.name,
            result: partialResult
          } );
        }
      }
      
    }
  }

  useEffect(() => { 
    if (lastPressedButtonState.type === 'operator') {
      displayResult.current = '0';        
    }
  }, [lastPressedButtonState]);

  
  return (
    <CalcBoard>
      <ResultScreen>
        <DisplayTop>
          <DisplayTopSpan>
            {topDisplay.current}
          </DisplayTopSpan>
        </DisplayTop>
        <DisplayBottom>
          <DisplayBottomSpan error={errorState}>
            {
              errorState ? ERROR_MESSAGE : 
                (lastPressedButtonState.type === 'operator' ? calcState.result : displayResult.current)
            }
          </DisplayBottomSpan>
        </DisplayBottom>
      </ResultScreen>
      <ButtonsBoard>
        {
          BUTTONS.map((item, index) => 
            <Button { ... item} 
              onClick={() => handleClick(item)} 
              key={`${index}`}
            />
          )
        }
      </ButtonsBoard>
    </CalcBoard>
  );
}


const CalcBoard = styled.div`
  background-color: #070706;
  `;

const ResultScreen = styled.div`
  height: 130px;
  padding: 10px;
  text-align: right;
  width: inherit;
  color: #E5E5E5;
  display: flex;
  flex-direction: column;
`;

const DisplayTop = styled.div`
  height: 50%;
  display: flex;
  justify-items: center;
  align-items: flex-end;
`;

const DisplayTopSpan = styled.span`
  width: 100%;
  font-weight: 300;
  font-size: 0.8rem;
  overflow: hidden;
`;

const DisplayBottom = styled.div`
  height: 50%;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
`;

const DisplayBottomSpan = styled.span`
  width: 100%;
  font-size: ${props => props.error ? '0.78rem' : '1.8rem'};
  font-weight: 600;
  overflow: hidden;
`;

const ButtonsBoard = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 286px;
  border: 1px solid black;
`;

