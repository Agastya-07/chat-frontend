import React, { useEffect } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from '../redux/userSlice';
import { BASE_URL } from '../main';

const useGetOtherUsers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                // Get the token from localStorage (or sessionStorage, depending on where you stored it)
                const token = localStorage.getItem('token'); // Adjust if stored elsewhere
                
                if (!token) {
                    throw new Error('No token found');
                }

                // Set token in Authorization header
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,  // If you need cookies as well, keep this
                };

                const res = await axios.get(`${BASE_URL}/api/v1/user`, config);
                
                // Log the response to ensure you get the expected data
                console.log("other users -> ", res.data);

                // Dispatch action to Redux store with the data
                dispatch(setOtherUsers(res.data));
            } catch (error) {
                console.error('Error fetching other users: ', error);
            }
        };

        fetchOtherUsers();
    }, [dispatch]);  // Added dispatch as dependency to avoid warnings in React

}

export default useGetOtherUsers;
