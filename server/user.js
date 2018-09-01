const express =require('express')
const Router =express.Router()

const util =require('utility')


//数据库表
const model=require('./model')
const User=model.getModel('user')
const Aim=model.getModel('aim')
const LikeAim=model.getModel('likeAim')
const CircuseeAim=model.getModel('circuseeAim')
const EmptyAim=model.getModel('emptyaim')

const _filter={'pwd':0,'__v':0}

var UserID=2//用于以太坊交互，唯一标记用户，逐次添加用户序号


Router.post('/userid',function(req,res){
  const {userid}=req.body

  Aim.find({userid},function(err1,doc1){
    if(err1){
      console.log("查询用户名失败")
      res.json({msg:"查询用户名失败"})
    }
    if(doc1){
      console.log("查询用户名成功",doc1)
      User.find({user:doc1.user},function(err2,doc2){
        if(err2){
          console.log("查询用户ID失败")
          res.json({msg:"查询用户ID失败"})
        }
        if(doc2){
          console.log("查询用户ID成功",doc2)
          res.json({data:doc2[0].ID})
        }
      })
    }
  })
})

Router.post('/user',function(req,res){
  const {user} =req.body
  // console.log("用户ID/user",user)

  User.find({user},function(err,doc){
    if(err){
      // console.log("查询用户ID失败")
      res.json({msg:"查询用户ID失败"})
    }
    if(doc){
      // console.log("查询用户ID成功")
      // console.log(doc[0].ID)
      res.json({data:doc[0].ID})
    }
  })
})

Router.post('/fillaim',function(req,res){
  const {userid}=req.cookies
  const {empty} =req.body
  console.log("empty数组",empty)
  EmptyAim.update({userid},{empty},function(err,doc){
    if(err){
      // console.log("空位数据更新失败")
      res.json({msg:"空位数据更新失败"})
    }
    if(doc){
      // console.log("空位数据更新成功")
      res.json({data:doc})
    }
  })
})

// 查询空位
Router.post('/emptyaim',function(req,res){
  const {userid}=req.cookies
  console.log("userid",userid)
  EmptyAim.findOne({userid},function(err,doc){
    if(err){
      // console.log("查询空位失败")
      res.json({msg:"查询空位失败"})
    }
    if(doc){
      // console.log("查询空位结果",doc)
      res.json({data:doc})
    }
  })
})


//查询是否打卡

Router.post('/ispunchaim',function(req,res){
  const {aimID}=req.body
  const{userid}=req.cookies
  Aim.findOne({userid,aimID},function(err,doc){
    if(err){
      // console.log("查询打卡失败")
      res.json({msg:"查询打卡失败"})
    }
    if(doc){
      // console.log("查询打卡成功")
      if(doc.doneDays===doc.yesterdayDoneDays){
        // console.log("未打卡")
        res.json({data:false})
      }
      if(doc.doneDays>doc.yesterdayDoneDays){
        // console.log("已打卡")
        if(doc.doneDays>=doc.totalDays){
          Aim.update({userid,aimID},{done:true},function(err1,doc2){
            if(err1){
              // console.log("更新打卡完成失败")
              res.json({data:"更新打卡完成失败"})
            }
            if(doc2){
              // console.log("已完成目标")
            }
          })
        }
        res.json({data:true})
      }
    }
  })
})
//打卡
Router.post('/punchaim',function(req,res){
  var record =new Array()
  const {aimID,AddressOfPunch}=req.body
  console.log("打卡ID和地址",req.body)
  const {userid} =req.cookies
  Aim.findOne({userid,aimID},function(err1,doc1){
    if(err1){
      // console.log("查询任务失败")
      res.json({msg:"查询任务失败"})
    }
    if(doc1){
      console.log("打卡：目标打印",doc1)
      record=doc1.Record
      record.push(AddressOfPunch)
      Aim.update({userid,aimID},{doneDays:doc1.doneDays+1,Record:record},function(err2,doc2){
        if(err2){
          // console.log("更新任务失败")
          res.json({msg:"更新任务失败"})
        }
        if(doc2){
          // console.log("打卡成功")
          res.json({data:doc2})
        }
      })
    }
  })
})

//查询围观任务
Router.get('/circusee',function(req,res){
  const{userid}=req.cookies

  CircuseeAim.find({userid},function(err,doc){
    if(err){
      // console.log('查询围观目标失败')
      res.json({msg:'查询围观目标失败'})
    }
    if(doc){
      // console.log('查询围观目标成功',doc)
      let aims=[]//一个含有用户名的aim
      // res.json({data:doc})
      doc.map(v=>{
        Aim.findOne({aimID:v.aimID},function(err1,doc1){
          if(err1){
            // console.log("查询目标失败")
            res.json({msg:"查询目标失败"})
          }
          if(doc1){
            // console.log("查询目标成功")
            // console.log(doc1._doc)
            aims.push(doc1._doc)
          }
        })
      })
      setTimeout(()=>{res.json({data:aims});console.log(aims)},200)
    }
  })
})

