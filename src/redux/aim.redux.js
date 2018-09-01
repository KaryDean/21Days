import axios from 'axios'

const MAKE_SUCCESS ='MAKE_SUCCESS'//目标制定成功
const ERROR_MSG = 'ERROR_MSG'//错误信息
const LIKE_SUCCESS='LIKE_SUCCESS'//点赞成功
const CIRCUSEE_SUCCESS='CIRCUSEE_SUCCESS'//围观成功

const initState={
  //用于以太坊交互的目标ID
  AIMID:-1,
  //用户ID
  'userid':'',
  // 目标
  'aim':'',
  // 目标ID
  'aimID':'',
  // 目标详情
  'detail':'',
  // 金额
  'money':0,
  // 类型
  'type':'',
  // 今日完成天数
  'doneDays':0,
  // 昨日完成天数
  'yesterdayDoneDays':0,
  // 总目标天数
  'totalDays':0,
  // 休息总天数
  'restDays':0,
  // 已休息天数
  'rest':0,
  // 点赞数
  'like':0,
  // 围观数
  'circusee':0,
  // 是否完成
  'done':false
}
export function makeaim(state=initState,action){
  switch (action.type) {
    case MAKE_SUCCESS:
        return {...state,...action.payload,msg:"目标制定成功"}
    case LIKE_SUCCESS:
        return {...state,msg:'点赞成功'}
    case CIRCUSEE_SUCCESS:
        return {...state,msg:'围观成功'}
    default:
      return state
  }
}


function errorMsg(msg){
  return {type:ERROR_MSG,msg:msg}
}


function makeSuccess(data){
  return {type:MAKE_SUCCESS,payload:data}
}
function likeSuccess(){
  return {type:LIKE_SUCCESS}
}


export function makeAim({aim,detail,money,type,totalDays,restDays,AddressOfTotal,AddressOfDeposit,empty}){
  // console.log("信息",{aim,detail,money,type,totalDays,restDays})
  if(!aim||!detail||!money||!type||!totalDays||!restDays){
    return errorMsg("信息不完善")
  }
  totalDays=parseInt(totalDays,10)
  money=parseInt(money,10)
  restDays=parseInt(restDays,10)
  console.log("AddressOfRest",AddressOfTotal)
  console.log("AddressOfDeposit",AddressOfDeposit)
  // console.log("前端redux:",{aim,detail,money,type,totalDays,restDays})
  if(isNaN(totalDays)){
    return errorMsg("请输入整数天数")
  }

  if(isNaN(money)){
    return errorMsg("请输入整数金额")
  }
  if(isNaN(restDays)){
    return errorMsg("请输入整数金额")
  }
  return dispatch=>{
    axios.post('/user/aim',{aim,detail,money,type,totalDays,restDays,AddressOfTotal,AddressOfDeposit,empty}).then(res=>{
      if(res.status===200){
        const {aim,aimID}=res.data.data
        dispatch(makeSuccess({aim,aimID}))
      }else{

        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}



export function likeAim({aimID}){
  console.log(aimID)
    return dispatch=>{
      axios.post('/user/likeaim',{aimID}).then(res=>{
        if(res.status===200){
          dispatch(likeSuccess())
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
    }
}

function circuseeSuccess(){
  return {type:CIRCUSEE_SUCCESS}
}

export function circuseeAim({aimID,EmptyCircusee,AddressOfCircusee}){
  return dispatch=>{
    axios.post('/user/circuseeaim',{aimID,EmptyCircusee,AddressOfCircusee}).then(res=>{
      if(res.status===200){
        dispatch(circuseeSuccess(res.data.data))
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}
