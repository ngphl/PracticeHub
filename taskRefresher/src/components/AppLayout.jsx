import { NavLink, Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div>
      <nav
        style={{
          display: "flex",
          gap: 12,
          padding: 12,
          borderBottomg: "1px solid #ddd",
        }}
      >
        <NavLink to="/" end>
          Tasks
        </NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
