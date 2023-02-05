create database job_db;

create table users(
    user_id varchar(25) primary key,
    user_name TEXT NOT NULL,
    user_password TEXT NOT NULL,
    user_type int
);

create table job(
    job_id SERIAL primary key,
    job_name text Not NULL,
    job_description text Not NULL,
    user_id varchar(25) 
);

create table meet(
    user_id varchar(25),
    job_id int,
    sta int
);

create table resume(
    user_id varchar(25),
    name text ,
    cont varchar(10),
    email varchar(225) ,
    obj text,
    skill text,
    work text,
    edu text
);

update resume set name =$1 ,cont=$2,email=$3,obj=$4,skill=$5,work=$6,edu=$7 where user_id = $8;