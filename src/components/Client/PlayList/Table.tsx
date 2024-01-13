import * as React from 'react'
import {ArrowUpDown, MoreHorizontal} from 'lucide-react'
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

import {Button} from '@/components/ui/button'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table'

import {IMusic} from '@/types/music'
import {useAppDispatch, useAppSelector} from '@/app/hook'
import {currentSong} from '@/features/musicSlice'
import {errorValue} from '@/utils/constant'
import {useToast} from '@/components/ui/use-toast'
import {formatTime} from '@/hooks/functions'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {delFromPlaylist} from '@/features/playlistSlice'

interface IData {
    id: string
    index: number
    song: IMusic
}

type Props = {
    data: IData[]
}

const columns: ColumnDef<IData>[] = [
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
                    <TableBody className={``}>
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

type PAction = {
    music: IData
}

export const Actions = ({music}: PAction) => {
    const dispatch = useAppDispatch()

    const handleDelete = () => {
        dispatch(delFromPlaylist(music.id))
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
                <DropdownMenuItem onClick={handleDelete}>Xóa khỏi danh sách</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
