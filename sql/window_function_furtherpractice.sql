
WITH avg_temp AS(
	SELECT ws.지점명, w.날짜, w.평균기온, w.최저기온, w.최고기온
	FROM weather w join weather_station ws  
		             on w.지점=ws.지점
)
SELECT 지점명, 날짜, 평균기온
FROM avg_temp
WHERE 평균기온 > (SELECT AVG(평균기온) FROM WEATHER);

WITH cte1 AS(
	SELECT ws.지점명, w.날짜, w.평균기온, w.최저기온, 
			COALESCE(w.최고기온, 0) AS 최고기온, 
			COALESCE(w."1시간최다강수량", 0) AS "1시간최다강수량" , 
			COALESCE(w.일강수량, 0) AS 일강수량,
		   	EXTRACT(year FROM w.날짜) AS 연도,
		   	EXTRACT(month FROM w.날짜) AS 월
	FROM weather w join weather_station ws on w.지점=ws.지점
)
SELECT 지점명, 날짜, 최고기온,
       rank() over(ORDER BY 최고기온 DESC) AS rank
FROM cte1
WHERE 지점명='서울' 
  AND 연도 = 2025
  AND 월 = 7
  
  select * from weather;
  SELECT * from weather_station ws;
  
  WITH cte1 AS(
	SELECT ws."지점명", w."날짜", w."평균기온", w."최저기온", 
			COALESCE(w."최고기온", 0) AS 최고기온, 
			COALESCE(w."1시간최다강수량", 0) AS "1시간최다강수량" , 
			COALESCE(w."일강수량", 0) AS 일강수량,
		   	EXTRACT(year FROM w."날짜") AS 연도,
		   	EXTRACT(month FROM w."날짜") AS 월
	FROM weather w join weather_station ws on w."지점"=ws."지점"
)
SELECT 지점명, 날짜, 최고기온,
       rank() over(PARTITION BY 지점명 ORDER BY 최고기온 DESC) AS rank
FROM cte1
WHERE 연도 = 2025
  AND 월 = 7
ORDER BY 지점명, 날짜;
---------------------------------
-- 2025년 7월 지점별 이전 날짜와의 최고기온 차이
---------------------------------
select 지점명, 날짜, 최고기온,
	Lag(최고기온) over(Partition by 지점 order by 날짜) as 전날최고기온
from temp
where 연도=2025 and 월=7
order by 지점명, 날짜;

select ws.지점명, w.날짜, w.평균기온, w.최저기온, w.최고기온, EXTRACT(YEAR FROM 날짜) AS 연도, EXTRACT(month FROM 날짜) AS 월
from weather w join weather_station ws on w.지점 = ws.지점
