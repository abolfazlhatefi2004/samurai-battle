import { Link } from "react-router-dom";



export default function ContentPlace() {
  return (
    <div className="w-full absolute left-0 top-2/4 py-12 flex justify-center items-center backdrop-blur">
      <Link to='/game-page' className="bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 text-rose-500 text-white">
        start game</Link>
    </div>
  );
}

