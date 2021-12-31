import * as React from "react"

const Home = () => {
  const [counter, setCounter] = React.useState<number>(0)
  return (
    <>
      <h1>{counter}</h1>
      <button
        onClick={() => {
          setCounter(counter + 1)
        }}
      >
        hahha
      </button>
    </>
  )
}

export default Home
