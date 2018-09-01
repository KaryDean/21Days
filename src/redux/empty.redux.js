const LOAD_EMPTY='LOAD_EMPTY'
const ERROR_MSG='ERROR_MSG'
const FILL_EMPTY='FILL_EMPTY'

const initState={
  //用户id
  userid:'',
  //空数组
  empty:[],
  // 消息
  msg:''
}

export function emptyaim(state=initState,action){
  switch (action.type) {
    case LOAD_EMPTY:
      return {...state,...action.payload,msg:'已载入数据'}
    case ERROR_MSG:
      return {...state,msg:action.msg}
    default:
      return state
  }
}

function loadempty(data){
  return {type:LOAD_EMPTY,payload:data}
}

export function loadEmpty(data){
  return loadempty(data)
}

function errormsg(msg){
  return {type:ERROR_MSG,msg:msg}
}

export function errorMsg(msg){
  return errormsg(msg)
}
