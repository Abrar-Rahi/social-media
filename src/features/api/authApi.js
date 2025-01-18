
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: (headers)=>{
      const user = JSON.parse(localStorage.getItem("user"))
      if(user && user.token){
        headers.set('Authorization', `Bearer ${user.token}`)
      }
       return headers
    }
  }),
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (body) => ({
        url: "/api/v1/auth",
        method: "POST",
        body
      }),
    }),
    loggedInUser: builder.mutation({
      query: (body) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body
      }),
    }),
    varifiedUser: builder.mutation({
      query: ({token}) => ({
        url: "/api/v1/auth/varification",
        method: "POST",
        body : {token},
        
      }),
    }),
    reVarification: builder.mutation({
      query: (token) => ({
        url: "/api/v1/auth/reVarification",
        method: "POST",
        
      }),
    }),
    matchUser: builder.mutation({
      query: (email) => ({
        url: "/api/v1/auth/resetPassword",
        method: "POST",
        body : {email}
      }),
    }),
    resetCode: builder.mutation({
      query: (email) => ({
        url: "/api/v1/auth/resetCode",
        method: "POST",
        body : {email}
      }),
    }),
    verifyResetCode: builder.mutation({
      query: ({email,resetCode}) => ({
        url: "/api/v1/auth/resetCodeVerify",
        method: "POST",
        body : {email,resetCode}
      }),
    }),
    changePassword: builder.mutation({
      query: ({email,password}) => ({
        url: "/api/v1/auth/changePassword",
        method: "POST",
        body : {email,password}
      }),
    }),
    createPost: builder.mutation({
      query: ({type,image,text,background,user}) => ({
        url: "/api/v1/post/createPost",
        method: "POST",
        body : {type,image,text,background,user},
        
      }),
      transformResponse : (response)=> ({
          status : "done",
          data : response
      })
    }),
    uploadImage: builder.mutation({
      query: ({formData}) => ({
        url: "/api/v1/upload/uploadImage",
        method: "POST",
        body : formData,
        
      }),
    }),
    
    getAllPost: builder.query({
      query: () => "/api/v1/post/allPostData"
    }),
    getUserProfile: builder.query({
      query: (user) => `/api/v1/auth/getUser/${user}`
    }),

    imageList: builder.mutation({
      query: ({path, sort, max}) => ({
        url: "/api/v1/upload/imageList",
        method: "POST",
        body : {path, sort, max},
        
      }),
    }),
    uploadProfilePicture: builder.mutation({
      query: ({url}) => ({
        url: "/api/v1/auth/updateProfilePicture",
        method: "PUT",
        body : {url}
      }),
      transformResponse : (response)=> ({
        status : "done",
        data : response
    })
    }),
    uploadCoverPicture: builder.mutation({
      query: ({url}) => ({
        url: "/api/v1/auth/updateCoverPicture",
        method: "PUT",
        body : {url}
      }),
      transformResponse : (response)=> ({
        status : "done",
        data : response
    })
    }),
    updateDetails: builder.mutation({
      query: ({userInformation}) => ({
        url: "/api/v1/auth/updateDetails",
        method: "PUT",
        body : {userInformation}
      })
    }),
    addFriends: builder.mutation({
      query: (id) => ({
        url: `/api/v1/auth/addFriends/${id}`,
        method: "PUT",
      })
    }),
    cancelFriendReq: builder.mutation({
      query: (id) => ({
        url: `/api/v1/auth/cancelFriendReq/${id}`,
        method: "PUT",
      })
    }),
    acceptFriendReq: builder.mutation({
      query: (id) => ({
        url: `/api/v1/auth/acceptFriendReq/${id}`,
        method: "PUT",
      })
    }),
    deleteFriendReq: builder.mutation({
      query: (id) => ({
        url: `/api/v1/auth/deleteFriendReq/${id}`,
        method: "PUT",
      })
    }),
    follow: builder.mutation({
      query: (id) => ({
        url: `/api/v1/auth/follow/${id}`,
        method: "PUT",
      })
    }),
    unFollow: builder.mutation({
      query: (id) => ({
        url: `/api/v1/auth/unFollow/${id}`,
        method: "PUT",
      })
    }),
    unFriend: builder.mutation({
      query: (id) => ({
        url: `/api/v1/auth/unFriend/${id}`,
        method: "PUT",
      })
    }),
    reactPost: builder.mutation({
      query: ({ postId, react }) => ({
        url: '/api/v1/react/reactPost',
        method: 'PUT',
        body: { postId, react }
      })
    }),
    getAllReacts: builder.query({
      query: ({postId}) => `/api/v1/react/getAllReacts/${postId}`
    }),
    createComment: builder.mutation({
      query: ({ comment, image, postId }) => ({
        url: '/api/v1/post/comment',
        method: 'PUT',
        body: { comment, image, postId }
      })
    }),
    savePosts: builder.mutation({
      query: ( postId ) => ({
        url: `/api/v1/post/savePost/${postId}`,
        method: 'PUT',
      })
    }),
    removePosts: builder.mutation({
      query: ( postId ) => ({
        url: `/api/v1/post/removePost/${postId}`,
        method: 'DELETE',
      })
    }),
    searchQuery: builder.mutation({
      query: (searchTerm) => ({
        url: `/api/v1/auth/search/${searchTerm}`,
        method: "POST",
      }),
    }),
    addSearchHistory: builder.mutation({
      query: ( {searchUser} ) => ({
        url: `/api/v1/auth/addSearchHistory`,
        method: 'PUT',
        body: { searchUser }
      })
    }),
    getSearchHistory: builder.query({
      query: () => "/api/v1/auth/getSearchHistory"
    }),
    removeSearchHistory: builder.mutation({
      query: ( {searchUser} ) => ({
        url: `/api/v1/auth/removeSearchHistory`,
        method: 'PUT',
        body: { searchUser }
      })
    }),
    getAllFriends: builder.query({
      query: () => "/api/v1/auth/getAllFriends"
    }),
  }),
})

export const { useAddUserMutation, useLoggedInUserMutation, useVarifiedUserMutation, useReVarificationMutation, useMatchUserMutation, useResetCodeMutation, useVerifyResetCodeMutation, useChangePasswordMutation, useCreatePostMutation, useUploadImageMutation, useGetAllPostQuery, useGetUserProfileQuery, useImageListMutation, useUploadProfilePictureMutation, useUploadCoverPictureMutation,useUpdateDetailsMutation, useAddFriendsMutation, useCancelFriendReqMutation, useAcceptFriendReqMutation, useDeleteFriendReqMutation, useFollowMutation, useUnFollowMutation, useUnFriendMutation, useReactPostMutation, useGetAllReactsQuery, useCreateCommentMutation, useSavePostsMutation, useRemovePostsMutation, useSearchQueryMutation, useAddSearchHistoryMutation, useGetSearchHistoryQuery, useRemoveSearchHistoryMutation, useGetAllFriendsQuery } = authApi