import React, { useState, Dispatch, SetStateAction, useEffect, PropsWithChildren } from "react";
import axios from 'axios';
import { FetchtheProps as Props } from "../App";
import { JsxText } from "typescript";
// import { IState2 as Props2 } from "../App";

 //interface IProps {
   // lookupaddress: Props[]
//   lookupbalance: Props[]
 // }


 type FetchtheProps = {
  lookupaddress: Dispatch<SetStateAction<any>>;
 // lookupbalance: Dispatch<SetStateAction<number>>;
};
  const Apiaddress = 'https://api.better-call.dev/v1/contract/mainnet/KT1GaEvbD4zA3pHs7mv3grpuqR1KGtjXAEDe/tokens/holders?token_id=0'

 // const DemnBalance: React.FC<IProps> = ({ people }) => {
 //     const renderList = (): JSX.Element[] => {
  //        return people.map(person => {
  //            return (
   //               <p>
  //                  <p>Balance:  {person.age} DeMN Tokens</p>
   //               </p>
  //            )
  //        })
  //    }

   //   return (
   //     <ul>
    //        {renderList()} 
   //         
   //     </ul>
  //  )
  //  }
  

      const Mytest = ({lookupaddress}:FetchtheProps): JSX.Element => {
        const [users, setUsers] = useState([]);
    
        useEffect(() => {
            fetchUsers();
        }, []);
    
        const fetchUsers = async () => {
            const res = await fetch(Apiaddress);
            const data = await res.json();
            try {
                setUsers(data.results);
            } catch (err) {
                console.log(err);
            }
        };
    
        return (
            <div className="">
                        <p>
                            yrdydy
                        </p>
                    ))
            </div>
        );
    
    }
      
  

     
  

export default Mytest;
