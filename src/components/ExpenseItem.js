import React, { useContext } from 'react';
import { TiDelete } from 'react-icons/ti';
import { AppContext } from '../context/AppContext';

const ExpenseItem = (props) => {
  const { dispatch } = useContext(AppContext);

  const handleDeleteExpense = () => {
    dispatch({
      type: 'DELETE_EXPENSE',
      payload: props.id,
    });
  };

  const increaseAllocation = (name) => {
    const expense = {
      name: name,
      cost: 10,
    };

    dispatch({
      type: 'ADD_EXPENSE',
      payload: expense,
    });
  };

  const decreaseAllocation = (name) => {
    const expense = {
      name: name,
      cost: -10,
    };

    dispatch({
      type: 'ADD_EXPENSE',
      payload: expense,
    });
  };

  const buttonStyle = {
    padding: '5px 8px', // Make the button a bit smaller
    marginRight: '5px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '50%', // Make the button fully circular
    fontSize: '14px', // Decrease the font size
  };

  const decreaseButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'red', // Change the background color to red for the "Decrease by" button
  };

  return (
    <tr>
      <td>{props.name}</td>
      <td>£{props.cost}</td>
      <td>
        <button onClick={() => increaseAllocation(props.name)} style={buttonStyle}>
          +
        </button>
      </td>
      <td>
        <button onClick={() => decreaseAllocation(props.name)} style={decreaseButtonStyle}>
          -
        </button>
      </td>
      <td>
        <TiDelete size='1.5em' onClick={handleDeleteExpense}></TiDelete>
      </td>
    </tr>
  );
};

export default ExpenseItem;
