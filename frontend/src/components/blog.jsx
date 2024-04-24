import { useNavigate } from "react-router-dom";
import './blog.css'


export default function Blog ({title,description,image}) {

    const navigate = useNavigate();
    function handleclick(){
        navigate('/view', {state :{product:{title,description,image}}})
    }
    return(
        <div onClick={handleclick} className="latest_blog">
            <div className="blogs">
            <h1>{title}</h1>
            <p>{description.slice(0,100) + "..."}</p>
          </div>
        </div>
    );
}