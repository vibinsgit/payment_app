import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"

export const Signup = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

    return (
      <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-80 p-2 h-max px-4">
            <Heading label={"Sign up"} />
            <SubHeading label={"Enter your infromation to create an account"} />
            <InputBox onChange={e => {
              setFirstName(e.target.value);
            }} placeholder="Vibins" label={"First Name"} />
            <InputBox 
            onChange={e => {
              setLastName(e.target.value);
            }} placeholder="V" label={"Last Name"} />
            <InputBox
            onChange={e => {
              setUsername(e.target.value);
            }} placeholder="Mail address" label={"Username"} />
            <InputBox 
            onChange={e => {
              setPassword(e.target.value);
            }} placeholder="Password" label={"Password"} />
            <div className="pt-4">
            <Button onPress={async () => {
  try {
    const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
      firstName,
      lastName,
      username,
      password
    });

    console.log("Response data:", response.data); // Log response data for debugging

    // Check if firstName exists in response.data
    if (response.data && response.data.token && response.data.firstName) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("firstName", response.data.firstName);  // Save firstName to localStorage
      navigate("/dashbord"); // Navigate after successful signup
    } else {
      console.error("firstName or token missing in response");
    }
  } catch (error) {
    console.error("Error during signup:", error);
  }
}} label={"Sign up"} />
            </div>
            <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
          </div>
        </div>
      </div>
    );
}