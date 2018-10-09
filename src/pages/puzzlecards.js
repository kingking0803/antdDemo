import React, { Component } from 'react';
import { Card, Button  } from 'antd';
import { connect } from 'dva';

// const namespace = 'puzzlecards';

// const mapStateToProps = (state) => {
//   const cardList = state[namespace].data;
//   return {
//     cardList,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onClickAdd: (newCard) => {
//       const action = {
//         type: `${namespace}/addNewCard`,
//         payload: newCard,
//       };
//       dispatch(action);
//     },
//   };
// };

// @connect(mapStateToProps, mapDispatchToProps)
// export default class PuzzleCardsPage extends Component {
//   render() {
//     return (
//       <div>
//         {
//           this.props.cardList.map(card => {
//             return (
//               <Card key={card.id}>
//                 <div>Q: {card.setup}</div>
//                 <div>
//                   <strong>A: {card.punchline}</strong>
//                 </div>
//               </Card>
//             );
//           })
//         }
//         <div>
//           <Button onClick={() => this.props.onClickAdd({
//             setup: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
//             punchline: 'here we use dva',
//           })}> 添加卡片 </Button>
//         </div>
//       </div>
//     );
//   }
// }

const namespace = 'puzzlecards';

const mapStateToProps = (state) => {
  const cardList = state[namespace];
  return {
    cardList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onClickAdd: (newCard) => {
    //   const action = {
    //     type: `${namespace}/addNewCard`,
    //     payload: newCard,
    //   };
    //   dispatch(action);
    // },
    onDidMount: () => {
      dispatch({
        type: `${namespace}/queryInitCards`,
      })
    }
  };
};

// @connect(({puzzlecards}) => ({
//   puzzlecards,
// }))
@connect(mapStateToProps,mapDispatchToProps)
export default class PuzzleCardsPage extends Component {
  
  componentDidMount() {
    // const {dispatch} = this.props;
    // dispatch({
    //   type: 'puzzlecards/queryInitCards',
    // })
    this.props.onDidMount();
  }
  
  render() {
    const {
      cardList
    } = this.props;
    return (
      <div>
        {
          cardList.data.map(card => {
            return (
              <Card key={card.id}>
                <div>Q: {card.setup}</div>
                <div>
                  <strong>A: {card.punchline}</strong>
                </div>
              </Card>
            );
          })
        }
        {/* <div>
          <Button onClick={() => this.props.onClickAdd({
            setup: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            punchline: 'here we use dva',
          })}> 添加卡片 </Button>
        </div> */}
      </div>
    );
  }
}