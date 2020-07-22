// const initialState = {
//   user: {
//     status: 0,
//     loading: true
//   },
//   card: [],
//   addresses: [],
//   documents: []
// };

// const UserReducer = (state = initialState, actions) => {
//   switch (actions.type) {
//     case "GET_USER_PROFILE":
//       return {
//         user: {
//           ...state.user,
//           ...actions.payload.data,
//           loading: false
//         },
//         card: actions.payload.card,
//         addresses: actions.payload.addresses,
//         documents: actions.payload.documents
//       };
//     case "LOGOUT_USER":
//       return initialState;
//     default:
//       return state;
//   }
// };

// export default UserReducer;
