import React, { useEffect, useState, useRef } from 'react';
import { Modal, Button, Row, Tag, Input, notification } from "antd";

import api from '../../service';
import { IModalCreateProject } from '../../interfaces';
import { PlusOutlined } from '@ant-design/icons';

const openNotification = () => {
  notification.warning({
    message: `Error em adicionar usuário`,
    description: `Certifique-se de ter inserido o username corretamente.`,
    placement: "topRight",
    duration: 5.0,
  });
};

const ModalUsers: React.FC<IModalCreateProject> = (props) => {

  const { visible, setVisible } = props;

  const inputEl = useRef(null);

  const [users, setUsers] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const title = (<h3 style={{ color: "gray", margin: 0 }} >Usuários que estão nesse projeto</h3>);

  const footerButton = [
    <Button key={2} type="primary" onClick={() => setVisible(false)} >
      Fechar
    </Button>,
  ];

  const exist = (username: string, usernames: any[]) => {
    let exist = false;

    usernames.forEach(item => {
      if (item.username === username) {
        exist = true;
      }
    })

    return exist;
  }

  const fetchData = () => {
    const projectId = localStorage.getItem("@selected_project");

    api.post("/project/list_user", { projectId })
      .then(({ data }) => {
        const usernames: any = [];

        data && data.forEach && data.forEach((username: { _id: string, username: string }) => {
          if (!exist(username.username, usernames)) {
            usernames.push(username);
          }
        });

        setUsers(usernames);
      });
  }

  const handleInputConfirm = () => {
    const projectId = localStorage.getItem("@selected_project");
    api.post("/project/add_user", { username: inputValue, projectId })
      .then(({ data }) => {
        if (data.code === 501 || data.message === "error_add_user")
          openNotification()
      })
      .then(() => fetchData())
      .then(() => setInputVisible(false))
      .then(() => setInputValue(""))
  };

  const showInput = () => {
    setInputVisible(true);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Modal visible={visible} title={title} onCancel={() => setVisible(false)} footer={footerButton} centered >
        <Row style={{ width: "100%", padding: "20px 0 0 0" }} >
          {
            users && users.map && users.map((item, index) =>
              <Tag
                key={index}
                style={{ margin: 5 }}
                color="blue"
                closable={true}
                onClose={(e) => { e.preventDefault(); console.log("Remove") }}
              >
                {item.username}
              </Tag>
            )
          }
        </Row>
        <Row
          style={{ marginTop: "15px", }}
        >
          {inputVisible && (
            <Input
              ref={inputEl}
              type="text"
              size="small"
              style={{ width: 78 }}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onPressEnter={handleInputConfirm}
            />
          )}
          {!inputVisible && (
            <Tag onClick={showInput} color="default">
              <PlusOutlined /> Novo Usuário
            </Tag>
          )}
        </Row>
      </Modal>
    </>
  );
}

export default ModalUsers;