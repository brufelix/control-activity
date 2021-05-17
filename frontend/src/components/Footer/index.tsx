import React from 'react';
import { Layout, Row, Col, Typography, Tag } from 'antd';
import { GithubOutlined, LinkedinOutlined, UserOutlined } from "@ant-design/icons";

const Footer: React.FC = () => {

  const { Footer } = Layout;
  const { Link } = Typography;

  return (
    <Footer
      style={{
        background: "#00003a",
        borderBottom: "3px solid #005194",
        borderTop: "2px solid #005194",
        height: "50px",
        padding: 0,
      }}
    >
      <Row
        justify="space-around"
        align="middle"
        gutter={[0, 8]}
        style={{
          height: "100%",
        }}
      >
        <Col>
          <Row
            justify="space-between"
            align="middle"
            gutter={[8, 0]}
          >
            <Col>
              <Link
                href="https://github.com/brufelix"
                target="_blank"
              >
                <Tag
                  icon={
                    <GithubOutlined
                      style={{ fontSize: "16px", marginTop: "3px" }}
                    />
                  }
                  color="#55acee"
                >
                  GitHub
                </Tag>
              </Link>
            </Col>
            <Col>
              <Link
                href="https://www.linkedin.com/in/brunofelixdias/"
                target="_blank"
              >
                <Tag
                  icon={
                    <LinkedinOutlined
                      style={{ fontSize: "16px", marginTop: "3px" }}
                    />
                  }
                  color="#55acee"
                >
                  LinkedIn
                </Tag>
              </Link>
            </Col>
          </Row>
        </Col>
        <Col>
          <Tag
            icon={
              <UserOutlined
                style={{ fontSize: "16px", }}
              />
            }
            color="#55acee"
          >
            Created by Bruno Felix
          </Tag>
        </Col>
      </Row>
    </Footer>
  );
}

export default Footer;