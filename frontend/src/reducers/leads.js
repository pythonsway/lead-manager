import {
  GET_LEADS,
  FILTER_LEADS,
  DELETE_LEAD,
  ADD_LEAD,
  CLEAR_LEADS
} from '../actions/types.js';

const initialState = {
  leads: [],
  searchName: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LEADS:
      return {
        ...state,
        leads: action.payload
      };
    case FILTER_LEADS:
      return {
        ...state,
        searchName: action.payload
      };
    case DELETE_LEAD:
      return {
        ...state,
        leads: state.leads.filter(lead => lead.id !== action.payload)
      };
    case ADD_LEAD:
      return {
        ...state,
        leads: [...state.leads, action.payload]
      };
    case CLEAR_LEADS:
      return {
        ...state,
        leads: []
      };
    default:
      return state;
  }
}
