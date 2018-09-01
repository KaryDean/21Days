import React from 'react'
import logoImg from './logo1.gif'
import './logo.css'
import { Grid } from 'antd-mobile';
class Logo extends React.Component{
  render(){
    const data={Img:(<img src={logoImg} alt=""/>),text:''}
    return(
      <div >
        <Grid data={data} columnNum={1} hasLine={false} activeStyle={true}/>
      </div>
    )
  }
}

export default Logo
