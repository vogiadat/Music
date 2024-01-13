import * as z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {Button} from '@/components/ui/button'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {Checkbox} from '@/components/ui/checkbox'
import {Separator} from '@/components/Layout/UI'
import {DialogContent} from '@/components/ui/dialog'
import {useAppDispatch} from '@/app/hook'
import {useToast} from '@/components/ui/use-toast'
import {openLogin, register} from '@/features/authSlice'

const formSchema = z
    .object({
        email: z.string().min(1, {message: 'Email is required!!'}).email({message: 'Email/Password is invaild'}),
        password: z
            .string()
            .min(1, {message: 'Password is required!!'})
            .min(4, {message: 'Password must be at least 4 characters.'}),
        rePassword: z
            .string()
            .min(1, {message: 'Request Password is required!!'})
            .min(4, {message: 'Request Password must be at least 4 characters.'}),
    })
    .refine((data) => data.password === data.rePassword, {
        message: "Passwords don't match",
        path: ['rePassword'],
    })

const Register = () => {
    const {toast} = useToast()
    const dispatch = useAppDispatch()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            rePassword: '',
        },
    })

    const handleModal = () => {
        dispatch(openLogin())
    }

    const onSubmit = async () => {
        const {email, password} = form.getValues()
        const res = (await dispatch(register({email, password}))) as unknown
        const msg = (res as {error: {message: string}})?.error?.message
        if (msg) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: `${msg}`,
            })
        } else {
            toast({
                variant: 'success',
                title: 'Success',
                description: `Register success`,
            })
        }
    }

    return (
        <>
            <DialogContent className='w-fit'>
                <div className='shadow bg-background text-white p-6 rounded-xl w-[450px] max-2xl:w-[350px]'>
                    <div className='font-bold text-3xl text-center uppercase'>Register</div>
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                                <FormField
                                    control={form.control}
                                    name='email'
                                    render={({field}) => (
                                        <FormItem className='h-20'>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className='bg-white text-background'
                                                    placeholder='Enter your email...'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='password'
                                    render={({field}) => (
                                        <FormItem className='h-20'>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className='bg-white text-background'
                                                    type='password'
                                                    placeholder='Enter your password...'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='rePassword'
                                    render={({field}) => (
                                        <FormItem className='h-20'>
                                            <FormLabel>Request Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className='bg-white text-background'
                                                    type='password'
                                                    placeholder='Enter your password...'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className='pt-6 flex justify-between'>
                                    <div className='flex gap-2 items-center'>
                                        <Checkbox id='rememberMe' className='bg-white text-background' />
                                        <label
                                            htmlFor='rememberMe'
                                            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                    <Button
                                        type='submit'
                                        className='bg-secondary font-semibold text-white uppercase rounded-3xl hover:bg-transparent outline  outline-1 outline-secondary hover:outline-secondary hover:text-secondary transition-colors duration-150 ease-in-out'
                                    >
                                        Sign Up
                                    </Button>
                                </div>
                            </form>
                        </Form>
                        <div className='w-full grid gap-y-2'>
                            <Separator children={'or'} />
                            <div className='flex justify-center items-center gap-2'>
                                <button>
                                    <img src='/assets/imgs/google.png' className='w-10' alt='' />
                                </button>
                            </div>
                            <Separator />
                            <div className='text-center font-extrabold text-zinc-400'>Have an account?</div>
                            <button
                                className='w-full text-center border border-zinc-400 p-2 hover:cursor-pointer text-zinc-400 font-medium uppercase rounded-3xl flex items-center justify-center transition-colors duration-150 ease-linear'
                                onClick={handleModal}
                            >
                                Login for Life & music
                            </button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </>
    )
}

export default Register
