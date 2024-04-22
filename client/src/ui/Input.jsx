export default function Input({name, label, register, placeholder, error}) {
    
    const errMessage = error[name]?.message
    return <div className="flex flex-col gap-2 relative">
            <label className="font-semibold text-stone-700 text-md">{label}</label>
            <input {...register(name)} className="h-[2.7rem] rounded w-96 px-5 py-4 font-light focus:outline-none shadow-sm focus:shadow-blue-400 transition-all duration-200" type="text"  placeholder={placeholder}/>
            {error[name] && <span className="absolute top-full left-0 flex pr-3 text-red-400 text-sm">{errMessage}</span>}
           </div>
}