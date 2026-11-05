import { Outlet, NavLink } from "react-router";

function Layout() {
  return (
    <div className="p-4 text-center min-h-screen bg-slate-200">
      <h1 className="text-center text-4xl font-bold my-8">Vocab App</h1>

      <ul className="flex justify-around bg-slate-100 rounded-lg p-1 gap-1">
        <li className="flex-1">
          <NavLink
            to="/"
            className="py-2 block hover:bg-slate-700 hover:text-white rounded"
          >
            Look Up
          </NavLink>
        </li>
        <li className="flex-1">
          <NavLink
            to="/translator"
            className="py-2 block hover:bg-slate-700 hover:text-white rounded"
          >
            Translator
          </NavLink>
        </li>
        <li className="flex-1">
          <NavLink
            to="/bookmark"
            className="py-2 block hover:bg-slate-700 hover:text-white rounded"
          >
            Bookmark
          </NavLink>
        </li>
      </ul>

      <div className="my-8 mx-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
