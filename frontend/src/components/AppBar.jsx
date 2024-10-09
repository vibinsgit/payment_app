import { useNavigate } from "react-router-dom";


export const AppBar = () => {
    const navigate = useNavigate();
    const firstName = localStorage.getItem("firstName");

    return (
        <div className="shadow h-14 flex justify-between">
            <div className="flex flex-col justify-center h-full ml-4 text-lg font-bold">
                PayTm App
            </div>
            <div className="flex">
                <div className="flex flex-col justify-center h-full mr-4">
                    Hello, {firstName.toUpperCase()}
                </div>
                <div className="bg-slate-400 rounded-full h-12 w-12 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full">
                        {firstName[0]}
                    </div>
                </div>
                <div className="flex justify-center">
                    <button className="w-full text-white bg-red-800 hover:bg-red-900 hover:cursor-pointer focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-2"
                    onClick={() => {
                        localStorage.removeItem("token")
                        localStorage.removeItem("firstName")
                        navigate("/home")
                    }}>Logout</button>
                </div>
            </div>
        </div>
    );
}