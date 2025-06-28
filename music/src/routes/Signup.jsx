import React from 'react';
// import Icon from '../components/Icon';
import {Icon} from "@iconify/react";
import TextInput from '../components/shared/TextInput';
import PasswordInput from '../components/shared/PasswordInput';
import {Link} from 'react-router-dom';


const SignupComponent = () => {
    return (
        <>
    <div className='w-full h-full flex flex-col  items-center'>
            <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
                 <Icon icon="logos:spotify" width="150" />
            </div>
        <div className='InputRegion w-1/3 py-10 flex items-center justify-center flex-col'>

            <div className='font-bold mb-4'>Sign up for free  to start listening.</div>
            <TextInput 
                label="Email address or username" 
                placeholder="Email address or username"
                className="my-2"
            />
            <PasswordInput
                label="Password"
                placeholder="password"
                className="my-2"
            />
            <div className=' w-full flex items-center justify-end mt-6'>
            <button className='bg-green-400 font-semibold p-3 px-10 rounded-full '>
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
