import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/authUtils';

const havePermission = async (requiredPermission: string) => {
  const session = await getServerSession(authOptions);
  const loggedIn = session && session.user;

  if (!session) return false;

  const isAllowed = session.permissions.find(
    (per: string) => per === requiredPermission,
  );
  if (loggedIn && isAllowed === requiredPermission) {
    return true;
  }

  return false;
};

export default havePermission;
