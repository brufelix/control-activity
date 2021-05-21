import React from 'react';
import { Row, Popover, Button, DatePicker } from "antd";

import api from "../../service";
import { IAddDeliveryDate } from "../../interfaces";

const AddDeliveryDate: React.FC<IAddDeliveryDate> = (props) => {

  const {
    groupId, inResearch, mainId, visible,
    fetchData, getSearchData, setVisible
  } = props;

  const addDeliveryData = (date: string) => {
    try {
      api.post(`/activity/delivery`, {
        mainId,
        _id: groupId,
        date,
      })
        .then(() => inResearch
          ? getSearchData && getSearchData()
          : fetchData && fetchData()
        );
    } catch (error) {
      throw error;
    };
  };

  return (
    <Row
      justify="start"
      align="middle"
    >
      <Popover
        content={
          <DatePicker
            format="DD/MM/YYYY"
            onSelect={(e) => {
              addDeliveryData(
                e.startOf('day')
                  .format("YYYY-MM-DDTHH:mm:ss-03:00")
              );
              setVisible(false);
            }
            }
          />
        }
        trigger="click"
        visible={visible}
      >
        <Button
          type="primary"
          onClick={() => setVisible(!visible)}
        >
          {
            visible
              ? "Fechar"
              : "Data de Entrega"
          }
        </Button>
      </Popover>
    </Row>
  );
}

export default AddDeliveryDate;
