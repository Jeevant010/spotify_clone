import {Icon} from "@iconify/react";
import spotify_logo from "../assets/images/spotify_logo_white.svg";
import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";
import {useNavigate} from "react-router-dom";

const focusCardsData = [
    {
        title: "Peaceful Piano",
        description: "Soft keys, zero distractions.",
        imgUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1546&q=80",
    },
    {
        title: "Deep Focus",
        description: "Low noise, high clarity.",
        imgUrl: "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?auto=format&fit=crop&w=1766&q=80",
    },
    {
        title: "Instrumental Study",
        description: "Soft textures for long sessions.",
        imgUrl: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?auto=format&fit=crop&w=2940&q=80",
    },
    {
        title: "Focus Flow",
        description: "Up-tempo beats, steady pace.",
        imgUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1740&q=80",
    },
    {
        title: "Beats to Think",
        description: "Deep techno for clear minds.",
        imgUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1740&q=80",
    },
];

const spotifyPlaylistsCardData = [
    {
        title: "Night Drive",
        description: "Neon synths, open roads.",
        imgUrl: "https://images.unsplash.com/photo-1507878866276-a947ef722fee?auto=format&fit=crop&w=1400&q=80",
    },
    {
        title: "Studio Chill",
        description: "Creative calm for makers.",
        imgUrl: "https://images.unsplash.com/photo-1452723312111-3a7d0db0e024?auto=format&fit=crop&w=1400&q=80",
    },
    {
        title: "Late Night Jazz",
        description: "Warm brass, velvet seats.",
        imgUrl: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=1400&q=80",
    },
    {
        title: "Energy Booster",
        description: "Build momentum quickly.",
        imgUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1400&q=80",
    },
    {
        title: "Ambient Space",
        description: "Slow orbit, deep focus.",
        imgUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80",
    },
];


const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full flex">
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
                            active
                        />
                        <IconText
                            iconName={"material-symbols:search-rounded"}
                            displayText={"Search"}
                        />
                        <IconText
                            iconName={"icomoon-free:books"}
                            displayText={"Library"}
                        />
                    </div>
                    <div className="pt-5">
                        <IconText
                            iconName={"material-symbols:add-box"}
                            displayText={"Create Playlist"}
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
            <div className="h-full flex-1 bg-[var(--app-surface)] overflow-auto">
                <div className="navbar w-full h-1/10 bg-[#121212]/90 sticky top-0 flex items-center justify-end z-10">
                    <div className="w-3/5 flex h-full">
                        <div className="w-3/5 flex justify-around items-center">
                            <TextWithHover displayText={"Premium"} />
                            <TextWithHover displayText={"Support"} />
                            <TextWithHover displayText={"Download"} />
                            <div className="h-1/2 border-r border-white"></div>
                        </div>
                        <div className="w-2/5 flex justify-around h-full items-center">
                            <TextWithHover
                                displayText={"Sign up"}
                                onClick={() => navigate("/signup")}
                            />
                            <div
                                className="bg-white h-2/3 px-8 flex items-center justify-center rounded-full font-semibold cursor-pointer hover:scale-105 transition-transform text-black"
                                onClick={() => navigate("/login")}
                            >
                                Log in
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content p-8 pt-8 overflow-auto">
                    <section>
                        <PlaylistView
                            titleText="Focus"
                            cardsData={focusCardsData}
                        />
                        <PlaylistView
                            titleText="Spotify Playlists"
                            cardsData={spotifyPlaylistsCardData}
                        />
                    </section>

                    <footer className="mt-16 border-t border-white/10 pt-10 pb-16 grid md:grid-cols-4 gap-8 text-sm">
                        <div>
                            <div className="text-lg font-semibold">Spotify Clone</div>
                            <div className="text-[var(--app-muted)] mt-2">
                                Curated sound, clean UI, and full control.
                            </div>
                        </div>
                        <div>
                            <div className="font-semibold">Product</div>
                            <div className="text-[var(--app-muted)] mt-2">Premium</div>
                            <div className="text-[var(--app-muted)] mt-2">Download</div>
                            <div className="text-[var(--app-muted)] mt-2">Mobile</div>
                        </div>
                        <div>
                            <div className="font-semibold">Community</div>
                            <div className="text-[var(--app-muted)] mt-2">Developers</div>
                            <div className="text-[var(--app-muted)] mt-2">Creators</div>
                            <div className="text-[var(--app-muted)] mt-2">Investors</div>
                        </div>
                        <div>
                            <div className="font-semibold">Support</div>
                            <div className="text-[var(--app-muted)] mt-2">Help Center</div>
                            <div className="text-[var(--app-muted)] mt-2">Safety & Privacy</div>
                            <div className="text-[var(--app-muted)] mt-2">Terms</div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

const PlaylistView = ({titleText, cardsData}) => {
    return (
        <div className="text-white mt-10">
            <div className="text-2xl font-semibold mb-5 hover:underline cursor-pointer">{titleText}</div>
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
                {cardsData.map((item, index) => {
                    return (
                        <Card
                            key={`${titleText}-${index}`}
                            title={item.title}
                            description={item.description}
                            imgUrl={item.imgUrl}
                        />
                    );
                })}
            </div>
        </div>
    );
};

const Card = ({title, description, imgUrl}) => {
    return (
        <div className="bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition-all cursor-pointer group">
            <div className="pb-4 pt-2 relative">
                <img className="w-full rounded-md h-40 object-cover shadow-lg" src={imgUrl} alt={title} />
                <div className="absolute right-4 bottom-6 bg-[#1db954] text-black w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-xl hover:scale-105">
                    <Icon icon="ic:baseline-play-arrow" fontSize={30} />
                </div>
            </div>
            <div className="text-white font-semibold py-1 truncate">{title}</div>
            <div className="text-[#b3b3b3] text-sm line-clamp-2 mt-1">{description}</div>
        </div>
    );
};

export default Home;