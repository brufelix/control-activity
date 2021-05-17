import React, { useState } from 'react';
import { Layout, ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/pt_BR';
import 'moment/locale/pt-br';

import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import './App.css';

function App() {

  const { Content } = Layout;
  const [count, setCount] = useState(0);

  return (
    <ConfigProvider
      locale={locale}
    >
      <Layout>
        <Header
          count={count}
        />
        <Content
          style={{ overflow: "auto" }}
        >
          <Home
            setCount={(number: number) => setCount(number)}
          />
        </Content>
        <Footer />
      </Layout>
    </ConfigProvider>
  );
}

export default App;
