import React from 'react'
import {WingBlank,InputItem,List,WhiteSpace,Button,Toast} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Logo from '../component/logo/logo'
import {register} from '../redux/user.redux'

@connect(
  state=>state.user,
  {register}
)
class Register extends React.Component{
  constructor(props){
    super(props)
    this.state={
      user:'',
      pwd:'',
      repeatpwd:'',
      age:'',
      carrer:''
    }
  }

  handlechange(d,v){
    this.setState({
      [d]:v
    })
  }

  handleRegister(){
    this.props.register(this.state)
    setTimeout(() => {
      if(this.props.msg){
        Toast.info(this.props.msg, 1)
      }
    }, 200);
    console.log("register前端:",this.state)
  }



  render(){
    return(
      <div>
        <WingBlank>
        <Logo/>
        <List>
        {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
        <div style={{marginTop:200}}>
        <InputItem onChange={v=>this.handlechange('user',v)}>用户</InputItem>
        <WhiteSpace/>
        <InputItem type='password' onChange={v=>this.handlechange('pwd',v)}>密码</InputItem>
        <InputItem type='password' onChange={v=>this.handlechange('repeatpwd',v)}>重复密码</InputItem>
        <WhiteSpace/>
        <InputItem onChange={v=>this.handlechange('age',v)}>年龄</InputItem>
        <WhiteSpace/>
        <InputItem onChange={v=>this.handlechange('carrer',v)}>职业</InputItem>
        </div>
        <WhiteSpace/>
        </List>
        <WhiteSpace/>
        <WhiteSpace/>
        <WhiteSpace/>
        <Button type='primary' onClick={this.handleRegister.bind(this)}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}
export default Register
