import React, { useEffect } from 'react';
import FriendsCard from '../../components/friendsComponents/FriendsCard';
import { useGetAllFriendsQuery } from '../../features/api/authApi';
import { useLocation } from 'react-router-dom';

const FriendPage = () => {
    const { data: getAllFriends, refetch } = useGetAllFriendsQuery();
    console.log(getAllFriends);
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
                <h3 className="font-gilroyBold text-xl text-black">All Friends</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-4 mt-3">
                    {getAllFriends?.friends?.map((friend) => (
                        <div key={friend?._id}>
                            <FriendsCard friend={friend} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Friend Requests Section */}
            <div className="mt-6">
                <h3 className="font-gilroyBold text-xl text-black">Friend Requests</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-4 mt-3">
                    {getAllFriends?.request?.map((friend) => (
                        <div key={friend?._id}>
                            <FriendsCard friend={friend} type="friendRequest" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Sent Requests Section */}
            <div className="mt-6">
                <h3 className="font-gilroyBold text-xl text-black">Sent Requests</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-4 mt-3">
                    {getAllFriends?.sentRequest?.map((friend) => (
                        <div key={friend?._id}>
                            <FriendsCard friend={friend} type="sentRequest" refetch={refetch}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FriendPage;
