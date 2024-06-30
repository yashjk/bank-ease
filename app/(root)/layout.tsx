import Sidebar from "@/components/Sidebar";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
  const loggedIn = {
    firstName: "Yash",
    lastName: "Joshi"
  };

	return (
		<main>
      <Sidebar user={loggedIn} />
			{children}
		</main>
	);
}
