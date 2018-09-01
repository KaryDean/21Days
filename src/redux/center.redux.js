
const EEROR_MSG= 'EEROR_MSG'
const LOAD_AIM='LOAD_AIM'
const LOAD_DONEAIM='LOAD_DONEAIM'


const initState={
  aim:[],
  doneaim:[],
  msg:''
}

export function center(state=initState,action){
  switch (action.type) {
    case LOAD_DONEAIM:
      return {...state,doneaim:action.payload,msg:'查询个人信息成功'}
    case LOAD_AIM:
      return {...state,aim:action.payload,msg:'查询个人信息成功'}
    default:
      return state
  }
}



function errormsg(msg){
  return {type:EEROR_MSG,msg:msg}
}
function loadaim(data){
  return {type:LOAD_AIM,payload:data}
}
function loaddoneaim(data){
  return {type:LOAD_DONEAIM,payload:data}
}

export function errorMsg(msg){
  return errormsg(msg)
}

export function loadAim(data){
  return loadaim(data)
}
export function loadDoneAim(data){
  return loaddoneaim(data)
}
