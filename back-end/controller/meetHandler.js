const pool =require('../db');

const relation=async(req,res)=>{
    try{
        const { user_id ,job_id}=req.body;
        const newJob = await pool.query(
            "INSERT INTO meet (user_id,job_id,sta) VALUES ($1,$2,0) RETURNING *",
            [user_id,job_id ]
        )
        res.json(newJob.rows[0]);
    }catch(err){
        console.error(err.message);
    }
    
};


const job_applied =async(req,res)=>{
    try{
        
        const allmeet = await pool.query("select *, (select user_name from users where job.user_id=user_id),(select sta from meet where user_id=$1 and job_id=job.job_id) from job where job_id in (select job_id from meet where user_id=$1);",[req.params.id]);
        res.json(allmeet.rows);
    }catch(error){
        console.error(error.message);
    }
};

const user_applied =async(req,res)=>{
    try{
        const allmeet = await pool.query("select * ,(select sta from meet where job_id=$1 and resume.user_id=user_id) from resume where user_id in (select user_id from meet where job_id=$1 );",[req.params.id]);
        const allJob = await pool.query("SELECT *  FROM job where job_id=$1",[req.params.id]);
        let data ={
            meet:allmeet.rows,
            job:allJob.rows[0]
        }
        res.json(data);
    }catch(error){
        console.error(error.message);
    }
}


const rejstatus =async(req,res)=>{
    try{
        const allmeet = await pool.query("update meet set sta = -1 where user_id = $1 and job_id =$2;",
        [req.params.user_id,req.params.job_id]);
        res.json(allmeet);
    }catch(error){
        console.error(error.message);
    }
}

const accstatus =async(req,res)=>{
    try{
        const allmeet = await pool.query("update meet set sta = 1 where user_id = $1 and job_id =$2;",
        [req.params.user_id,req.params.job_id]);
        res.json(allmeet);
    }catch(error){
        console.error(error.message);
    }
}

module.exports ={relation,job_applied,user_applied,rejstatus,accstatus}