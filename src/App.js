import React from "react"
import "./App.css"
import { Routes, Route } from "react-router-dom"
import {
  Home,
  Login,
  Register,
  AddPost,
  MyPosts,
  MyProducts,
  AddProduct,
  FullProduct,
  Comments,
  Users,
  Profile,
  Posts,
  Products,
  EditProfile,
  NoPage,
} from "./pages"
import { useDispatch, useSelector } from "react-redux"
import { fetchAuthMe, selectIsAuth } from "./redux/slices/authSlice"
import FullPost from "@components/Post/FullPost"

function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/my-posts" element={<MyPosts />} />
        <Route path="/posts/:id" element={<FullPost />} />
        <Route path="/posts/:id/edit" element={<AddPost />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/my-products" element={<MyProducts />} />
        <Route path="/products/:id" element={<FullProduct />} />
        <Route path="/products/:id/edit" element={<AddProduct />} />
        <Route path="/comments/:id" element={<Comments />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile/:id" element={<Profile />}></Route>
        <Route path="/profile/:id/posts" element={<Posts />}></Route>
        <Route path="/profile/:id/products" element={<Products />}></Route>
        <Route path="/profile/edit" element={<EditProfile />}></Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
  )
}

export default App
