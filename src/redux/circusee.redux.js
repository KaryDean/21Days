const LOAD_CIRCUSEE_DATA = 'LOAD_CIRCUSEE_DATA'
const ERR_MSG = 'ERR_MSG'

const initState={
  circusee:[],
  msg:''
}

export function circusee(state=initState,action){
  switch (action.type) {
    case LOAD_CIRCUSEE_DATA:
      return {...state,circusee:action.payload,msg:"查询成功circusee"}
    case ERR_MSG:
      return {...state,msg:action.msg}
    default:
      return state
  }
}

function loadcircuseedata(data){
  return {type:LOAD_CIRCUSEE_DATA,payload:data}
}

export function loadCircuseeData(data){
  return loadcircuseedata(data)
}

function errormsg(msg){
  return {type:ERR_MSG,msg:msg}
}
export function errorMsg(msg){
  return errormsg(msg)
}
