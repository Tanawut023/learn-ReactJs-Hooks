import { useState, useEffect, use, createContext, useContext, useRef, useReducer } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

const UserContext = createContext()
const initTools = [
  { id: 1, title: 'Todo 1', complete: false },
  { id: 2, title: 'Todo 2', complete: false },
  { id: 3, title: 'Todo 3', complete: false }
]
const reducer = (state, action) => {
  switch (action.type) {
    case 'COMPLETE':
      return state.map((todo) => {
        if (todo.id === action.id) {
        return { ...todo, complete: !todo.complete }
      } else {
        return todo
      }
      })
    default:
      return state
  }
}

  function App() {
    const [count, setCount] = useState(0)
    const [name, setName] = useState('Tanawut')
    const [data, setData] = useState([])
    const [inputValue, setInputValue] = useState('')
    const countV = useRef(0)
    const inputElement = useRef()
    const previousInputValue = useRef('')
    const [todos, dispatch] = useReducer(reducer, initTools)


    const focusInput = () => {
      inputElement.current.focus()
    }

    useEffect(() => {
      fetch(`https://jsonplaceholder.typicode.com/users/${count}`)
        .then((response) => response.json())
        .then((data) => setData(data))
    }, [count])

    console.log(data);

    // useEffect(() => {
    //   countV.current = countV.current + 1
    // },[inputValue])

    // console.log(countV);

    useEffect(() => {
      previousInputValue.current = inputValue
    }, [inputValue])

    console.log(previousInputValue.current);

    const handleComplete = (todo) => {
      dispatch({ type: 'COMPLETE', id: todo.id })
    }
    console.log(todos);

    return (
      <>
        <UserContext.Provider value={data}>

          <section id="center">
            <div className="hero">
              <img src={heroImg} className="base" width="170" height="179" alt="" />
              <img src={reactLogo} className="framework" alt="React logo" />
              <img src={viteLogo} className="vite" alt="Vite logo" />
            </div>
            <div>
              <h1>Get started</h1>
              <p>
                Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
              </p>
              <p>Welcome, {name}!</p>
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <h2>Current Value: {inputValue}</h2>
            <h2>Previous Value: {previousInputValue.current} </h2>

            <input type="text" ref={inputElement} />
            <button onClick={focusInput}>Focus Input</button>

            <button
              type="button"
              className="counter"
              onClick={() => setName('Tanawut R.')}
            >
              Update name!
            </button>
            <p>
              <h3>Count is {count}</h3>
              <button
                type="button"
                className="counter"
                onClick={() => setCount((count) => count + 1)}
              >
                Increase
              </button>
              <button
                type="button"
                className="counter"
                onClick={() => setCount((count) => count - 1)}
              >
                Decrease
              </button>
            </p>
            <ChildComponent1 user={data} />

            {todos.map((todo) => (
              <div key={todo.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={todo.complete}
                    onChange={() => handleComplete(todo)}
                  />
                  {todo.title}
                </label>
              </div>
            ))}

          </section>

          <div className="ticks"></div>

          <section id="next-steps">
            <div id="docs">
              <svg className="icon" role="presentation" aria-hidden="true">
                <use href="/icons.svg#documentation-icon"></use>
              </svg>
              <h2>Documentation</h2>
              <p>Your questions, answered</p>
              <ul>
                <li>
                  <a href="https://vite.dev/" target="_blank">
                    <img className="logo" src={viteLogo} alt="" />
                    Explore Vite
                  </a>
                </li>
                <li>
                  <a href="https://react.dev/" target="_blank">
                    <img className="button-icon" src={reactLogo} alt="" />
                    Learn more
                  </a>
                </li>
              </ul>
            </div>
            <div id="social">
              <svg className="icon" role="presentation" aria-hidden="true">
                <use href="/icons.svg#social-icon"></use>
              </svg>
              <h2>Connect with us</h2>
              <p>Join the Vite community</p>
              <ul>
                <li>
                  <a href="https://github.com/vitejs/vite" target="_blank">
                    <svg
                      className="button-icon"
                      role="presentation"
                      aria-hidden="true"
                    >
                      <use href="/icons.svg#github-icon"></use>
                    </svg>
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://chat.vite.dev/" target="_blank">
                    <svg
                      className="button-icon"
                      role="presentation"
                      aria-hidden="true"
                    >
                      <use href="/icons.svg#discord-icon"></use>
                    </svg>
                    Discord
                  </a>
                </li>
                <li>
                  <a href="https://x.com/vite_js" target="_blank">
                    <svg
                      className="button-icon"
                      role="presentation"
                      aria-hidden="true"
                    >
                      <use href="/icons.svg#x-icon"></use>
                    </svg>
                    X.com
                  </a>
                </li>
                <li>
                  <a href="https://bsky.app/profile/vite.dev" target="_blank">
                    <svg
                      className="button-icon"
                      role="presentation"
                      aria-hidden="true"
                    >
                      <use href="/icons.svg#bluesky-icon"></use>
                    </svg>
                    Bluesky
                  </a>
                </li>
              </ul>
            </div>
          </section>
        </UserContext.Provider>
        <div className="ticks"></div>
        <section id="spacer"></section>
      </>
    )
  }

  function ChildComponent1() {
    return (
      <div>
        <h1>Child Component 1</h1>
        <ChildComponent2 />
      </div>
    )
  }
  function ChildComponent2() {
    return (
      <div>
        <h1>Child Component 2</h1>
        <ChildComponent3 />
      </div>
    )
  }
  function ChildComponent3() {
    return (
      <div>
        <h1>Child Component 3</h1>
        <ChildComponent4 />
      </div>
    )
  }
  function ChildComponent4() {
    return (
      <div>
        <h1>Child Component 4</h1>
        <ChildComponent5 />
      </div>
    )
  }
  function ChildComponent5() {

    const user = useContext(UserContext)

    return (
      <div>
        <h1>Child Component 5</h1>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>
    )
  }
  export default App
