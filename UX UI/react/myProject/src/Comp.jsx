function Welcome() {
    return <h1>Hello. Welcome!!!</h1>
}

function Welcome1(props) {
    return <p>Hello. {props.myName}!!</p>
}

function Element(){
    return (
        <>
            <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        </>
    )
}

function LoggedIn(){
    let a = true;
    return (
        <> 
            <div style={{...(a? styleA : styleB)}}> 동적 스타일 적용</div>
             a ? <p>로그인 되어 있습니다</p> : <p>로그인 되어 있지 않습니다</p>

        </>

    )
}

function List_Fruits() {
    const fruits = ["apple", "banana", "cherry"];
    let total = 0
    return (
        // JSX 문법을 사용하여 컴포넌트를 작성.
        <>
        <ul>
            {
            fruits.map((fruit, index) =>
                <li key={index}>{fruit}</li>)
            }
            {[1,2,3,4].map((num, index) => <p key={index}>{num*2}</p>)}
            <br></br>
            {[1,2,3,4].filter(n=>n%2==0)
            .map((n, index) => <p key={index}>{n}</p>)}
        </ul>
        </>
    )
}

const styleA = {
    color: 'red',
    fontWeight : 'bold'
}
const styleB = {
    color: 'navy',
    textDecoration : 'underline'
}

import{useState} from 'react'

function Counter(){
    const [count, setCount] = useState(0);
    const [appearance, changeState] = useState(false); 
    return (
        <>
            <p>버튼을 {count}번 클릭했습니다.</p>
            <button onClick={()=>setCount(count+10)}>+클릭</button>
            <button onClick={()=>setCount(count-10)} disabled={count===0} >-클릭</button>
            <button onClick={()=>changeState(!appearance)}>{appearance? '📌 Pin This' : "Pin This"}</button>
        </>
    )
}

export {Welcome, Welcome1, Element, LoggedIn, List_Fruits, Counter}