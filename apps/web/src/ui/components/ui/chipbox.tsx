'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cn } from '../../lib/utils';

interface ChipboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label: string;
}

const Chipbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  ChipboxProps
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-primary disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  >
    {props.label}
  </CheckboxPrimitive.Root>
));
Chipbox.displayName = CheckboxPrimitive.Root.displayName;

export { Chipbox };
