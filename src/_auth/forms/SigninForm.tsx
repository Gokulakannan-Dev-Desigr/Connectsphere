import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"


import { Button } from '@/components/ui/button'
import { useForm } from "react-hook-form"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { SigninValidation } from "@/lib/validation"
import Loader from "@/components/shared/Loader"
import { Link, useNavigate } from "react-router-dom"

import { useToast } from "@/components/ui/use-toast"
import { useSignInAccount } from "@/lib/react-query/quriesAndMutation"
import { useUserContext } from "@/context/AuthContext"


const SigninForm = () => {

  const { toast } = useToast();
  const {checkAuthUser, isLoading: isUserLoading } = useUserContext()
  const navigate = useNavigate();


  const {mutateAsync: SignInAccount } = useSignInAccount();

  // 1 . Defining form 
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: '',
      password: ''
    },
  })
  

  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    // getting values from signup form after zod validation 


    const session = await SignInAccount({  
      email: values.email,
      password: values.password
    });

    console.log(session);
    
    // if fails to crate session 

    if(!session){
      return toast({
        title: 'Sign-in failed, try again'
      })
    }
    
    // now we have our session we need to store it in react context

    const isLoggedIn = await checkAuthUser();

    if(isLoggedIn){
      form.reset()

      navigate('/');
    }else{
      return toast({
        title:'Sign-up failed, Please try again.'
      })
    }
  }



  return (
    <Form {...form}>


      {/* adding logo */}
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/connect-logo.png" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12"> Log in to your Account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">Welcome back! Please enter your details </p>


        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">


        <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input placeholder="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />



          {/* sign-in button  */}
          <Button className="shad-button_primary" type="submit">
            {isUserLoading?(
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ): "Sign in" }
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Don't have an account?
            <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1">Sign up</Link>
          </p>

        </form>
      </div>

    </Form>)
}

export default SigninForm