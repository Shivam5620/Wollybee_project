import { ReactNode } from "react";
import {Sheet,SheetContent} from "../../../ui/components/ui/sheet"
import { ClassNameValue } from "tailwind-merge";

interface ICustomDrawerProps{
    side : "right" | "left" | "top" | "bottom";
    open : boolean;
    className? : ClassNameValue;
    Component : ReactNode;
}

function CustomDrawer({side ="right", open, Component, className = ''} : ICustomDrawerProps){
    return (
    <>
    <Sheet open={open}>
        <SheetContent side={side} className={"p-0 w-screen sm:w-[540px] "+ className}>
            {Component}
        </SheetContent>
    </Sheet>
    </>
)
}

export default CustomDrawer