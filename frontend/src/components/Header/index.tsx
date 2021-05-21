import React, { useState } from 'react';
import { Layout, Input, Badge, Row, Popover, } from 'antd';
import { NotificationOutlined } from "@ant-design/icons";

import { useCount } from "../../hooks/count";
import { useSearchResult } from "../../hooks/searchResult";
import { useSearchDescription } from "../../hooks/searchDescription";
import { IGroup } from "../../interfaces";
import api from '../../service';

const Header: React.FC = () => {

  const { count } = useCount();
  const { setResultSearch } = useSearchResult();
  const { setCurrentResearch } = useSearchDescription();
  const { Header } = Layout;
  const { Search } = Input;

  const [search, setSearch] = useState("");

  const content = (
    <div>
      <p>Total de atividades atrasadas: {count}</p>
    </div>
  );

  const handleSearch = (search: string) => {
    setCurrentResearch(search);
    try {
      api.post<IGroup[]>("/activity/search", {
        search
      }).then(res => setResultSearch(res.data));
    } catch (error) {
      throw error;
    };
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
          <Popover
            trigger={["hover"]}
            content={content}
            placement="left"
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
          </Popover>
        </Row>
      </Row>
    </Header>
  );
}

export default Header;