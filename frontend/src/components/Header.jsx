import React, { useState } from "react";
import { useQuery } from "react-query";
import fetchUsername from "../services/fetchUsername";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigator = useNavigate();

  const { data, isLoading, isFetched, isError } = useQuery(
    ["username"],
    fetchUsername,
    {
      cacheTime: 1000 * 60 * 10,
      staleTime: 1000 * 60 * 10,
    }
  );
  const [search, setSearch] = useState("");

  function handleSearch(e) {
    e.preventDefault()
    if (search.trim() === "") return;
    navigator(`/search?q=${search}`);
  }

  if (isLoading) {
    return <div className="h-30 w-full skeleton"></div>;
  }
  if (isError) {
    return "";
  }

  return (
    <div className="navbar bg-base-100 shadow sticky top-0 z-50">
      <div className="flex-1 navbar-start">
        <Link to="/" className="btn btn-ghost text-xl">
          Coursify
        </Link>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/purchased">My Course</Link>
          </li>
        </ul>
      </div>

      <div className="flex-none gap-2 navbar-end">
        <Link to={"/admin"} className="btn btn-primary btn-sm btn-outline">
          🧑‍🏫 Admin
        </Link>
        <form onSubmit={(e) => handleSearch(e)} className="form-control">
          <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </form>
        {isLoading || (isError && <div className="h-10 w-10 skeleton"></div>)}
        {isFetched && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={`https://placehold.co/200x200?text=${data.data.username.charAt(
                    0
                  )}`}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>{data.data.username}</a>
              </li>

              <li className="flex md:hidden">
                <Link to="/">Home</Link>
              </li>

              <li className="flex md:hidden">
                <Link to="/purchased">My Course</Link>
              </li>

              <li
                onClick={() => {
                  localStorage.removeItem("token");
                  navigator("/");
                  location.reload();
                }}
              >
                <a className="text-red-500">Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
