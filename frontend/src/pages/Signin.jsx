import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Signin = () => {
  const[username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-400 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="bg-slate-100 rounded-lg w-50 h-max p-2 px-4">
            <Heading label={"Sign In"} />
            <SubHeading label={"Enter your credentials to access your account"} />
            <InputBox label={"Email"} placeholder={"Mail address"}
            onChange={(e) => setUsername(e.target.value)} />
            <InputBox label={"Password"} placeholder={"Password"}
            onChange={(e) => setPassword(e.target.value)} />
            <Button onPress={ async () => {
              const response = await axios.get("http://localhost:3000/api/v1/user/signin", {
                username: username,
                password: password
              })
              if(response.data.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("firstName", response.data.firstName);
                navigate("/dashbord");
              }
            }} label={"Sign In"} />
            <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"}/>
        </div>
      </div>
    </div>
  );
}
