import React from 'react'
import { useReducer } from "react";
const data=require("./Data.json")
const Body = () => {
 
    function reducefun(state,action){
     
      switch(action.type){
       case"ADD_MEMBER":
       
        return {
          ...state,
          employ: state.employ.map((e) =>
          e.id === action.payload.id
          ? { ...e, added: true }
          : e
          ),
          teamMembers: [...state.teamMembers, action.payload],
        
        }
        
        case"remove_MEMBER":
        const Age = state.teamMembers.reduce(
          (acc, member) => acc-Math.floor(member.age),
          0
        )
          return {
            ...state,
            employ: state.employ.map((e) =>
            e.id === action.payload.id
            ? { ...e, added: false }
            : e
            ),
            teamMembers: state.teamMembers.filter(
              (member) => member.id !== action.payload.id
            ),
            Average:Age
          
          };
       
       
      }
    
    }



   const[state,dispatch]=useReducer(reducefun,data)
   const total=state.teamMembers.reduce(
    (acc, member) => acc +Math.floor(member.age),
    0
  )
  const averageAge =Math.round( total / state.teamMembers.length || 0);
  return (
    <div style={{display:"flex", }}>
      
        <div id="leftdiv">
          <h3 style={{textAlign:"center"}}>EMPlOY</h3>
          {state.employ.map((dt,index)=>{
          return(
            
            <div key={index} >
              
               <span>{dt.name}</span>
                    <span>{dt.age}</span>
              
                {dt.added && (
                   <div></div>
          )}{!dt.added &&(
            <button
            onClick={() =>
              dispatch({ type: "ADD_MEMBER", payload: dt })
            }
          >
            ADD
          </button>
          )

          }
            </div>
          )
          })}
        </div>
        <div id="Rightdiv">
          <h3 style={{textAlign:"center"}}>LIST</h3>
         
        {state.teamMembers.sort((a,b)=>
          a.age-b.age).map((dt,index)=>{
          return(
            
            <div key={index} >
              
               <span>{dt.name}</span>
                    <span>{dt.age}</span>
              
               {!dt.added &&(
            <button
            onClick={() =>
              dispatch({ type: "remove_MEMBER", payload: dt })
            }
          >
            Remove
          </button>
          )

          }
            </div>
          )
          })}
        </div>
      
        <div id="average">
     <h1>TotalAverage:{averageAge}</h1>
        </div>
    </div>

  )
}

export default Body