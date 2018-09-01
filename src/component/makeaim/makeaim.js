import React from 'react'
import {InputItem,WingBlank,List,WhiteSpace,Button,TextareaItem,Toast} from 'antd-mobile'
import {connect} from 'react-redux'
import axios from 'axios'

import {makeAim} from '../../redux/aim.redux'
import {loadEmpty,errorMsg} from '../../redux/empty.redux'
import SimpleStorageContract from '../../../build/contracts/SimpleStorage.json'
import getWeb3 from '../../utils/getWeb3'

var simpleStorageInstance;
var i = 0

@connect(
  state=>state,
  {makeAim,loadEmpty,errorMsg}
)

class MakeAim extends React.Component{

  componentWillMount(){
    //获取数据
    axios.post("/user/emptyaim",{}).then(res=>{
      if(res.status===200){
        console.log("空目标数据",res.data.data)
        this.props.loadEmpty(res.data.data)
      }else{
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

  }

  instantiateContract() {
    i = 0
    console.log(i)
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

  findEmpty(){
    console.log("查询空位",this.props.emptyaim.empty)
    console.log("空位",this.state.empty)
    for(;i<10;i++){
      if(this.props.emptyaim.empty[i]===0){
        this.setState({empty:i})
      }
    }
    console.log("空位",this.state.empty)
    if(this.state.empty===-1){
      Toast.info("空位不足", 1)
    }
  }

  componentDidMount(){
    setTimeout(() => {
      Toast.hide();
    }, 500);
  }

  constructor(props){
    super(props)
    this.state={
      aim:'',
      detail:'',
      money:'',
      type:'',
      totalDays:0,
      restDays:0,
      empty:-1,

      Balance: 0,  //余额
      xiuxiDay: 0,  //休息天数
      IsFinished: "false",  //每天是否完成
      Deposit: 0,  //保证金
      weiguanzhe: "who", //围观者
      EndFinished: "false",  //最终是否完成
      web3: null,
      AddressOfTotal:'',
      AddressOfDeposit:''

    }
  }

  handlechange(d,v){
    this.setState({
      [d]:v
    })
  }

  handleBalance(d,v){
    simpleStorageInstance.selectToken(this.props.user.ID,{from: this.state.web3.eth.coinbase}).then((results) => {  //查询金额，调用selectToken函数，函数参数为第几个用户
      console.log(results.c[0]);
      this.setState({
        Balance: results.c[0],
        [d]:v
      }); //改变Balance的值，最后导致<p>标签中的Balance值动态改变
    })
    if(this.state.Balance<v){
      Toast.info("余额不足,剩余"+this.state.Balance, 1)
    }
  }

  handleTotalDays(d,v){
    if(v>100){
      Toast.info("最大天数"+100+"天", 1)
    }else{
      this.setState({
        [d]:v
      })
    }
  }

  makeaim(){

    let a =this.props.emptyaim.empty
    // console.log(this.props.emptyaim.empty)
    if(this.state.Balance<parseInt(this.state.money,10)){//没钱
      // console.log("余额不足")
      Toast.info("余额不足,剩余"+this.state.Balance, 1)

    }else{
      a[this.state.empty]=1
      // console.log("修改后的空位",a)
      axios.post('/user/fillaim',{empty:a}).then(res=>{
        if(res.status===200){
          // console.log("放入成功")

          // console.log("目标",i)
          simpleStorageInstance.setDeposit(this.props.user.ID,this.state.empty,parseInt(this.state.money,10),{from: this.state.web3.eth.coinbase}).then((result) => {//设置保证金，调用setDeposit函数，函数参数为上述三个参数（对应合约里的函数参数）
            this.setState({
              AddressOfDeposit:result.tx
            })
            simpleStorageInstance.selectDeposit(this.props.user.ID,this.state.empty,{from: this.state.web3.eth.coinbase}).then((results) => {//查询保证金，调用selectDeposit函数，函数参数为上述两个参数（对应合约里的函数参数）
              console.log("参与金额",results.c[0]);
              this.setState({Deposit: results.c[0]});//改变Deposit的值，最后导致<p>标签中的Deposit值动态改变
            })
          }).then(()=>{
            console.log("总天数",this.state.totalDays)
            simpleStorageInstance.setDay(this.props.user.ID,this.state.empty,this.state.totalDays,{from: this.state.web3.eth.coinbase}).then((result) => {//设置休息天数，调用setRelaxday函数，函数参数为上述三个参数（对应合约里的函数参数）
              this.setState({
                AddressOfTotal:result.tx
              })
              simpleStorageInstance.selectDay(this.props.user.ID,this.state.empty,{from: this.state.web3.eth.coinbase}).then((results) => {//查询休息天数，调用selectRelaxday函数，函数参数为上述两个参数（对应合约里的函数参数）
                console.log("目标天数：",results.c[0]);

                //console.log(simpleStorageInstance);

                this.setState({xiuxiDay: results.c[0]});//改变xiuxiDay的值，最后导致<p>标签中的Balance值动态改变
              })
            })
          }).then(()=>{
            setTimeout(() => {
              this.props.makeAim(this.state)
            }, 1000)
          })

        }else{
          a[this.state.empty]=0
          // console.log("方式失败，重新创建")
        }
      })
    }

  }

  render(){
    return(
      <div>
      <WingBlank>
      <List>
      <InputItem onChange={v=>this.handlechange('aim',v)}>目标</InputItem>
      <WhiteSpace/>
      <InputItem onChange={v=>this.handleBalance('money',v)} rows={3} >参与金额</InputItem>
      <WhiteSpace/>
      <InputItem onChange={v=>this.handlechange('type',v)}>类型</InputItem>
      <WhiteSpace/>
      <InputItem onChange={v=>this.handleTotalDays('totalDays',v)}>总天数</InputItem>
      <WhiteSpace/>
      <InputItem onChange={v=>this.handlechange('restDays',v)}>休息天数</InputItem>
      <WhiteSpace/>
      <TextareaItem title="目标详情" rows={3} onChange={v=>this.handlechange('detail',v)}/>
      <WhiteSpace/>
      <WhiteSpace/>
      <Button style={{marginTop:20}} type='primary' onClick={this.makeaim.bind(this)}>制定</Button>
      <Button style={{marginTop:10}} type="warning"  activeStyle={false}>交易地址1{this.state.AddressOfTotal}</Button>
      <Button style={{marginBottom:10}} type='warning' activeStyle={false}>交易地址2{this.state.AddressOfDeposit}</Button>
      </List>
      </WingBlank>
      </div>
    )
  }
}

export default MakeAim
