import * as z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {Button} from '@/components/ui/button'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {Switch} from '@/components/ui/switch'
import {DialogContent} from '@/components/ui/dialog'
import {useToast} from '@/components/ui/use-toast'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {IUser} from '@/types/user'
import {Loader2} from 'lucide-react'
import {upload} from '@/services/upload.service'
import {updateProfile} from '@/services/user.service'
import {buyPremium} from '@/services/user.service'

const formSchema = z.object({
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    phone: z.string(),
    isPremium: z.boolean(),
    avatar: z.string(),
})

interface Props {
    user: IUser
}

const Profile = ({user}: Props) => {
    const {toast} = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            isPremium: user.isPremium,
            avatar: user.avatar,
        },
    })

    const handlePremium = async () => {
        const link = document.createElement('a')
        await buyPremium().then((res) => {
            // window.location.href = res.element
            link.href = res.element
            link.target = '_blank'
            document.body.appendChild(link)
            link.click()

            document.body.removeChild(link)
        })
    }
    const onSubmit = async () => {
        const res = await updateProfile(user.id, form.getValues())
        const msg = res?.error?.message

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
                description: `Update success`,
            })
        }
    }

    return (
        <>
            <DialogContent className='w-fit'>
                <div className='shadow bg-background text-white p-6 rounded-xl w-[450px] max-2xl:w-[350px]'>
                    <div className='font-bold text-3xl text-center uppercase'>Profile</div>
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-10'>
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
                                <div className='grid grid-cols-2 w-full max-w-sm items-center gap-1.5'>
                                    <FormField
                                        control={form.control}
                                        name='firstName'
                                        render={({field}) => (
                                            <FormItem className='h-20'>
                                                <FormLabel>First Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className='bg-white text-background'
                                                        placeholder='Enter first name...'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='lastName'
                                        render={({field}) => (
                                            <FormItem className='h-20'>
                                                <FormLabel>Last Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className='bg-white text-background'
                                                        placeholder='Enter last name...'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='grid grid-cols-2 w-full max-w-sm items-center gap-1.5'>
                                    <FormField
                                        control={form.control}
                                        name='phone'
                                        render={({field}) => (
                                            <FormItem className='h-20'>
                                                <FormLabel>Phone</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className='bg-white text-background'
                                                        placeholder='Enter phone number...'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='isPremium'
                                        render={({field}) => (
                                            <FormItem className='h-20 grid'>
                                                <FormLabel>Premium</FormLabel>

                                                <FormControl>
                                                    {field.value ?
                                                        <Switch
                                                            checked={field.value}
                                                            disabled
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    :   <Button
                                                            className='bg-secondary font-semibold text-white w-full uppercase rounded-3xl hover:bg-transparent outline  outline-1 outline-secondary hover:outline-secondary hover:text-secondary transition-colors duration-150 ease-in-out'
                                                            onClick={handlePremium}
                                                        >
                                                            Buy
                                                        </Button>
                                                    }
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name='avatar'
                                    render={({field}) => (
                                        <FormItem className='h-20'>
                                            <div className='grid w-full max-w-sm items-center gap-1.5'>
                                                <Tabs defaultValue='imgInput' className='w-full'>
                                                    <FormLabel htmlFor='img'>Image</FormLabel>
                                                    <TabsList className='ml-5 rounded-3xl'>
                                                        <TabsTrigger className='rounded-l-2xl' value='imgInput'>
                                                            Link
                                                        </TabsTrigger>
                                                        <TabsTrigger className='rounded-r-2xl' value='imgFile'>
                                                            {isLoading ?
                                                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                                            :   <span>File</span>}
                                                        </TabsTrigger>
                                                    </TabsList>
                                                    <TabsContent value='imgInput' className='col-span-3'>
                                                        <FormControl>
                                                            <Input
                                                                id='img'
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                                className='bg-white text-background'
                                                            />
                                                        </FormControl>
                                                    </TabsContent>
                                                    <TabsContent value='imgFile'>
                                                        <Input
                                                            id='img'
                                                            type='file'
                                                            onChange={async (e) => {
                                                                setIsLoading(true)
                                                                if (e.target.files?.length) {
                                                                    const res = await upload(e.target.files[0])
                                                                    field.onChange(res)
                                                                    return setIsLoading(false)
                                                                }
                                                            }}
                                                            className='bg-white text-background'
                                                        />
                                                    </TabsContent>
                                                </Tabs>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className='pt-6 flex justify-between'>
                                    <Button
                                        type='submit'
                                        className='bg-secondary font-semibold text-white w-full uppercase rounded-3xl hover:bg-transparent outline  outline-1 outline-secondary hover:outline-secondary hover:text-secondary transition-colors duration-150 ease-in-out'
                                    >
                                        Update
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </DialogContent>
        </>
    )
}

export default Profile
