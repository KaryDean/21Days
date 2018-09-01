import axios from 'axios'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'//注册成功
const ERROR_MSG = 'ERROR_MSG'//错误信息
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'//登陆成功
const LOAD_DATA = 'LOAD_DATA'//载入数据
const SEARCHALL_SUCCESS ='SEARCHALL_SUCCESS'//查询所有成功
// const FINDUSER_SUCCESS='FINDUSER_SUCCESS'//查询个人成功
const initState = {
  //用户ID，用户以太坊交互
  ID:0,
  //用户名
  user:'',
  //密码
  pwd:'',
  // 年龄
  age:'',
  // 职业
  career:'',
  // 头像
  avatar:'',
  // 授权
  isAuth:false,
  // 后台信息
  msg:'',
  //跳转网址
  redirectTo:'',
  //目标名称
  aimID:'',
  //目标类型
  type:'',
  // 目标名称
  aim:'',
  // 目标数组
  aimArray:[]
}

export function user(state=initState,action){
  switch (action.type) {
    case SEARCHALL_SUCCESS:
      return {...state,msg:"查询成功",aimArray:action.payload}
    case REGISTER_SUCCESS:
      return {...state,...action.payload,isAuth:true,msg:'注册成功',redirectTo:'/login'}
    case ERROR_MSG:
      return {...state,isAuth:false,msg:action.msg}
    case LOAD_DATA:
      return {...state,...action.payload,isAuth:true}
    case LOGIN_SUCCESS:
      return {...state,...action.payload,isAuth:true,msg:'登录成功',redirectTo:'/homepage'}
    default:
      return state
  }
}

function errorMsg(data){
  return {type:ERROR_MSG,msg:data}
}

function registerSuccess(data){
  return {type:REGISTER_SUCCESS,payload:data}
}

function loaddata(data){
  return {type:LOAD_DATA,payload:data}
}

function loginSuccess(data){
  return {type:LOGIN_SUCCESS,payload:data}
}
export function loadData(data){
  // console.log("载入数据：",data)
  return loaddata(data)
}


function searchAllSuccess(data){
  return {type:SEARCHALL_SUCCESS,payload:data}
}

export function register({user,pwd,repeatpwd,age,carrer}){
  if(!user||!pwd||!age||!carrer||!repeatpwd){
    return errorMsg("信息必须输入")
  }
  if(pwd!==repeatpwd){
    return errorMsg('两次密码不同')
  }
  return dispatch=>{
    axios.post('/user/register',{user,pwd,age,carrer}).then(res=>{
      if(res.status===200&&res.data.code===0){
        //dispatch(res.data.data)
        dispatch(registerSuccess(res.data.data))
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function login({user,pwd}){
  if(!user||!pwd){
    return errorMsg('信息必须输入')
  }
  return dispatch=>{
    axios.post('/user/login',{user,pwd}).then(res=>{
      if(res.status===200&&res.data.code===0){
        dispatch(loginSuccess(res.data.data))
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

// function finduser(data){
//
// }
// export function findUser({userid}){
//   return dispatch=>{
//     axios.post('/user/userinfo',{userid}).then(res=>{
//       if(res.status===200){
//         console.log()
//       }else{
//         dispatch(errorMsg(res.data.msg))
//       }
//     })
//   }
// }

export function searchAll(){
  let aimArray =[]//创建数组用来接收值

  return dispatch=>{
    axios.post('/user/searchaim',{}).then(res1=>{
      if(res1.status===200){//查询目标成功，但是目标信息不完善，我们继续添加
        console.log("查询所有结果",res1.data.data)


        //**********添加用户名******************
        res1.data.data.map(v=>{
          let userid =v.userid
          axios.post('/user/userinfo',{userid}).then(res2=>{
            if(res2.status===200){//成功了
              // console.log(res2.data.data.user)
              v={...v,user:res2.data.data.user}//成功添加用户名
              // console.log(v)

              //*************接下来添加点赞信息***********
              let aimID=v.aimID
              axios.post('/user/likeinfo',{aimID}).then(res3=>{
                if(res3.status===200){//后端成功
                  if(res3.data.code===0){
                    v={...v,isLike:false}
                    // console.log(v)
                  }else{
                    v={...v,isLike:true}
                    // console.log(v)
                  }

                  //****************添加围观信息*********
                  const aimID1=res3.data.data
                  // console.log(aimID1)
                  axios.post('/user/circuseeinfo',{aimID1}).then(res4=>{
                    if(res4.status===200){
                      if(res4.data.code===0){
                        v={...v,isCircusee:false}
                        aimArray.push(v)
                        // console.log(v)
                      }else{
                        v={...v,isCircusee:true}
                        aimArray.push(v)
                        // console.log(v)
                      }
                    }else {
                        console.log("添加点赞失败")
                        dispatch(errorMsg(res4.data.msg))
                    }
                  })


                }else{//后端出现问题
                  console.log("添加点赞失败")
                  dispatch(errorMsg(res3.data.msg))
                }
              })


            }else{//失败了
              console.log("添加用户名失败")
              dispatch(errorMsg(res2.data.msg))
            }
          })
        })





        // console.log(res.data.data)
        dispatch(searchAllSuccess(aimArray))
      }else{
        dispatch(errorMsg(res1.data.msg))
      }
    })
  }
}
