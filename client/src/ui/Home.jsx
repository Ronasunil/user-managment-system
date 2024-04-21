export default function Home () {
    return <div>
        <input type="file" id="fileInput" style={{display:"none"}}/>
        <label htmlFor="fileInput">
            <img className="rounded-full" height="100px" width="100%"  src="user.jpeg"/>
        </label>

    </div>
}