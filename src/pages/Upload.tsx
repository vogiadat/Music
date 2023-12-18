import {useAppSelector} from '@/app/hook'
import {endPoint} from '@/utils/constant'
import {Loader2, UploadIcon} from 'lucide-react'
import {Link} from 'react-router-dom'
import {Input} from '@/components/ui/input'
import {useEffect, useState} from 'react'
import {IDataUpload, IMusic} from '@/types/music'
import {createMusic, getMyMusic, upload} from '@/services/music.service'
import ListMusic from '@/components/Layout/ListMusic'
import {Button} from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import {Label} from '@/components/ui/label'
import {Textarea} from '@/components/ui/textarea'
import {Switch} from '@/components/ui/switch'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {useToast} from '@/components/ui/use-toast'

const Upload = () => {
    const {toast} = useToast()
    const {user} = useAppSelector((state) => state.auth)
    const [isLoading, setIsLoading] = useState(false)
    const [file, setFile] = useState<File>()
    const [img, setImg] = useState<File>()
    const [data, setData] = useState<IDataUpload>({
        name: '',
        src: '',
        image: '',
        desc: '',
        isPremium: false,
    })
    const [listSong, setListSong] = useState<IMusic[]>([])

    useEffect(() => {
        getMyMusic().then((res) => {
            setListSong(res.element)
        })
    }, [])

    const handleUpload = async () => {
        setIsLoading(true)
        let src = data.src,
            image = data.image
        if (!src) src = await upload(file)
        if (!image) image = await upload(img)
        const uploadData = {...data, src, image}
        return await createMusic(uploadData).then(() => {
            setIsLoading(false)
            toast({
                variant: 'success',
                title: 'Success',
                description: `Upload success`,
            })
        })
    }

    return (
        <>
            {!user ?
                <div className={`w-full h-[850px] overflow-y-scroll flex justify-center items-center`}>
                    <div className='grid gap-3 text-center'>
                        <UploadIcon size={80} className='mx-auto' />
                        <b className='text-4xl font-bold'>Let’s upload your song</b>
                        <p className='text-xl'>Need to login to upload</p>
                        <Link
                            to={endPoint.music}
                            className='mx-auto text-center bg-secondary py-2 px-3 rounded-xl hover:opacity-80'
                        >
                            Listen music
                        </Link>
                    </div>
                </div>
            :   <div className='ml-6'>
                    <div className='flex justify-between'>
                        <b className='text-4xl font-extrabold'>Upload</b>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant='outline'>Upload</Button>
                            </DialogTrigger>
                            <DialogContent className='sm:max-w-[425px] bg-white text-background'>
                                <DialogHeader>
                                    <DialogTitle>Upload</DialogTitle>
                                    <DialogDescription>Upload your song</DialogDescription>
                                </DialogHeader>
                                <div className='grid w-full max-w-sm items-center gap-1.5'>
                                    <Label htmlFor='songName'>Name</Label>
                                    <Input
                                        id='songName'
                                        value={data.name}
                                        onChange={(e) => {
                                            setData({...data, name: e.target.value})
                                        }}
                                        className='bg-white text-background'
                                    />
                                </div>
                                <div className='grid w-full max-w-sm items-center gap-1.5'>
                                    <Tabs defaultValue='imgInput' className='w-full'>
                                        <Label htmlFor='img'>Image </Label>
                                        <TabsList>
                                            <TabsTrigger value='imgInput'>Link</TabsTrigger>
                                            <TabsTrigger value='imgFile'>File</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value='imgInput'>
                                            <Input
                                                id='img'
                                                value={data.image}
                                                onChange={(e) => {
                                                    setData({...data, image: e.target.value})
                                                }}
                                                className='bg-white text-background'
                                            />
                                        </TabsContent>
                                        <TabsContent value='imgFile'>
                                            <Input
                                                id='img'
                                                type='file'
                                                onChange={(e) => {
                                                    if (e.target.files?.length) setImg(e.target.files[0])
                                                }}
                                                className='bg-white text-background'
                                            />
                                        </TabsContent>
                                    </Tabs>
                                </div>

                                <div className='grid w-full max-w-sm items-center gap-1.5'>
                                    <Label htmlFor='songDesc'>Desc</Label>
                                    <Textarea
                                        id='songDesc'
                                        value={data.desc}
                                        onChange={(e) => {
                                            setData({...data, desc: e.target.value})
                                        }}
                                        className='bg-white text-background'
                                    />
                                </div>
                                <div className='flex justify-between w-full max-w-sm items-center gap-1.5'>
                                    <Label htmlFor=''>Premium</Label>
                                    <Switch onCheckedChange={(isPremium) => setData({...data, isPremium})} />
                                </div>
                                <div className='grid w-full max-w-sm items-center gap-1.5'>
                                    <Tabs defaultValue='songInput' className='w-full'>
                                        <Label htmlFor='songFile'>Song</Label>
                                        <TabsList>
                                            <TabsTrigger value='songInput'>Link</TabsTrigger>
                                            <TabsTrigger value='songFile'>File</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value='songInput'>
                                            <Input
                                                id='song'
                                                value={data.src}
                                                onChange={(e) => {
                                                    setData({...data, src: e.target.value})
                                                }}
                                                className='bg-white text-background'
                                            />
                                        </TabsContent>
                                        <TabsContent value='songFile'>
                                            <Input
                                                id='song'
                                                type='file'
                                                onChange={async (e) => {
                                                    if (e.target.files?.length) setFile(e.target.files[0])
                                                }}
                                                className='bg-white text-background'
                                            />
                                        </TabsContent>
                                    </Tabs>
                                </div>
                                <DialogFooter>
                                    {isLoading ?
                                        <Button disabled>
                                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                            Please wait
                                        </Button>
                                    :   <Button type='button' onClick={handleUpload}>
                                            Upload
                                        </Button>
                                    }
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className={`w-full h-[850px] overflow-y-scroll`}>
                        <ListMusic listSong={listSong} />
                    </div>
                </div>
            }
        </>
    )
}

export default Upload
