import React, { useState } from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { API_URL } from '../utils';

export const AddExpenseForm = ({fetchExpenses}) => {
  const [newMessage, setNewMessage] = useState("");
  const [newExpense, setNewExpense] = useState("");

  const handleAddNewExpense = async() => {
    try{
        await axios.post(API_URL,
          {
            name:newMessage,
            money:newExpense,
            completed:false,
          }
        );
        await fetchExpenses();
        setNewExpense("")
    }catch(err){
      console.log(err);
    }
  };

  return (
    <div className="add-expense-form">
      <Typography align="center" variant="h5" component="h2" gutterBottom>
        Add New Expense
      </Typography>
     <div className='addExpenseForm'>
     <TextField
        id="outlined-basic"
        label="Enter Message"
        variant="outlined"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        style={{ margin: '16px' }} 
        fullWidth
      />
      <TextField
        id="outlined-basic"
        label="Enter Debit Amount"
        variant="outlined"
        value={newExpense}
        onChange={(e) => setNewExpense(e.target.value)}
        type="number"
        style={{ margin: '16px' }} 
        fullWidth
      />
      <Button
        variant="contained"
        disabled={!newExpense.length && !newMessage.length}
        onClick={handleAddNewExpense}
        fullWidth
        style={{ margin: '16px' }} 
      >
        <AddIcon /> Add Expense
      </Button>
     </div>
    </div>
  );
};
