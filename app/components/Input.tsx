"use client";
import { GoSearch } from "react-icons/go";

interface InputProps{
    handleSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void
    setLocation: React.Dispatch<React.SetStateAction<string>>;
}

const Input:React.FC<InputProps> = ({handleSearch, setLocation}) => {
    return(
        <form className="relative flex items-center md:w-2/4 w-full order-2 md:order-1">
            <input 
                type="text"
                placeholder="Search City"
                className="w-full bg-transparent border-2 border-black placeholder-black text-black rounded-lg px-4 py-2 focus:outline-none"
                onKeyDown={handleSearch}
                onChange={(e) => setLocation(e.target.value)}
            />
            <div className="absolute right-0 top-0 h-full flex items-center pr-4">
                <GoSearch className="text-black" />
            </div>
        </form>
    );
};

export default Input;
