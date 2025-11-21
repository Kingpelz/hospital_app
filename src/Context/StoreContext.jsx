import { createContext, useEffect, useState } from "react";
import { data } from "react-router-dom";
import Profile from "../Pages/Profile";
export const storeContext = createContext();
export const StoreProvider = ({ children }) => {
 
const [showPassword, setShowPassword] = useState(false);
const [email, setEmail] = useState("");
const [isAuth, setIsAuth]=useState(false);
const [isLoading, setIsLoading]= useState(false);
const [department, setDepartment] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [surgeries, setSurgeries] = useState([]);
  const [password, setPassword] = useState("");
  const [status,setStatus]= useState("")
const [description,setDescription]= useState("")
const [profiles, setProfiles] = useState("");
const [allProfiles , setAllProfiles] = useState([]);
const [profile, setProfile] = useState([])
const [surgery, setSurgery] = useState({})
const apiUrl = import.meta.env.VITE_API_URL
const token = localStorage.getItem("hospitalToken");

function isTokenExpired(token) {
  if (!token) return;

  try {
    const[, payload] = token.split(".");
const decodedPayload = JSON.parse(atob(payload));
return decodedPayload.exp * 1000 < Date.now();

  } catch (error) {
    console.log(error);
  }

}


useEffect(() => {
  if(!token || isTokenExpired(token)){
    setIsAuth(false)
    if(token){
      localStorage.removeItem("hospitalToken")
    }
  } else {
    setIsAuth(true)
    getAllSurgeries();
  }
  
}, []);

 async function getAllSurgeries(){
   setIsLoading (true);
   const response = await fetch(`${apiUrl}/surgery/all`, {
     method: "GET",
     headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`,
      },
    });
    try{

    const data = await response.json();
  
    if(response.ok){
      setSurgeries(data.surgeries);
      setIsLoading(false);
  }

  } catch (error){
    console.log(error);
    setIsLoading(false);
  }
  }

async function getAllProfile() {
  try {
    setIsLoading(true);
    const response = await fetch(`${apiUrl}/profile/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });    const data = await response.json();
    console.log(data);
    if (response.ok) {
      // set profile data to state here
      setProfile(data.profiles);
      setIsLoading(false);
    }
  } catch (error) {
    console.log(error);
    setIsLoading(false);
  }
}


  const contextObj = {
    getOneSurgery,
    surgery,
    showPassword,
    setShowPassword,
    email,
    status,
    setStatus,
    setEmail,
    isAuth,
    setIsAuth,  
    isLoading,
    setIsLoading,
    department,
    setDepartment,
    doctor,
    surgeries,
    setSurgeries,
    password,
    setPassword,
    date,
    setDoctor,  
    setDate,
    time,
    description,
    profile,
    setDescription,
    apiUrl,
    setTime,
    getAllSurgeries,
    getAllProfile,
    setProfiles,
    profiles,
    token
  };
  return (
    <storeContext.Provider value={contextObj}>{children}</storeContext.Provider>
  );
};
