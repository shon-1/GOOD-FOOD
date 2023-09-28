import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import {Toaster} from "react-hot-toast";

const Layout = ({ children,title, description, keywords, author  }) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

            <Header />
            <main style={{ minHeight: "77vh" }}>{children}</main>
             <Toaster/>
            <Footer />
        </div>
    );
};
//default :

Layout.defaultProps = {
    title: "Good Food - Order now",
    description: "mern stack project",
    keywords: "mern,react,node,mongodb",
    author: "Shon G",
  };

export default Layout;
