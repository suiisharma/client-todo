import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import NavBarContainer from "./utils/Navbar";
import Patriclesbg from "./Components/Patriclesbg";
import Todos from "./Pages/Todos";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { createContext } from "react";

export const userContext = createContext();



const compareByDeadline = (task1, task2) => {
  const deadline1 = new Date(task1.Deadline);
  const deadline2 = new Date(task2.Deadline);

  return deadline1 - deadline2;
};






function App() {
  
  const [User, setUser] = useState("");
  const [ImageUrl, setImageUrl] = useState(null);
  const [Posts, setPosts] = useState([]);



  const fetchAllPosts=async()=>{
    try {
      const res=await axios.get(`${process.env.REACT_APP_SERVER}/task/GetAllTasks`,{
        headers:{
          "Content-Type":"application/json"
        }
        ,
        withCredentials:true
      })
       let data=res.data.message;
        data.sort(compareByDeadline);          
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  }



  const [Redirect, setRedirect] = useState(false);
  useEffect(() => {
    try {
      const fetchUser = async () => {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_SERVER}/user/GetUserProfile`,
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );

          setUser(res?.data?.message);
          await  fetchAllPosts()
          toast.success("Authentication successful!");
        } catch (error) {
          toast.custom((t) => (
            <div
              style={{
                backgroundColor: '#007bff',
                color: '#fff',
                padding: '1rem',
                borderRadius: '5px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
              }}
              onClick={() => toast.dismiss(t.id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-alert-circle">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12" y2="16"></line>
              </svg>
              Please log in to access the site.
            </div>
          ), {
            duration: 3000, 
          });
        }
      };
      fetchUser();
    } catch (error) {
      console.log({ error });
      toast.error("Some Error Occured!");
    }
  }, []);
  return (
    <userContext.Provider
      value={{
        User,
        setUser,
        ImageUrl,
        setImageUrl,
        Posts,
        setPosts,
        Redirect,
        setRedirect,
      }}
    >
      <Router>
        <Patriclesbg></Patriclesbg>
        {User && <NavBarContainer></NavBarContainer>}
        <Routes>
          <Route
            path={"/"}
            element={User ? <Home></Home> : <Login></Login>}
          ></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route
            path="/todo"
            element={User ? <Todos></Todos> : <Login></Login>}
          ></Route>
          <Route path="/signUp" element={<SignUp></SignUp>}></Route>
          <Route
            path="/profile"
            element={User ? <Profile></Profile> : <Login></Login>}
          ></Route>
        </Routes>
      </Router>
    </userContext.Provider>
  );
}

export default App;
