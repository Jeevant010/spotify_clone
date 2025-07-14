import spotify_logo_white from '../assets/images/spotify_logo_white.svg';
import IconText from '../components/shared/IconText';
import { Icon } from '@iconify/react';
import TextWithHover from '../components/shared/TextWithHover';

const focusCardData = [
    {
                title : "Peaceful Piano",
                description : "Relax and indulge with beautiful piano pieces.",
                imgUrl:"https://images.unsplash.com/photo-1696980488578-99528a2f2d8b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                
    }
]

const HomeComponent = () => {
    return (
        <>
            <div className="h-full w-full flex">

                <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
                <div>
                    
                    <div className='logoDiv p-6' >
                        <img src={spotify_logo_white} alt="spotify logo" width={125}  />
                    </div>
                    <div className='py-5'>
                        <div>
                            <IconText 
                                iconName={"ix:home-filled"}
                                displayText={"Home"}
                            />
                        </div>
                        <div>
                            <IconText 
                                 iconName={"bx:search"}
                                displayText={"Search"}
                            />
                        </div>
                        <div>
                            <IconText 
                                iconName={"qlementine-icons:library-16"}
                                displayText={"Library"}
                            />
                        </div>
                        <div>
                            <IconText 
                            iconName={"material-symbols:library-music-sharp"}
                            displayText={"My Music"}
                        />
                        </div>
                    </div>
                    <div className='pt-7'>
                        <div>
                            <IconText 
                                iconName={"material-symbols-light:add-box-sharp"}
                                displayText={"Create Playlist"}
                            />
                        </div>
                        <div>
                            <IconText 
                            iconName={"mdi:heart-box"}
                            displayText={"Liked Songs"}
                        />
                        </div>
                    </div>
                    
                    </div>
                    <div className='px-5'>
                        
                        <div className='border border-gray-500 rounded-full text-white w-2/5 flex px-2 py-2 items-center justify-center hover:border-white cursor-pointer' >
                            <Icon icon="mynaui:globe" />
                            <div className='mx-2 text-sm font-semibold'>
                                English
                            </div>
                        </div>
                    </div>
                    </div>

                <div className='h-full w-4/5 bg-app-black  overflow-auto'>
                    <div className='navbar w-full h-1/10 bg-black items-center justify-end opacity-30 flex'>
                    <div className='w-1/2 h-full flex '>
                    <div className='w-2/3 flex justify-around items-center'>
                        <TextWithHover displayText={"Premium"} />
                        <TextWithHover displayText={"Support"} />
                        <TextWithHover displayText={"Download"} />
                        <div className='h-1/2 border-r border-white'></div>
                    </div>
                    <div className='flex w-1/3 justify-around h-full items-center '>
                        <TextWithHover displayText={"Upload Song"} />

                        <div className='bg-white w-10 h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer'>
                                AC
                        </div>
                    </div>
                        </div>
                    </div>
                    <div className='content p-8 pt-0 overflow-auto'>
                        <div className=''>
                            <PlaylistView titleText="Focus"
                                cardsData={focusCardData}
                            />
                            <PlaylistView titleText="Spotify Playlists"  cardsData={focusCardData} />
                            <PlaylistView titleText="Sound of India" />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

const PlaylistView = ({titleText, cardsData}) =>{
    return (
    <>
        <div className='text-white mt-8'>
            <div className='text-2xl font-semibold mb-5'>{titleText}</div>
            <div className='w-full flex justify-between items-center space-x-4'>
                {
                    (cardsData || []).map((items, index)=>{
                        return (<Card
                        key = {items.title + index}
                        title={items.title} 
                        description={items.description} 
                        imgUrl={items.imgUrl} 
                    />)
                    })
                }
                {/* <Card title="Peaceful Piano" 
                description="Relax and indulge with beautiful piano pieces."
                imgUrl="https://images.unsplash.com/photo-1696980488578-99528a2f2d8b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                <Card title="Deep Focus" 
                description="Keep calm and focus with ambient and post rock..."
                />
                <Card title="Instrumental Study" 
                description="Focus with soft study music in the background."
                />
                <Card title="Focus Flow" 
                description="Uptempo instrumental hip hop beats."
                />
                <Card title="Beats to think to" 
                description="Focus with deep techno and tech house."
                /> */}

            </div>
        </div>
    </>
    )
}

const Card = ({title, description, imgUrl}) => {
    return (
    <>
        <div className='bg-black bg-opacity-40 w-1/5 p-4 rounded-lg'>
        <div className='pb-4 pt-2'>
            <img 
            className='w-full rounded-md'
            src={imgUrl} alt="label" />
            <div className='text-white font-semibold py-3'>{title}</div>
            <div className='text-gray-500 text-xs'>{description}</div>
        </div>
        </div>
        
    </>
    )
}

export default HomeComponent;