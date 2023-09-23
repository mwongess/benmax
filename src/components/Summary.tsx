const Summary = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-3">
            <div className="w-full flex  justify-between border p-3">
                <p>ICON</p>
                <p>Total Clients</p>
            </div>
            <div className="w-full flex  justify-between border p-3">
                <p>ICON</p>
                <p>Total Bill</p>
            </div>
            <div className="w-full flex  justify-between border p-3">
                <p>ICON</p>
                <p>Pending Bills</p>
            </div>
            <div className="w-full flex  justify-between border p-3">
                <p>ICON</p>
                <p>Cleared Bills</p>
            </div>
        </div>
    )
}

export default Summary