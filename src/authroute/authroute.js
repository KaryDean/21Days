import React from 'react'
import axios from  'axios'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import {loadData} from '../redux/user.redux'

@connect(
  null,
  {loadData}
)
@withRouter

class AuthRoute extends React.Component{


  componentDidMount(){//除了login和register界面，其余界面都是需要身份认证才可以进入，否则跳转login界面或者register
    const publicList =['/login','/register']
    const pathname =this.props.location.pathname
    console.log("AuthRoute路径是：",pathname)
    if(publicList.indexOf(pathname)>-1){
      return null
    }
    axios.get('/user/info').then(res=>{
      if(res.status===200){
        if(res.data.code===0){
          //有登陆信息
          // console.log("执行数据载入操作:",res.data.data)
          this.props.loadData(res.data.data)
        }else{
          this.props.history.push('/login')
        }
      }
    })
  }

  render(){
    return null
  }
}

export default AuthRoute
