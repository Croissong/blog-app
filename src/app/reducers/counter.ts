const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const RESET = 'RESET';

const increment = (payload = 1) => ({ type: INCREMENT, payload });

const decrement = (payload = 1) => ({ type: DECREMENT, payload });
const reset = () => ({ type: RESET });

export const counterActions = {
  increment, decrement, reset
};


const ACTION_HANDLERS = {
  [INCREMENT] : (state, payload) => state.update('1', v => v + payload),
  [DECREMENT] : (state, payload) => state.update('1', v => v - payload),
  [RESET] : (state) => state.update('1', _ => 0)
};

export function counter (state = 0, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}

