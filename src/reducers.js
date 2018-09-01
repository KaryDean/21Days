import {combineReducers} from 'redux'

import {user} from './redux/user.redux'
import {makeaim} from './redux/aim.redux'
import {center} from './redux/center.redux'
import {circusee} from './redux/circusee.redux'
import {emptyaim} from './redux/empty.redux'
export default combineReducers({user,makeaim,center,circusee,emptyaim})
