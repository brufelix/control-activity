import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableStateSnapshot,
  DropResult,
  DraggableLocation
} from "react-beautiful-dnd";

import { IActivity, IResponseGroup } from "../../interfaces";
import CreateGroup from "../CreateGroup";
import RegisterActivity from "../RegisterActivity";
import Card from "../Card";
import Title from "../Title";
import api from "../../service";

const moveActivity = (act: IActivity, targetGroup: string) => {
  api.post("/activity", {
    groupId: targetGroup,
    description: act.description,
    done: act.done,
    createAt: act.createAt,
    delivery: act.delivery
  });

  api.post("/activity/delete", {
    _id: act._id,
    groupId: act.groupId,
  });
};

const reorder = (list: any, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
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

  destClone.splice(droppableDestination.index, 0, removed);

  const result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "white",

  // styles we need to apply on draggables
  ...draggableStyle
});
const getListStyle = (isDraggingOver: DroppableStateSnapshot | Boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

function App() {

  const [state, setState] = useState<IActivity[][]>();

  const fetchData = async () => {
    await api.get<IResponseGroup>("/group")
      .then((res) => {
        const { data } = res;
        setState(data.data.map(item => item.activities));
      });
  };

  function onDragEnd(result: DropResult) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
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

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <div style={{ display: "flex" }}>
        <DragDropContext
          onDragEnd={onDragEnd}
        >
          {
            state && state.map((el, ind) => (
              <Row
                style={{ margin: 5, }}
                key={ind}
              >
                <Col>
                  <Title
                    id={el[0].groupId}
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
                              key={item._id}
                              draggableId={item._id}
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
                                    }}
                                  >
                                    <Card
                                      _id={item._id}
                                      description={item.description}
                                      groupId={item.groupId}
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
                    _id={el[0].groupId}
                    fetchData={() => fetchData()}
                  />
                </Col>
              </Row>
            ))}
        </DragDropContext>
        <CreateGroup
          fetchData={() => fetchData()}
        />
      </div>
    </>
  );
};

export default App;
