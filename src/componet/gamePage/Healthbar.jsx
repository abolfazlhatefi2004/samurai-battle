import samuraiMask from '../../image/samurai-mask.png';


export default function HealthBar({ playersHealth }) {
    return (
        <div className="w-[100%] absolute top-4 left-0 flex justify-center">
            <div className="w-[80%] flex justify-center items-center">
                {/* friend health  */}
                <div dir="rtl" className="bg-yellow-400 h-10 w-5/12 border-4 border-white border-r-0">
                    <span className="inline-block h-full bg-indigo-400 transition-all duration-700"
                        style={{ width: `${playersHealth.playerHealth}%` }}></span>
                </div>
                {/* timer  */}
                <div id="timer"
                    className="bg-[#71657C] h-20 w-28 border-4 border-white flex justify-center items-center  text-white text-4xl font-bold rounded">
                    <span className='inline-block w-6/12 h-5/6 bg-cover bg-no-repeat bg-center' style={{ backgroundImage: `url(${samuraiMask})`, }}></span>
                </div>
                {/* enemy health  */}
                <div className="bg-yellow-400 h-10 w-5/12 border-4 border-white border-l-0">
                    <span className="inline-block h-full bg-indigo-400 transition-all duration-700"
                        style={{ width: `${playersHealth.enemyHealth}%` }}></span>
                </div>
            </div>
        </div>
    );
}