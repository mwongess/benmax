const Overview = () => {
    return (
        <div className="overview text-slate-200">
            <div className="border-b border-slate-200 p-4">
                <h1 className="font-bold text-2xl">Overview</h1>
            </div>
            <div className="overview-cards ">
                <div className="all-clients-card flex flex-col justify-between">
                    <h1 className="font-bold text-xl">My Clients</h1>
                    <p className="font-bold bg-gray-300 rounded-full py-1 px-8 w-fit">{"< 5 />"}</p>
                </div>
                <div className="active-clients-card">
                    <h1 className="font-bold text-xl">Active Clients</h1>
                </div>
                <div className="summary-card row-span-2">
                    <h1 className="font-bold text-xl">Summary</h1>
                </div>
                <div className="total-card">
                    <h1 className="font-bold text-xl">Total Bill</h1>
                </div>
                <div className="paid-card ">
                    <h1 className="font-bold text-xl">Paid Bill</h1>
                </div>
            </div>
        </div>
    )
}

export default Overview