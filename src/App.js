import React from "react"
import "./App.css"
import { Routes, Route, Router } from "react-router-dom"
import {
  Home,
  Login,
  Header,
  Register,
  AddPost,
  MyItems,
  NoPage,
} from "./pages"
import { useDispatch, useSelector } from "react-redux"
import { fetchAuthMe, selectIsAuth } from "./redux/slices/authSlice"
import FullPost from "./Components/Post/FullPost"

function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/posts/:id" element={<FullPost />} />
        <Route path="/posts/:id/edit" element={<AddPost />} />
        <Route path="/my-items" element={<MyItems />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
  )
}

export default App
