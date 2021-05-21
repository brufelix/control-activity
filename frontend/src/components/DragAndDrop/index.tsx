import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableStateSnapshot,
  DropResult,
} from "react-beautiful-dnd";

import { useCount } from "../../hooks/count";
import { useSearchResult } from "../../hooks/searchResult";
import { useSearchDescription } from "../../hooks/searchDescription";
import { move, reorder, openNotification } from "../../functions";
import { compareDate } from "../../utils";
import { IActivity, IGroup } from "../../interfaces";
import CreateGroup from "../CreateGroup";
import RegisterActivity from "../RegisterActivity";
import Card from "../Card";
import Title from "../Title";
import api from "../../service";

const DrogAndDrop: React.FC = () => {

  const { setCount } = useCount();
  const { setResultSearch, resultSearch } = useSearchResult();
  const { currentResearch } = useSearchDescription();
  const [groups, setGroups] = useState<IActivity[][]>();
  const [notified, setNotified] = useState<boolean>(false);
  const [inResearch, setInResearch] = useState<boolean>(false);
  const grid = 8;

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
    try {
      api.post<IGroup[]>("/activity/search", { search })
        .then(res => setResultSearch(res.data));
    } catch (error) {
      throw error;
    };
  };

  const fetchData = async () => {
    try {
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
    } catch (error) {
      throw error;
    };
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
          groups && groups
            .filter(el => el.length)
            .map((el, ind) => (
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
            ? groups.filter(el => el.length).length
            : 0
        }
      />
    </Row>
  );
};

export default DrogAndDrop;
