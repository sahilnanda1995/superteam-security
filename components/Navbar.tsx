import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="flex items-center w-full justify-between font-['JetBrains_Mono']"
      aria-label="Global"
    >
      <div className="flex w-full justify-between items-center text-base">
        <div className="w-max flex flex-row">
          <p className="whitespace-nowrap text-white">
            superteam <span className="text-home-neon">&gt;</span>
          </p>
          <p className="animate-typing overflow-hidden whitespace-nowrap border-r-8 border-home-neon pr-1 text-home-neon">
            security
          </p>
        </div>
        <Link
          href="/ctf"
          className="-mx-3 block rounded-lg py-2 px-3 leading-6 text-white hover:underline"
        >
          CTFs
        </Link>
      </div>
    </nav>
  );
}
