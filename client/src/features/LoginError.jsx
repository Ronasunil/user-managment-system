export default function LoginError({message}) {
    return (
        <div className='h-10 w-96 ring-1 ring-red-600 bg-red-300 rounded bg-opacity-40 flex items-center'>
            <span className='text-red-600 px-4 '>{message}</span>
        </div>
    )
}