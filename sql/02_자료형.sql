SELECT * FROM  teachers

-- first_name 과 last_name 합치기
SELECT FIRST_NAME ||' ' || LAST_NAME || ' teacher' as full_name
FROM teachers;

select * from teachers t 

SELECT concat(first_name , ' ', last_name) as full_name
FROM teachers

--first_name, last_name을 연결하고 대문자로 변환하여 아래와 같이 출력하세요.
SELECT upper(first_name ||' '||last_name) as full_name
FROM teachers

--school의 길이를 출력하세요.
select school, LENGTH(school)
from teachers

--first_name의 1번째 문자~3번째문자를 추출하세요.
select first_name, left(first_name, 3) as fisrt_name_left3
from teachers

select first_name, substring(first_name from 1 for 4) as first_name_left3
from teachers;

-- 테이블 자체를 변경
-- 테이블에 컬럼 추가 (ALTER TABLE)
-- 테이블에 데이터 업데이트
ALTER TABLE teachers add column full_name


-- 분석가
-- VIEW - DBA


-- 코드 4-2: 숫자 데이터 타입 활용하기

-- 실습을 위한 테이블 생성
CREATE TABLE number_data_types (
    numeric_column numeric(20,5),
    real_column real,
    double_column double precision
);

-- 실습을 위한 데이터 삽입
INSERT INTO number_data_types
VALUES
    (.7, .7, .7),
    (2.13579, 2.13579, 2.13579),
    (2.1357987654, 2.1357987654, 2.1357987654);

-- 실습을 위한 테이블 생성
SELECT * FROM number_data_types;

--교사 연봉의 30% 인상된 급여 계산하여 아래와 같이 출력해봅시다.
select id, salary as "연봉(원)", salary * 1.3 as "30% 인상된 연봉"
from teachers;

-- 코드 4-4: timestamp 타입과 interval 타입

CREATE TABLE date_time_types (
    timestamp_column timestamp with time zone,
    interval_column interval
);

INSERT INTO date_time_types
VALUES
    ('2022-12-31 01:00 EST','2 days'), -- EST : 미국 동부 표준 시간대
    ('2022-12-31 01:00 -8','1 month'), -- UTC보다 8시간 늦은 시간대
    ('2022-12-31 01:00 Australia/Melbourne','1 century'),
    (now(),'1 week');

SELECT timestamp_column, interval_column, timestamp_column - interval_column as diff
FROM date_time_types;

-- 현재의 날짜, 시간 가져오기
select current_date, current_time, current_timestamp, now();

-- 날짜/ 시간 추출
-- 현재이 연도 
select extract(YEAR FROM NOW()); -- 현재의 연도
SELECT EXTRACT(MONTH FROM NOW()); -- 현재의 월
SELECT EXTRACT(DAY FROM NOW()); -- 현재의 일
SELECT EXTRACT(DOW FROM NOW()), NOW(); -- 현재의 요일 (월: 1)
SELECT EXTRACT(DOW FROM '2025-08-24' :: DATE); -- (일 : 0) 

--교사 입사 연도 추출
select hire_date, extract(year from hire_date) as "입사 연도"
from teachers;

--교사 입사일로부터 100일 후의 날짜 
select hire_date, (hire_date + interval '100 days') :: date as hire_date_after_100days
from teachers;

-- 근속기간
select hire_date, age(now(), hire_date) as period
from teachers;

-- 만 근속 연수
select hire_date, EXTRACT (year from age(now(), hire_date)) as "만 근속 연수"
from teachers;

--현재시점에서 2025년 남은 날짜수
select now() :: date, (date '2025-12-31' - now() :: date) as remaining;
