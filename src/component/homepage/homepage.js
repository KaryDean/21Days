import React from 'react'
import {connect} from 'react-redux'

import {likeAim,circuseeAim} from '../../redux/aim.redux'
import {searchAll} from '../../redux/user.redux'
import InformationCard from '../informationCard/informationCard'

@connect(
  state=>state.user,
  {searchAll,likeAim,circuseeAim}
)
class HomePage extends React.Component{

  constructor(props){
    super(props)
    this.state={
      // 目标的ID
      aimID:'123'
    }
  }
  componentWillMount(){
    this.props.searchAll()
    setTimeout(()=>console.log(this.props.aimArray),500)

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
    return(
        <div >
        {this.props.aimArray.map(v=>(
        <InformationCard 
        key={v.aimID}
        information={v}
        circusee={this.circusee.bind(this)}
        like={this.like.bind(this)}></InformationCard>))}
        </div>
    )
  }
}
export default HomePage
