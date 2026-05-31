import {useState, useEffect} from "react";
import SingleSongCard from "../components/shared/SingleSongCard";
import {makeAuthenticatedGETRequest} from "../utils/serverHelper";
import LoggedInContainer from "../containers/LoggedInContainer";

const MyMusic = () => {
    const [songData, setSongData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await makeAuthenticatedGETRequest(
                    "/song/get/mysongs"
                );
                setSongData(response?.data || []);
                if (response?.err) {
                    setError(response.err);
                }
            } catch (e) {
                setError("Could not load your songs.");
            }
        };
        getData();
    }, []);

    return (
        <LoggedInContainer curActiveScreen="myMusic">
            <div className="text-white text-xl font-semibold pb-4 pl-2 pt-8">
                My Songs
            </div>
            {error && (
                <div className="mt-4 text-sm text-red-300 bg-red-500/10 border border-red-500/40 p-3 rounded-lg">
                    {error}
                </div>
            )}
            {songData.length === 0 ? (
                <div className="text-gray-400 mt-6">
                    No songs uploaded yet. Use Upload Song to add tracks.
                </div>
            ) : (
                <div className="space-y-3 overflow-auto">
                    {songData.map((item) => {
                        return <SingleSongCard key={item._id} info={item} />;
                    })}
                </div>
            )}
        </LoggedInContainer>
    );
};

export default MyMusic;