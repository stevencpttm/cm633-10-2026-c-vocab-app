import { Outlet } from "react-router";

function Layout() {
  return (
    <div className="p-4 text-center min-h-screen bg-slate-200">
      <h1 className="text-center text-4xl font-bold my-8">Vocab App</h1>

      <ul className="flex justify-around bg-slate-100 rounded-lg p-1 gap-1">
        <li className="py-2 flex-1 bg-slate-700 text-white rounded">Look Up</li>
        <li className="py-2 flex-1 rounded">Translator</li>
        <li className="py-2 flex-1 rounded">Bookmark</li>
      </ul>

      <div className="my-8 mx-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
