const mongoose=require('mongoose')
const DB_URL='mongodb://127.0.0.1:27017/user'
mongoose.connect(DB_URL)

const models={
  user:{
    'ID':{type:Number,require:true},
    'user':{type:String,require:true},
    'pwd':{type:String,require:true},
    'age':{type:String},
    'carrer':{type:String},
    'avatar':{type:String}
  },
  aim:{
    "AIMID":{type:Number,require:true},
    'user':{type:String,require:true},
    'userid':{type:String,require:true},
    'aim':{type:String,require:true},
    'aimID':{type:String,require:true},
    'detail':{type:String,require:true},
    'money':{type:Number,require:true},
    'type':{type:String,require:true},
    'doneDays':{type:Number,require:true},
    'yesterdayDoneDays':{type:Number,require:true},
    'totalDays':{type:Number,require:true},
    'restDays':{type:Number,require:true},
    'rest':{type:Number,require:true},
    'like':{type:Number,require:true},
    'circusee':{type:Number,require:true},
    'done':{type:Boolean,require:true},
    'AddressOfTotal':{type:String,require:true},
    'AddressOfDeposit':{type:String,require:true},
    'Record':{type:Array},
    'Location':{type:Number,require:true},
    'EmptyCircusee':{type:Array,require:true},
    'AddressOfCircusee':{type:Array,require:true}
  },
  likeAim:{
    'userid':{type:String,require:true},
    'aimID':{type:String,require:true}
  },
  circuseeAim:{
    'userid':{type:String,require:true},
    'aimID':{type:String,require:true}
  },
  emptyaim:{
    'empty':{type:Array,require:true},
    'userid':{type:String,require:true}
  }
}

for (let m in models){
  mongoose.model(m,new mongoose.Schema(models[m]))
}

module.exports={
  getModel:function(name){
    return mongoose.model(name)
  }
}
