import React from 'react';
import { Layout, Input, Badge, Row, ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/pt_BR';
import 'moment/locale/pt-br';

import Home from "./pages/Home";
import './App.css';

function App() {

  const { Search } = Input;
  const { Header, Footer, Content } = Layout;

  return (
    <ConfigProvider locale={locale} >
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
    </ConfigProvider>
  );
}

export default App;
