import Layout from "../components/Layout";
import NotificationProvider from "../store/NotificationContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <NotificationProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NotificationProvider>
  );
}

export default MyApp;
