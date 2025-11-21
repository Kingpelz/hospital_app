import React from "react";
import { useParams } from "react-router-dom";
import { storeContext } from "../Context/StoreContext";
import { useContext, useEffect, useState } from "react";
import Loading from "../Layout/Loading";
import { toast } from "react-toastify";

function Appointment() {
  const { token, apiUrl, isLoading, setIsLoading } = useContext(storeContext);
  const [surgery, setSurgery] = useState({});
  const params = useParams();
  const id = params.surgeryId;

  useEffect(() => {
    getOneSurgery(id);
  }, []);

  
 async function getOneSurgery(id){
   setIsLoading (true);
   const response = await fetch(`${apiUrl}/surgery/single/${id}`, {
     method: "GET",
     headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`,
      },
    });
    try{

    const data = await response.json();
  
    if(response.ok){
      setSurgery(data.surgery)
      setIsLoading(false);
  }

  } catch (error){
    console.log(error);
    setIsLoading(false);
  }
  }
  if (isLoading) {
    return <Loading />;
  }

  return (
<>


<p>Home</p>



</>
  ) 
}

export default Appointment;
