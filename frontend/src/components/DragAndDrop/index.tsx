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
import { IActivity, IGroup, IDrogAndDrop } from "../../interfaces";
import CreateGroup from "../CreateGroup";
import RegisterActivity from "../RegisterActivity";
import Card from "../Card";
import Title from "../Title";
import api from "../../service";

const DrogAndDrop: React.FC<IDrogAndDrop> = (props) => {

  const { resultSearch, currentResearch, setCount, setResultSearch } = props;
  const [groups, setGroups] = useState<IActivity[][]>();
  const [notified, setNotified] = useState<boolean>(false);
  const [inResearch, setInResearch] = useState<boolean>(false);
  const grid = 8;

  const openNotification = (number: number) => {
    notification.warning({
      message: `Atividades atrasadas :(`,
      description: `Você possui ${number} atividade(s) atrasada(s)`,
      placement: "topLeft",
      duration: 4.5
    });
  };

  const updateItemPositionForward = async (items: IActivity[], referenceIndex: number) => {
    let index = referenceIndex;

    await Promise.all(
      items.map(async item => {
        await api.post(`/activity/updateposition`, {
          _id: item.groupId,
          mainId: item.mainId,
          newPosition: ++index,
        });
      })
    );
  };

  const updatePositionItemsBack = async (items: IActivity[], referenceIndex: number) => {
    let index = referenceIndex;

    await Promise.all(
      items.map(async item => {
        await api.post(`/activity/updateposition`, {
          _id: item.groupId,
          mainId: item.mainId,
          newPosition: --index,
        });
      })
    );
  };

  const moveActivity = (
    act: IActivity,
    targetGroup: string,
    position: number,
  ) => {
    api.post("/activity", {
      groupId: targetGroup,
      description: act.description,
      done: act.done,
      createAt: act.createAt,
      delivery: act.delivery,
      mainId: act.mainId,
      position,
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

    moveActivity(removed, groupId, droppableDestination.index);
    updateItemPositionForward(destClone.slice(droppableDestination.index), droppableDestination.index);
    updatePositionItemsBack(sourceClone.slice(droppableSource.index), droppableSource.index);

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
      const items: any = reorder(groups[sInd], source.index, destination.index);
      const newState = [...groups];
      newState[sInd] = items;
      setGroups(newState);
    } else {
      const result: any = move(groups[sInd], groups[dInd], source, destination);
      const newState = [...groups];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setGroups(newState.filter(group => group.length));
    }
  };

  const setNumberOverdueActivities = () => {
    let count = 0;

    groups && groups.forEach(group => {
      group.forEach(act => {
        if (act.delivery && !act.done &&
          compareDate(act.delivery.slice(0, 10))) {
          count++;
        }
      })
    });
    setCount(count);

    if (count && !notified) {
      openNotification(count);
      setNotified(true);
    };
  };

  const getSearchData = (search: string) => {
    api.post<IGroup[]>("/activity/search", {
      search
    }).then(res => setResultSearch(res.data));
  };

  const fetchData = async () => {
    await api.get<IGroup[]>("/group")
      .then((res) => {
        const { data } = res;
        setGroups(
          data
            .sort((a, b) => a.position - b.position)
            .map(group => group.activities
              .sort((a, b) => a.position - b.position)
            )
        );
      }).then(() => setInResearch(false));
  };

  useEffect(() => {
    if (groups && resultSearch) {
      if (resultSearch.length) {
        setInResearch(true);
        setGroups(
          resultSearch
            .sort((a, b) => +a._id - +b._id)
            .map(group => group.activities
              .sort((a, b) => a.position - b.position)
            )
        );
      };
    }
    // eslint-disable-next-line
  }, [resultSearch]);

  useEffect(() => {
    setNumberOverdueActivities();
    // eslint-disable-next-line
  }, [groups])

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
          groups && groups.map((el, ind) => (
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
                                    getSearchData={() => getSearchData(currentResearch)}
                                    inResearch={inResearch}
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
                  position={
                    el
                      ? el.length
                      : 0
                  }
                />
              </Col>
            </Row>
          ))}
      </DragDropContext>
      <CreateGroup
        fetchData={() => fetchData()}
        position={
          groups
            ? groups.length
            : 0
        }
      />
    </Row>
  );
};

export default DrogAndDrop;
