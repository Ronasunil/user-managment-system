import { Link } from "react-router-dom"

export default function Button({children,type, to, onClick}) {

    const className = {
        login: "rounded bg-white px-4 py-2 text-stone-800 font-semibold  transition-all duration-500 hover hover:ring-2 hover:ring-blue-950 hover:ring-offset-1",
        primary:"bg-blue-600 px-4 py-3 rounded-full text-white font-semibold transition-all duration-500 hover:bg-blue-500",
        delete: "bg-red-600 text-white rounded h-7 text-sm py-1 px-1 transition-all hover:bg-red-500 duration-200",
        edit: "bg-green-600 text-white rounded h-7 text-sm py- px-2 transition-all hover:bg-green-500 duration-200"
    }

    if(to) {
        return <Link className={className[type]} to={to}>{children}</Link>
    }

    return <button onClick={onClick}  className={className[type]}>{children}</button>
}