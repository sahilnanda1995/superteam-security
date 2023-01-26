import Link from "next/link"

export const Header = () => {
    return (
    <>
        <header>
            <nav className="mt-4 flex justify-between items-center">
                <Link href={"/"} className="text-[#FF9900]">
                    Superteam Security
                </Link>
                <div></div>
                <div className="float-right space-x-12 text-[#A7A7A7]">
                <Link href="/hacks"> Hacks </Link>
                <Link href="/ctf"> CTFs </Link>
                </div>
            </nav>
        </header>
    </>
    )
}