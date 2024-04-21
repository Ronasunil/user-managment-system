import Button from "./Button"


export default function PageHeading() {
    return <div className="flex justify-center items-center  flex-col gap-7">
         <h1 className=" font-obrivon text-blue-500  text-5xl">Explore the dummy site</h1>
         <Button type="primary">Get started</Button>
    </div>
}