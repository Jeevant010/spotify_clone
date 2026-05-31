import {useContext} from "react";
import songContext from "../../contexts/songContexts";

const SingleSongCard = ({info}) => {
    const {setCurrentSong} = useContext(songContext);
    const artistName = info?.artist
        ? `${info.artist.firstName || ""} ${info.artist.lastName || ""}`.trim() || "Unknown Artist"
        : "Unknown Artist";
    const thumbnail = info?.thumbnail || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80";
    const songName = info?.name || "Untitled Track";

    return (
        <div
            className="flex hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm"
            onClick={() => {
                if (info) {
                    setCurrentSong(info);
                }
            }}
        >
            <div
                className="w-12 h-12 bg-cover bg-center"
                style={{
                    backgroundImage: `url("${thumbnail}")`,
                }}
            ></div>
            <div className="flex w-full">
                <div className="text-white flex justify-center  flex-col pl-4 w-5/6">
                    <div className="cursor-pointer hover:underline">
                        {songName}
                    </div>
                    <div className="text-xs text-gray-400 cursor-pointer hover:underline">
                        {artistName}
                    </div>
                </div>
                <div className="w-1/6 flex items-center justify-center text-gray-400 text-sm">
                    <div>3:44</div>
                </div>
            </div>
        </div>
    );
};

export default SingleSongCard;