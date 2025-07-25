import React, { useState } from 'react';
import {useCookies} from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';
import {Icon} from "@iconify/react";
import TextInput from '../components/shared/TextInput';
import PasswordInput from '../components/shared/PasswordInput';
import { makeUnauthenticatedPOSTRequest } from '../utils/serverHelper';

const SignupComponent = () => {
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [cookie, setCookie] = useCookies(["token"]);
    const navigate = useNavigate();


    const signUp = async () => {
        if(email !== confirmEmail){
            alert(
                "Email and confirm Email fields much match. Please check again"
            );
            return;
        }
        const data = { email, password, userName, firstName, lastName }
        const response = await makeUnauthenticatedPOSTRequest(
            "/auth/register",
            data
        );
        if (response && !response.err && !response.error) {
            const token = response.token;
            const date = new Date();
            date.setDate(date.getDate() + 30);
            setCookie("token", token, {path: "/" , expires: date});
            alert("Success");
            navigate("/home");

        } else {
            alert(response?.err || response?.error || "Registration failed");
        }

    };

    return (
        <>
    <div className='w-full h-full flex flex-col  items-center'>
            <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
                 <Icon icon="logos:spotify" width="150" />
            </div>
        <div className='InputRegion w-1/3 py-10 flex items-center justify-center flex-col'>

            <div className='font-bold mb-4'>Sign up for free  to start listening.</div>
            <TextInput 
                label="Email address" 
                placeholder="Enter your Email address"
                className="my-6"
                value={email}
                setValue={setEmail}
            />
            <TextInput 
                label=" Confirm Email address" 
                placeholder="Enter your Email again"
                className="mb-6"
                value={confirmEmail}
                setValue={setConfirmEmail}
            />
            <TextInput 
                label="Username" 
                placeholder="Enter your Username"
                className="mb-6"
                
                value={userName}
                setValue={setUserName}
            />
            <PasswordInput
                label="Create Password"
                placeholder="Enter a strong Password here"
                value={password}
                setValue={setPassword}
            />
            <div className='w-full flex space-x-8'>
                <TextInput 
                label="First Name" 
                placeholder="Enter your First Name"
                className="my-6"
                value={firstName}
                setValue={setFirstName}
            />
            <TextInput 
                label="Last Name" 
                placeholder="Enter your Last Name"
                className="my-6"
                value={lastName}
                setValue={setLastName}
            />
            </div>
            <div className=' w-full flex items-center justify-center mt-6'>
            <button className='bg-green-400 font-semibold p-3 px-10 rounded-full '
                onClick={ (e) => {
                    e.preventDefault();
                    signUp();
                    }
                }
            >
                SIGN UP
            </button>
            </div>
            <div className='w-full border border-solid border-gray-300 mt-5' ></div>
            <div className='my-6 font-semibold text-lg'>
                Already have an account?
            </div>
            <Link to="/login" className='w-full'>
                <div className='border border-gray-500 text-gray-500 font-bold w-full rounded-full flex items-center justify-center py-4'>
                    LOG IN FOR SPOTIFY
                </div>
            </Link>
        </div>

    </div>
        </>
);

}; 

export default SignupComponent;
