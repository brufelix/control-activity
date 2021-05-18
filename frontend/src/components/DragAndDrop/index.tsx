import React, { useState, useEffect } from "react";
import { Row, Col, notification } from "antd";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableStateSnapshot,
  DropResult,
  DraggableLocation
} from "react-beautiful-dnd";

import { compareDate } from "../../utils";
import { IActivity, IResponseGroup, IDrogAndDrop } from "../../interfaces";
import CreateGroup from "../CreateGroup";
import RegisterActivity from "../RegisterActivity";
import Card from "../Card";
import Title from "../Title";
import api from "../../service";

const DrogAndDrop: React.FC<IDrogAndDrop> = (props) => {

  const { resultSearch, setCount } = props;
  const [state, setState] = useState<IActivity[][]>();
  const grid = 8;

  const openNotification = (number: number) => {
    notification.warning({
      message: `Atividades atrasadas :(`,
      description: `Você possui ${number} atividades(s) atrasadas`,
      placement: "topLeft",
      duration: 4.5
    });
  };

  const moveActivity = (act: IActivity, targetGroup: string) => {
    api.post("/activity", {
      groupId: targetGroup,
      description: act.description,
      done: act.done,
      createAt: act.createAt,
      delivery: act.delivery,
      mainId: act.mainId,
    });

    api.post("/activity/delete", {
      mainId: act.mainId,
      groupId: act.groupId,
    });
  };

  const reorder = (list: any, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const move = (
    source: any,
    destination: any,
    droppableSource: DraggableLocation,
    droppableDestination: DraggableLocation
  ) => {
    const sourceClone = Array.from<IActivity>(source);
    const destClone = Array.from<IActivity>(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    const { groupId } = destClone[0];

    moveActivity(removed, groupId);

    removed["groupId"] = groupId;

    destClone.splice(droppableDestination.index, 0, removed);

    const result: any = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    background: isDragging ? "lightgreen" : "white",

    ...draggableStyle
  });
  const getListStyle = (isDraggingOver: DroppableStateSnapshot | Boolean) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250
  });

  function onDragEnd(result: DropResult) {
    const { source, destination } = result;

    if (!destination) {
      return;
    };
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items: any = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result: any = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter(group => group.length));
    }
  };

  const setNumberOverdueActivities = () => {
    let count = 0;

    state && state.forEach(group => {
      group.forEach(act => {
        if (act.delivery && compareDate(act.delivery.slice(0, 10))) {
          count++;
        }
      })
    });
    setCount(count);

    if (count)
      openNotification(count);
  };

  const fetchData = async () => {
    await api.get<IResponseGroup>("/group")
      .then((res) => {
        const { data } = res;
        setState(data.data.map(item => item.activities));
      });
  };

  useEffect(() => {
    if (state && resultSearch) {
      if (resultSearch.length) {
        setState(resultSearch.map(item => item.activities));
      };
    }
    // eslint-disable-next-line
  }, [resultSearch]);

  useEffect(() => {
    setNumberOverdueActivities();
    // eslint-disable-next-line
  }, [state])

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <Row
      style={{ padding: "10px 20px", }}
    >
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        {
          state && state.map((el, ind) => (
            <Row
              key={ind}
              style={{
                margin: "0 10px 0 10px",
              }}
            >
              <Col>
                <Title
                  id={
                    el[0].groupId
                      ? el[0].groupId
                      : ""
                  }
                  fetchData={() => fetchData()}
                />
                <Row
                  justify="center"
                >
                  <Droppable key={ind} droppableId={`${ind}`}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        {...provided.droppableProps}
                      >
                        {el.map((item, index) => (
                          <Draggable
                            key={item.mainId}
                            draggableId={item.mainId}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    height: "auto"
                                  }}
                                >
                                  <Card
                                    mainId={item.mainId}
                                    description={item.description}
                                    groupId={item.groupId}
                                    done={item.done}
                                    delivery={item.delivery}
                                    fetchData={() => fetchData()}
                                  />
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Row>
                <RegisterActivity
                  _id={
                    el[0].groupId
                      ? el[0].groupId
                      : ""
                  }
                  fetchData={() => fetchData()}
                />
              </Col>
            </Row>
          ))}
      </DragDropContext>
      <CreateGroup
        fetchData={() => fetchData()}
      />
    </Row>
  );
};

export default DrogAndDrop;
