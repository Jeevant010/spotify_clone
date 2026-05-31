import React, {useState} from 'react';
import {useCookies} from 'react-cookie';
import {useNavigate, Link} from 'react-router-dom';
import {Icon} from "@iconify/react";
import TextInput from '../components/shared/TextInput';
import PasswordInput from '../components/shared/PasswordInput';
import {makeUnauthenticatedPOSTRequest} from '../utils/serverHelper';

const SignupComponent = () => {
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [, setCookie] = useCookies(["token"]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const signUp = async () => {
        setError("");
        if (email !== confirmEmail) {
            setError("Email and confirm email fields must match.");
            return;
        }
        setLoading(true);
        try {
            const data = {email, password, userName, firstName, lastName};
            const response = await makeUnauthenticatedPOSTRequest(
                "/auth/register",
                data
            );
            if (response && !response.err && !response.error) {
                const token = response.token;
                const date = new Date();
                date.setDate(date.getDate() + 30);
                setCookie("token", token, {path: "/", expires: date});
                navigate("/home");
            } else {
                setError(response?.err || response?.error || "Registration failed");
            }
        } catch (e) {
            setError("Network error. Is the backend running?");
        }
        setLoading(false);
    };

    return (
        <div className="w-full h-full flex flex-col items-center min-h-screen bg-[#121212]">
            <div className="logo p-6 w-full flex justify-start bg-black">
                <Icon icon="logos:spotify" width="110" />
            </div>
            <div className="InputRegion w-full max-w-[700px] py-16 px-24 flex items-center justify-center flex-col bg-black rounded-lg mt-10 mb-10 pb-20">
                <div className="font-display mb-10 text-4xl text-white font-bold text-center">
                    Sign up for free to start listening.
                </div>
                {error && (
                    <div className="w-full bg-red-500 bg-opacity-20 border border-red-500 text-red-300 rounded-lg p-3 mb-4 text-sm">
                        {error}
                    </div>
                )}
                <TextInput
                    label="Email address"
                    placeholder="Enter your email address"
                    className="my-3"
                    value={email}
                    setValue={setEmail}
                    labelClassName="text-white"
                />
                <TextInput
                    label="Confirm Email address"
                    placeholder="Enter your email again"
                    className="mb-3"
                    value={confirmEmail}
                    setValue={setConfirmEmail}
                    labelClassName="text-white"
                />
                <TextInput
                    label="Username"
                    placeholder="Enter your username"
                    className="mb-3"
                    value={userName}
                    setValue={setUserName}
                    labelClassName="text-white"
                />
                <PasswordInput
                    label="Create Password"
                    placeholder="Enter a strong password"
                    value={password}
                    setValue={setPassword}
                    labelClassName="text-white"
                />
                <div className="w-full flex space-x-4 mt-3">
                    <TextInput
                        label="First Name"
                        placeholder="First Name"
                        className="my-3"
                        value={firstName}
                        setValue={setFirstName}
                        labelClassName="text-white"
                    />
                    <TextInput
                        label="Last Name"
                        placeholder="Last Name"
                        className="my-3"
                        value={lastName}
                        setValue={setLastName}
                        labelClassName="text-white"
                    />
                </div>
                <div className="w-full flex items-center justify-center mt-8">
                    <button
                        className="bg-[#1ed760] hover:scale-105 hover:bg-[#1fdf64] text-black font-bold p-3 w-full rounded-full transition-all disabled:opacity-50"
                        onClick={(e) => {
                            e.preventDefault();
                            signUp();
                        }}
                        disabled={loading}
                    >
                        {loading ? "SIGNING UP..." : "SIGN UP"}
                    </button>
                </div>
                <div className="w-full border border-solid border-gray-700 mt-6"></div>
                <div className="my-6 font-semibold text-lg text-gray-300">
                    Already have an account?
                </div>
                <Link to="/login" className="w-full">
                    <div className="border border-gray-500 text-white font-bold w-full rounded-full flex items-center justify-center py-4 hover:border-white transition-colors">
                        LOG IN INSTEAD
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default SignupComponent;
