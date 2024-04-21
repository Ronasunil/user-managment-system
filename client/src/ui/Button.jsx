import { Link } from "react-router-dom"

export default function Button({children,type, to}) {

    const className = {
        login: "rounded bg-white px-4 py-2 text-stone-800 font-semibold  transition-all duration-500 hover hover:ring-2 hover:ring-blue-950 hover:ring-offset-1",
        primary:"bg-blue-600 px-4 py-3 rounded-full text-white font-semibold transition-all duration-500 hover:bg-blue-500"
    }

    if(to) {
        return <Link className={className[type]} to={to}>{children}</Link>
    }

    return <button  className={className[type]}>{children}</button>
}