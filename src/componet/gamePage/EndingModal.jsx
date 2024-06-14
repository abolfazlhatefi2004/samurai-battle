import { Link } from "react-router-dom";

export default function EndingMomal({ modalInfo, playAgainHandler }) {
    return (
        <div id="modal"
            className="overflow-y-auto overflow-x-hidden absolute top-0 left-0 right-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-[rgba(0,0,0,0.7)]">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                {/* Modal content  */}
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* Modal header  */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white capitalize">{modalInfo.massage}</h3>
                    </div>
                    {/* Modal footer  */}
                    <div className="flex flex-row-reverse items-center gap-2 p-4 md:p-5  rounded-b dark:border-gray-600">
                        <Link to='/'
                            className="text-white bg-red-600 border-2 border-red-600 hover:bg-blue-800 hover:border-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Home</Link>
                        <button type="button"
                            className="text-red-600 bg-white border-2 border-red-600 hover:text-blue-800 hover:border-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={e => playAgainHandler(e)}>
                            Play again</button>
                    </div>
                </div>
            </div>
        </div>
    );
}