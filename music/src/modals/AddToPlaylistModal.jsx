import {useState, useEffect} from "react";
import {makeAuthenticatedGETRequest} from "../utils/serverHelper";

const AddToPlaylistModal = ({closeModal, addSongToPlaylist}) => {
    const [myPlaylists, setMyPlaylists] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest(
                "/playlist/get/me"
            );
            setMyPlaylists(response.data);
        };
        getData();
    }, []);

    return (
        <div
            className="absolute bg-black w-screen h-screen bg-opacity-60 flex justify-center items-center z-50"
            onClick={closeModal}
        >
            <div
                className="bg-[#282828] w-full max-w-md rounded-xl p-8"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="text-white mb-5 font-semibold text-lg">
                    Select Playlist
                </div>
                <div className="space-y-4 flex flex-col justify-center items-center">
                    {myPlaylists.length === 0 ? (
                        <div className="text-sm text-[var(--app-muted)]">
                            No playlists found yet.
                        </div>
                    ) : (
                        myPlaylists.map((item) => {
                            return (
                                <PlaylistListComponent
                                    info={item}
                                    addSongToPlaylist={addSongToPlaylist}
                                    key={item._id}
                                />
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

const PlaylistListComponent = ({info, addSongToPlaylist}) => {
    return (
        <div className="bg-[var(--app-surface-2)] w-full flex items-center space-x-4 hover:bg-white/10 cursor-pointer p-3 rounded-lg" onClick={()=>{
            addSongToPlaylist(info._id)
        }}>
            <div>
                <img
                    src={info.thumbnail}
                    className="w-10 h-10 rounded"
                    alt="thumbnail"
                />
            </div>
            <div className="text-white font-semibold text-sm">{info.name}</div>
        </div>
    );
};

export default AddToPlaylistModal;