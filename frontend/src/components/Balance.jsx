export const Balance = ({ value }) => {
    return (
        <div className="flex py-4">
            <div className="font-bold ml-4 text-lg">
                Your Balance 
            </div>
            <div className="font-semibold ml-2 text-lg">
                Rs. { value }
            </div>
        </div>
    );
}