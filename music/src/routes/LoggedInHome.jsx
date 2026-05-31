import LoggedInContainer from "../containers/LoggedInContainer";
import {Icon} from "@iconify/react";

const focusCardsData = [
    {
        title: "Peaceful Piano",
        description: "Relax and indulge with beautiful piano pieces",
        imgUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80",
    },
    {
        title: "Deep Focus",
        description: "Keep calm and focus with this music",
        imgUrl: "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1766&q=80",
    },
    {
        title: "Instrumental Study",
        description: "Focus with soft study music in the background.",
        imgUrl: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    },
    {
        title: "Focus Flow",
        description: "Up tempo instrumental hip hop beats",
        imgUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
    {
        title: "Beats to think to",
        description: "Focus with deep techno and tech house",
        imgUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
];

const spotifyPlaylistsCardData = [
    {
        title: "This is one",
        description: "Relax and indulge with beautiful piano pieces",
        imgUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80",
    },
    {
        title: "Deep Focus",
        description: "Keep calm and focus with this music",
        imgUrl: "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1766&q=80",
    },
    {
        title: "Instrumental Study",
        description: "Focus with soft study music in the background.",
        imgUrl: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    },
    {
        title: "Focus Flow",
        description: "Up tempo instrumental hip hop beats",
        imgUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
    {
        title: "Beats to think to",
        description: "Focus with deep techno and tech house",
        imgUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
];

const Home = () => {
    return (
        <LoggedInContainer curActiveScreen="home">
            <div className="flex flex-col gap-10 mt-2">
                <PlaylistView titleText="Focus" cardsData={focusCardsData} />
                <PlaylistView
                    titleText="Spotify Playlists"
                    cardsData={spotifyPlaylistsCardData}
                />
                <PlaylistView
                    titleText="Sound of India"
                    cardsData={focusCardsData}
                />
            </div>
        </LoggedInContainer>
    );
};

const PlaylistView = ({ titleText, cardsData }) => {
    return (
        <div className="text-white mt-4">
            <div className="text-2xl font-semibold mb-5 hover:underline cursor-pointer">{titleText}</div>
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
                {cardsData.map((item, index) => (
                    <Card
                        key={`${titleText}-${index}`}
                        title={item.title}
                        description={item.description}
                        imgUrl={item.imgUrl}
                    />
                ))}
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