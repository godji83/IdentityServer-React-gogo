const INCREMENT_COUNT = "INCREMENT_COUNT";
const DECREMENT_COUNT = "DECREMENT_COUNT";
const initialState = {
  count: 0,
  isLoading: false
};

// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
export const actionCreators = {
  increment: () => ({
    type: INCREMENT_COUNT
  }),
  decrement: () => ({
    type: DECREMENT_COUNT
  })
};

// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_COUNT:
      return Object.assign(Object.assign({}, state), {
        count: state.count + 1
      });
    case DECREMENT_COUNT:
      return Object.assign(Object.assign({}, state), {
        count: state.count - 1
      });
    default:
      return state;
  }
};
