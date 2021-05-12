import React from 'react';
import { Layout, Input, Badge, Row } from 'antd';

import Home from "./pages/Home";
import './App.css';

function App() {

  const { Search } = Input;
  const { Header, Footer, Content } = Layout;

  return (
    <Layout>
      <Header>
        <Row
          justify="space-between"
          align="middle"
        >
          <Search
            style={{
              maxWidth: "300px",
              marginTop: "20px",
            }}
          />
          <Badge
            count={12}
          />
        </Row>
      </Header>
      <Content
        style={{ overflow: "auto" }}
      >
        <Home />
      </Content>
      <Footer>
        Footer
      </Footer>
    </Layout>
  );
}

export default App;
