import React from "react";
import { useParams } from "react-router-dom";
import { storeContext } from "../Context/StoreContext";
import { useContext, useEffect, useState } from "react";
import Spinner from "../layout/Spinner";
import { toast } from "react-toastify";

function Appointment() {
  const { token, apiUrl, isLoading, setIsLoading } = useContext(storeContext);
  const [surgery, setSurgery] = useState({});
  const params = useParams();
  const surgeryId = params.surgeryId;

  useEffect(() => {
    getSurgery();
  }, []);

  async function getSurgery() {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/single/${surgeryId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        toast.success(data.message);
        setSurgery(data.surgery);
      }
      setIsLoading(false);
    } catch (error) {
        console.log(error);
        setIsLoading(false);
    }
  }
  if (isLoading) {
    return <Spinner />;
  }

  return (
<>






</>
  ) 
}

export default Appointment;
