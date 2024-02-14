import Restaurant from "../../assets/restaurant.svg";
import Grocery from "../../assets/shopping-basket.svg";
import { Link, useNavigate } from 'react-router-dom';


const SuggestBusinessPage = () => {


    const navigate = useNavigate();

    const handleCardClick = (category: string) => {
        // Navigate to the desired screen based on the category
        if (category === 'RESTAURANTS') {
            navigate("/addBusiness", { state: category });
        } else if (category === 'GROCERY STORES') {
            navigate('/addBusiness', { state: category });
        }
    };



    return (
        <div className='w-screen h-screen'>
            <div className="navbar bg-base-100 shadow-lg">
                <div className="navbar-start">
                    <Link to={'/'} >
                        <div role="button" className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                            </svg>
                        </div>
                    </Link>
                </div>
                <div className='navbar-center -ml-20'>
                    <span className="text-xl">Suggest a Business</span>
                </div>
            </div>

            <div>
                <div className="flex items-center justify-center text-black-300 text-lg pt-5">
                    Select Business you are interested in
                </div>

                <div className="flex justify-center mt-10">
                    <div
                        className="bg-[#b8728f] flex flex-col justify-center items-center py-14 px-24 rounded-md w-70 h-48 cursor-pointer"
                        onClick={() => handleCardClick('RESTAURANTS')}
                    >
                        <img src={Restaurant} alt="Icon" className="w-10 h-10 mb-5" />
                        <p className="text-white text-lg">RESTAURANTS</p>
                    </div>
                </div>

                <div className="flex justify-center mt-10">
                    <div
                        className="bg-[#7d8b9c] flex flex-col justify-center items-center py-14 px-20 rounded-md w-70 h-48 cursor-pointer"
                        onClick={() => handleCardClick('GROCERY STORES')}
                    >
                        <img src={Grocery} alt="Icon" className="w-10 h-10 mb-5" />
                        <p className="text-white text-lg">GROCERY STORES</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SuggestBusinessPage;