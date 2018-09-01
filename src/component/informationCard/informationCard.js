import React from 'react'
import {Card,WingBlank,WhiteSpace,Button,Toast} from 'antd-mobile'
import {connect} from 'react-redux'
import axios from 'axios'
// import {Route,Redirect} from 'react-router-dom'

import {likeAim,circuseeAim} from '../../redux/aim.redux'
import AimInfo from '../aiminfo/aiminfo'
import SimpleStorageContract from '../../../build/contracts/SimpleStorage.json'
import getWeb3 from '../../utils/getWeb3'

var simpleStorageInstance;
var i =0
var _result;
@connect(
  state=>state,
  {likeAim,circuseeAim}
)



class InformationCard extends React.Component{

  componentWillMount(){
    i=0
    //连接web3
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.findEmptyCircusee()
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })

    console.log("用户名",this.props.information.user)

    axios.post("/user/user",{user:this.props.information.user}).then(res=>{
      if(res.status===200){
        console.log("查询用户ID成功",res.data.data)
        this.setState({
          userID:res.data.data
        })
      }else{
        console.log("查询用户ID失败")
      }
    })


    console.log("目标空位",this.props.information.EmptyCircusee)


  }

  findEmptyCircusee(){
    // console.log("空位",this.state.empty)
    for(;i<5;i++){
      if(this.props.information.EmptyCircusee[i]===0){
        this.setState({EmptyCircusee:i})
      }
    }
    console.log("空位",this.state.EmptyCircusee)

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

  componentDidMount(){
    if(this.state.isLike){
      this.setState({
        dianzan:"已点赞"
      })
    }else{
      this.setState({
        dianzan:"点赞"
      })
    }
    if(this.state.isCircusee){
      this.setState({
        jiandu:"已围观"
      })
    }else{
      this.setState({
        jiandu:"围观"
      })
    }
  }

  constructor(props){
    super(props)
    this.state={
      user:this.props.information.user,
      aimID:this.props.information.aimID,
      aim:this.props.information.aim,
      detail:this.props.information.detail,
      like:this.props.information.like,
      circusee:this.props.information.circusee,
      isLike:this.props.information.isLike,
      isCircusee:this.props.information.isCircusee,
      dianzan:"",
      jiandu:"",
      aiminfo:false,

      weiguanzhe: "who", //围观者
      web3: null,
      //空围观者
      EmptyCircusee:-1,
      weiguanzhe:"",
      userID:-1
    }
  }


  like(){
    // console.log(this.props.information)
    this.props.like(this.props.information.aimID)
    if(this.state.isLike){
      // console.log("isLike:",this.state.isLike)
      this.setState({
          like:this.state.like-1,
          isLike:false,
          dianzan:"点赞"
      })
    }else{
      // console.log("isLike:",this.state.isLike)
      this.setState({
          like:this.state.like+1,
          isLike:true,
          dianzan:"已点赞"
      })
    }
  }

  circusee(){
    var AddressOfCircusee=new Array()
    console.log("查询空位",this.state.EmptyCircusee)
    if(this.state.EmptyCircusee===-1){//没有空位
      Toast.info("监督空位已满",1)
    }else{//有空位
      if(this.state.isCircusee){
        console.log("isCircusee:",this.state.isCircusee)
        this.setState({
            circusee:this.state.circusee-1,
            isCircusee:false,
            jiandu:"围观"
        })
      }else{
        console.log("isCircusee:",this.state.isCircusee)
        this.setState({
            circusee:this.state.circusee+1,
            isCircusee:true,
            jiandu:"已围观"
        })
        simpleStorageInstance.setOnlookers(this.state.userID,this.props.information.Location,this.state.EmptyCircusee+1,this.props.user.ID,{from: this.state.web3.eth.coinbase}).then((result) => {
          console.log("监督交易地址",result.tx)
          Toast.info("监督交易地址:"+result.tx, 1)
          AddressOfCircusee = this.props.information.AddressOfCircusee.push(result.tx)
          console.log("地址数组",AddressOfCircusee)

          //设置围观者，调用setOnlookers函数，函数参数为上述四个参数（对应合约里的函数参数）
          simpleStorageInstance.selectOnlookers(this.state.userID,this.props.information.Location,{from: this.state.web3.eth.coinbase}).then((results) => {//查询围观者，调用selectOnlookers函数，函数参数为上述两个参数（对应合约里的函数参数）

            //console.log(results);
            _result=results[0].c[0]+","+results[1].c[0]+","+results[2].c[0]+","+results[3].c[0]+","+results[4].c[0]+","+results[5].c[0]+".";//将所有围观者代表的数字赋给_result,以字符串形式表示
            console.log("围观者编号：",_result);
            this.setState({weiguanzhe: _result});
          })
        }).then(()=>{
          this.props.circuseeAim({aimID:this.props.information.aimID,EmptyCircusee:this.state.EmptyCircusee,AddressOfCircusee:AddressOfCircusee})
        })
      }
    }



  }

  aiminfo(){
    this.setState({
      aiminfo:this.state.aiminfo^true
    })
  }

  render(){
    return(
      <div>
      <WingBlank size="lg">
      <WhiteSpace size="lg" />
      <Card>
        {this.state.user?<Card.Header title={this.state.user+"   "+this.state.aim}
        extra={<Button onClick={this.circusee.bind(this)}
        inline size="small" >{this.state.jiandu}</Button>}/>:
        <Card.Header title={"   "+this.state.aim}
        extra={<Button onClick={this.circusee.bind(this)}
        inline size="small" >{this.state.jiandu}</Button>}/>}
        <Card.Body>
        <Button onClick={this.aiminfo.bind(this)}>{this.state.detail}</Button>
        {this.state.aiminfo?<AimInfo info={this.props.information}/>:null}
        </Card.Body>

        <Card.Footer content={'点赞数 '+this.state.like}
        extra={<Button onClick={this.like.bind(this)}
        inline size="small"
        alt="">{this.state.dianzan}</Button>}/>

      </Card>
      <WhiteSpace size="lg" />
      </WingBlank>
      </div>
    )
  }
}



export default InformationCard
