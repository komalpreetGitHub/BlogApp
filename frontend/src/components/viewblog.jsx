import { useLocation } from "react-router-dom";
import "./viewblog.css"



export default function ViewBlog(){
    const location = useLocation();
    const product = location.state?.product;
    console.log(product.image)
    return<>

<div className="view">
<h1>{product.title}</h1>
<img src = {product.image} className="image" alt=""/>
<p>{product.description}</p>
</div>
    </>
}