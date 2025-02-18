import { ReactNode } from 'react';
import { Dialog, DialogContent } from '../../../ui/components/ui/dialog';
import { ClassNameValue } from 'tailwind-merge';

interface ICustomDialogProps {
  open: boolean;
  Component: ReactNode;
  className?: string;
}

function CustomDialog({ open, Component, className = '' }: ICustomDialogProps) {
  return (
    <>
      <Dialog open={open}>
        <DialogContent className={`${className} no-scrollbar`}>
          {Component}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CustomDialog;
