import React from "react";
import Layout from "../components/Layout";
import { Link } from "gatsby";

export default function NotaPage() {
  return (
    <Layout>
      <main className="error-page">
        <div className="error-container">
          <h1>oops there is no such page</h1>
          <Link to="/" className="btn">
            Bact To Home
          </Link>
        </div>
      </main>
    </Layout>
  );
}
