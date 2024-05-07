import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart } from '../redux/user/userSlice';
import { signInSuccess } from '../redux/user/userSlice';
import { signInFailure } from '../redux/user/userSlice';

export default function Signin(){
    const [formData, setFormData] = useState({});
    //error handling
    const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setFormData({
                ...formData,
                [e.target.id]: e.target.value,
        });
    }
    console.log(formData);
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            dispatch(signInStart);
            const res = await fetch('/api/auth/signin', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if(data.success === false){
                dispatch(signInFailure(data.message));
                return;
            }
            dispatch(signInSuccess(data));
            navigate('/home')
        } catch(error) {
            dispatch(signInFailure(error.message));
        }
        console.log(data);
    };

    return(<div className='p-3 max-w-lg mx-auto'>
        <h1 className='test-3xl text-center font-semibold my-7'>SignIn</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input 
                type='text' 
                placeholder='example@email.com' 
                className='border p-3 rounded-lg' 
                id='email' 
                onChange={handleChange}
            />
            <input 
                type='text' 
                placeholder='Password' 
                className='border p-3 rounded-lg' 
                id='password' 
                onChange={handleChange}
            />
            <button 
                disabled={loading} 
                className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
            >
                {loading ? 'Loading...':'SignIn'}
            </button>
        </form>
        <div className='flex gap-2 mt-5'>
            <p>Dont have an account?</p>
            <Link to={"/sign-up"}>
                <span className='text-blue-700'>Sign Up</span>
            </Link>
        </div>
    </div>)
}