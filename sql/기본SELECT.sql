create DATABASE kiwoom;

-- 교사 연봉 테이블
create table teachers (
	id bigserial,
	first_name varchar(25),
	last_name varchar(50),
	school varchar(50),
	hire_date date,
	salary numeric
);

-- 코드 2-3 teachers 테이블에 데이터 삽입하기

INSERT INTO teachers (first_name, last_name, school, hire_date, salary)
VALUES ('Janet', 'Smith', 'F.D. Roosevelt HS', '2011-10-30', 36200),
       ('Lee', 'Reynolds', 'F.D. Roosevelt HS', '1993-05-22', 65000),
       ('Samuel', 'Cole', 'Myers Middle School', '2005-08-01', 43500),
       ('Samantha', 'Bush', 'Myers Middle School', '2011-10-30', 36200),
       ('Betty', 'Diaz', 'Myers Middle School', '2005-08-30', 43500),
       ('Kathleen', 'Roush', 'F.D. Roosevelt HS', '2010-10-22', 38500);

-- 모든 컬럼을 추출
select * from teachers;

-- 컬럼을 지정하여 추출
select t.id as 아이디, t.first_name as 이름, t.last_name as 성
from teachers as t;

-- 학교만 중복을 제거하고 가져오기
select distinct school, salary
from teachers;

-- 정렬
select t.id as 아이디, t.first_name as 이름, t.last_name as 성, t.salary as 연봉
from teachers as t
order by 연봉 desc;

select t.id as 아이디, t.first_name as 이름, t.last_name as 성, t.salary as 연봉
from teachers as t
order by 4 desc;

-- 학교이름이 ‘Myers Middle School’인 선생님 데이터 필터링하기
select * from teachers t
where school = 'Myers Middle School'

--‘F.D. Roosevelt HS’를 제외한 모든 학교이름만 출력하기
select school from teachers t 
where t.school != 'F.D. Roosevelt HS'


--2000년 1월 1일 이전에 고용된 선생님 이름과 고용날짜 출력하기
select first_name, hire_date
from teachers t 
where t.hire_date < '2000-01-01'

--연봉이 $43,500 이상인 선생님 이름과 연봉을 연봉기준 내림차순으로 정렬하여 출력하기
select first_name, last_name, salary from  teachers t 
where salary >= 43500
order by salary desc;

--연봉이 $40,000~$65,000인 선생님의 이름과 연봉을 연봉 기준 오름차순으로 정렬하여 출력하기(①BETWEEN 사용, ② <=, >= 사용)
select first_name, last_name, salary from  teachers t
where salary between 40000 and 65000
order by salary asc;

--first_name이 `sam'으로 시작하는  선생님 이름 출력하기
select * from teachers t 
where t.first_name  ilike 'sam%'

--이름이 ‘S’로 시작되며 연봉이 40,000 이상인 선생님 출력하기
select first_name, last_name from teachers t 
where t.first_name like 'S%' and t.salary >= 40000

--학교가 ‘F.D. Roosevelt HS’이고 연봉이 40,000 미만인 선생님
select first_name, last_name, salary from teachers t
where t.school = 'F.D. Roosevelt HS' and t.salary  < 40000

--성이 ‘Cole’이거나 ‘Bush’인 선생님
select first_name, last_name from teachers
where last_name = 'Cole' or last_name ='Bush';

SELECT *
FROM teachers 
WHERE last_name in ('Cole', 'Bush');

--학교가 ‘F.D. Roosevelt HS’이고 연봉이 38,000 초과 40,000 미만인 선생님
select * from teachers t 
where t.school = 'F.D. Roosevelt HS' and (t.salary between 38000 and 40000)

SELECT *
FROM teachers
WHERE school='F.D. Roosevelt HS' 
AND (salary>38000) and (salary<40000);

-- 학교 이름에 ‘Roos’가 포함되는 선생님의 이름, 학교, 고용일, 연봉 데이터를 고용일 내림차순 정렬하여 출력하기
select first_name as 이름, school as 학교, hire_date as 고용일, salary as 연봉 from teachers
where school like '%Roos%'
order by hire_date desc;

-- 2010년 1월 1일 이후로 고용된 선생님을 나열하되, 연봉 내림차순 기준으로 출력하기
select first_name as 이름, salary as 연봉
from teachers t 
where t.hire_date > '2010-01-01'
order by salary desc;

select * from teachers;

select timestamp_column, cast(timestamp_column as varchar(10))
from date_time_types;

select m.numeric_column, cast(numeric_column as integer),
	cast(numeric_column as text)
from number_data_types m

select timestamp_column, timestamp_column :: varchar(10)
from date_time_types;

-- TO_DATE(문자, 날짜)  : 문자 -> 날짜
SELECT TO_DATE('2025/08/18', 'YYYY/MM/DD');

-- TO_TIMESTAMP (문자, 날짜시간형)
SELECT to_timestamp('2025-08-18 16:30:10', 'YYYY-MM-DD HH24:MI:SS');

-- TO_CHAR(날짜, 문자포멧) : 날짜 -> 문자 포메팅
SELECT TO_CHAR(NOW(), 'YYYY년 MM월 DD일 HH24시 MI분 SS초 DAY')

-- 문자열 -> 숫자
-- TO_NUMBER(문자, 숫자)
SELECT TO_NUMBER('1,234.56789', '9,999.9999')

-- TO_CHAR(숫자, 문자)
SELECT TO_CHAR(1234.5678, 'L9,999.999')

--현재 날짜/시간을 문자열 포메팅
SELECT to_char(now(), 'yyyy년 mm월 dd일 (DY) hh24:mi:ss')

--교사의 연봉을 소수점 2자리까지 표현하고 $표시
SELECT TO_CHAR(SALARY, '$99,999.99') AS salary
FROM teachers;