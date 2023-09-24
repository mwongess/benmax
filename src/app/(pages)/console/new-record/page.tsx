const NewRecord = () => {
  return (
    <div className="new-client">
      <h1 className="font-bold mb-2 border-b pb-2">New Client</h1>
      <form action="" className="flex flex-col  gap-8 w-full">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/2 flex flex-col">
            <label htmlFor="">Name</label>
            <input type="text" placeholder="Client Name" />
          </div>
          <div className="w-full sm:w-1/2 flex flex-col">
            <label htmlFor="">Phone</label>
            <input type="text" placeholder="Client phone number" />
          </div>
        </div>
        <div className="w-full flex flex-col">
          <label htmlFor="">Meter Number</label>
          <input type="text" placeholder="Client meter number" />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/2 flex flex-col">
            <label htmlFor="">Initial Units</label>
            <input type="text" placeholder="Initial Units" />
          </div>
          <div className="w-full sm:w-1/2 flex flex-col">
            <label htmlFor="">Final Units</label>
            <input type="text" placeholder="Final Units" />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 font-bold">
          <p className="border-2 border-blue-800 p-2 rounded">Consumed Units : 10  </p>
          <p className="border-2 border-blue-800 p-2 rounded">Cost per units : Ksh 35 </p>
          <p className="border-2 border-blue-800 p-2 rounded">Total Cost : Ksh 350</p>
        </div>
        <div>
          <button type="submit" className="bg-green-500 rounded p-2 w-full">Save</button>
        </div>
      </form>
    </div>
  )
}

export default NewRecord