import React from "react";
import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-dark">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <Link to="/">
            <li class="nav-item active">
              <a class="nav-link text-white" href="#">
                DASHBOARD <span class="sr-only">(current)</span>
              </a>
            </li>
          </Link>
          <Link to="/product">
            <li class="nav-item active">
              <a class="nav-link text-white" href="#">
                PRODUCT <span class="sr-only">(current)</span>
              </a>
            </li>
          </Link>
        </ul>
        <form class="form-inline my-2 my-lg-0 ml-auto">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}
