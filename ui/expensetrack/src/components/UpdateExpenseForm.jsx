import React,{useState} from 'react'
import {Dialog,DialogTitle,Button,TextField} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import axios from "axios";
export const UpdateExpenseForm = ({
  isDialogOpen,setIsDialogOpen,expense,fetchExpenses
}) => {
  const {id,completed}=expense;
  const [expenseName,setExpenseName]=useState("");
  const [messageName,setMessageName]=useState("");
  const handleUpdateExpenseName=async()=>{
    try{
      await axios.put(API_URL,{
        id,
        name: messageName,
        money:expenseName,
        completed,
      });
      await fetchExpenses();
      setExpenseName("");
    }
    catch(err){
      console.log(err);
    }

  }
  return (
    <Dialog open={isDialogOpen}>
      <DialogTitle>Edit Expenses</DialogTitle>
      <div className="dialog">
        <TextField size='small' label="Message" variant="outlined" 
        onChange={(e)=>setMessageName(e.target.value)}/>
        <TextField size='small' label="Expense" variant="outlined" 
        onChange={(e)=>setExpenseName(e.target.value)}/>
        <Button variant='contained' onClick={async()=>{
          handleUpdateExpenseName();
          setIsDialogOpen(false)
          }}><CheckIcon/></Button>
      </div>
    </Dialog>
  )
}
