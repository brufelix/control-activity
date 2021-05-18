import React, { useState } from 'react';
import { Layout, Input, Badge, Row } from 'antd';
import { NotificationOutlined } from "@ant-design/icons";

import { IActivity, IHeader, IResponseSearch } from "../../interfaces";
import api from '../../service';

const Header: React.FC<IHeader> = (props) => {

  const { count, setResultSearch } = props;
  const { Header } = Layout;
  const { Search } = Input;

  const [search, setSearch] = useState("");

  const handleSearch = (search: string) => {
    api.post<IResponseSearch[]>("/activity/search", {
      search
    }).then(res => {
      setResultSearch(res.data)
    }
    );
  };

  return (
    <Header
      style={{
        background: "#00003a",
        borderTop: "3px solid #005194"
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSearch={(value) => handleSearch(value)}
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
  );
}

export default Header;