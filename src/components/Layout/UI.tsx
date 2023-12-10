interface Props {
    children?: string
}

export const Separator = ({children}: Props) => (
    <div className='w-full grid grid-cols-12'>
        {children ?
            <>
                <div className='col-span-5 my-auto'>
                    <div className=' h-1 border border-white'></div>
                </div>
                <div className='col-span-2 font-bold uppercase text-center text-xl'>{children}</div>
                <div className='col-span-5 my-auto'>
                    <div className=' h-1 border border-white'></div>
                </div>
            </>
        :   <>
                <div className='col-span-full my-2'>
                    <div className=' h-1 border border-white'></div>
                </div>
            </>
        }
    </div>
)
