import { Outlet } from 'react-router-dom';

import { Header, Sidebar } from '../components/sidebar';

export const PrimaryLayout = () => (
  <>
    <div className="w-full h-[100dvh] flex flex-col fixed inset-x-0">
      <Header />
      <div className="flex justify-between h-full">
        {/* sidebar */}
        <Sidebar />
        {/* content */}
        <main className="bg-neutral-200 dark:bg-neutral-900 w-full h-full min-w-[320px]">
          <Outlet />
        </main>
      </div>
    </div>
  </>
);
