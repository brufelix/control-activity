import React from 'react';
import { Layout } from 'antd';

import Home from "./pages/Home";
import api from "./service";
import './App.css';

function App() {

  const { Header, Footer, Content } = Layout;

  return (
    <Layout>
      <Header>Header</Header>
      <Content>
        <Home />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;
