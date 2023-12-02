'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

import {cn} from '@/lib/utils'

const Slider = React.forwardRef<
    React.ElementRef<typeof SliderPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({className, ...props}, ref) => (
    <SliderPrimitive.Root
        ref={ref}
        className={cn('relative flex w-full touch-none select-none items-center', className)}
        {...props}
    >
        <SliderPrimitive.Track
            className={`relative ${
                className === 'volume' ? 'h-1' : 'h-2'
            } w-full grow overflow-hidden rounded-full bg-white bg-opacity-25`}
        >
            <SliderPrimitive.Range className='absolute h-full bg-white' />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
            className={`block ${
                className == 'volume' ? 'h-3 w-3' : 'w-4 h-4'
            } rounded-full border-1 border-white bg-white  ring-offset-white  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
        />
    </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export {Slider}
