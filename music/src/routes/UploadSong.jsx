import spotify_logo_white from '../assets/images/spotify_logo_white.svg';
import IconText from '../components/shared/IconText';
import { Icon } from '@iconify/react';
import TextWithHover from '../components/shared/TextWithHover';
import TextInput from '../components/shared/TextInput';
import CloudinaryUpload from '../components/shared/CloudinaryUpload';
import { useState } from 'react';
import { makeAuthenticatedPOSTRequest } from '../utils/serverHelper';
import { useNavigate } from 'react-router-dom';


const UploadSong = () => {
    const [name, setName] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [playlistUrl, setPlaylistUrl] = useState("");
    const [uploadedSongFileName, setUploadedSongFileName] = useState("");
    const navigate = useNavigate();


    const submitSong = async () =>{
        const data = {name, thumbnail, track:playlistUrl};
        const response = await makeAuthenticatedPOSTRequest(
            "/song/create",
            data
        );
        if(response.err){
            alert("could not create song");
            return;
        }
        alert("Success");
        navigate("/home");
    }

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
                        <div className='text-2xl font-semibold mb-5 text-white'>
                            Upload Your Music
                        </div>
                        <div className='w-2/3 flex space-x-3'>
                            <div className='w-1/2'>
                                <TextInput
                                    label= "Name"
                                    labelClassName= "text-white"
                                    placeholder="Name"
                                    value={name}
                                    setValue={setName}
                                />
                            </div>
                            <div className='w-1/2'>
                                <TextInput
                                    label= "Thumbnail"
                                    labelClassName= "text-white"
                                    placeholder="Thumbnail"
                                    value={thumbnail}
                                    setValue={setThumbnail}
                                />
                            </div>
                        </div>
                        <div className='py-5'>
                            {
                                uploadedSongFileName ? (
                                    <div className='bg-white rounded-full p-3 w-1/3'>
                                        {uploadedSongFileName.substring(0, 35)}...
                                    </div>
                                ) : (
                                    <CloudinaryUpload 
                                    setUrl={setPlaylistUrl} 
                                    setName={setUploadedSongFileName}
                                />
                                )
                            }
                            
                        </div>
                        <div className='bg-white w-40 flex items-center justify-center p-4 rounded-full cursor-pointer font-semibold'
                            onClick={ (e) => {
                            e.preventDefault();
                            submitSong();
                            }
                }
                        >
                            Submit Song
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default UploadSong;