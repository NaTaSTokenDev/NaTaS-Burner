import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import axios from 'axios';
import { IState as Props } from "../App";

  interface IProps {
      people: Props["people"]
  }
  interface IProps {
      person: Props["person"]
  }
  const Apiaddress = 'https://api.better-call.dev/v1/contract/mainnet/KT1GaEvbD4zA3pHs7mv3grpuqR1KGtjXAEDe/tokens/holders?token_id=0'

  const DemnBalance: React.FC<IProps> = ({ people }) => {
      const renderList = (): JSX.Element[] => {
          return people.map(person => {
              return (
                  <p>
                    <p>Balance:  {person.age} DeMN Tokens</p>
                  </p>
              )
          })
      }
  
      return (
          <ul>
              {renderList()} 
              
          </ul>

          
      )
      }
    

     
  

export default DemnBalance;
