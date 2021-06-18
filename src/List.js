import React from "react";
import { Card } from "./Card";
import "./List.css";
import CancelIcon from "@material-ui/icons/Cancel";
import AddCircleIcon from "@material-ui/icons/AddCircle";

export const List = ({
  data,
  openAddCard,
  deleteList,
  cardDelete,
  handleDragStart,
  handleDrop,
}) => {
  return (
    <div className="App__lists">
      {data.length > 0 &&
        data.map((element, index) => {
          return (
            <div
              className="App__list"
              key={`app-list-${index}`}
              onDrop={(e) => handleDrop(index)}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className="App__list__header">
                <div className="App__list__title">{element.title}</div>
                <div className="App__list__delete">
                  <CancelIcon onClick={() => deleteList(index)} />
                </div>
              </div>
              <Card
                data={element.cards}
                cardDelete={cardDelete}
                listKey={index}
                handleDragStart={handleDragStart}
              />
              <div className="App__list__footer">
                <AddCircleIcon onClick={() => openAddCard(index)} />
              </div>
            </div>
          );
        })}
    </div>
  );
};
