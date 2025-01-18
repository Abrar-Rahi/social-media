import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SearchIcon } from '../../../svg/SearchIcon'
import { useAddSearchHistoryMutation, useGetSearchHistoryQuery, useRemoveSearchHistoryMutation, useSearchQueryMutation } from '../../../features/api/authApi'
import { Link } from 'react-router-dom'
import avatarImage from "../../../assets/defaultImage/avatar.png"
import { BackIcon } from '../../../svg/BackIcon'
import RightArrow from '../../../svg/RightArrow'
import { Cross } from '../../../svg/Cross'
import { debounce } from 'lodash'

const SearchBox = () => {
    let [iconView, setIconView] = useState(true)
    let [searchTerm, setSearchTerm] = useState("")
    let [searchResult, setSearchResult] = useState([])
    let [searchQuery] = useSearchQueryMutation()
    let [addSearchHistory] = useAddSearchHistoryMutation()
    let [removeSearchHistory] = useRemoveSearchHistoryMutation()
    const { data: getSearchHistory = [], refetch } = useGetSearchHistoryQuery( undefined,
        {
          refetchOnMountOrArgChange: true,
        })
    let inputBox = useRef(null)

    useEffect(() => {
        inputBox.current.focus()
    }, [])



    const handleSearch = async () => {
        if (searchTerm === "") {
            setSearchTerm("");
        } else {
            const response = await searchQuery(searchTerm).unwrap();
            setSearchResult(response);
        }
    };

   

    const handleSearchHistory = async (searchUser) => {
         await addSearchHistory({ searchUser }).unwrap();
         refetch()
    };

    const debounceRemoveSearch = useCallback(
        debounce(
          async (searchUser) => {
            try {
              const res = await removeSearchHistory({ searchUser }).unwrap();
      
              if (res.message === "ok") {
                refetch();
              } else {
                console.log("unexpected error");
              }
            } catch (error) {
              console.log("failed to remove");
            }
          },
          300
        ),
        [removeSearchHistory, refetch]
      );

    const handleRemoveSearchHistory =  (searchUser) => {
        debounceRemoveSearch(searchUser)
    };

    return (
        <div className='max-h-[70vh] min-h-[400px] box-border bg-white  w-auto shadow-xl rounded-sm px-3 pb-3 overflow-y-auto '>
            <div className='w-full sticky left-0 top-0 bg-white'>

                <div className='flex items-center gap-1  border border-secondary_color  py-2 px-4 rounded-full cursor-pointer '>
                    {iconView &&
                        <div onClick={() => inputBox.current.focus()} className='text-secondary_color cursor-pointer '> <SearchIcon /> </div>
                    }
                    <div>
                        <input
                            ref={inputBox}
                            type="text"
                            placeholder='Search'
                            className='focus:outline-none font-gilroyNormal'
                            onFocus={() => setIconView(false)}
                            onBlur={() => setIconView(true)}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyUp={handleSearch}
                        />
                    </div>
                </div>
            </div>


            {!searchResult.length && (
                <p className="font-gilroyMedium text-sm text-black mt-3">
                    Recent Searches
                </p>
            )}

            <div className='mt-3 font-gilroyMedium text-sm text-black'>
                {getSearchHistory && !searchResult.length && getSearchHistory?.slice().sort((a,b)=>{
                    return new Date(b.createdAt) - new Date(a.createdAt)
                }).map((singleUser) => (
                    <div key={singleUser?.user?._id} className='flex items-center justify-between'>
                        <div  className='flex items-center gap-x-3 mb-3'>

                            <div className="w-10 h-10 overflow-hidden rounded-full">
                                <Link to={`/profile/${singleUser?.user?.userName}`}>
                                    <img
                                        src={singleUser?.user?.profilePicture || avatarImage}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                </Link>
                            </div>
                            <div>
                                <Link
                                    to={`/profile/${singleUser?.user?.userName}`}
                                    className="font-gilroyMedium text-base text-black"
                                >
                                    {singleUser?.user?.fName} {singleUser?.user?.lName}
                                </Link>
                            </div>
                        </div>
                        <div onClick={() => handleRemoveSearchHistory(singleUser?.user?._id)} className='flex items-center justify-center hover:bg-line_color rounded-full p-2 ease-linear duration-150 cursor-pointer'>
                            <Cross width={14} height={14}/>
                        </div>
                    </div>
                ))
                }
            </div>

            <div className='mt-3 font-gilroyMedium text-sm text-black'>
                {searchResult ? searchResult?.map((result) => (
                    <div key={result._id} className='flex items-center justify-between'>
                        <div onClick={() => handleSearchHistory(result._id)}  className="flex w-full items-center gap-x-3 mt-3">
                            <div className="w-10 h-10 overflow-hidden rounded-full">
                                <Link to={`/profile/${result?.userName}`}>
                                    <img
                                        src={result?.profilePicture || avatarImage}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                </Link>
                            </div>
                            <div>
                                <Link
                                    to={`/profile/${result?.userName}`}
                                    className="font-gilroyMedium text-base text-black"
                                >
                                    {result?.fName} {result?.lName}
                                </Link>
                            </div>
                        </div>
                        <div className='flex items-center justify-center hover:bg-line_color rounded-full p-2 ease-linear duration-150 cursor-pointer'>
                            <Link to={`/profile/${result?.userName}`}>
                                <RightArrow />
                            </Link>
                        </div>
                    </div>

                ))
                    :
                    "No Search available"
                }
            </div>



        </div>
    )
}

export default SearchBox