//查询完成任务
Router.get('/aimdone',function(req,res){
  const {userid}=req.cookies

  Aim.find({userid,done:true},function(err,doc){
    if(err){
      // console.log('个人完成任务查询失败')
      res.json({msg:'个人完成任务查询失败'})
    }
    if(doc){
      // console.log('个人完成任务查询成功')
      res.json({data:doc})
    }
  })
})

//查询未完成任务
Router.get('/aimundo',function(req,res){
  const {userid}=req.cookies

  Aim.find({userid,done:false},function(err,doc){
    if(err){
      // console.log('个人未完成任务查询失败')
      res.json({msg:"个人未完成任务查询失败"})
    }
    if(doc){
      // console.log('个人未完成任务查询成功')
      res.json({data:doc})
    }
  })
})


// 查询围观情况
Router.post('/circuseeinfo',function(req,res){
  const aimID =req.body.aimID1
  // console.log(aimID)
  const {userid} =req.cookies
  // console.log("目标ID，用户ID",aimID,userid)
  CircuseeAim.findOne({aimID,userid},function(err,doc){
    if(err){
      // console.log("查询失败围观失败")
      return res.json({code:0,msg:"查询失败围观失败"})
    }
    if(doc){
      // console.log("查询围观成功")
      return res.json({code:1})
    }else{
      // console.log("未查询到围观记录")
      return res.json({code:0})
    }

  })
})

//查询点赞情况
Router.post('/likeinfo',function(req,res){
  const {aimID} =req.body
  const {userid} =req.cookies
  LikeAim.findOne({aimID,userid},function(err,doc){
    if(err){
      // console.log("查询失败点赞失败")
      return res.json({code:0,msg:"查询失败点赞失败"})
    }
    if(doc){
      // console.log("查询点赞成功")
      return res.json({code:1,data:aimID})
    }else{
      // console.log("未查询到点赞记录")
      return res.json({code:0,data:aimID})
    }

  })
})


Router.get('/info',function(req,res){
  // User.remove({},function(err,doc){})//清空操作
  const {userid}=req.cookies
  if(!userid){
    return res.json({code:1})
  }
  User.findOne({_id:userid},_filter,function(err,doc){
    if(err){
      return res.json({code:1,msg:"后端出错了"})
    }
    if(doc){
      return res.json({code:0,data:doc})
    }
  })
})

Router.post('/userinfo',function(req,res){
  const {userid}=req.body
  User.findOne({_id:userid},_filter,function(err,doc){
    if(err){
      return res.json({msg:"后端出错了"})
    }
    if(doc){
      // console.log("个人信息查询",doc)
      return res.json({data:doc})
    }
  })
})

Router.post('/register',function(req,res){
  const {user,pwd,age,carrer}=req.body
  User.findOne({user},_filter,function(err,doc){
    if(err){
      return res.json({code:1,msg:"后端出错"})
    }
    if(doc){
      return res.json({code:1,msg:"用户名重复"})
    }
    const userModel=new User({user,age,carrer,ID:UserID,pwd:MD5(pwd)})
    userModel.save(function(e,d){
      if(e){
        return res.json({code:1,msg:"后端出错"})
      }
      else{
        const {user,age,_id,carrer}=d
        UserID+=1//用户序号加一
        let a=[0,0,0,0,0,0,0,0,0,0]
        EmptyAim.create({userid:_id,empty:a},function(err1,doc1){
          if(err1){
            // console.log("数据库置空失败")
            return res.json({msg:"数据库置空失败"})
          }
        })
        return res.json({code:0,data:{user,age,carrer,ID:UserID-1}})
      }
    })
  })
})

Router.post('/login',function(req,res){
  const {user,pwd}=req.body
  User.findOne({user,pwd:MD5(pwd)},_filter,function(err,doc){
    if(err){
      return res.json({code:1,msg:"后端出错"})
    }
    if(doc){
      res.cookie('userid',doc._id)
      // console.log("注册：",doc)
      return res.json({code:0,data:doc})
    }else{
      return res.json({code:1,msg:"用户密码错误"})
    }
  })
})

Router.post('/searchaim',function(req,res){
  Aim.find({},function(err,doc){
    if(err){
      // console.log("查询所有失败")
      res.json({msg:"查询所有失败"})

    }
    if(doc){
      // console.log("所有目标情况",doc)
      res.json({data:doc})
    }
  })
})


