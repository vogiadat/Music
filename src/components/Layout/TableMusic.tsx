import * as React from 'react'
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table'
import {ArrowUpDown, MoreHorizontal} from 'lucide-react'
import {IMusic} from '../../types/music'
import {formatName} from '@/hooks/functions'
import {errorValue} from '@/utils/constant'
import {useAppDispatch, useAppSelector} from '@/app/hook'
import {delFavor} from '@/features/favorSlice'
import {currentSong} from '@/features/musicSlice'

type Props = {
    data: Music[]
}
interface Music {
    index: number
    song: IMusic
}

export const columns: ColumnDef<Music>[] = [
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
                        <b className='text-lg font-semibold capitalize'>{music.name}</b>
                        <p className='opacity-70'>
                            {formatName(music.author?.firstName || '', music.author?.lastName || '')}
                        </p>
                    </div>
                </div>
            )
        },
    },
    {
        id: 'actions',
        header: () => <div className=''>#</div>,
        cell: ({row}) => {
            const songId = row.getValue('song')?.id
            const handleFavor = () => {}

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className='-mr-20 '>
                        <Button variant='ghost' className='h-8 w-8 p-0 border-none'>
                            <span className='sr-only'>Open menu</span>
                            <MoreHorizontal className='h-4 w-4 ' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuItem onClick={handleFavor}>Remove From Favorite</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

const TableMusic = ({data}: Props) => {
    // const {listFavor} = useAppSelector((state) => state.favor)
    const dispatch = useAppDispatch()
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

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

    return (
        <div className='w-full'>
            <div className='rounded-md'>
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
                    <TableBody>
                        {table.getRowModel().rows?.length ?
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                    className='hover:bg-secondary border-none'
                                    onClick={() => console.log(row.getValue('song'))}
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
