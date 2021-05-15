import React, { useState } from 'react';
import { Layout, Input, Badge, Row, ConfigProvider } from 'antd';
import { NotificationOutlined } from "@ant-design/icons";
import locale from 'antd/lib/locale/pt_BR';
import 'moment/locale/pt-br';

import Home from "./pages/Home";
import './App.css';

function App() {

  const { Search } = Input;
  const { Header, Footer, Content } = Layout;
  const [count, setCount] = useState(0);

  return (
    <ConfigProvider locale={locale} >
      <Layout>
        <Header
          style={{
            background: "#00003a",
            borderTop: "4px solid #005194"
          }}
        >
          <Row
            justify="space-between"
            align="middle"
            style={{
              height: "100%",
            }}
          >
            <Search
              style={{ maxWidth: "300px", }}
            />
            <Row
              style={{ height: "100%", }}
              justify="center"
              align="middle"
            >
              <NotificationOutlined
                style={{
                  color: "white",
                  fontSize: "16px",
                  marginRight: "10px",
                }}
              />
              <Badge
                count={count}
              />
            </Row>
          </Row>
        </Header>
        <Content
          style={{ overflow: "auto" }}
        >
          <Home 
            setCount={(number: number) => setCount(number)}
          />
        </Content>
        <Footer>
          Footer
      </Footer>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
