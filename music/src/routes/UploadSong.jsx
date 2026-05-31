import TextInput from '../components/shared/TextInput';
import CloudinaryUpload from '../components/shared/CloudinaryUpload';
import { useState } from 'react';
import { makeAuthenticatedPOSTRequest } from '../utils/serverHelper';
import { useNavigate } from 'react-router-dom';
import LoggedInContainer from '../containers/LoggedInContainer';

const UploadSong = () => {
    const [name, setName] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [playlistUrl, setPlaylistUrl] = useState("");
    const [uploadedSongFileName, setUploadedSongFileName] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const submitSong = async () => {
        if (!name || !thumbnail || !playlistUrl) {
            setError("Please add name, thumbnail, and a track.");
            return;
        }
        setError("");
        setIsSubmitting(true);
        const data = {name, thumbnail, track: playlistUrl};
        try {
            const response = await makeAuthenticatedPOSTRequest(
                "/song/create",
                data
            );
            if (response?.err) {
                setError(response.err || "Could not create song");
                setIsSubmitting(false);
                return;
            }
            navigate("/home");
        } catch (e) {
            setError("Upload failed. Check your connection or backend.");
        }
        setIsSubmitting(false);
    };

    return (
        <LoggedInContainer curActiveScreen="uploadSong">
            <div className="text-2xl font-semibold mb-5 text-white mt-8">
                Upload Your Music
            </div>
            {error && (
                <div className="mb-4 text-sm text-red-300 bg-red-500/10 border border-red-500/40 p-3 rounded-lg w-2/3">
                    {error}
                </div>
            )}
            <div className="w-2/3 flex space-x-3">
                <div className="w-1/2">
                    <TextInput
                        label="Name"
                        labelClassName="text-white"
                        placeholder="Name"
                        value={name}
                        setValue={setName}
                    />
                </div>
                <div className="w-1/2">
                    <TextInput
                        label="Thumbnail"
                        labelClassName="text-white"
                        placeholder="Thumbnail URL"
                        value={thumbnail}
                        setValue={setThumbnail}
                    />
                </div>
            </div>
            <div className="py-5">
                {uploadedSongFileName ? (
                    <div className="bg-white rounded-full p-3 w-1/3">
                        {uploadedSongFileName.substring(0, 35)}...
                    </div>
                ) : (
                    <CloudinaryUpload
                        setUrl={setPlaylistUrl}
                        setName={setUploadedSongFileName}
                    />
                )}
            </div>
            <button
                className="bg-green-500 hover:bg-green-400 text-black w-40 flex items-center justify-center p-4 rounded-full cursor-pointer font-semibold transition-colors disabled:opacity-50"
                onClick={(e) => {
                    e.preventDefault();
                    submitSong();
                }}
                disabled={isSubmitting}
            >
                {isSubmitting ? "Submitting..." : "Submit Song"}
            </button>
        </LoggedInContainer>
    );
};

export default UploadSong;