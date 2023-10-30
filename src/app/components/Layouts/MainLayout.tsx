import NavBar from 'app/components/Navbar';
import Sidebar from 'app/components/Sidebar';
import { useEffect } from 'react';

export default function MainLayout({ children }: { children: JSX.Element }) {
  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);
  return (
    <>
      <Sidebar />
      <NavBar />
      <div className="mt-[85px] w-[100vw] 2xl:w-[calc(100%-260px)] 2xl:ml-[260px] bg-[#f0f4f9] shrink-0">
        {children}
      </div>
    </>
  );
}
