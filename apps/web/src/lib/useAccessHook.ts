"use client";
import { useSession } from "next-auth/react";


const useHasAccess = (permission: string) => {
  const {data : session} : any = useSession();
  const logged_in = session && session.user;

  if (!logged_in) {
    return false;
  }

  const havePermission = session.permissions.find((per : string) => per === permission);
  
  if(havePermission){
    return true; 
  }

  return false;
};

export default useHasAccess;