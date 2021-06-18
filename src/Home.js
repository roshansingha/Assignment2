import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { List } from "./List";
import "./Home.css";

function Home() {
  const initialCardDetails = {
    title: "",
    desc: "",
    time: "",
  };
  const initialDraggedCard = {
    cardIndex: null,
    listIndex: null,
  };
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("list")) || []
  );
  const [display, setDisplay] = useState(false);
  const [activeList, setActiveList] = useState(null);
  const [cardDetails, setCardDetails] = useState(initialCardDetails);
  const [listTitle, setListTitle] = useState("");
  const [displayListModal, setDisplayListModal] = useState(false);
  const [draggedCard, setDraggedCard] = useState(initialDraggedCard);

  const openAddCard = (index) => {
    setDisplay(true);
    setActiveList(index);
  };

  const onCloseModal = () => {
    setDisplay(false);
    setDisplayListModal(false);
    setCardDetails(initialCardDetails);
    setListTitle("");
  };
  const onSaveCardModal = (e) => {
    e.preventDefault();
    var data = [...list];
    let cardValue = { ...cardDetails };
    cardValue["time"] = new Date().getTime();
    data[activeList].cards.push(cardValue);
    setList(data);
    onCloseModal();
  };
  const onChangeCardDetails = (e, name) => {
    let value = e.target.value;
    let data = { ...cardDetails };
    data[name] = value;
    setCardDetails(data);
  };
  const onSaveListModal = (e) => {
    e.preventDefault();
    var data = [...list];
    data.push({
      title: listTitle,
      cards: [],
    });
    setList(data);
    onCloseModal();
  };
  const deleteList = (index) => {
    let data = [...list];
    data.splice(index, 1);
    setList(data);
  };
  const cardDelete = (index, listKey) => {
    let data = [...list];
    data[listKey].cards.splice(index, 1);
    setList(data);
  };
  const handleDragStart = (index, listKey) => {
    setDraggedCard({
      cardIndex: index,
      listIndex: listKey,
    });
  };
  const handleDrop = (index) => {
    let data = [...list];
    data[index].cards.push(
      data[draggedCard.listIndex].cards[draggedCard.cardIndex]
    );
    let sortedData = data[index].cards.sort((a, b) => {
      if (a.time < b.time) return -1;
      return a.time > b.time ? 1 : 0;
    });
    data[index].cards = [...sortedData];
    data[draggedCard.listIndex].cards.splice(draggedCard.cardIndex, 1);
    setList(data);
    setDraggedCard(initialDraggedCard);
  };
  useEffect(() => {
    if (list) {
      localStorage.setItem("list", JSON.stringify(list));
    }
  }, [list]);
  return (
    <div className="Home">
      <div className="Home__button">
        <button onClick={() => setDisplayListModal(true)}>ADD LIST</button>
      </div>
      <List
        data={list}
        openAddCard={openAddCard}
        deleteList={deleteList}
        cardDelete={cardDelete}
        handleDragStart={handleDragStart}
        handleDrop={handleDrop}
      />
      <Modal
        display={display}
        title="Enter Card Details"
        onClose={onCloseModal}
        onSave={onSaveCardModal}
      >
        <div className="card__modal">
          <label className="card__label">Enter Card Title:</label>
          <input
            type="text"
            value={cardDetails.title}
            placeholder="Enter Card Title"
            onChange={(e) => onChangeCardDetails(e, "title")}
            required
          />
        </div>
        <div className="card__modal card__desc">
          <label className="card__label">Enter Card Description</label>
          <textarea
            type="text"
            value={cardDetails.desc}
            placeholder="Enter Card Description"
            rows={4}
            cols={18}
            className="modal__textArea"
            onChange={(e) => onChangeCardDetails(e, "desc")}
            required
          />
        </div>
      </Modal>
      <Modal
        display={displayListModal}
        title="Enter List Details"
        onClose={onCloseModal}
        onSave={onSaveListModal}
      >
        <div className="card__modal">
          <label className="card__label">Enter List Title:</label>
          <input
            type="text"
            value={listTitle}
            placeholder="Enter List Title"
            onChange={(e) => setListTitle(e.target.value)}
            required
          />
        </div>
      </Modal>
    </div>
  );
}

export default Home;
