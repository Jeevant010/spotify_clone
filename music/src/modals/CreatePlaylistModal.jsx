import {useState} from "react";
import TextInput from "../components/shared/TextInput";
import {makeAuthenticatedPOSTRequest} from "../utils/serverHelper";

const CreatePlaylistModal = ({closeModal}) => {
    const [playlistName, setPlaylistName] = useState("");
    const [playlistThumbnail, setPlaylistThumbnail] = useState("");

    const createPlaylist = async () => {
        const response = await makeAuthenticatedPOSTRequest(
            "/playlist/create",
            {name: playlistName, thumbnail: playlistThumbnail, songs: []}
        );
        if (response._id) {
            closeModal();
        }
    };

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
                    Create Playlist
                </div>
                <div className="space-y-4 flex flex-col justify-center items-center">
                    <TextInput
                        label="Name"
                        labelClassName={"text-white"}
                        placeholder="Playlist Name"
                        value={playlistName}
                        setValue={setPlaylistName}
                    />
                    <TextInput
                        label="Thumbnail"
                        labelClassName={"text-white"}
                        placeholder="Thumbnail"
                        value={playlistThumbnail}
                        setValue={setPlaylistThumbnail}
                    />
                    <button
                        className="bg-white w-1/2 rounded-full flex font-semibold justify-center items-center py-3 mt-4 cursor-pointer text-black"
                        onClick={createPlaylist}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatePlaylistModal;