const pool =require('../db');

const createJob=async(req,res)=>{
    try{
        const {name, despcription, user_id }=req.body;
        const newJob = await pool.query(
            "INSERT INTO job (job_name,job_description,user_id) VALUES ($1,$2,$3) RETURNING *",
            [name,despcription,user_id ]
        )
        res.json(newJob.rows[0]);
    }catch(err){
        console.error(err.message);
    }
    
}

const delJob=async(req,res)=>{
    try{
        const deleteJob = await pool.query("DELETE FROM job WHERE job_id=$1",
        [req.params.id]);
        await pool.query("DELETE FROM meet WHERE job_id=$1",
        [req.params.id]);
        res.json(req.params.id);
    }catch(err){
        console.log("Id Not Found");
    }
}

const getJob=async(req,res)=>{
    try{
        const allJob = await pool.query("SELECT *,(select count(*) from meet where job_id=job.job_id and sta = 0) as count  FROM job where user_id=$1 order by count desc",[req.params.id]);
        res.json(allJob.rows);
    }catch(error){
        console.error(error.message);
    }
}

const applyJob=async(req,res)=>{
    try{
        const allJob = await pool.query("select *,(select user_name from users where user_id=job.user_id) from job where job_id not in(select job_id from meet where user_id=$1);",[req.params.id]);
        res.json(allJob.rows);
    }catch(error){
        console.error(error.message);
    }
}

module.exports = {
    createJob,
    delJob,
    getJob,
    applyJob
  };