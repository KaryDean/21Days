import React from 'react'
import {Grid} from 'antd-mobile'

class AvatarSelector extends React.Component{

  render(){
    const avatarList='atongmu,baicai,boluo,haidao,kongshao,tuzi,women,xiaowanzi,xinpuseng,yazi,yifu,zhanshi'
                      .split(',')
                      .map(v=>({
                        icon:require('./img/${v}.jpeg'),
                        text:v
                      }))
    return(
      <div>
        <Grid data={avatarList}
        columnNum={4}
        onClick={elm=>{
          this.props.selectAvatar(elm.text)
        }}
        />
      </div>
    )
  }
}
export default AvatarSelector
