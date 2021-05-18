import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const CardStyled = styled.div`
  background: lightcyan;

  margin-bottom: 15px;
  padding: 10px;

  text-align: center;

  border-radius: 7px;
  border-style: solid;
  border-width: thin;

  font-weight: normal;

  transition: background 0.3s linear;
  background: ${(props) => (props.isDragging ? "yellowgreen" : "lightcyan")};
`;

const Bubble = styled.div`
  width: 45px;
  height: 20px;

  background: coral;
  font-weight: bold;

  float: left;

  border-radius: 10px;

  margin-right: 7px;
  margin-bottom: 7px;
`;

const ByDiv = styled.div`
  margin: 1px;
  padding: 1px;

  color: grey;
`;

export default class Card extends React.Component {
  render() {
    let titleNumber = "";
    const content = this.props.title;

    this.props.cards.forEach((carduri) => {
      if (carduri.id === this.props.id) {
        titleNumber = carduri.id;
      }
    });

    let byUser = "";
    let timestamp1, timestamp2;
    var date1, date2;
    let time1 = "",
      time2 = "",
      duration = "";

    const whyTF = 60 * 60 * 24 * (3990 - 2021);

    const getByUser = () => {
      this.props.cards.forEach((carduri) => {
        if (carduri.id === this.props.id) {
          byUser = carduri.by;
        }
      });
    };

    const getDifference = () => {
      this.props.cards.forEach((carduri) => {
        if (carduri.id === this.props.id) {
          timestamp1 = carduri.startTime.seconds * 1000;
          timestamp2 = carduri.endTime.seconds * 1000;

          date1 = new Date(timestamp1);
          date2 = new Date(timestamp2);

          time1 = date1.toLocaleString("en-GB");
          time2 = date2.toLocaleString("en-GB");

          duration = Math.floor(carduri.endTime - carduri.startTime);
        }
      });
    };

    titleNumber = titleNumber.replace(/[^0-9]/g, "");

    const bubbleText = "#" + titleNumber;

    return (
      <Draggable draggableId={this.props.id} index={this.props.index}>
        {(provided, snapshot) => (
          <CardStyled
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {<Bubble>{bubbleText}</Bubble>}
            {content}
            {getByUser()}
            {byUser.length !== 0 ? <ByDiv>by: {byUser}</ByDiv> : <div />}
            {getDifference()}
            {timestamp1 && !timestamp2 ? (
              <ByDiv>started at: {time1}</ByDiv>
            ) : (
              <div />
            )}
            {timestamp1 && timestamp2 ? (
              <div>
                <ByDiv>done at: {time2} secs</ByDiv>
                <ByDiv>duration: {duration} secs</ByDiv>
              </div>
            ) : (
              <div />
            )}
          </CardStyled>
        )}
      </Draggable>
    );
  }
}
