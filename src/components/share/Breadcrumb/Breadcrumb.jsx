import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center space-x-2 breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/" className="text-gray-800 hover:underline">
            Home
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li
              className="flex items-center breadcrumb-item"
              key={name}
            >
              <span className="mr-2 text-gray-500">{">"}</span>
              {isLast ? (
                <span className="text-blue-500">{name}</span>
              ) : (
                <p className="text-gray-500">
                  {name}
                </p>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
