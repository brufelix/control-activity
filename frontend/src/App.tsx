import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout, ConfigProvider } from "antd";
import locale from "antd/lib/locale/pt_BR";
import "moment/locale/pt-br";

import Header from "./components/Header";
import Route from "./routes";
import Footer from "./components/Footer";
import CountProvider from "./hooks/count";
import SearchResultProvider from "./hooks/searchResult";
import SearchDescriptionProvider from "./hooks/searchDescription";
import AuthProvider from "./hooks/auth";
import "./App.css";

function App() {

  const { Content } = Layout;

  return (
    <Router>
      <AuthProvider>
        <SearchDescriptionProvider>
          <SearchResultProvider>
            <CountProvider>
              <ConfigProvider locale={locale} >
                <Layout>
                  <Header />
                  <Content style={{ overflow: "auto" }} >
                    <Route />
                  </Content>
                  <Footer />
                </Layout>
              </ConfigProvider>
            </CountProvider>
          </SearchResultProvider>
        </SearchDescriptionProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
