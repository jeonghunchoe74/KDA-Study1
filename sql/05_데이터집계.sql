-- 코드 6-10: SQL 백분위수 함수 테스트하기

CREATE TABLE percentile_test (
    numbers integer
);

INSERT INTO percentile_test (numbers) VALUES
    (1), (2), (3), (4), (5), (6);

select * from percentile_test;
SELECT
    percentile_cont(.5) WITHIN GROUP (ORDER BY numbers), -- 3.5
    percentile_disc(.5) WITHIN GROUP (ORDER BY numbers) -- 3
FROM percentile_test;

select SUM(NUMBERS) FROM percentile_test;
select AVG(NUMBERS) FROM percentile_test;
select MIN(NUMBERS) FROM percentile_test;
select MAX(NUMBERS) FROM percentile_test;

SELECT MODE() WITHIN GROUP (ORDER BY NUMBERS) FROM percentile_test;
SELECT
    percentile_cont(.5) WITHIN GROUP (ORDER BY numbers), -- 3.5
    percentile_disc(.5) WITHIN GROUP (ORDER BY numbers) -- 3
FROM percentile_test;

-- 카운티별 인구 추정치 테이블
select *
from us_counties_pop_est_2019;

-- 2019 총 인구수, 평균 인구수, 중앙값
select sum(pop_est_2019),
		round(avg(pop_est_2019), 0) as avg,
		PERCENTILE_CONT(.5) within group (order by pop_est_2019 )
from us_counties_pop_est_2019

-- 2019 추정치의 사분위수
select
		PERCENTILE_CONT(.25) within group (order by pop_est_2019) as ".25",
		PERCENTILE_CONT(.5) within group (order by pop_est_2019) as ".5",
		PERCENTILE_CONT(.75) within group (order by pop_est_2019) as ".75"
FROM us_counties_pop_est_2019;

-- 2019 추정치의 사분위수
select 
	PERCENTILE_CONT(Array[.25,.5,.75]) within group (order by pop_est_2019)
from us_counties_pop_est_2019;