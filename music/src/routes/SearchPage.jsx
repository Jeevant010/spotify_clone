import {useState} from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import {Icon} from "@iconify/react";
import {makeAuthenticatedGETRequest} from "../utils/serverHelper";
import SingleSongCard from "../components/shared/SingleSongCard";

const SearchPage = () => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [songData, setSongData] = useState([]);
    const [error, setError] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const searchSong = async () => {
        const query = searchText.trim();
        if (!query) {
            setSongData([]);
            setError("");
            return;
        }
        setIsSearching(true);
        setError("");
        try {
            const response = await makeAuthenticatedGETRequest(
                "/song/get/songname/" + query
            );
            setSongData(response?.data || []);
            if (response?.err) {
                setError(response.err);
            }
        } catch (e) {
            setError("Search failed. Check your connection or backend.");
        }
        setIsSearching(false);
    };

    return (
        <LoggedInContainer curActiveScreen="search">
            <div className="w-full py-6">
                <div
                    className={`w-1/3 p-3 text-sm rounded-full bg-gray-800 px-5 flex text-white space-x-3 items-center ${
                        isInputFocused ? "border border-white" : ""
                    }`}
                >
                    <Icon icon="ic:outline-search" className="text-lg" />
                    <input
                        type="text"
                        placeholder="What do you want to listen to?"
                        className="w-full bg-gray-800 focus:outline-none"
                        onFocus={() => {
                            setIsInputFocused(true);
                        }}
                        onBlur={() => {
                            setIsInputFocused(false);
                        }}
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                searchSong();
                            }
                        }}
                    />
                </div>
                {error && (
                    <div className="text-red-300 bg-red-500/10 border border-red-500/40 p-3 mt-6 rounded-lg text-sm">
                        {error}
                    </div>
                )}
                {isSearching ? (
                    <div className="text-gray-400 pt-10">Searching...</div>
                ) : songData.length > 0 ? (
                    <div className="pt-10 space-y-3">
                        <div className="text-white">
                            Showing search results for
                            <span className="font-bold"> {searchText}</span>
                        </div>
                        {songData.map((item) => {
                            return (
                                <SingleSongCard
                                    info={item}
                                    key={JSON.stringify(item)}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-gray-400 pt-10">
                        Start typing to search songs.
                    </div>
                )}
            </div>
        </LoggedInContainer>
    );
};

export default SearchPage;