interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'START_LOADING': {
      return {isLoading: true};
      break;
    }
    case 'STOP_LOADING': {
      return {isLoading: false};
      break;
    }
    default: return state;
  }
  return state;
}