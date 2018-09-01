import React from 'react'
import {Card,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import {connect} from 'react-redux'
// import {Route,Redirect} from 'react-router-dom'
// import axios from 'axios'

import {likeAim,circuseeAim} from '../../redux/aim.redux'
import AimInfo from '../aiminfo/aiminfo'


@connect(
  null,
  {likeAim,circuseeAim}
)



class CircuseeCard extends React.Component{



  constructor(props){
    super(props)
    this.state={
      user:this.props.information.user,
      aimID:this.props.information.aimID,
      aim:this.props.information.aim,
      detail:this.props.information.detail,
      like:this.props.information.like,
      isCircusee:true,
      jiandu:"已围观",
      aiminfo:false
    }
  }



  circusee(){
    // this.props.circusee(this.props.information.aimID)
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
    }
    this.props.circuseeAim({aimID:this.state.aimID})
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
        <Card.Header title={"   "+this.state.aim}
        extra={<Button onClick={this.circusee.bind(this)}
        inline size="small" >{this.state.jiandu}</Button>}/>
        <Card.Body>
        <Button onClick={this.aiminfo.bind(this)}>{this.state.detail}</Button>
        {this.state.aiminfo?<AimInfo info={this.props.information}/>:null}
        </Card.Body>

        <Card.Footer content={'点赞数 '+this.state.like}/>

      </Card>
      <WhiteSpace size="lg" />
      </WingBlank>
      </div>
    )
  }
}



export default CircuseeCard
