'use client'
import CustomError from "../app/components/common/CustomError";
import useHasAccess from "./useAccessHook";

const PermissionCheck = ({
  permission,
  children,
}: {
  permission: string;
  children: React.ReactNode;
}) => {
  const hasAccess = useHasAccess(permission);

  if (!hasAccess) {
    return <></>;
  }

  return <>{children}</>;
};

export default PermissionCheck;