//点赞操作，谁给什么目标点了赞，用户ID给目标ID点了赞
Router.post('/likeaim',function(req,res){
  const {aimID} =req.body
  const {userid}=req.cookies
  // console.log(userid)
  // console.log(aimID)
  //先查找，如果点过赞了，就撤销这个赞，如果没有则创建这个赞
  LikeAim.findOne({aimID,userid},function(err,doc){
    if(err){
      // console.log("点赞查询失败")
      return res.json({msg:"点赞查询失败"})
    }
    if(doc){//有点赞记录，我们删除点赞记录
      LikeAim.remove({aimID,userid},function(err1,doc1){
        if(err1){
          // console.log('点赞删除失败1')
          return res.json({msg:"点赞删除失败1"})
        }
        if(doc1){//点赞删除成功
          Aim.findOne({aimID},function(err2,doc2){
            if(err2){
              // console.log("删除点赞数量失败1")
              return res.json({msg:"删除点赞数量失败1"})
            }
            if(doc2){
              Aim.update({aimID},{like:doc2.like-1},function(err3,doc3){
                if(err3){
                  // console.log("点赞数量删除失败2")
                  return res.json({msg:"删除点赞数量失败2"})
                }
                if(doc3){
                  // console.log('点赞删除成功')
                  return res.json({data:doc3})
                }
              })
            }
          })
        }
      })

    }else{//没有点赞记录，我们添加点赞记录
      LikeAim.create({aimID,userid},function(err1,doc1){
        if(err1){
          // console.log('点赞失败1')
          return res.json({msg:'点赞失败1'})
        }
        if(doc1){
          Aim.findOne({aimID},function(err2,doc2){
            if(err2){
              // console.log('点赞失败2')
              return res.json({msg:'点赞失败2'})
            }
            if(doc2){
              Aim.update({aimID},{like:doc2.like+1},function(err3,doc3){
                if(err3){
                  // console.log('点赞失败3')
                  return res.json({msg:'点赞失败3'})
                }
                if(doc3){
                  // console.log("点赞成功")
                  return res.json({data:doc3})
                }
              })
            }
          })
        }
      })
    }
  })
})


Router.post('/circuseeaim',function(req,res){
  // console.log(req)
  // console.log(req.body)
  const {aimID,EmptyCircusee,AddressOfCircusee} = req.body
  const {userid}=req.cookies
  var EmptyCircuseeArray = [0,0,0,0,0]
  EmptyCircuseeArray[EmptyCircusee]=1
  CircuseeAim.findOne({aimID,userid},function(err,doc){
    if(err){
      // console.log("查询监督错误")
      return res.json({msg:"查询监督错误"})
    }
    if(doc){//查询到就删除
      // console.log("查询到监督记录")
      CircuseeAim.remove({aimID,userid},function(err1,doc1){
        if(err1){
          // console.log("删除监督失败1")
          return res.json({msg:"删除监督失败1"})
        }
        if(doc1){
          // console.log("删除监督成功1")
          Aim.findOne({aimID},function(err2,doc2){
            if(err2){
              // console.log("删除监督失败2")
              return res.json({msg:"删除监督成功2"})
            }
            if(doc2){
              // console.log("删除监督成功2")
              Aim.update({aimID},{circusee:doc2.circusee-1},function(err3,doc3){
                if(err3){
                  // console.log("删除监督失败3")
                  return res.json({msg:"删除监督失败3"})
                }
                if(doc3){
                  // console.log("删除监督成功")
                  return res.json({data:doc3})
                }
              })
            }
          })
        }
      })

    }else{//没有查询到就添加
      // console.log("没有查询到监督记录")

      CircuseeAim.create({aimID,userid},function(err1,doc1){
        if(err1){
          // console.log('监督失败1')
          return res.json({msg:'监督失败1'})
        }
        if(doc1){
          Aim.findOne({aimID},function(err2,doc2){
            if(err2){
              // console.log('监督失败2')
              return res.json({msg:'监督失败2'})
            }
            if(doc2){
              Aim.update({aimID},{circusee:doc2.circusee+1,EmptyCircusee:EmptyCircuseeArray,AddressOfCircusee:AddressOfCircusee},function(err3,doc3){
                if(err3){
                  // console.log('监督失败3')
                  return res.json({msg:'监督失败3'})
                }
                if(doc3){
                  // console.log("监督成功")
                  return res.json({data:doc3})
                }
              })
            }
          })
        }
      })
    }
  })
})

Router.post('/aim',function(req,res){
  // Aim.remove({},function(err,doc){})
  const{aim,detail,money,type,totalDays,restDays,AddressOfTotal,AddressOfDeposit,empty}=req.body
  const {userid}=req.cookies
  const EmptyCircusee =[0,0,0,0,0,0]
  const aimModel=new Aim({userid,aim,detail,money,type,totalDays,restDays,AddressOfTotal,AddressOfDeposit,doneDays:0,yesterdayDoneDays:0,rest:0,like:0,circusee:0,done:false,Location:empty,EmptyCircusee:EmptyCircusee})
  aimModel.save(function(e,d){
    if(e){
      return res.josn({msg:"新目标创建失败"})
    }else{
      const aimID=d._id
      d['aimID']=aimID
      Aim.update({'_id':d._id},{'aimID':d._id},function(err,doc){
        if(err){
          // console.log("更新失败")
        }else{
          // console.log("更新成功")
        }
      })
      // console.log("创建目标信息：",d)
      return res.json({data:d})
    }
  })
})



function MD5(data){
  salt='DW_tjx_love_1314520'
  return util.md5(util.md5(data+salt))
}

module.exports =Router
