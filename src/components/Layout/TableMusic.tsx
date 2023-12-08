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

const data: Payment[] = [
    {
        index: 1,
        id: 'm5gr84i9',
        album: '123',
        music: {
            name: 'test',
            img: 'https://i.scdn.co/image/ab67616d0000b2738a063486be97d863207e1ca4',
            artist: 'teste1',
        },
    },
    {
        index: 2,
        id: '3u1reuv4',
        album: '',
        music: {
            name: 'value',
            img: 'https://i.scdn.co/image/ab67616d0000b2738a063486be97d863207e1ca4',
            artist: 'teste1',
        },
    },
]

export type TMusic = {
    name: string
    img: string
    artist: string
}

export type Payment = {
    index: number
    id: string
    album: string
    music: TMusic
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: 'index',
        header: '#',
        cell: ({row}) => <div className='capitalize'>{row.getValue('index')}</div>,
    },
    {
        accessorKey: 'music',
        header: ({column}) => {
            return (
                <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Music
                    <ArrowUpDown size={20} className='ml-5' />
                </Button>
            )
        },
        cell: ({row}) => {
            const music: TMusic = row.getValue('music')
            return (
                <div className='flex items-center gap-4 max-h-24 h-24'>
                    <div className=''>
                        <img src={music.img} alt={music.name} className='w-24 h-24 rounded-xl object-cover' />
                    </div>
                    <div className='self-start'>
                        <b className='text-lg font-semibold capitalize'>{music.name}</b>
                        <p className='opacity-70'>{music.artist}</p>
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: 'album',
        header: () => <div className='text-right'>Album</div>,
        cell: ({row}) => <div className='capitalize text-right font-medium'>{row.getValue('album')}</div>,
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({row}) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className='-mr-20 '>
                        <Button variant='ghost' className='h-8 w-8 p-0 border-none'>
                            <span className='sr-only'>Open menu</span>
                            <MoreHorizontal className='h-4 w-4 ' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

const TableMusic = () => {
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
