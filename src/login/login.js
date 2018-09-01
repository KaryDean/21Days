import React from 'react'
import {InputItem,Button,WhiteSpace,WingBlank,Toast} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {login} from '../redux/user.redux'
import Logo from '../component/logo/logo'
@connect(
  state=>state.user,
  {login}
)
class Login extends React.Component{

  componentDidMount(){
    setTimeout(() => {
      Toast.hide();
    }, 500);
  }

  constructor(props){
    super(props)
    this.state={
      user:'',
      pwd:''
    }
  }
  handleLogin(){
    this.props.login(this.state)
    setTimeout(() => {
      if(this.props.msg){
        Toast.info(this.props.msg, 1)
      }
    }, 200);
  }
  handleChange(key,val){
    this.setState({
      [key]:val
    })
  }
  handleRegister(){
    this.props.history.push('/register')
  }


  render(){
    return(
      <div>
      <Logo/>
      <WingBlank>
      {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
      <div style={{marginTop:300}}>
      <InputItem onChange={v=>{this.handleChange('user',v)}} >用户</InputItem>
      <InputItem type='password' onChange={v=>{this.handleChange('pwd',v)}}>密码</InputItem>
      <WhiteSpace/>
      <WhiteSpace/>
      <Button type='primary' onClick={this.handleLogin.bind(this)}>登录</Button>
      <WhiteSpace/>
      <Button type='primary' onClick={this.handleRegister.bind(this)}>注册</Button>
      </div>
      </WingBlank>

      </div>
    )
  }
}
export default Login
