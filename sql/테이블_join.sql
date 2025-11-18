-- 코드 7-1: departments 테이블과 employees 테이블 만들기

CREATE TABLE departments (
    dept_id integer,
    dept text,
    city text,
    CONSTRAINT dept_key PRIMARY KEY (dept_id),
    CONSTRAINT dept_city_unique UNIQUE (dept, city)
);

CREATE TABLE employees (
    emp_id integer,
    first_name text,
    last_name text,
    salary numeric(10,2),
    dept_id integer REFERENCES departments (dept_id),
    CONSTRAINT emp_key PRIMARY KEY (emp_id)
);

INSERT INTO departments
VALUES
    (1, 'Tax', 'Atlanta'),
    (2, 'IT', 'Boston');

INSERT INTO employees
VALUES
    (1, 'Julia', 'Reyes', 115300, 1),
    (2, 'Janet', 'King', 98000, 1),
    (3, 'Arthur', 'Pappas', 72700, 2),
    (4, 'Michael', 'Taylor', 89500, 2);

drop table departments ;
drop table employees ;
delete from departments;
DELETE from employees;

select * from departments
select * from employees

select d.dept_id, dept, e.first_name , e.last_name 
from departments as d join employees as e
on d.dept_id = e.dept_id
order by e.dept_id; 

--------------------------------------------------------------------

-- 코드 7-3: JOIN을 살펴보기 위한 두 테이블 생성하기

CREATE TABLE district_2020 (
    id integer CONSTRAINT id_key_2020 PRIMARY KEY,
    school_2020 text
);

CREATE TABLE district_2035 (
    id integer CONSTRAINT id_key_2035 PRIMARY KEY,
    school_2035 text
);

INSERT INTO district_2020 VALUES
    (1, 'Oak Street School'),
    (2, 'Roosevelt High School'),
    (5, 'Dover Middle School'),
    (6, 'Webutuck High School');

INSERT INTO district_2035 VALUES
    (1, 'Oak Street School'),
    (2, 'Roosevelt High School'),
    (3, 'Morrison Elementary'),
    (4, 'Chase Magnet Academy'),
    (6, 'Webutuck High School');

select * from district_2020;
select * from district_2035;

SELECT *
FROM district_2020 as D20 right join district_2035 as d35
on d20.id = d35.id;

-----------------------------------------------------------------------------
CREATE TABLE district_2020_enrollment (
    id integer,
    enrollment integer
);

CREATE TABLE district_2020_grades (
    id integer,
    grades varchar(10)
);

INSERT INTO district_2020_enrollment
VALUES
    (1, 360),
    (2, 1001),
    (5, 450),
    (6, 927);

INSERT INTO district_2020_grades
VALUES
    (1, 'K-3'),
    (2, '9-12'),
    (5, '6-8'),
    (6, '9-12');
select * from district_2020;
select * from district_2020_enrollment;
select * from district_2020_grades;

select d.id, d.school_2020, de.enrollment, dg.grades  
from district_2020 as d join district_2020_enrollment as de on d.id = de.id join district_2020_grades as dg
on  d.id = dg.id
order by d.id;

-------------------------------------
select * from district_2020
intersect
select * from district_2035
order by 1;


