import React, { useEffect, useState } from 'react';
import { useProgressiveImage } from '../hooks/useProgressiveImage';

export default function Users() {
    const [user, setUser] = useState(null);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setFetching(true); 
                const response = await fetch('https://randomuser.me/api/?page=2&results=1&seed=abc');
                const data = await response.json();
                setUser(data.results[0]);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setFetching(false); 
            }
        };

        fetchUser();
    }, []);

    const imageUrls = user?.picture || null;
    const imageSrc = useProgressiveImage(imageUrls);

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            {fetching ? (
                // Placeholder while fetching
                <div className="p-5 shadow-lg animate-pulse w-[35rem] h-[15rem] rounded">
                    <div className="flex gap-4">
                        <div className="h-52 w-52 bg-gray-300 shadow-sm rounded"></div>
                        <div className="flex flex-col gap-2">
                            <div className="h-10 w-56 bg-gray-300 rounded"></div>
                            <div className="h-10 w-32 bg-gray-300 rounded"></div>
                            <div className="h-10 w-60 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                </div>
            ) : user ? (
                <div className="p-5 shadow-lg w-[35rem] h-[15rem] rounded">
                    <div className="flex gap-4">
                        <div className="relative">
                            <img
                                src={imageSrc}
                                alt={`${user.name?.first} ${user.name?.last}`}
                                className="h-52 w-52 object-cover rounded"
                                loading="lazy"
                            />
                        </div>
                        <div className="text-4xl flex flex-col gap-2">
                            <p>{`${user.name?.first} ${user.name?.last}`}</p>
                            <p className="capitalize">{user.gender}</p>
                            <p>{user.phone}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="p-5 shadow-lg w-[35rem] h-[15rem] rounded flex items-center justify-center">
                    <p className="text-gray-500 text-lg">Failed to load user data</p>
                </div>
            )}
        </div>
    );
}
