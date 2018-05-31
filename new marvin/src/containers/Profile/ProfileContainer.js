import { connect } from 'react-redux'
import Profile from '../../components/Profile/Profile'

export default connect(state => ({ authData: state.user.data }))(Profile)