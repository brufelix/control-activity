import React, { useState } from 'react';
import { Row, Col, Input, Popover, Badge } from "antd";
import { NotificationOutlined, PlusCircleOutlined, UsergroupAddOutlined } from "@ant-design/icons";

import SelectProject from '../SelectProject';
import ProjectNewModal from '../ProjectNewModal';
import { useSearchResult } from "../../hooks/searchResult";
import { useSearchDescription } from "../../hooks/searchDescription";
import { useCount } from "../../hooks/count";
import { IGroup } from "../../interfaces";
import api from '../../service';
import ModalUsers from '../ModalUsers';

const iconStyle = { color: "black", fontSize: "16px", marginRight: "10px", cursor: "pointer", };

const SubHeader: React.FC = () => {

  const { count } = useCount();
  const [search, setSearch] = useState("");
  const [visibleCreateProject, setVisibleCreateProject] = useState(false);
  const [visibleAddUsers, setVisibleAddUsers] = useState(false);

  const { setResultSearch } = useSearchResult();
  const { setCurrentResearch } = useSearchDescription();

  const { Search } = Input;

  const contentNotification = (
    <div>
      <p style={{ margin: 0 }} >Total de atividades atrasadas: {count}</p>
    </div>
  );

  const contentAddProject = (
    <div>
      <p style={{ margin: 0 }} >Criar novo projeto</p>
    </div>
  );

  const contentAddUser = (
    <div>
      <p style={{ margin: 0 }} >Adicionar usuários ao projeto</p>
    </div>
  );

  const handleSearch = (search: string) => {
    const projectId = localStorage.getItem("@selected_project");
    setCurrentResearch(search);

    try {
      api.post<IGroup[]>("/activity/search",
        { search, projectId })
        .then(res => setResultSearch(res.data));
    } catch (error) {
      throw error;
    };

  };

  return (
    <>
      <Row
        justify="space-between"
        align="middle"
        style={{
          padding: "10px 20px",
          border: "solid 1px #DDD",
        }}
      >
        <Col
          span={5}
        >
          <Search
            style={{ maxWidth: "500px", }}
            value={search}
            placeholder="Pesquise por palavras chaves..."
            onChange={(e) => setSearch(e.target.value)}
            onSearch={(value) => handleSearch(value)}
          />
        </Col>
        <Col span={5} >
          <SelectProject />
        </Col>
        <Col
          span={5}
        >
          <Row
            justify="space-around"
            align="middle"
          >
            <Popover
              trigger={["hover"]}
              content={contentAddUser}
              placement="rightBottom"
            >
              <UsergroupAddOutlined onClick={() => setVisibleAddUsers(true)} style={iconStyle} />
            </Popover>
            <Popover
              trigger={["hover"]}
              content={contentAddProject}
              placement="bottom"
            >
              <PlusCircleOutlined onClick={() => setVisibleCreateProject(true)} style={iconStyle} />
            </Popover>
            <Popover
              trigger={["hover"]}
              content={contentNotification}
              placement="left"
            >
              <NotificationOutlined
                style={iconStyle}
              />
              <Badge
                count={count}
                style={{ cursor: "pointer" }}
              />
            </Popover>
          </Row>
        </Col>
      </Row>
      <ProjectNewModal
        visible={visibleCreateProject}
        setVisible={(boolean: boolean) => setVisibleCreateProject(boolean)}
      />
      <ModalUsers
        visible={visibleAddUsers}
        setVisible={(boolean: boolean) => setVisibleAddUsers(boolean)}
      />
    </>
  );
}

export default SubHeader;
