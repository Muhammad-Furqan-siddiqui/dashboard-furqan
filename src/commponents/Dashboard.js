import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <div className="flex">
        <nav className="p-5 w-60 bg-gray-800 text-white min-h-screen">
          <h2 className="text-2xl font-bold mb-5">Dashboard</h2>
          <ul className="space-y-4">
            <li>
              <Link className="hover:text-gray-300" to="/posts">
                Posts
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-300" to="/comments">
                Comments
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-300" to="/albums">
                Albums
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-300" to="/photos">
                Photos
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-300" to="/todos">
                Todos
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-300" to="/users">
                Users
              </Link>
            </li>
          </ul>
        </nav>

        <div className="ml-5 p-5 w-full">
          <img className="h-screen"
            src="https://i0.wp.com/picjumbo.com/wp-content/uploads/autumn-background-with-space-for-text-and-leaves-around-free-image.jpeg?w=600&quality=80"
            alt="pic"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
