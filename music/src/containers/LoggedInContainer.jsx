import {useContext, useState, useLayoutEffect, useRef, useEffect, useCallback} from "react";
import {Howl, Howler} from "howler";
import {Icon} from "@iconify/react";
import spotify_logo from "../assets/images/spotify_logo_white.svg";
import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";
import songContext from "../contexts/songContexts";
import CreatePlaylistModal from "../modals/CreatePlaylistModal";
import AddToPlaylistModal from "../modals/AddToPlaylistModal";
import {makeAuthenticatedPOSTRequest, makeAuthenticatedGETRequest} from "../utils/serverHelper";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

const LoggedInContainer = ({children, curActiveScreen}) => {
    const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);
    const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [, , removeCookie] = useCookies(["token"]);

    const {
        currentSong,
        soundPlayed,
        setSoundPlayed,
        isPaused,
        setIsPaused,
    } = useContext(songContext);
    const navigate = useNavigate();
    const firstUpdate = useRef(true);
    const progressInterval = useRef(null);

    // Fetch user info
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await makeAuthenticatedGETRequest("/auth/me");
                if (response && !response.err) {
                    setUserInfo(response);
                }
            } catch (e) {
                console.error("Failed to fetch user info", e);
            }
        };
        fetchUser();
    }, []);

    // Track progress of the current song
    const startProgressTracking = useCallback((sound) => {
        if (progressInterval.current) {
            clearInterval(progressInterval.current);
        }
        progressInterval.current = setInterval(() => {
            if (sound && sound.playing()) {
                setCurrentTime(sound.seek() || 0);
                setDuration(sound.duration() || 0);
            }
        }, 500);
    }, []);

    useEffect(() => {
        return () => {
            if (progressInterval.current) {
                clearInterval(progressInterval.current);
            }
        };
    }, []);

    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        if (!currentSong) {
            return;
        }
        changeSong(currentSong.track);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSong?.track]);

    const addSongToPlaylist = async (playlistId) => {
        if (!currentSong?._id) {
            return;
        }
        const songId = currentSong._id;
        const payload = {playlistId, songId};
        const response = await makeAuthenticatedPOSTRequest(
            "/playlist/add/song",
            payload
        );
        if (response._id) {
            setAddToPlaylistModalOpen(false);
        }
    };

    const playSound = () => {
        if (!soundPlayed) {
            return;
        }
        soundPlayed.play();
    };

    const changeSong = (songSrc) => {
        if (!songSrc) {
            return;
        }
        if (soundPlayed) {
            soundPlayed.stop();
        }
        if (progressInterval.current) {
            clearInterval(progressInterval.current);
        }
        let sound = new Howl({
            src: [songSrc],
            html5: true,
            volume: volume,
            onplay: function() {
                setDuration(sound.duration());
                startProgressTracking(sound);
            },
            onend: function() {
                setIsPaused(true);
                setCurrentTime(0);
                if (progressInterval.current) {
                    clearInterval(progressInterval.current);
                }
            },
        });
        setSoundPlayed(sound);
        sound.play();
        setIsPaused(false);
    };

    const pauseSound = () => {
        if (soundPlayed) {
            soundPlayed.pause();
        }
    };

    const togglePlayPause = () => {
        if (!soundPlayed) {
            return;
        }
        if (isPaused) {
            playSound();
            setIsPaused(false);
        } else {
            pauseSound();
            setIsPaused(true);
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        Howler.volume(newVolume);
    };

    const handleSeek = (e) => {
        const seekTime = parseFloat(e.target.value);
        if (soundPlayed) {
            soundPlayed.seek(seekTime);
            setCurrentTime(seekTime);
        }
    };

    const formatTime = (secs) => {
        if (!secs || isNaN(secs)) return "0:00";
        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const handleLogout = () => {
        if (soundPlayed) {
            soundPlayed.stop();
        }
        removeCookie("token", {path: "/"});
        navigate("/login");
    };

    const getUserInitials = () => {
        if (!userInfo) return "?";
        const first = userInfo.firstName?.[0] || "";
        const last = userInfo.lastName?.[0] || "";
        return (first + last).toUpperCase() || "?";
    };

    return (
        <div className="h-full w-full text-slate-100">
            {createPlaylistModalOpen && (
                <CreatePlaylistModal
                    closeModal={() => {
                        setCreatePlaylistModalOpen(false);
                    }}
                />
            )}
            {addToPlaylistModalOpen && (
                <AddToPlaylistModal
                    closeModal={() => {
                        setAddToPlaylistModalOpen(false);
                    }}
                    addSongToPlaylist={addSongToPlaylist}
                />
            )}
            <div className={`${currentSong ? "h-9/10" : "h-full"} w-full flex`}>
                {/* Left sidebar */}
                <div className="h-full w-72 bg-black flex flex-col justify-between pb-10">
                    <div>
                        <div className="logoDiv p-6">
                            <img
                                src={spotify_logo}
                                alt="spotify logo"
                                width={125}
                            />
                        </div>
                        <div className="py-5">
                            <IconText
                                iconName={"material-symbols:home"}
                                displayText={"Home"}
                                targetLink={"/home"}
                                active={curActiveScreen === "home"}
                            />
                            <IconText
                                iconName={"material-symbols:search-rounded"}
                                displayText={"Search"}
                                active={curActiveScreen === "search"}
                                targetLink={"/search"}
                            />
                            <IconText
                                iconName={"icomoon-free:books"}
                                displayText={"Library"}
                                active={curActiveScreen === "library"}
                                targetLink={"/library"}
                            />
                            <IconText
                                iconName={
                                    "material-symbols:library-music-sharp"
                                }
                                displayText={"My Music"}
                                targetLink="/myMusic"
                                active={curActiveScreen === "myMusic"}
                            />
                        </div>
                        <div className="pt-5">
                            <IconText
                                iconName={"material-symbols:add-box"}
                                displayText={"Create Playlist"}
                                onClick={() => {
                                    setCreatePlaylistModalOpen(true);
                                }}
                            />
                            <IconText
                                iconName={"mdi:cards-heart"}
                                displayText={"Liked Songs"}
                            />
                        </div>
                    </div>
                    <div className="px-5">
                        <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
                            <Icon icon="carbon:earth-europe-africa" />
                            <div className="ml-2 text-sm font-semibold">
                                English
                            </div>
                        </div>
                    </div>
                </div>
                {/* Main content area */}
                <div className="h-full flex-1 bg-[var(--app-surface)] overflow-auto">
                    <div className="navbar w-full h-1/10 bg-[#121212]/90 sticky top-0 flex items-center justify-end z-10">
                        <div className="w-3/5 flex h-full">
                            <div className="w-2/3 flex justify-around items-center">
                                <TextWithHover displayText={"Premium"} />
                                <TextWithHover displayText={"Support"} />
                                <TextWithHover displayText={"Download"} />
                                <div className="h-1/2 border-r border-white"></div>
                            </div>
                            <div className="w-1/3 flex justify-around h-full items-center">
                                <TextWithHover displayText={"Upload Song"} onClick={() => navigate("/uploadSong")} />
                                <div
                                    className="bg-[var(--app-accent)] w-10 h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer text-black text-sm"
                                    title={userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : "Profile"}
                                >
                                    {getUserInitials()}
                                </div>
                                <button
                                    className="text-gray-400 hover:text-white text-sm font-semibold"
                                    onClick={handleLogout}
                                    title="Logout"
                                >
                                    <Icon icon="material-symbols:logout" fontSize={22} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="content p-8 pt-6 overflow-auto">
                        {children}
                    </div>
                </div>
            </div>
            {/* Music player bar */}
            {currentSong && (
                <div className="w-full h-1/10 bg-[#181818] text-white flex items-center px-4 border-t border-gray-800 z-50">
                    <div className="w-1/4 flex items-center">
                        <img
                            src={currentSong.thumbnail || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80"}
                            alt="currentSongThumbnail"
                            className="h-14 w-14 rounded"
                        />
                        <div className="pl-4">
                            <div className="text-sm hover:underline cursor-pointer">
                                {currentSong.name || "Untitled Track"}
                            </div>
                            <div className="text-xs text-gray-500 hover:underline cursor-pointer">
                                {currentSong.artist
                                    ? `${currentSong.artist.firstName || ""} ${currentSong.artist.lastName || ""}`.trim() || "Unknown Artist"
                                    : "Unknown Artist"}
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 flex justify-center h-full flex-col items-center">
                        <div className="flex w-1/3 justify-between items-center">
                            <Icon
                                icon="ph:shuffle-fill"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />
                            <Icon
                                icon="mdi:skip-previous-outline"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />
                            <Icon
                                icon={
                                    isPaused
                                        ? "ic:baseline-play-circle"
                                        : "ic:baseline-pause-circle"
                                }
                                fontSize={50}
                                className="cursor-pointer text-white hover:scale-105 transition-transform"
                                onClick={togglePlayPause}
                            />
                            <Icon
                                icon="mdi:skip-next-outline"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />
                            <Icon
                                icon="ic:twotone-repeat"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />
                        </div>
                        {/* Progress bar */}
                        <div className="flex items-center w-full px-4 space-x-2 mt-1">
                            <span className="text-xs text-gray-400 w-10 text-right">
                                {formatTime(currentTime)}
                            </span>
                            <input
                                type="range"
                                min="0"
                                max={duration || 0}
                                value={currentTime}
                                onChange={handleSeek}
                                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-green-500"
                                step="0.1"
                            />
                            <span className="text-xs text-gray-400 w-10">
                                {formatTime(duration)}
                            </span>
                        </div>
                    </div>
                    <div className="w-1/4 flex justify-end pr-4 space-x-4 items-center">
                        <Icon
                            icon="ic:round-playlist-add"
                            fontSize={30}
                            className="cursor-pointer text-gray-500 hover:text-white"
                            onClick={() => {
                                setAddToPlaylistModalOpen(true);
                            }}
                        />
                        <Icon
                            icon="ph:heart-bold"
                            fontSize={25}
                            className="cursor-pointer text-gray-500 hover:text-white"
                        />
                        {/* Volume control */}
                        <div className="flex items-center space-x-2">
                            <Icon
                                icon={volume === 0 ? "ic:round-volume-off" : volume < 0.5 ? "ic:round-volume-down" : "ic:round-volume-up"}
                                fontSize={22}
                                className="cursor-pointer text-gray-500 hover:text-white"
                                onClick={() => {
                                    const newVol = volume === 0 ? 1 : 0;
                                    setVolume(newVol);
                                    Howler.volume(newVol);
                                }}
                            />
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-green-500"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoggedInContainer;