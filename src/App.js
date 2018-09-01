import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'


var simpleStorageInstance;
var _result;

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      Balance: 0,  //余额
      xiuxiDay: 0,  //休息天数
      IsFinished: "false",  //每天是否完成
      Deposit: 0,  //保证金
      weiguanzhe: "who", //围观者
      EndFinished: "false",  //最终是否完成
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

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
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.


    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance


        //console.log(simpleStorageInstance);

        console.log("accounts[0]: "+accounts[0]);
        console.log("simpleStorageInstance.selectToken(1):",simpleStorageInstance.selectToken(1));
        return simpleStorageInstance.selectToken(1);
      }).then((result) => {


        console.log(result);
        console.log(result.c[0]);


        console.log("simpleStorageInstance.setDay(2,1,10,{from: accounts[0]}):",simpleStorageInstance.setDay(2,1,10,{from: accounts[0]}));
        return simpleStorageInstance.selectDay(2,1,{from: accounts[0]});

      }).then((result) => {
        console.log("selectDay:",result);
        console.log("selectDayresult:",result.c[0]);
        //return this.setState({ xiuxiDay: result.c[0] });

        console.log("simpleStorageInstance.selectIsfinished(2,1,1,{from: accounts[0]}):",simpleStorageInstance.selectIsfinished(2,1,1,{from: accounts[0]}));
        return simpleStorageInstance.selectIsfinished(2,1,10,{from: accounts[0]});
      }).then((results) => {
        console.log("selectIsfinished:",results);

        console.log("simpleStorageInstance.selectDeposit(2,1,{from: accounts[0]}):",simpleStorageInstance.selectDeposit(2,1,{from: accounts[0]}));
        return simpleStorageInstance.selectDeposit(2,1,{from: accounts[0]});
      }).then((results) => {
        console.log("selectDeposit:",results);
        console.log("selectDepositresult:",results.c[0]);

        console.log("simpleStorageInstance.selectOnlookers(2,1,{from: accounts[0]}):",simpleStorageInstance.selectOnlookers(2,1,{from: accounts[0]}));
        return simpleStorageInstance.selectOnlookers(2,1,{from: accounts[0]});
      }).then((results) => {
        console.log("selectOnlookers:",results);
        console.log("results[0].c[0]:",results[0].c[0]);

        console.log("simpleStorageInstance.selectEndfinished(2,1,{from: accounts[0]}):",simpleStorageInstance.selectEndfinished(2,1,{from: accounts[0]}));
        return simpleStorageInstance.selectEndfinished(2,1,{from: accounts[0]});
      }).then((results) => {
        console.log("Endfinished:",results);

        //console.log(results.tx);
        return;
      }).then(() => {
        simpleStorageInstance.setDay(2,1,10,{from: accounts[0]}).then((result) => {
          console.log("hash:",result.tx);
        })
      })
    })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <h2>Smart Contract Example</h2>
              <p style={{display:"inline"}}>The account</p><strong><p id="1001" style={{display:"inline"}}>number</p></strong><p style={{display:"inline"}}>'s balance is: </p><p style={{display:"inline"}}><strong>{this.state.Balance}</strong></p><br/>
              <p style={{display:"inline"}}>The account</p><strong><p id="1" style={{display:"inline"}}>number</p></strong><p style={{display:"inline"}}>'s plan number </p><strong><p id="2" style={{display:"inline"}}>plannum</p></strong><p style={{display:"inline"}}>'s relax day is: <strong>{this.state.xiuxiDay}</strong></p><br/>
              <p style={{display:"inline"}}>The account</p><strong><p id="11" style={{display:"inline"}}>number</p></strong><p style={{display:"inline"}}>'s plan number </p><strong><p id="12" style={{display:"inline"}}>plannum</p></strong><p style={{display:"inline"}}>'s </p><strong><p id="13" style={{display:"inline"}}>daynum</p></strong><p style={{display:"inline"}}>'s isfinished is: <strong>{this.state.IsFinished}</strong></p><br/>
              <p style={{display:"inline"}}>The account</p><strong><p id="21" style={{display:"inline"}}>number</p></strong><p style={{display:"inline"}}>'s plan number </p><strong><p id="22" style={{display:"inline"}}>plannum</p></strong><p style={{display:"inline"}}>'s deposit is: <strong>{this.state.Deposit}</strong></p><br/>
              <p style={{display:"inline"}}>The account</p><strong><p id="31" style={{display:"inline"}}>number</p></strong><p style={{display:"inline"}}>'s onlookers is: account </p><p style={{display:"inline"}}><strong>{this.state.weiguanzhe}</strong></p><br/>
              <p style={{display:"inline"}}>The account</p><strong><p id="41" style={{display:"inline"}}>number</p></strong><p style={{display:"inline"}}>'s plan number </p><strong><p id="42" style={{display:"inline"}}>plannum</p></strong><p style={{display:"inline"}}>'s </p><p style={{display:"inline"}}>'s endfinished is: <strong>{this.state.EndFinished}</strong></p><br/>
            </div>
          </div>
        </main>

        第几个账户：
        <input
          ref="num0"
          style={{width:50,height:25,borderWidth:2,marginLeft:50}}/>
        <button onClick={() =>{
          let number0 = Number(this.refs.num0.value);
          //console.log(number0);

          document.getElementById("1001").innerText = number0;//改变标签<p>中id="1001"的内容

          simpleStorageInstance.selectToken(number0,{from: this.state.web3.eth.coinbase}).then((results) => {  //查询金额，调用selectToken函数，函数参数为第几个用户
            console.log("余额：",results.c[0]);
            this.setState({Balance: results.c[0]}); //改变Balance的值，最后导致<p>标签中的Balance值动态改变

          })

        }}>查询余额</button><br/><br/>

        第几个账户：
        <input
          ref="num"
          style={{width:50,height:25,borderWidth:2,marginLeft:50}}/><br/>
        第几个计划：
        <input
          ref="plannum"
          style={{width:50,height:25,borderWidth:2,marginLeft:50}}/>
        <input
          ref="day"
          style={{width:50,height:25,borderWidth:2,marginLeft:50}}/>
        <button onClick={() =>{
          let number1 = Number(this.refs.num.value); //第几个账户
          let number2 = Number(this.refs.plannum.value); //第几个计划
          let number = Number(this.refs.day.value); //休息天数
          //console.log(number);

          document.getElementById("1").innerText = number1; //改变标签<p>中的内容
          document.getElementById("2").innerText = number2;

          simpleStorageInstance.setDay(number1,number2,number,{from: this.state.web3.eth.coinbase}).then(() => {//设置休息天数，调用setRelaxday函数，函数参数为上述三个参数（对应合约里的函数参数）
            simpleStorageInstance.selectDay(number1,number2,{from: this.state.web3.eth.coinbase}).then((results) => {//查询休息天数，调用selectRelaxday函数，函数参数为上述两个参数（对应合约里的函数参数）
              console.log("目标天数：",results.c[0]);

              //console.log(simpleStorageInstance);

              this.setState({xiuxiDay: results.c[0]});//改变xiuxiDay的值，最后导致<p>标签中的Balance值动态改变
            })
          })

        }}>提交天数</button><br/><br/>


        第几个账户：
        <input
          ref="num2"
          style={{width:50,height:25,borderWidth:2,marginLeft:50}}/><br/>
        第几个计划：
        <input
          ref="plannum2"
          style={{width:50,height:25,borderWidth:2,marginLeft:50}}/><br/>
        第几天：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input
          ref="day2"
          style={{width:50,height:25,borderWidth:2,marginLeft:50}}/>
        <button onClick={() =>{
          let number11 = Number(this.refs.num2.value); //第几个账户
          let number12 = Number(this.refs.plannum2.value); //第几个计划
          let number13 = Number(this.refs.day2.value); //第几天
          //console.log(number13);

          document.getElementById("11").innerText = number11;
          document.getElementById("12").innerText = number12;
          document.getElementById("13").innerText = "daynumber"+number13; //改变标签<p>中的内容

          simpleStorageInstance.setIsfinished(number11,number12,number13,{from: this.state.web3.eth.coinbase}).then(() => {//设置每天是否完成，调用setIsfinished函数，函数参数为上述三个参数（对应合约里的函数参数）
            simpleStorageInstance.selectIsfinished(number11,number12,number13,{from: this.state.web3.eth.coinbase}).then((results) => {//查询每天是否完成，调用selectIsfinished函数，函数参数为上述三个参数（对应合约里的函数参数）
              console.log("false代表完成：",String(results));
              this.setState({IsFinished: String(results)});//改变IsFinished的值，最后导致<p>标签中的IsFinished值动态改变
            })
          })

        }}>提交是否完成</button><br/><br/>


        第几个账户：
        <input
          ref="num3"
          style={{width:50,height:25,borderWidth:2,marginLeft:50}}/><br/>
        第几个计划：
        <input
          ref="plannum3"
          style={{width:50,height:25,borderWidth:2,marginLeft:50}}/>
        <input
          ref="deposit3"
          style={{width:50,height:25,borderWidth:2,marginLeft:50}}/>
        <button onClick={() =>{
          let number21 = Number(this.refs.num3.value); //第几个账户
          let number22 = Number(this.refs.plannum3.value); //第几个计划
          let number23 = Number(this.refs.deposit3.value); //保证金金额
          //console.log(number23);

          document.getElementById("21").innerText = number21;
          document.getElementById("22").innerText = number22; //改变标签<p>中的内容

          simpleStorageInstance.setDeposit(number21,number22,number23,{from: this.state.web3.eth.coinbase}).then(() => {//设置保证金，调用setDeposit函数，函数参数为上述三个参数（对应合约里的函数参数）
            simpleStorageInstance.selectDeposit(number21,number22,{from: this.state.web3.eth.coinbase}).then((results) => {//查询保证金，调用selectDeposit函数，函数参数为上述两个参数（对应合约里的函数参数）
              //console.log(results);
              console.log("保证金：",results.c[0]);
              this.setState({Deposit: results.c[0]});//改变Deposit的值，最后导致<p>标签中的Deposit值动态改变
            })
          })

        }}>提交保证金</button><br/><br/>


        第几个账户：
        <input
          ref="num4"
          style={{width:50,height:25,borderWidth:2,marginLeft:50}}/><br/>
        第几个计划：
        <input
          ref="plannum4"
          style={{width:50,height:25,borderWidth:2,marginLeft:50}}/><br/>
        第几个围观：
        <input
          ref="onlookernum4"
          style={{width:50,height:25,borderWidth:2,marginLeft:50}}/><br/>
        围观者编号：
        <input
          ref="onlooker4"
          style={{width:50,height:25,borderWidth:2,marginLeft:50}}/>
        <button onClick={() =>{
          let number41 = Number(this.refs.num4.value); //第几个账户
          let number42 = Number(this.refs.plannum4.value); //第几个计划
          let number43 = Number(this.refs.onlookernum4.value); //第几个围观
          let number44 = Number(this.refs.onlooker4.value); //围观者编号
          //console.log(number43);
          //console.log(number44);

          document.getElementById("31").innerText = number41; //改变标签<p>中的内容

          simpleStorageInstance.setOnlookers(number41,number42,number43,number44,{from: this.state.web3.eth.coinbase}).then(() => {//设置围观者，调用setOnlookers函数，函数参数为上述四个参数（对应合约里的函数参数）
            simpleStorageInstance.selectOnlookers(number41,number42,{from: this.state.web3.eth.coinbase}).then((results) => {//查询围观者，调用selectOnlookers函数，函数参数为上述两个参数（对应合约里的函数参数）

              //console.log(results);
              _result=results[0].c[0]+","+results[1].c[0]+","+results[2].c[0]+","+results[3].c[0]+","+results[4].c[0]+","+results[5].c[0]+".";//将所有围观者代表的数字赋给_result,以字符串形式表示
              console.log("围观者编号：",_result);
              this.setState({weiguanzhe: _result});//改变weiguanzhe的值，最后导致<p>标签中的weiguanzhe值动态改变
            })
          })

        }}>提交围观者信息</button><br/><br/>


        第几个账户：
        <input
          ref="num5"
          style={{width:50,height:25,borderWidth:2,marginLeft:50}}/><br/>
        第几个计划：
        <input
          ref="plannum5"
          style={{width:50,height:25,borderWidth:2,marginLeft:50}}/>
        <button onClick={() =>{
          let number51 = Number(this.refs.num5.value); //第几个账户
          let number52 = Number(this.refs.plannum5.value); //第几个计划

          document.getElementById("41").innerText = number51; //改变标签<p>中的内容
          document.getElementById("42").innerText = number52;


          simpleStorageInstance.judgeEndfinished(number51,number52,{from: this.state.web3.eth.coinbase}).then(() => {//判断最终是否完成，调用judgeEndfinished函数，函数参数为上述两个参数（对应合约里的函数参数）
            simpleStorageInstance.selectEndfinished(number51,number52,{from: this.state.web3.eth.coinbase}).then((results) => {//查询最终是否完成，调用selectEndfinished函数，函数参数为上述两个参数（对应合约里的函数参数）
              console.log("true代表计划完成：",results);
              this.setState({EndFinished: String(results)});//改变EndFinished的值，最后导致<p>标签中的EndFinished值动态改变
            })
          })

        }}>查询计划是否完成</button><br/><br/>


        第几个账户：
        <input
          ref="num6"
          style={{width:50,height:25,borderWidth:2,marginLeft:50}}/><br/>
        第几个计划：
        <input
          ref="plannum6"
          style={{width:50,height:25,borderWidth:2,marginLeft:50}}/>
        <button onClick={() =>{
          let number61 = Number(this.refs.num6.value); //第几个账户
          let number62 = Number(this.refs.plannum6.value); //第几个计划


          simpleStorageInstance.executeRewardorpunishment(number61,number62,{from: this.state.web3.eth.coinbase}).then(() =>{//执行奖励或惩罚，调用executeRewardorpunishment函数，函数参数为上述两个参数（对应合约里的函数参数）
            simpleStorageInstance.selectToken(number61,{from: this.state.web3.eth.coinbase}).then((results) => {//查询余额，此步骤纯属是为了让此按钮顺利执行，所以随便打印了个results
              console.log("results:",results);
            })
          })

        }}>执行奖励或惩罚</button><br/><br/>


      </div>
    );
  }
}

export default App
