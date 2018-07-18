//guardato
const initialState = {
  web3Instance: null
}

const web3Reducer = (state = initialState, action) => {
  if(action.type === 'WEB3_INITIALIZED') {
    return Object.assign({}, state, {
      web3Instance: action.payload.web3Instance
    })
  }
  if(action.type === 'NO_METAMASK') {
    return Object.assign({}, state, {
      web3Instance: null
    })
  }

  return state
}

export default web3Reducer