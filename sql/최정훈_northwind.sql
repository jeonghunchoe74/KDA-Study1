select count(*) from customers;

select * from customers;

select *
from products p;

select * from
orders p;

select * from order_details od 

-- 월별 매출액
-- 1. 필요한 데이터 불러오기
-- orders => 주문일자
-- order_details => 단가, 갯수, 할인율
WITH amount as (
SELECT o.order_date, od.unit_price , od.quantity, od.discount,
		od.unit_price * od.quantity * (1-od.discount ) as amount,
		extract(year from o.order_date) as year, 
		extract(month from o.order_date) as month
from orders o join order_details od on o.order_id = od.order_id
)
-------------------------
-- 월별 매출액
-------------------------
, month_amount as (
select year, month, sum(amount) as amount
from amount
group by year, month
order by 1,2
)
select * , rank() over (order by amount desc) as "매출액 순위" 
from month_amount 
order by amount desc;


--- 미션2. 전월대비 증감액, 전월대비 매출 비율
with case_sales as (
select extract(year from o.order_date) as year, extract(month from o.order_date) as month,
od.unit_price * od.quantity * (1-od.discount) as "매출액" 
from orders as o join order_details as od on o.order_id = od.order_id
)

, month_sales as (
SELECT year, month, sum("매출액") as "매출액"
from case_sales
group by year, month
order by 1, 2
)
, previous_sales as (
select *, lag("매출액", 1) over (order by year,month) as "전월매출액"
from month_sales
order by 1,2
)
select *, 매출액 - 전월매출액 as 매출증감액, ("매출액" / NULLIF("전월매출액", 0) * 100) :: numeric(10,2) || '%' as 전월비
from previous_sales

--- 미션3. 제품별 매출액, 매출액 순위
with case_sales as (
select c.category_name, p.product_id, p.product_name, s.company_name ,s.country 
from categories c join products p on c.category_id = p.category_id join suppliers s on p.supplier_id = s.supplier_id
)
, product_sales as(
SELECT *
from case_sales
group by product_id
)
select * from product_sales