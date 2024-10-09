import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

export const Dashbord = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      setBalance(response.data.balance);
    }
    fetchData();
  },[balance]);
    return (
      <div>
        <AppBar />
        <Balance value={balance}/>
        <Users />
      </div>
    );
};