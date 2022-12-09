import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

export default function MyNavbar() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link
            to="/expenses"
            style={{ textDecoration: "none" }}
            className="mx-3 text-light h2"
          >
            Home
          </Link>
          <Nav className="dflex justify-content-end">
            <Link
              to="/stats/month"
              style={{ textDecoration: "none" }}
              className="mx-3 text-light h6"
            >
              Time Stats
            </Link>
            <Link
              to="/stats/categories"
              style={{ textDecoration: "none" }}
              className="mx-3 text-light h6"
            >
              Categories Stats
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
