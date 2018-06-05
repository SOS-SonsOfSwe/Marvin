import { ipfsCostants } from './costants'

const initialState = {
  loading: null,
  success: null,
  adding: null,
  network: null
}

const ipfsReducer = (state = initialState, action) => {
  switch(action.type) {
    default: {
      return state
    }

  case ipfsCostants.IPFS_CONNECTED:
    {
      return {
        ...state,
        network: true
      }
    }
  case ipfsCostants.IPFS_NOT_RESPONDING:
    {
      return {
        ...state,
        network: false
      }
    }
  case ipfsCostants.IPFS_ADDING_DATA:
    {
      return {
        ...state,
        adding: true
      }
    }
  case ipfsCostants.IPFS_DATA_ADDED:
    {
      return {
        ...state,
        success: true,
        adding: false
      }
    }
  case ipfsCostants.IPFS_ERROR_ADDING_DATA:
    {
      return {
        ...state,
        success: false,
        adding: false
      }
    }
  case ipfsCostants.IPFS_READING_DATA:
    {
      return {
        ...state,
        loading: true
      }
    }
  case ipfsCostants.IPFS_DATA_READ:
    {
      return {
        ...state,
        success: true,
        loading: false
      }
    }
  case ipfsCostants.IPFS_ERROR_READING_DATA:
    {
      return {
        ...state,
        success: false,
        loading: false
      }
    }
  case ipfsCostants.ERASE_IPFS_REDUCER:
    {
      return {
        ...state,
        loading: null,
        success: null,
        adding: null,
        network: null
      }
    }
  }
}

export default ipfsReducer