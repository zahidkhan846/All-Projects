import React from "react";
import Layout from "../components/Layout";
import Contact from "../components/Contact";
import Seo from "../components/SEO";

export default function contact() {
  return (
    <Layout>
      <Seo title="Say Hi!" description="Contact Zahid" />
      <Contact />
    </Layout>
  );
}
