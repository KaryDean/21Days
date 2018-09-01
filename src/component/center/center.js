import React from 'react'
import {Button,WingBlank,WhiteSpace,Card,SegmentedControl,InputItem,List} from 'antd-mobile'
import {connect} from 'react-redux'
import axios from 'axios'
import browserCookie from 'browser-cookies'

import {loadAim,loadDoneAim,errorMsg} from '../../redux/center.redux'
import CenterCard from './centerCard'
import SimpleStorageContract from '../../../build/contracts/SimpleStorage.json'
import getWeb3 from '../../utils/getWeb3'

var simpleStorageInstance;

@connect(
  state=>state,
  {loadAim,loadDoneAim,errorMsg}
)


class Center extends React.Component{

  componentWillMount(){
    this.setState({
      user:this.props.user.user,
      age:this.props.user.age,
      carrer:this.props.user.carrer,
      aim:this.props.center.aim,
      doneaim:this.props.center.doneaim
    })
    // this.props.searchUndo()

    axios.get('/user/aimundo',{}).then(res=>{
      if(res.status===200){
        console.log("未完成",res.data.data)
        this.props.loadAim(res.data.data)
      }
      else{
        this.props.errorMsg(res.data.msg)
      }
    })


    axios.get('/user/aimdone',{}).then(res=>{
      if(res.status===200){
        console.log("已完成",res.data.data)
        this.props.loadDoneAim(res.data.data)
      }
      else{
        this.props.errorMsg(res.data.msg)
      }
    })

    //连接web3
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
      this.findEmpty()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })

    // this.props.searchDone()
  }

  instantiateContract() {
    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance
        return instance
      }).then((instance)=>{
        instance.selectToken(this.props.user.ID,{from: this.state.web3.eth.coinbase}).then((results) => {  //查询金额，调用selectToken函数，函数参数为第几个用户
          console.log("剩余金额",results.c[0]);
          this.setState({Balance: results.c[0]}); //改变Balance的值，最后导致<p>标签中的Balance值动态改变

        })
      })
    })
  }

  constructor(props){
    super(props)
    this.state={
      user:"",
      age:"",
      carrer:'',
      segmented:'当前目标',
      aim:[],
      doneaim:[],
      Balance:0
    }
  }

  handleChange(data){
    console.log(data)
    if(data==='当前目标'){
      this.setState({
        segmented:'当前目标'
      })
    }else{
      this.setState({
        segmented:'已完成目标'
      })
    }
  }

  handleLogout(){
    browserCookie.erase('userid')
    window.location.href=window.location.href
  }

  render(){
    return(
      <div>
      <WingBlank size="lg">
      <WhiteSpace/>
      <Card>
      <Card.Header
        title={"     "+ this.props.user.user}
        extra={
          <List>
            <InputItem placeholder={"     年龄   "+this.props.user.age} editable={false}></InputItem>
            <InputItem placeholder={"     职业   "+this.props.user.carrer} editable={false}></InputItem>
          </List>
        }
      />
      <Button type="primary" inline
      type="primary"
      activeStyle={false}
      alt="">剩余金额    { this.state.Balance}</Button>
      <Card.Body>
      <SegmentedControl
        values={['当前目标', '已完成目标']}
        onValueChange={v=>this.handleChange(v)}
      />
      {this.state.segmented==='当前目标'?
      this.props.center.aim.map(v=>(<CenterCard key={v._id} infomation={v}/>))
      :this.props.center.doneaim.map(v=>(<CenterCard key={v._id} infomation={v}/>))}
      </Card.Body>
      </Card>
      <WhiteSpace size="lg" />
      <Button type="warning" onClick={this.handleLogout.bind(this)}>注销</Button>
      <WhiteSpace />
      <WhiteSpace />
      </WingBlank>

      </div>
    )
  }
}

export default Center
