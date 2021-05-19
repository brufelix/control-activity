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
  const [currentResearch, setCurrentResearch] = useState("");

  return (
    <ConfigProvider
      locale={locale}
    >
      <Layout>
        <Header
          count={count}
          setResultSearch={(res: IGroup[]) => setResultSearch(res)}
          setCurrentResearch={(search) => setCurrentResearch(search)}
        />
        <Content
          style={{ overflow: "auto" }}
        >
          <Home
            setCount={(number: number) => setCount(number)}
            currentResearch={currentResearch}
            resultSearch={resultSearch}
            setResultSearch={(res) => setResultSearch(res)}
          />
        </Content>
        <Footer />
      </Layout>
    </ConfigProvider>
  );
}

export default App;
