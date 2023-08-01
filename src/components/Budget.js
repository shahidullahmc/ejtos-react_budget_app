import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
  const { budget, setBudget, expenses } = useContext(AppContext);
  const upperLimit = 20000;

  const totalExpenses = expenses.reduce((total, item) => {
    return (total += item.cost);
  }, 0);

  const [editableBudget, setEditableBudget] = useState(totalExpenses);
  const [currency, setCurrency] = useState('£'); // Set the default currency to Pound (£)

  useEffect(() => {
    setEditableBudget(totalExpenses);
  }, [totalExpenses]);

  const handleAmountChange = (amount) => {
    const newBudget = editableBudget + amount;
    const clampedBudget = Math.min(Math.max(newBudget, totalExpenses), upperLimit);
    setEditableBudget(clampedBudget);
    setBudget(clampedBudget); // Update the budget in the context
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setEditableBudget(Number(value));
  };

  const handleBlur = () => {
    const clampedBudget = Math.min(Math.max(editableBudget, totalExpenses), upperLimit);
    setEditableBudget(clampedBudget);
    setBudget(clampedBudget); // Update the budget in the context
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <div
      className='alert alert-secondary'
      style={{ padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>
          Budget: {currency} {budget}
        </span>
        <div>
          <button onClick={() => handleAmountChange(10)}>▲</button>
          <button onClick={() => handleAmountChange(-10)}>▼</button>
          <select
            value={currency}
            onChange={(e) => {
              handleCurrencyChange(e);
            }}
            style={{
              appearance: 'none',
              background: 'url(https://image-url.com/dropdown-icon.png) no-repeat right center',
              backgroundSize: '20px 20px',
              padding: '5px 25px 5px 10px',
              borderRadius: '3px',
              border: '1px solid #ccc',
              cursor: 'pointer',
              marginLeft: '5px',
            }}
          >
            <option value='£'>£ Pound</option>
            <option value='$'>$ Dollar</option>
            <option value='€'>€ Euro</option>
            <option value='₹'>₹ Rupee</option>
          </select>
        </div>
      </div>
      <div>
        <input
          type='number'
          value={editableBudget}
          onChange={handleInputChange}
          onBlur={handleBlur}
          style={{
            width: '80px',
            padding: '5px',
            borderRadius: '3px',
            border: '1px solid #ccc',
          }}
        />
      </div>
    </div>
  );
};

export default Budget;
