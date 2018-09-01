import React from 'react'
import {NavBar} from 'antd-mobile'
import {Switch,Route} from 'react-router-dom'

import HomePage from '../homepage/homepage'
import MakeAim from '../makeaim/makeaim'
import NavLinkBar from '../navlink/navlink'
import '../../index.css'
import Center from '../center/center'
import Circusee from '../circusee/circusee'

class DashBoard extends React.Component{

  render(){
    const {pathname}=this.props.location
    const navList=[
      {
        path:'/makeaim',
        text:'定目标',
        icon:'makeAim',
        title:"定目标",
        component:MakeAim
      },
      {
        path:'/homepage',
        text:'首页',
        icon:'homepage',
        title:"首页",
        component:HomePage
      },
      {
        path:'/circusee',
        text:'围观',
        icon:'circusee',
        title:"围观",
        component:Circusee
      },
      {
        path:'/center',
        text:'个人中心',
        icon:'center',
        title:"个人中心",
        component:Center
      }
    ]


    return(
      <div>
      <NavBar mode='dark' className='an-navbar'>{navList.find(v=>v.path===pathname).title}</NavBar>
      <NavLinkBar data={navList} className='am-tab-bar'></NavLinkBar>
      <div style={{marginTop:20}} >
        <Switch>
          {navList.map(v=>(
            <Route key={v.path} path={v.path} component={v.component}></Route>
          ))}
        </Switch>
      </div>
      </div>
    )
  }
}
export default DashBoard
