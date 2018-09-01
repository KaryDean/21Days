import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter
class NavLinkBar extends React.Component{
  static propTypes={
    data:PropTypes.array.isRequired
  }
  render(){
    const navList = this.props.data
    const {pathname} = this.props.location
    return (
      <div>
      <TabBar>
      {navList.map(v=>(
        <TabBar.Item key={v.path} title={v.title}
        icon={<div style={{width: '22px',height: '22px'}}/>}
        selectedIcon={<div style={{width: '22px',height: '22px'}}/>}
        selected={pathname===v.path}
        onPress={()=>{
            this.props.history.push(v.path)
        }}
        >

        </TabBar.Item>
      ))}
      </TabBar>
      </div>
    )
  }
}

export default NavLinkBar
