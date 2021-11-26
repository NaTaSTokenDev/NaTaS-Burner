import React, { useState, Dispatch, SetStateAction } from "react";


  import { IState as Props } from "../App";

  interface IProps {
      people: Props["people"]
  }
  
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
