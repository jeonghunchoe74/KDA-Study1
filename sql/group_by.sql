-- 그룹별 집계
select * from us_counties_pop_est_2019;

select region,
	sum(pop_est_2019) as "2019인구추정치합계",
	avg(pop_est_2019) as "2019인구추정치평균",
	percentile_cont(.5) within group (order by pop_est_2019) as "중위수"
from us_counties_pop_est_2019
group by region;

-- 주별 인구추정치의 합계를 구하고, 내림차순으로 정렬
select state_name,
		sum(pop_est_2019) as "2019인구추정치합계"
from us_counties_pop_est_2019
group by state_name
order by "2019인구추정치합계" desc;

select state_fips, state_name,
		sum(pop_est_2019) as "2019인구추정치합계"
from us_counties_pop_est_2019
group by state_fips, state_name
order by "2019인구추정치합계" desc;

-- 주별 인구추정치의 합계를 구하고, 내림차순으로 정렬한 다음 주별 총 인구수가 10,000,000 이상인 데이터만 추출
-- state_fips가 '30' 이상인 주 필터링
select state_fips, state_name,
		sum(pop_est_2019) as "2019인구추정치합계"
from us_counties_pop_est_2019
where state_fips >= '30'
group by state_fips, state_name
having sum(pop_est_2019) >= 10000000
order by "2019인구추정치합계" desc
limit 3;