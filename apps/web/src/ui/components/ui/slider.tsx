'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '../../lib/utils';
import Image from 'next/image';
import { ICONS } from '@repo/ui/lib';

interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  thumbIcon?: any;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, thumbIcon, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex w-full touch-none select-none items-center',
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-3 w-full grow overflow-hidden rounded-full bg-[#cccccc]">
      <SliderPrimitive.Range className="absolute h-full bg-primary-color rounded-r-lg" />
    </SliderPrimitive.Track>

    <SliderPrimitive.Thumb className="disabled:pointer-events-none disabled:opacity-50 flex items-center justify-center">
      <div className="flex items-center justify-center h-5 w-5">
        {thumbIcon && (
          <Image
            src={ICONS.progressBarIcon} // Replace with the actual path to your custom icon
            alt="Custom Thumb Icon"
            className=""
            width={23} // Adjust the size as needed
            height={23} // Adjust the size as needed
          />
        )}
      </div>
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
