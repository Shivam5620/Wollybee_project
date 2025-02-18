import LogoutButton from './LogoutButton';
import RefreshTokenErrorTracker from './RefreshTokenErrorTracker';
import SideBar from './SideBar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex w-full h-full">
      <RefreshTokenErrorTracker />
      <SideBar />
      <div className="w-full">
        <>
          <div className="fixed w-full z-10 p-4 shadow-md bg-primary-color gap-2 flex flex-col">
            <LogoutButton />
          </div>
          <div className="ml-56 mt-10 p-5">{children}</div>
        </>
      </div>
    </div>
  );
};

export default Layout;
