-- 코드 5-2: 10년 주기 카운티 인구조사 추정치 테이블 생성 CREATE TABLE 문
-- drop table us_counties_pop_est_2019;
CREATE TABLE us_counties_pop_est_2019 (
    state_fips char(2),                       -- 주(State)를 식별하는 2자리 코드
    county_fips char(3),                      -- 해당 주 안에서 카운티(County)를 식별하는 3자리 코드 
	region char(1) ,                          -- 구역
	state_name varchar(100),                  -- 주 이름	
    county_name varchar(100),                 -- 카운티 이름
    area_land bigint,                         -- 토지 면적 (제곱미터)
    area_water bigint,                        -- 수면 면적 (제곱미터)
    internal_point_lat numeric(10,7),         -- 위도
    internal_point_lon numeric(10,7),         -- 경도
    pop_est_2018 integer,                     -- 2018년 7월 1일 기준 인구 추정치
    pop_est_2019 integer,                     -- 2019년 7월 1일 기준 인구 추정치
    births_2019 integer,                      -- 2018년 7월 1일부터 2019년 6월 30일 사이 출생자 수
    deaths_2019 integer,                      -- 2018년 7월 1일부터 2019년 6월 30일 사이 사망자 수
    international_migr_2019 integer,          -- 2018년 7월 1일부터 2019년 6월 30일 사이 순 국제 이주자 수
    domestic_migr_2019 integer,               -- 2018년 7월 1일부터 2019년 6월 30일 사이 순 지역 이주자 수
    residual_2019 integer,                    -- 일관성을 위해 추정치를 조정하는 데 사용되는 숫자
    CONSTRAINT counties_2019_key PRIMARY KEY (state_fips, county_fips)	
);

-- 코드 5-3: COPY를 이용한 인구조사 데이터 가져오기
-- 이 코드를 실행하다가 불러오기 오류가 발생할 시 1장을 따라 코드를 다운받으세요.
-- 윈도우 사용자의 경우 29페이지의 노트를 참고하세요.

COPY us_counties_pop_est_2019
FROM 'C:\workspace\sql\us_counties_pop_est_2019.csv'
WITH (FORMAT CSV, HEADER);

select * from us_counties_pop_est_2019 ucpe

------------------------------------------------------------------

-- 코드 5-4: 관리자 급여를 추적하기 위한 테이블 만들기

CREATE TABLE supervisor_salaries (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    town text, -- 담당 지역(읍/면/동)
    county text, -- 카운티(군/구)
    supervisor text, -- 관리자 이름
    start_date text,  -- 급여 시작일 (YYYY-MM-DD)
    salary numeric(10,2), -- 기본 급여 (달러)
    benefits numeric(10,2) -- 복리후생 금액 (달러)
);

delete from supervisor_salaries;
COPY supervisor_salaries (town, supervisor, salary)
FROM 'C:\workspace\sql\supervisor_salaries.csv'
WITH (FORMAT CSV, HEADER);

SELECT COUNT(1) FROM supervisor_salaries;

SELECT * FROM supervisor_salaries;

COPY supervisor_salaries (town, supervisor, salary)
FROM 'C:\WORKSPACE\sql\supervisor_salaries.csv'
WITH (FORMAT CSV, HEADER)
WHERE town = 'New Brillig';

COPY teachers(first_name, last_name, salary)
TO 'C:\workspace\sql\teachers.csv'
with (format csv, header)

copy 
	(select first_name, last_name, salary
	from teachers
	where salary >= 40000)
to 'C:\workspace\sql\teachers.csv'
with (format csv, header);


--drop table wild_fire;
create table wild_fire (
	year char(4) not null PRIMARY KEY, -- 시점
	time char(2) not NULL ,
	total_sum integer,
	spring_case integer,
	summer_case integer,
	fall_case integer,
	winter_case integer
)

copy wild_fire
from 'C:\workspace\sql\seasonal_wildfire.csv'
with (format csv, header)

select * from wild_fire

select count(1) from wild_fire

select * 
from wild_fire
where total_sum >= 500
order by total_sum desc;

copy 
	(select * 
	from wild_fire
	where total_sum > 500
order by total_sum desc)
to 'C:\workspace\sql\seasonal_wildfire.csv'
WITH (format csv, header)

