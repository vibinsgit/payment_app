import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(filter);
        }, 500);

        return () => {
            clearTimeout(handler);
        }
    }, [filter]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                let response;
                if (debouncedSearch) {
                    response = await axios.get("http://localhost:3000/api/v1/user/searchUser?filter=" + debouncedSearch);
                } else {
                    response = await axios.get("http://localhost:3000/api/v1/user/searchUser");
                }
                setUsers(response.data.user);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, [debouncedSearch]);

    return(
        <div>
            <div className="font-bold ml-4 mt-2 text-lg">
                Users
            </div>
            <div className="my-2 mx-4">
                <input onChange={(e) => {
                    setFilter(e.target.value)
                }} 
                type="text" 
                className="w-full px-2 py-1 border rounded border-slate-200" 
                placeholder="Search users..." />
            </div>
            <div>
                {users.map((user, index) => <User user={user} key={index} />)}
            </div>
        </div>
    )
}

function User({user}) {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between px-4 py-1">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-500 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstName[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    {user.firstName} {user.lastName}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full mt-1">
                <Button onPress={(e) => {
                    // history.pushState("/send?id=" + user._id + "&name=" + user.firstName);
                    navigate("/send?id=" + user._id + "&name=" + user.firstName);
                }} label={"Send Money"}/>
            </div>
        </div>
    )
}