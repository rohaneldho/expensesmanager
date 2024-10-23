import { Typography, Button } from '@mui/material';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { UpdateExpenseForm } from './updateExpenseForm';
import axios from "axios";
export const Expense = ({ expense,fetchExpenses }) => {
  const { id, name, money, completed } = expense;
  const [isComplete, setIsComplete] = useState(completed);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteExpense = async() => {
    try{
      await axios.delete(`${API_URL}/${task.id}`)
      await fetchExpenses();
    }catch(err){
      console.log(err);
    }
  };

  const handleUpdateTaskCompletion=async()=>{
    try{
      await axios.put(API_URL,{
        id,name,money,completed: !isComplete,
      })
      setIsComplete((prev)=>!prev);
    }
    catch(err){
      console.log(err);
    }
    
  };

  return (
    <div className='Expense'>
      <div>
        <Typography variant='h4'>{name}</Typography>
        <Typography variant='h2'>{money}</Typography>
      </div>
      <div className='expenseButtons'>
        <Button variant='contained' onClick={() => {
          handleUpdateTaskCompletion();
          setIsDialogOpen(true);
        }  }>
          <EditIcon />
        </Button>
        <Button color='error' variant='contained' onClick={handleDeleteExpense}>
          <DeleteIcon />
        </Button>
      </div>
      <UpdateExpenseForm fetchExpenses={fetchExpenses} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} expense={expense} />
    </div>
  );
};

export default Expense;
