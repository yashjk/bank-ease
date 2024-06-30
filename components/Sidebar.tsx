import Image from "next/image";
import Link from "next/link";

const Sidebar = ({ user }: SidebarProps) => {
	return (
		<section className="sidebar">
			<nav>
				<Link href="/" className="mb-12 cursor-pointer items-center gap-2">
					<Image
						src="/icons/logo.svg"
						height={34}
						width={34}
						alt="logo"
						className="size-[24px] max-xl:size-14"
					/>
					<h1 className="sidebar-logo">BankEase</h1>
				</Link>
			</nav>
		</section>
	);
};

export default Sidebar;
