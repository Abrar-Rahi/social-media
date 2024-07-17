import * as Yup from "yup"

export const signUP = Yup.object({
    fName : Yup.string().min(3).max(15).required("Please Enter Your First Name"),
    lName : Yup.string().min(3).max(15).required("Please Enter Your Last Name"),
    email : Yup.string().email().required("Please Enter Your Valid Email"),
    password : Yup.string().min(8).required("Please Enter Your Password"),
    gender : Yup.string().required("Please Select Your Gender"),
})

export const signIN = Yup.object({
    email : Yup.string().email().required("Please Enter Your Valid Email"),
    password : Yup.string().min(8).required("Please Enter Your Password"),
})

export const findUser = Yup.object({
    email : Yup.string().email().required("Please Enter Your Valid Email"),
})

export const userCode = Yup.object({
    code : Yup.string().min("5", "Code must be 5 character").max("5", "Code must be 5 character").required("Please Enter The Code"),
})

export const newPassword = Yup.object({
    password : Yup.string().min(8).required("Please Enter Your New Password"),
})