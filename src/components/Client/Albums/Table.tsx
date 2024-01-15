import * as React from 'react'
import {ArrowUpDown, Loader2, MoreHorizontal} from 'lucide-react'
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table'

import {IMusic, Music} from '@/types/music'
import {useAppDispatch, useAppSelector} from '@/app/hook'
import {currentSong} from '@/features/musicSlice'
import {errorValue} from '@/utils/constant'
import {useToast} from '@/components/ui/use-toast'
import {formatName, formatTime} from '@/hooks/functions'

import {IAddPlaylist} from '@/types/playlist'
import {addToPlaylist} from '@/features/playlistSlice'
import {Button} from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
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
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {Badge} from '@/components/ui/badge'

type Props = {
    data: Music[]
}

const columns: ColumnDef<Music>[] = [
    {
        accessorKey: 'index',
        header: '',
        cell: ({row}) => <div className=''>{row.getValue('index')}</div>,
    },
    {
        accessorKey: 'song',
        header: ({column}) => {
            return (
                <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Music
                    <ArrowUpDown size={20} className='ml-5' />
                </Button>
            )
        },
        cell: ({row}) => {
            const music: IMusic = row.getValue('song')

            return (
                <div className='flex items-center gap-4 max-h-24 h-24'>
                    <div className=''>
                        <img
                            src={music.image}
                            alt={music.name}
                            className='w-24 h-24 rounded-xl object-cover'
                            onError={({currentTarget}) => {
                                currentTarget.onerror = null // prevents looping
                                currentTarget.src = errorValue.image
                            }}
                        />
                    </div>
                    <div className='self-start'>
                        <b className='text-xl font-semibold capitalize'>{music.name}</b>
                        {/* <p className='opacity-70'>{formatName(music.author?.firstName, music.author?.lastName)}</p> */}
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: 'time',
        header: () => <div className='text-sm'>Time</div>,
        cell: ({row}) => {
            const music: IMusic = row.getValue('song')

            return <b className='text-xl font-medium capitalize'>{formatTime(music.duration)}</b>
        },
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({row}) => {
            const music = row.original

            return <Actions music={music} />
        },
    },
]

const TableMusic = ({data}: Props) => {
    const dispatch = useAppDispatch()
    const {toast} = useToast()
    const {user} = useAppSelector((state) => state.auth)
    const {music} = useAppSelector((state) => state.music)
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [listSong, setListSong] = React.useState<IMusic[]>([])

    React.useEffect(() => {
        setListSong(data.map((value) => value.song))
    }, [data])

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    const handleCurrentSong = (song: IMusic) => {
        if (!user && song.isPremium)
            return toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Need login to listen this music',
            })
        if (!user?.isPremium && song.isPremium)
            return toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Need buy premium to listen this music',
            })
        dispatch(currentSong({song, listSong}))
    }

    return (
        <div className='w-full'>
            <div className={`${music && 'max-2xl:mb-72 mb-32'} rounded-md`}>
                <Table className=''>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className='text-white text-xl opacity-80'>
                                            {header.isPlaceholder ? null : (
                                                flexRender(header.column.columnDef.header, header.getContext())
                                            )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className=''>
                        {table.getRowModel().rows?.length ?
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                    className='hover:bg-secondary border-none'
                                    onClick={() => handleCurrentSong(row.getValue('song'))}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        :   <TableRow>
                                <TableCell colSpan={columns.length} className='h-24 text-center'>
                                    No results.
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default TableMusic

type PActions = {
    music: Music
}

export const Actions = ({music}: PActions) => {
    const dispatch = useAppDispatch()
    const {song} = music
    const {toast} = useToast()
    const {myList} = useAppSelector((state) => state.playlist)
    const [data, setData] = React.useState<IAddPlaylist>({mediaId: '', playListId: ''})
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const handleAddPlaylist = async () => {
        setIsLoading(true)
        try {
            await dispatch(addToPlaylist(data))
            setIsLoading(false)
            toast({
                variant: 'success',
                title: 'Success',
                description: `Add song to playlist success`,
            })
        } catch (error) {
            setIsLoading(false)
            toast({
                variant: 'destructive',
                title: 'Error',
                description: `Can't add to playlist`,
            })
        }
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='h-8 w-8 p-0'>
                    <span className='sr-only'>Open menu</span>
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                variant='default'
                                className='w-full bg-white text-background hover:bg-secondary hover:text-white'
                                onClick={() => setData({...data, mediaId: song.id})}
                            >
                                Thêm vào danh sách
                            </Button>
                        </DialogTrigger>
                        <DialogContent className='sm:max-w-[425px] bg-white text-background'>
                            <DialogHeader>
                                <DialogTitle>Danh Sách</DialogTitle>
                                <DialogDescription>Thêm vào sách bài hát theo sở thích của chính bạn</DialogDescription>
                            </DialogHeader>
                            <div className='grid w-full max-w-sm items-center gap-2'>
                                <Label htmlFor='name'>Tên Danh Sách</Label>
                                <Select onValueChange={(playListId) => setData({...data, playListId})}>
                                    <SelectTrigger className='w-full bg-white'>
                                        <SelectValue placeholder='Chọn danh sách phát' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Danh Sách</SelectLabel>
                                            {myList.map((item) => {
                                                return (
                                                    <SelectItem key={item.id} value={item.id}>
                                                        {item.name}
                                                    </SelectItem>
                                                )
                                            })}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <DialogFooter>
                                {isLoading ?
                                    <Button disabled>
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                        Please wait
                                    </Button>
                                :   <Button type='button' onClick={handleAddPlaylist}>
                                        Tạo
                                    </Button>
                                }
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                variant='default'
                                className='w-full bg-white text-background hover:bg-secondary hover:text-white'
                            >
                                Chi tiết bài hát
                            </Button>
                        </DialogTrigger>
                        <DialogContent className='sm:max-w-[425px] bg-white text-background'>
                            <DialogHeader>
                                <DialogTitle>Bài Hát</DialogTitle>
                                <DialogDescription>Thông tin bài hát</DialogDescription>
                            </DialogHeader>
                            <div className='grid w-full max-w-sm items-center gap-2'>
                                <Label htmlFor='name'>
                                    Bài Hát
                                    {song.isPremium && <Badge className='ml-2 bg-secondary'>Premium</Badge>}
                                </Label>
                                <Input
                                    id='name'
                                    className='bg-white text-background'
                                    defaultValue={song.name}
                                    disabled
                                />
                            </div>
                            <div className='grid w-full max-w-sm items-center gap-2'>
                                <Label htmlFor='artist'>Ca Sĩ</Label>
                                <Input
                                    id='artist'
                                    className='bg-white text-background'
                                    defaultValue={formatName(song.author?.firstName || '', song.author?.lastName || '')}
                                    disabled
                                />
                            </div>
                            <div className='grid w-full max-w-sm items-center gap-2'>
                                <Label htmlFor='album'>Album</Label>
                                <Input
                                    id='desc'
                                    className='bg-white text-background'
                                    defaultValue={song.album?.name}
                                    disabled
                                />
                            </div>
                            <div className='grid w-full max-w-sm items-center gap-2'>
                                <Label htmlFor='desc'>Nội Dung</Label>
                                <Textarea
                                    id='desc'
                                    className='bg-white text-background'
                                    defaultValue={song.desc}
                                    disabled
                                />
                            </div>
                        </DialogContent>
                    </Dialog>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
