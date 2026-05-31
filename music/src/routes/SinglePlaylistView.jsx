import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import LoggedInContainer from "../containers/LoggedInContainer";
import {makeAuthenticatedGETRequest} from "../utils/serverHelper";
import SingleSongCard from "../components/shared/SingleSongCard";

const SinglePlaylistView = () => {
    const [playlistDetails, setPlaylistDetails] = useState(null);
    const [error, setError] = useState("");
    const {playlistId} = useParams();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await makeAuthenticatedGETRequest(
                    "/playlist/get/playlist/" + playlistId
                );
                if (response?.err) {
                    setError(response.err);
                } else {
                    setPlaylistDetails(response);
                }
            } catch (e) {
                setError("Could not load this playlist.");
            }
        };
        getData();
    }, [playlistId]);

    return (
        <LoggedInContainer curActiveScreen={"library"}>
            {error && (
                <div className="mt-6 text-sm text-red-300 bg-red-500/10 border border-red-500/40 p-3 rounded-lg">
                    {error}
                </div>
            )}
            {playlistDetails?._id && (
                <div>
                    <div className="text-white text-xl pt-8 font-semibold">
                        {playlistDetails.name}
                    </div>
                    {playlistDetails.songs?.length ? (
                        <div className="pt-10 space-y-3">
                            {playlistDetails.songs.map((item) => {
                                return (
                                    <SingleSongCard
                                        info={item}
                                        key={JSON.stringify(item)}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-gray-400 pt-6">
                            This playlist is empty.
                        </div>
                    )}
                </div>
            )}
        </LoggedInContainer>
    );
};

export default SinglePlaylistView;