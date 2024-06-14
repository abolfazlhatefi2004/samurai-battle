import { Outlet } from "react-router-dom";


export default function Container(){
    return(
        <div className='container h-screen'>
             <Outlet />
        </div>
    );
}