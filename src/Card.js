import React from "react";
import "./Card.css";
import CancelIcon from "@material-ui/icons/Cancel";

export const Card = ({ data, cardDelete, listKey, handleDragStart }) => {
  return (
    <div className="App__card__lists">
      {data.length > 0 &&
        data.map((element, index) => {
          return (
            <div
              className="App__card__list"
              key={`app-card-list=${index}`}
              draggable="true"
              onDragStart={() => handleDragStart(index, listKey)}
            >
              <div className="App__card__header">
                <div className="App__card__title">{element.title}</div>
                <div className="App__card__delete">
                  <CancelIcon onClick={() => cardDelete(index, listKey)} />
                </div>
              </div>
              <div className="App__card__content">{element.desc}</div>
            </div>
          );
        })}
    </div>
  );
};
