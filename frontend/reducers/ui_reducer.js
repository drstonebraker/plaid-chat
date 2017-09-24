import {
  OPEN_SIDENAV_HEADER_MODAL,
  CLOSE_SIDENAV_HEADER_MODAL,
  OPEN_CHATGROUP_MODAL,
  CLOSE_CHATGROUP_MODAL,
  SET_CHATGROUP_FORM_TYPE,
} from '../actions/ui_actions.js';

const defaultState = {
  isSideNavHeaderModalOpen: false,
  isChatGroupModalOpen: false
};

const uiReducer = (state = defaultState, action) => {
  Object.freeze(state);
  const newState = Object.assign({}, state)

  switch (action.type) {
    case OPEN_SIDENAV_HEADER_MODAL:
      newState.isSideNavHeaderModalOpen = true
      return newState;
    case CLOSE_SIDENAV_HEADER_MODAL:
      newState.isSideNavHeaderModalOpen = false
      return newState;
    case OPEN_CHATGROUP_MODAL:
      newState.isChatGroupModalOpen = true
      newState.chatgroupFormType = action.formType
      return newState;
    case CLOSE_CHATGROUP_MODAL:
      newState.isChatGroupModalOpen = false
      newState.chatgroupFormType = null
      return newState;
    default:
      return state;
  }
};

export default uiReducer;