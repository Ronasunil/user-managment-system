export default function Input({label, onChange, value, placeholder}) {
    return <div className="flex flex-col gap-2">
            <label className="font-semibold text-stone-700 text-md">{label}</label>
            <input className="h-[2.7rem] rounded w-96 px-5 py-4 font-light focus:outline-none shadow-sm focus:shadow-blue-400 transition-all duration-200" type="text" onChange={onChange} value={value} placeholder={placeholder}/>
           </div>
}