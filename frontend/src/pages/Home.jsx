import { useNavigate } from 'react-router-dom'

export const Home = () => {
    const navigate = useNavigate();

    return (
        <div className='h-screen flex flex-col'>
            <div className='w-full shadow bg-slate-300 flex justify-between items-center px-2 py-2'>
                <div className=' font-bold text-blue-500 text-xl'>
                    Payment App
                </div>
                <div className='flex justify-between items-center space-x-2'>
                    <button onClick={() => {
                        navigate('/signup');
                    }}
                    className='rounded-md bg-blue-500 hover:bg-blue-600 text-white border border-blue-700 py-2 font-medium px-5 hover:cursor-pointer focus:outline-none'>Signup</button>
                    <button onClick={() => {
                        navigate('/signin');
                    }}
                    className='rounded-md bg-blue-500 hover:bg-blue-600 text-white border border-blue-700 py-2 font-medium px-5 hover:cursor-pointer focus:outline-none'>Signin</button>
                </div>
            </div>
            <div className='flex flex-col flex-grow justify-center items-center px-4 '>
                <h1 className='font-semibold text-xl mb-2'>
                    Welcome to Payment Application
                </h1>
                <p className='text-lg mb-4'>
                    A safe and secure way to transfer your hard-earned money.
                </p>
                <p className="text-base mb-4">
                    With our app, you can easily manage your payment.
                </p>
            </div>
            <div className='w-full shadow-inner bg-slate-300 py-4 flex justify-center items-center'>
                <p className='font-medium text-gray-600'>Payment App done by V.Vibins</p>
            </div>
        </div>
    )
}