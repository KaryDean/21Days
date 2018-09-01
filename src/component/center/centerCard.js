import React from 'react'
import {Button , Card,WhiteSpace} from 'antd-mobile'
import axios from 'axios'
import {connect} from 'react-redux'

import SimpleStorageContract from '../../../build/contracts/SimpleStorage.json'
import getWeb3 from '../../utils/getWeb3'
import RecordInfo from './recordinfo'
var simpleStorageInstance;
@connect(
  state=>state,
  {}
)

class CenterCard extends React.Component{

  componentWillMount(){

    axios.post('/user/ispunchaim',{aimID:this.props.infomation.aimID}).then(res=>{
      if(res.status===200){
        console.log("打卡状态",res.data.data)
        if(res.data.data){
          this.setState({
            isPunch:true
          })
        }else{
          this.setState({
            isPunch:false
          })
        }
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
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance
        return
      })
    })
  }

  constructor(props){
    super(props)
    this.state={
      isPunch:false,
      msg:'',
      aiminfo:false,

      AddressOfPunch:'',
      IsFinished:"false",
      web3: null,
      EndFinished: "false",  //最终是否完成
    }
  }

  punch(){
    console.log("目标ID",this.props.infomation.aimID)
    console.log("当前打卡天数",this.props.infomation.doneDays+1)
    if(this.props.infomation.doneDays+1===this.props.infomation.totalDays){//打卡并且完成转账
      simpleStorageInstance.setIsfinished(this.props.user.ID,this.props.infomation.Location,this.props.infomation.doneDays+1,{from: this.state.web3.eth.coinbase}).then((result) => {//设置每天是否完成，调用setIsfinished函数，函数参数为上述三个参数（对应合约里的函数参数）
        this.setState({AddressOfPunch:result.tx})
        console.log("打卡地址",result.tx)
        simpleStorageInstance.selectIsfinished(this.props.user.ID,this.props.infomation.Location,this.props.infomation.doneDays+1,{from: this.state.web3.eth.coinbase}).then((results) => {//查询每天是否完成，调用selectIsfinished函数，函数参数为上述三个参数（对应合约里的函数参数）
          console.log(String(results));
          this.setState({IsFinished: String(results)});//改变IsFinished的值，最后导致<p>标签中的IsFinished值动态改变
        })
      }).then(()=>{
        simpleStorageInstance.judgeEndfinished(this.props.user.ID,this.props.infomation.Location,{from: this.state.web3.eth.coinbase,gas: 3000000}).then(() => {//判断最终是否完成，调用judgeEndfinished函数，函数参数为上述两个参数（对应合约里的函数参数）
          simpleStorageInstance.selectEndfinished(this.props.user.ID,this.props.infomation.Location,{from: this.state.web3.eth.coinbase,gas: 3000000}).then((results) => {//查询最终是否完成，调用selectEndfinished函数，函数参数为上述两个参数（对应合约里的函数参数）
            console.log("打卡结果",results);
            this.setState({EndFinished: String(results)});//改变EndFinished的值，最后导致<p>标签中的EndFinished值动态改变
          })
        })
      }).then(()=>{
        simpleStorageInstance.executeRewardorpunishment(this.props.user.ID,this.props.infomation.Location,{from: this.state.web3.eth.coinbase}).then(() =>{//执行奖励或惩罚，调用executeRewardorpunishment函数，函数参数为上述两个参数（对应合约里的函数参数）
          simpleStorageInstance.selectToken(this.props.user.ID,{from: this.state.web3.eth.coinbase}).then((results) => {//查询余额，此步骤纯属是为了让此按钮顺利执行，所以随便打印了个results
            console.log(results);
          })
        })
      }).then(()=>{
        setTimeout(()=>{
          axios.post('/user/punchaim',{aimID:this.props.infomation.aimID,AddressOfPunch:this.state.AddressOfPunch}).then(res=>{
            if(res.status===200){
              this.setState({
                isPunch:true,
                msg:"打卡成功"
              })
            }else{
              this.setState({
                isPunch:false,
                msg:'打卡失败'
              })
            }
          })
        },500)
      })
    }
    else{//仅打卡
      simpleStorageInstance.setIsfinished(this.props.user.ID,this.props.infomation.Location,this.props.infomation.doneDays+1,{from: this.state.web3.eth.coinbase}).then((result) => {//设置每天是否完成，调用setIsfinished函数，函数参数为上述三个参数（对应合约里的函数参数）
        this.setState({AddressOfPunch:result.tx})
        console.log("打卡地址",result.tx)
        simpleStorageInstance.selectIsfinished(this.props.user.ID,this.props.infomation.Location,this.props.infomation.doneDays+1,{from: this.state.web3.eth.coinbase}).then((results) => {//查询每天是否完成，调用selectIsfinished函数，函数参数为上述三个参数（对应合约里的函数参数）
          console.log(String(results));
          this.setState({IsFinished: String(results)});//改变IsFinished的值，最后导致<p>标签中的IsFinished值动态改变
        })
      }).then(()=>{
        setTimeout(()=>{
          axios.post('/user/punchaim',{aimID:this.props.infomation.aimID,AddressOfPunch:this.state.AddressOfPunch}).then(res=>{
            if(res.status===200){
              this.setState({
                isPunch:true,
                msg:"打卡成功"
              })
            }else{
              this.setState({
                isPunch:false,
                msg:'打卡失败'
              })
            }
          })
        },500)
      })
    }
  }

  aiminfo(){
    this.setState({
      aiminfo:this.state.aiminfo^true
    })
  }

  render(){
    return (
      <div>
      <WhiteSpace/>
      <WhiteSpace/>
      <Card>
        <Card.Header title={this.props.infomation.aim}
        extra={<Button
        inline size="small"
        type="primary"
        activeStyle={false}
        alt="">打卡天数{this.props.infomation.doneDays}/{this.props.infomation.totalDays}</Button>}/>
        <Card.Body>
          <Button onClick={this.aiminfo.bind(this)}>{this.props.infomation.detail}</Button>
          {this.state.aiminfo?<RecordInfo info={this.props.infomation}/>:null}
        </Card.Body>

        <Card.Footer content={'点赞数 '+this.props.infomation.like+ '   监督数   '+this.props.infomation.circusee}
        extra={this.props.infomation.done?<Button
        inline size="small"
        type="primary"
        disabled={true}
        alt="">已完成</Button>:<Button
        onClick={this.punch.bind(this)}
        inline size="small"
        type="warning"
        disabled={this.state.isPunch}
        alt="">打卡</Button>
        }/>

      </Card>
      </div>
    )
  }
}

export default CenterCard
