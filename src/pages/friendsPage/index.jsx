import React, { useEffect, useState } from 'react';
import FriendsCard from '../../components/friendsComponents/FriendsCard';
import { useGetAllFriendsQuery } from '../../features/api/authApi';
import { useLocation } from 'react-router-dom';

const FriendPage = () => {
    const { data: getAllFriends, refetch } = useGetAllFriendsQuery();
    const [count, setCount] = useState(4)

    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/friends") {
            refetch();
        }
    }, [location.pathname, refetch]);

    return (
        <div className="p-4">
            {/* All Friends Section */}
            <div>
                <div className='flex items-center justify-between'>
                    <h3 className="font-gilroyBold text-xl text-black">All Friends</h3>
                    {count < getAllFriends?.friends?.length &&
                    <button
                        onClick={() => setCount((prev) => prev + 4)}
                        className="bg-blue rounded-md text-white font-gilroyMedium text-base px-4 py-2 transition duration-300 ease-in-out transform hover:scale-95"
                    >
                        See More
                    </button>
                    }

                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-4 mt-3 text-black">
                    {getAllFriends?.friends?.slice(0, count).map((friend) => (
                        <div key={friend?._id}>
                            <FriendsCard friend={friend} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Friend Requests Section */}
            <div className="mt-6">
            <div className='flex items-center justify-between'>
                    <h3 className="font-gilroyBold text-xl text-black">Friend Requests</h3>
                    {count < getAllFriends?.request?.length &&
                    <button
                        onClick={() => setCount((prev) => prev + 4)}
                        className="bg-blue rounded-md text-white font-gilroyMedium text-base px-4 py-2 transition duration-300 ease-in-out transform hover:scale-95"
                    >
                        See More
                    </button>
                    }

                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-4 mt-3 text-black">
                    {getAllFriends?.request?.slice(0, count).map((friend) => (
                        <div key={friend?._id}>
                            <FriendsCard friend={friend} type="friendRequest" refetch={refetch} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Sent Requests Section */}
            <div className="mt-6">
            <div className='flex items-center justify-between'>
                    <h3 className="font-gilroyBold text-xl text-black">sent Requests</h3>
                    {count < getAllFriends?.sentRequest?.length &&
                    <button
                        onClick={() => setCount((prev) => prev + 4)}
                        className="bg-blue rounded-md text-white font-gilroyMedium text-base px-4 py-2 transition duration-300 ease-in-out transform hover:scale-95"
                    >
                        See More
                    </button>
                    }

                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-4 mt-3 text-black">
                    {getAllFriends?.sentRequest?.slice(0, count).map((friend) => (
                        <div key={friend?._id}>
                            <FriendsCard friend={friend} type="sentRequest" refetch={refetch} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FriendPage;
