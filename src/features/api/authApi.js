
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
      query: ({token,userToken}) => ({
        url: "/api/v1/auth/varification",
        method: "POST",
        body : {token},
        headers : {
          Authorization : `Bearer ${userToken}`
        }
      }),
    }),
    reVarification: builder.mutation({
      query: (token) => ({
        url: "/api/v1/auth/reVarification",
        method: "POST",
        headers : {
          Authorization : `Bearer ${token}`
        }
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
      query: ({type,image,text,background,user,token}) => ({
        url: "/api/v1/post/createPost",
        method: "POST",
        body : {type,image,text,background,user},
        headers : {
          Authorization : `Bearer ${token}`
        }
      }),
      transformResponse : (response)=> ({
          status : "done",
          data : response
      })
    }),
    uploadImage: builder.mutation({
      query: ({formData,path,token}) => ({
        url: "/api/v1/upload/uploadImage",
        method: "POST",
        body : formData,
        headers : {
          Authorization : `Bearer ${token}`
        }
      }),
    }),
    getAllPost: builder.query({
      query: () => "/api/v1/post/allPostData"
    }),
  }),
})

export const { useAddUserMutation, useLoggedInUserMutation, useVarifiedUserMutation, useReVarificationMutation, useMatchUserMutation, useResetCodeMutation, useVerifyResetCodeMutation, useChangePasswordMutation, useCreatePostMutation, useUploadImageMutation, useGetAllPostQuery } = authApi