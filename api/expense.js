import {ListTablesCommand, DynamoDBClient} from "@aws-sdk/client-dynamodb";
import { UpdateCommand,PutCommand,DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";
const client = new DynamoDBClient({ region: "us-west-1" });
const docClient=DynamoDBDocumentClient.from(client);

export const fetchExpenses = async()=>{
  const command = new ScanCommand({
    ExpressionAttributeNames:{"#name":"name"},
    ProjectionExpression:"id,#name,money,completed",
    TableName:"Expenses",
  });
  const response = await docClient.send(command);
  return response;
}

export const createExpenses = async(name,money,completed)=>{
  const uuid=crypto.randomUUID();
  const command = new PutCommand({
    TableName:"Expenses",
    Item:{
      id:uuid,
      name,
      money,
      completed,
    }
  });
  const response = await docClient.send(command);
  return response;
}

export const updateExpenses = async(id,name,money,completed)=>{
  const command = new UpdateCommand({
    TableName:"Expenses",
    Key:{
      id
    },
    ExpressionAttributeNames:{
      "#name":"name"
    },
    UpdateExpression:"set #name= :n,money=:m,completed=:c",
    ExpressionAttributeValues:{
      ":n":name,
      ":m":money,
      ":c":completed,
    },
    ReturnValues:"ALL_NEW"
  });
  const response = await docClient.send(command);
  return response;
}

export const deleteExpenses = async(id)=>{
  const command = new DeleteCommand({
    TableName:"Expenses",
    Key:{
      id
    }
  })
  const response = await docClient.send(command);
  return response;
}

