import spotify_logo_white from '../assets/images/spotify_logo_white.svg';
import IconText from '../components/shared/IconText';



const HomeComponent = () => {
    return (
        <>
            <div className="h-full w-full flex">

                <div className="h-full w-1/5 bg-black">
                    <div className='logoDiv p-6' >
                        <img src={spotify_logo_white} alt="spotify logo" width={125}  />
                    </div>
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
                </div>

                <div className='h-full'>
                    right
                </div>

            </div>
        </>
    )
}

export default HomeComponent;