import express from "express"
import {fetchExpenses,createExpenses,updateExpenses,deleteExpenses} from "./expense"
import Serverless from "serverless-http"
import cors from "cors"
const app = express()
const port = 3001

app.use(express.json());
if (process.env.DEVELOPMENT){
  app.use(cors());

}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/expense', async(req, res) => {
  try{
    const expenses = await fetchExpenses();
    res.send(expenses.Items)
  }catch(err){
    res.status(400).send(`Error Fetching expenses:${err}`)
  }
});


app.post('/expense', async(req, res) => {
  try{
    const expense = req.body;
    const response=await createExpenses(expense)
    res.send(response);
  }catch(err){
    res.status(400).send(`Error Creating expenses: ${err}`)
  }
});

app.put('/expense', async(req, res) => {
  try{
    const expense = req.body;
    const response=await updateExpenses(expense)
    res.send(response);
  }catch(err){
    res.status(400).send(`Error Updating Expenses: ${err}`)
  }
});
app.delete('/expense/:id', async(req, res) => {
  try{
    const {id} = req.params;
    const response=await deleteExpenses(id)
    res.send(response);
  }catch(err){
    res.status(400).send(`Error Deleting Expenses: ${err}`)
  }
});




if (process.env.DEVELOPMENT){
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });

}


export const  handler =serverless(app);