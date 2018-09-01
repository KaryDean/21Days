import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

import {loadCircuseeData,errorMsg} from  '../../redux/circusee.redux'
import CircuseeCard from './circuseeCard'

@connect(
  state=>state,
  {loadCircuseeData,errorMsg}
)

class Circusee extends React.Component{

  constructor(props){
    super(props)
    this.state={
      // 目标的ID
      aimID:'123'
    }
  }

 componentDidMount(){
   axios.get('/user/circusee',{}).then(res=>{
     if(res.status===200){
       // console.log("围观数据",res.data.data)
       this.props.loadCircuseeData(res.data.data)
     }else{
       console.log("失败",res.data.msg)
       this.props.errorMsg(res.data.msg)
     }
   })
 }


 circusee(newaimID){
   // console.log('监督：',newaimID)
   this.setState({
     aimID:newaimID
   })
   setTimeout(()=>{//延迟执行
     this.props.circuseeAim({aimID:this.state.aimID})
   },200)
 }



 like(newaimID){
   this.setState({
     aimID:newaimID
   })
   setTimeout(()=>{
     this.props.likeAim({aimID:this.state.aimID})
   })
 }

  render(){
    return (
      <div>
      {console.log(this.props.circusee.circusee)}
      {this.props.circusee.circusee.map(v=>(
      <CircuseeCard key={v.aimID}
      information={v}></CircuseeCard>))}
      </div>
    )
  }


}

export default Circusee
