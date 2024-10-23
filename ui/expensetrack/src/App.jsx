import { useState,useEffect } from 'react'
import { AddExpenseForm } from './components/addexpenseform'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Expense from './components/expense';
import axios from "axios";
import {API_URL} from "./utils";
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


export default function App() {
  const [expenses,setExpenses]=useState([])

  const fetchExpenses=async()=>{
    try{
      const {data}=await  axios.get(API_URL);
      setExpenses(data);
    }catch(err){
        console.log(err);
    }
  };

  useEffect(()=>{
    fetchExpenses();
  },[]);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AddExpenseForm fetchExpenses={fetchExpenses} /> 
      {expenses.map((expense)=> <Expense expense={expense} key ={expense.id} fetchExpenses={fetchExpenses}/>)}
      
    </ThemeProvider>
  );
}

