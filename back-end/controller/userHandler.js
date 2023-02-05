const pool =require('../db');

const jwtTokens = require ('../utils/jwt-helper')

const login=async(req,res)=>{
    try{
        const users = await pool.query("SELECT * FROM users where user_id=$1 and user_password=$2;",[req.body.user_id,req.body.user_password]);
        if(users.rows.length===0) return res.status(404).json({error:"Id or Password is incorrect"});
        let tokens= jwtTokens(users.rows[0]);
        res.cookie('refresh_token',tokens.refreshtoken,{httpOnly:true});
        res.json({tokens,users});
    }catch(error){
        res.status(500).json({error:error.message});
    }
};

const createUser =async(req,res)=>{
    try{
        const {user_id,user_name,user_password,user_type}=req.body;
        const users = await pool.query("SELECT user_id FROM users WHERE user_id=$1 ;",
        [user_id]);
        if(users.rows.length!==0) return res.status(400).json({error:"Id Already Exists"});
       
        const newUser = await pool.query(
            "insert into users (user_id,user_name,user_password,user_type) values ($1,$2,$3,$4) RETURNING *;",
            [user_id,user_name,user_password,user_type]
        )
        if(user_type==2)
            {
                await pool.query("insert into resume (user_id) values ($1);",[user_id])
            }
        
        let tokens= jwtTokens(newUser.rows[0]);
        let user=newUser.rows[0];
        res.cookie('refresh_token',tokens.refreshtoken,{httpOnly:true});
        res.json({tokens,user});
    }catch(error){
        res.status(500).json({error:error.message});

    }
};

const allUser =async(req,res)=>{
    try{
        const newUser = await pool.query("SELECT * FROM users;");
        res.json(newUser.rows);
    }catch(error){
        res.status(500).json({error:error.message});
    }
};

const resume = async(req,res)=>{
    try{
        const {name,cont,email,obj,skill,work,edu} = req.body;
        
        const newResume = await pool.query("update resume set name =$1 ,cont=$2,email=$3,obj=$4,skill=$5,work=$6,edu=$7 where user_id = $8 RETURNING *;",
        [name,cont,email,obj,skill,work,edu,req.params.id]);
        res.json(newResume.rows);
    }catch(error){
        res.status(500).json({error:error.message});
    }
}

const resumeDetails =async(req,res)=>{
    try{
        const newUser = await pool.query("SELECT * FROM resume where user_id = $1;",[req.params.id]);
        res.json(newUser.rows);
    }catch(error){
        res.status(500).json({error:error.message});
    }
}

const logout =(req,res)=>{
    try{
        res.clearCookie('refresh_token');
        return res.status(200).json({message:'Logout'})

    }catch(error){
        res.status(401).json({error:error.message})
    }
};

module.exports = {
    login,
    logout,
    createUser,
    allUser,
    resume,
    resumeDetails
  };