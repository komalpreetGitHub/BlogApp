import { useNavigate } from "react-router-dom";
import './blog.css'


export default function Blog({ title, description, image, date ,username}) {

    const navigate = useNavigate();

    const dateTime = date?.toString();
    const dates = dateTime?.slice(0, 10)

    function handleclick() {

        navigate('/view', { state: { product: { title, description, image, dates,username } } })
    }

    return (<div className="main">
        <div onClick={handleclick} className="latest_blog">
            <div className="blogs">
                {/* <h1 className="avatar-blog">{username}</h1> */}
                <p>{dates}</p>
                <img src={image} width={100} />
                <h1>{title}</h1>
                <p>{description?.slice(0, 100) + "..."}</p>
            </div>
        </div>
        </div>
    );
}