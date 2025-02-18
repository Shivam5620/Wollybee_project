'use client';

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './toast';
import { useToast } from './use-toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            className={`${props.variant == 'destructive' ? 'bg-tertiary-red' : 'bg-tertiary-green' } rounded-xl px-4 py-3 xs:w-full w-[87%] shadow-xl mx-auto outline-none border-none flex justify-center`}
            key={id}
            {...props}
          >
            <div className="grid gap-1 ">
              {title && (
                <ToastTitle className={`text-white text-xl font-heyComic tracking-wider`}>
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
