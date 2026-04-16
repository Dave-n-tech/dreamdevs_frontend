import { increment, decrement } from "../slice/counterSlice"
import { useSelector, useDispatch } from "react-redux"

export const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: { counter: { count: number } }) => state.counter.count);

  return (
    <div>
        <div>
            <p>Count: {count}</p>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
        </div>
    </div>
  )
}
