import { useNavigate } from "react-router-dom";
import './blog.css'


export default function Blog ({title,description,image, date}) {

    const navigate = useNavigate();
    function handleclick(){
        navigate('/view', {state :{product:{title,description,image,date}}})
    }
    const dateTime = date.toString()
    const dates = dateTime.slice(0,10)
    return(
        <div onClick={handleclick} className="latest_blog">
            <div className="blogs">
                <p>{dates}</p>
            <h1>{title}</h1>
            <p>{description.slice(0,100) + "..."}</p>
          </div>
        </div>
    );
}