import React, { useState } from 'react';
import { Row, Col, Input, Popover, Badge } from "antd";
import { NotificationOutlined } from "@ant-design/icons";

import api from '../../service';
import { useSearchResult } from "../../hooks/searchResult";
import { useSearchDescription } from "../../hooks/searchDescription";
import { useCount } from "../../hooks/count";
import { IGroup } from "../../interfaces";

const SubHeader: React.FC = () => {

  const { count } = useCount();
  const [search, setSearch] = useState("");

  const { setResultSearch } = useSearchResult();
  const { setCurrentResearch } = useSearchDescription();

  const { Search } = Input;

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
    <Row
      justify="space-between"
      align="middle"
      style={{
        padding: "5px 42px 5px 48px",
        border: "solid 1px #DDD",
      }}
    >
      <Col
        span={6}
      >
        <Search
          style={{ maxWidth: "500px", }}
          value={search}
          placeholder="Pesquise por palavras chaves..."
          onChange={(e) => setSearch(e.target.value)}
          onSearch={(value) => handleSearch(value)}
        />
      </Col>
      <Col>
        <Popover
          trigger={["hover"]}
          content={content}
          placement="left"
        >
          <NotificationOutlined
            style={{
              color: "black",
              fontSize: "16px",
              marginRight: "10px",
            }}
          />
          <Badge
            count={count}
          />
        </Popover>
      </Col>
    </Row>
  );
}

export default SubHeader;
