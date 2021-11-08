import styled from "styled-components";
import { MdOutlineBackspace } from 'react-icons/md';


export const Button = ( props ) => {
  const { type, name, content, onClick } = props;

  return (
    <ButtonItem 
      { ...props}
      className={`${type} ${name}`} 
      onClick={onClick}
    >
      { name === 'backspace' ? <MdOutlineBackspace/> : content}
    </ButtonItem>
  );
}

const ButtonItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  font-family: 'Open Sans', sans-serif;
  border: 1px solid #070706;
  width: 25%;
  font-weight: ${ props => props.type === 'number' ? 'bold' : '300'};
  font-size: 1.2rem;

  background-color: ${
    props => (
      (props.type !== 'number') &&
      (props.name !== 'negation') &&
      (props.name !== 'point') &&
      (props.name !== 'equal')
      ) 
      && "#262626" 
    };

  background-color: ${ props => props.name === 'equal' && "#DF7F00" };

  background-color: ${ 
    props =>(
      (props.type === 'number') ||
      (props.name === 'point') ||
      (props.name === 'negation')
      )
      && "#373737" 
    };

  :hover {
    background-color: ${ props => props.name !== 'equal' ?  "#797596" : "rgb(136, 100, 0)"};
  }

  :active {
    background-color: ${ props => props.name !== 'equal' ?  "#4a485c" : "rgb(92, 52, 0)"};
  }
`;