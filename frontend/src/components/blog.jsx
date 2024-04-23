

export default function Blog ({title,description}) {
    return(
        <div className="latest_blog">
            <div className="blogs">
            <h1>{title}</h1>
            <h2>{description.slice(0,100) + "..."}</h2>
          </div>
        </div>
    );
}