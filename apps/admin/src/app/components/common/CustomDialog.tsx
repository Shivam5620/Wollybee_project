import { ReactNode } from "react";
import { Dialog, DialogContent } from "../../../../components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

interface ICustomDialogProps{
    open : boolean;
    Component : ReactNode;
    className?: string;
}

function CustomDialog({open, Component, className = ''} : ICustomDialogProps){
    return (
    <>
    <Dialog open={open}>
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <DialogContent className={className}>
          {Component}
        </DialogContent>
    </Dialog>
    </>
)}

export default CustomDialog;