import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';


export interface Video {
    id: number;
    title: string;
    description: string;
    videoid: string;
    thumbnail: string;
    date: string;
    createdAt: string;
    updatedAt: string;
}


export interface VideoData {
    success: boolean;
    data: Video[];
}



const VideoPage = () => {

    const [VideosData, setVideosData] = useState<VideoData>();
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        handleVideos()
    }, [])

    const handleVideos = async () => {
        console.log(loading)
        try {
            setLoading(true);
            const url = `http://backend.glutenfreejio.com/api/get-youtube-videos`;

            const { data } = await axios.get<VideoData>(url);
            setVideosData(data);
            console.log(data, 'VideosData>>>>>>>>>>>')
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const playVideo = (videoId: string) => {
        const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
        window.open(youtubeUrl, '_blank');
    };


    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center text-pink-300 text-3xl font-semibold pt-10">
                VIDEOS
            </div>
            <div className="flex items-center justify-center">
                <div className="grid md:grid-cols-4 grid-cols-2 md:gap-4 gap-2 md:mx-20 mx-5 mt-10">
                    {
                        VideosData?.data.map((Videos) => {
                            return (
                                Videos?.description !== '' && (
                                    <div key={Videos.id} className="shadow-xl rounded-md text-center relative">
                                        <div className="flex justify-center items-center">
                                            <img
                                                className="w-80 h-50 rounded-md"
                                                src={Videos?.thumbnail}
                                                alt="app banner"
                                            />
                                            <div className="absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
                                                {/* Play icon - You can use an actual play icon image or an SVG */}
                                                <button
                                                    onClick={() => playVideo(Videos.videoid)} // Add your play video functionality here
                                                    className="bg-white py-2 px-3 rounded-full"
                                                >
                                                    ▶️
                                                </button>
                                            </div>
                                        </div>
                                        <div className="text-sm mt-2">{Videos?.title}</div>
                                    </div>
                                )
                            );
                        })
                    }

                </div>
            </div>
        </div>


    )
}


export default VideoPage;