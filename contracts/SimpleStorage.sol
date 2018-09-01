pragma solidity ^0.4.18;

contract SimpleStorage {
    
    uint[10] public balanceOf=[uint(10000),100,100,100,100,100,100,100,100,100];
    
    function setToken(uint userNumber,uint number) public{
        balanceOf[userNumber-1]=number;
    }
    function selectToken(uint userNumber) public view returns(uint){
        return(balanceOf[userNumber-1]);
    }
   
    
    struct personalInf{
        uint[10] Day; 
        bool[100][10] isFinished;  //每一天是否完成
        uint[10] deposit;  //押金
        uint[6][10] onlookers;  //围观者
        bool[10] endFinished;  //21天目标是否完成
        bool[10] flag; //防止重复执行executeRewardorpunishment
    }
    
    mapping(uint => personalInf) PersonalInf;
    
    // function setRelaxday(uint userNumber,uint planNumber,uint _relaxDay) public  //设置休息天数
    // {
    //     PersonalInf[userNumber-1].relaxDay[planNumber-1] = _relaxDay;
    // }
    // function selectRelaxday(uint userNumber,uint planNumber) public view returns(uint)  //查询休息天数
    // {
    //     return(PersonalInf[userNumber-1].relaxDay[planNumber-1]);
    // }
    
    function setDay(uint userNumber,uint planNumber,uint _Day) public
    {
        PersonalInf[userNumber-1].Day[planNumber-1] = _Day;
        for(uint m=0; m<PersonalInf[userNumber-1].Day[planNumber-1]; m++)
        {
            PersonalInf[userNumber-1].isFinished[planNumber-1][m] = true;
        }
    }
    function selectDay(uint userNumber,uint planNumber) public view returns(uint)  //查询休息天数
    {
        return(PersonalInf[userNumber-1].Day[planNumber-1]);
    }
    
    function setIsfinished(uint userNumber,uint planNumber,uint dayNumber) public  //设置每天是否完成
    {
      
        PersonalInf[userNumber-1].isFinished[planNumber-1][dayNumber-1] = false;
    }
    function selectIsfinished(uint userNumber,uint planNumber,uint dayNumber) public view returns(bool)  //查询每天是否完成
    {
        return(PersonalInf[userNumber-1].isFinished[planNumber-1][dayNumber-1]);
    }
    
    function setDeposit(uint userNumber,uint planNumber,uint _deposit) public  //设置保证金
    {
        if(balanceOf[userNumber-1]>=_deposit)
        {
            PersonalInf[userNumber-1].deposit[planNumber-1] = _deposit;
            balanceOf[userNumber-1] -= _deposit;
            balanceOf[0] += _deposit;
        }
    }
    function selectDeposit(uint userNumber,uint planNumber) public view returns(uint)  //查询保证金
    {
        return(PersonalInf[userNumber-1].deposit[planNumber-1]);
    }
    
    function setOnlookers(uint userNumber,uint planNumber,uint _onlookersNumber,uint _onlookers) public  //设置围观者
    {
        PersonalInf[userNumber-1].onlookers[planNumber-1][_onlookersNumber-1]=_onlookers;
    }
    function selectOnlookers(uint userNumber,uint planNumber) public view returns(uint,uint,uint,uint,uint,uint)  //查询围观者
    {
        return(PersonalInf[userNumber-1].onlookers[planNumber-1][0],PersonalInf[userNumber-1].onlookers[planNumber-1][1],PersonalInf[userNumber-1].onlookers[planNumber-1][2],PersonalInf[userNumber-1].onlookers[planNumber-1][3],PersonalInf[userNumber-1].onlookers[planNumber-1][4],PersonalInf[userNumber-1].onlookers[planNumber-1][5]);
    }
    
    function judgeEndfinished(uint userNumber,uint planNumber) public  //判断是否完成目标
    {
        uint day=0;
        //uint workDay = 21 - PersonalInf[userNumber-1].relaxDay[planNumber-1];
        for(uint i=0; i<100; i++)
        {
            if(PersonalInf[userNumber-1].isFinished[planNumber-1][i] == false)
            {
                day++;
            }
        }
        if(day == 100)
        {
            PersonalInf[userNumber-1].endFinished[planNumber-1] = true;
        }
    }
    function selectEndfinished(uint userNumber,uint planNumber) public view returns(bool)  //查询21天计划是否完成
    {
        return(PersonalInf[userNumber-1].endFinished[planNumber-1]);
    }
    
    function executeRewardorpunishment(uint userNumber,uint planNumber) public  //执行回收资金或惩罚机制
    {
        if(PersonalInf[userNumber-1].flag[planNumber-1] == false)
        {
            if(PersonalInf[userNumber-1].endFinished[planNumber-1] == true)
            {
                //return token from main account
                balanceOf[userNumber-1] += PersonalInf[userNumber-1].deposit[planNumber-1];
                balanceOf[0] -= PersonalInf[userNumber-1].deposit[planNumber-1];
            }
            else
            {
                uint testnum=0;
                for(uint j=0; j<6; j++)
                {
              
                    if(PersonalInf[userNumber-1].onlookers[planNumber-1][j]!= uint(0))
                    {
                        testnum++;
                    }
                }
                uint averageDeposit=0;
                averageDeposit=PersonalInf[userNumber-1].deposit[planNumber-1]/testnum;
                for(uint k=0; k<6; k++)
                {
                    if(PersonalInf[userNumber-1].onlookers[planNumber-1][k]!=0)
                    {
                        balanceOf[PersonalInf[userNumber-1].onlookers[planNumber-1][k]-1] += averageDeposit;
                        balanceOf[0] -= averageDeposit;
                    }
                }
            }
        }
        
        PersonalInf[userNumber-1].flag[planNumber-1] = true;
    }
    
}
