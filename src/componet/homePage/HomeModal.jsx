
import phoneIcon from '../../image/phone.png';


export default function HomeModal() {
    return (
        <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex flex-col items-center justify-center flex-wrap gap-4 w-full md:inset-0 h-screen max-h-full bg-[rgba(0,0,0,0.8)] text-white">
            <span className="w-44 h-44 bg-no-repeat bg-cover rotate-[-20deg]" style={{ backgroundImage: `url(${phoneIcon})` }}></span> 
            <span className='w-full text-center text-6xl font-bold uppercase'>phone <span className='block w-full text-red-600'>is</span> boring</span>
        </div>
    );
}