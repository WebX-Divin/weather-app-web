"use client";
import { GoSearch } from "react-icons/go";

const Input = () => {
    return(
        <form className="relative flex items-center md:w-2/4 w-full order-2 md:order-1">
            <input 
                type="text"
                placeholder="Search City"
                className="w-full bg-transparent border-2 border-black placeholder-black text-black rounded-lg px-4 py-2 focus:outline-none"
                style={{ backdropFilter: 'blur(10px) grayscale(40%)', WebkitBackdropFilter: 'blur(10px) grayscale(40%)' }}
            />
            <div className="absolute right-0 top-0 h-full flex items-center pr-4">
                <GoSearch className="text-black" />
            </div>
        </form>
    );
};

export default Input;
