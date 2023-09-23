import Link from "next/link"

const SideNav = () => {
    return (
        <div>
            <div className="logo">
                <h1 className="font-bold">BM <span>BenMax</span></h1>
            </div>
            <div className="links">
                <div className="link">
                    <Link href="/console">Home</Link>
                </div>
                <div className="link">
                    <Link href="/console/records">Records</Link>
                </div>
                <div className="link">
                    <Link href="/console/new-record">New Record</Link>
                </div>
            </div>

        </div>
    )
}

export default SideNav