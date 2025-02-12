import React from "react";
import styled from "styled-components";
import Card from "./Card";
import { Droppable } from "react-beautiful-dnd";

const ListStyled = styled.div`
  width: 350px;

  background: lightgrey;

  padding: 1em;
  margin: 1em;

  border-style: dashed;
  border-width: medium;

  font-weight: bold;
  font-family: "Georgia", serif;

  display: flex;
  flex-direction: column;

  transition: background 0.3s linear;
  background: ${(props) =>
    props.isDraggingOverList ? "ghostwhite" : "lightgrey"};

  display: grid;
`;

const TitleDiv = styled.div`
  align-self: end;
  margin: 10px;
  font-size: x-large;
  text-align: center;
`;

const CardsDiv = styled.div``;

const EmptyDiv = styled.div`
  padding: 10px;
  margin: 10px;
  text-align: center;
  transition: color 0.3s linear;
  color: ${(props) => (props.isDraggingOverEmptyList ? "ghostwhite" : "grey")};

  /*
  border-radius: 7px;
  border-style: solid;
  border-width: thin;
  */
`;

export default class List extends React.Component {
  numberOfCards = 0;
  listaCarduri = [];
  emptyText = "";
  cardCount = 0;

  getEmptyText = () => {
    this.props.lists.forEach((listele) => {
      if (listele.id === this.props.id) {
        this.emptyText = listele.emptyText;
      }
    });
  };

  getCardsOfThisListFinal = () => {
    this.props.lists.forEach((liste) => {
      if (this.props.id === liste.id) {
        this.listaCarduri = liste.hasCards;
      }
    });
  };

  getCardsOfThisList = () => {
    let lista1 = [],
      lista2 = [];

    this.props.lists.forEach((liste) => {
      if (this.props.id === liste.id) {
        lista1 = liste.hasCards;
      }
    });

    this.props.cards.forEach((carduri) => {
      if (carduri.department === this.props.dept) {
        lista2[lista2.length] = carduri.id;
      }
    });

    // console.log(lista1);
    // console.log(lista2);

    let intersectie = lista1.filter((card) => lista2.includes(card));
    this.listaCarduri = intersectie;

    // console.log(
    //   "pentru lista " +
    //     this.props.id +
    //     " avem cardurile " +
    //     intersectie +
    //     " - " +
    //     this.props.dept
    // );
  };

  getNumberOfRenderedCards = () => {
    //TO DO HERE
    let listHasCards = [],
      number = 0;
    this.props.lists.forEach((listele) => {
      if (listele.id === this.props.id) {
        listHasCards = listele.hasCards;
      }
    });

    this.props.cards.forEach((carduri) => {
      if (listHasCards.includes(carduri.id)) {
        if (this.props.isAdmin) {
          number = number + 1;
        } else {
          if (carduri.department === this.props.dept) {
            number = number + 1;
          }
        }
      }
    });

    return number;
  };

  render() {
    let numarOite = this.props.id.replace(/[^0-9]/g, "");
    let titluLista = "#" + numarOite + ": " + this.props.title + " ";

    // let cond1EM = this.props.id[0] === "e";
    // let cond2EM = this.props.id[1] === "m";
    // let condEM = cond1EM && cond2EM;

    let condEM = this.props.id[this.props.id.length - 1] === "m";

    if ([1, 2, 3, 4].includes(parseInt(numarOite))) {
      if (condEM) {
        titluLista = titluLista + "👷🏻‍♀️⛔️";
      } else {
        for (let i = 1; i <= numarOite; i++) {
          titluLista = titluLista + "🐑";
        }
      }
    }

    return (
      <Droppable droppableId={this.props.id}>
        {(provided, snapshot) => (
          <ListStyled
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOverList={snapshot.isDraggingOver}
          >
            <CardsDiv>
              {/* {this.props.isAdmin
                ? this.getCardsOfThisListIfAdmin()
                : this.getCardsOfThisList()} */}

              {this.getCardsOfThisListFinal()}

              {this.props.isAdmin
                ? this.listaCarduri.map((IDCard, index) => {
                    let ID, TITLU, INDEX;
                    this.props.cards.forEach((carduri) => {
                      if (IDCard === carduri.id) {
                        ID = carduri.id;
                        TITLU = carduri.title;
                        INDEX = index;
                        this.cardCount = this.cardCount + 1;
                      }
                    });

                    return (
                      <Card
                        key={ID}
                        id={ID}
                        title={TITLU}
                        index={INDEX}
                        cards={this.props.cards}
                        lists={this.props.lists}
                        username={this.props.username}
                        isAdmin={this.props.isAdmin}
                        dept={this.props.dept}
                        parentList={this.props.id}
                      />
                    );
                  })
                : this.listaCarduri.map((IDCard, index) => {
                    let ID, TITLU, INDEX;
                    this.props.cards.forEach((carduri) => {
                      if (IDCard === carduri.id) {
                        if (carduri.department === this.props.dept) {
                          ID = carduri.id;
                          TITLU = carduri.title;
                          INDEX = index;
                          this.cardCount = this.cardCount + 1;
                        }
                      }
                    });

                    return (
                      <Card
                        key={ID}
                        id={ID}
                        title={TITLU}
                        index={INDEX}
                        cards={this.props.cards}
                        lists={this.props.lists}
                        username={this.props.username}
                        isAdmin={this.props.isAdmin}
                        dept={this.props.dept}
                        parentList={this.props.id}
                      />
                    );
                  })}

              {this.getEmptyText()}
              {this.props.lists.map((listele) => {
                let text = "";
                if (this.props.id === listele.id) {
                  if (this.getNumberOfRenderedCards() === 0) {
                    text = listele.emptyText;
                  }

                  return text.length === 0 ? (
                    <div />
                  ) : (
                    <EmptyDiv isDraggingOverEmptyList={snapshot.isDraggingOver}>
                      {text}
                    </EmptyDiv>
                  );
                }
              })}

              {provided.placeholder}
            </CardsDiv>

            <TitleDiv>{titluLista}</TitleDiv>
          </ListStyled>
        )}
      </Droppable>
    );
  }
}
