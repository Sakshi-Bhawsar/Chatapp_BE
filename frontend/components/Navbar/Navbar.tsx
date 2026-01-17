const Navbar =()=>{
    return (
        <div className="w-full  flex justify-between items-center px-8 py-2 border-b">
               <div>
                   <input type="text" placeholder="Search..." className="border rounded-md px-2 py-1"/>
               </div>
               <div className=" ">
                   <h1>Chat app</h1>
               </div>
        </div>
    )
}

export default Navbar;