import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import LoggedInContainer from "../containers/LoggedInContainer";
import {makeAuthenticatedGETRequest} from "../utils/serverHelper";

const Library = () => {
    const [myPlaylists, setMyPlaylists] = useState([]);
    const [error, setError] = useState("");
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await makeAuthenticatedGETRequest(
                    "/playlist/get/me"
                );
                setMyPlaylists(response?.data || []);
                if (response?.err) {
                    setError(response.err);
                }
            } catch (e) {
                setError("Could not load your playlists.");
            }
        };
        getData();
    }, []);

    return (
        <LoggedInContainer curActiveScreen={"library"}>
            <div className="text-white text-xl pt-8 font-semibold">
                My Playlists
            </div>
            {error && (
                <div className="mt-4 text-sm text-red-300 bg-red-500/10 border border-red-500/40 p-3 rounded-lg">
                    {error}
                </div>
            )}
            {myPlaylists.length === 0 ? (
                <div className="text-gray-400 mt-6">
                    You have no playlists yet. Create one from the sidebar.
                </div>
            ) : (
                <div className="py-5 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                    {myPlaylists.map((item) => {
                        return (
                            <Card
                                key={JSON.stringify(item)}
                                title={item.name}
                                description=""
                                imgUrl={item.thumbnail}
                                playlistId={item._id}
                            />
                        );
                    })}
                </div>
            )}
        </LoggedInContainer>
    );
};

const Card = ({title, description, imgUrl, playlistId}) => {
    const navigate = useNavigate();
    return (
        <div
            className="bg-[#181818] w-full p-4 rounded-md cursor-pointer hover:bg-[#282828] transition group"
            onClick={() => {
                navigate("/playlist/" + playlistId);
            }}
        >
            <div className="pb-4 pt-2">
                <img className="w-full rounded-xl h-36 object-cover" src={imgUrl} alt={title} />
            </div>
            <div className="text-white font-semibold py-2">{title}</div>
            <div className="text-[var(--app-muted)] text-sm">{description}</div>
        </div>
    );
};

export default Library;