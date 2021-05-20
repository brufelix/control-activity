import React from 'react';
import { Layout, ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/pt_BR';
import 'moment/locale/pt-br';

import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import CountProvider from "./hooks/count";
import SearchResultProvider from "./hooks/searchResult";
import SearchDescriptionProvider from "./hooks/searchDescription";
import './App.css';

function App() {

  const { Content } = Layout;

  return (
    <SearchDescriptionProvider>
      <SearchResultProvider>
        <CountProvider>
          <ConfigProvider locale={locale} >
            <Layout>
              <Header />
              <Content style={{ overflow: "auto" }} >
                <Home />
              </Content>
              <Footer />
            </Layout>
          </ConfigProvider>
        </CountProvider>
      </SearchResultProvider>
    </SearchDescriptionProvider>
  );
}

export default App;
