import React, { useState } from 'react';
import { Layout, ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/pt_BR';
import 'moment/locale/pt-br';

import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { IGroup } from "./interfaces";
import './App.css';

function App() {

  const { Content } = Layout;

  const [count, setCount] = useState(0);
  const [resultSearch, setResultSearch] = useState<IGroup[]>();

  return (
    <ConfigProvider
      locale={locale}
    >
      <Layout>
        <Header
          count={count}
          setResultSearch={
            (result: IGroup[]) => setResultSearch(result)
          }
        />
        <Content
          style={{ overflow: "auto" }}
        >
          <Home
            setCount={(number: number) => setCount(number)}
            resultSearch={resultSearch}
          />
        </Content>
        <Footer />
      </Layout>
    </ConfigProvider>
  );
}

export default App;
