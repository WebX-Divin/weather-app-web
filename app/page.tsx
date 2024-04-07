"use client";
import Input from "./components/Input";

const Home = () => {
  return (
    <div className="bg-cover bg-gradient-to-t from-blue-400 to-grey-200 h-screen">
      <div className="bg-white/25 w-full flex flex-col h-full">
        {/*Input and Logo*/}
        <div className="flex flex-col md:flex-row justify-between items-center p-12">
          <Input/>
          <h1 className="text-black font-bold mb-8 md:mb-0 order-1 py-2 px-4 rounded-xl text-3xl font-sans">Weather App</h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
