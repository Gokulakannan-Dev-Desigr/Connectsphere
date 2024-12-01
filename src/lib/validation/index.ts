import { z } from "zod"



export const SignupValidation = z.object({
    name: z.string().min(3, {message : 'Need to be atleast 3 chars'}),
    username: z.string().min(3, {message: 'Need to be atleast 3 chars'}).max(50, {message: 'max size is 50 chars'}),
    email: z.string().email(),
    password: z.string().min(8, {message: 'must contains atleast 8 chars'})
  })

  

  export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, {message: 'must contains atleast 8 chars'})
  })




  export const PostValidation = z.object({
    caption: z.string().max(500),
    file: z.custom<File[]>(),
    location: z.string().max(60),
    tags: z.string()
  })




