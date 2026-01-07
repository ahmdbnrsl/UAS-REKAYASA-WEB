'use client';
import { Button } from '@/components/ui/button';
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from '@/components/ui/sidebar';
import {
	CircleStar,
	GraduationCap,
	IdCard,
	LayoutDashboard,
	ListCheck,
	LogOut,
	UserCircle,
	Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

import * as React from 'react';

const sidebarItems = [
	{
		label: 'Dashboard',
		href: '/dashboard',
		icon: LayoutDashboard,
	},
	{
		label: 'Mahasiswa',
		href: '/dashboard/mahasiswa',
		icon: Users,
	},
	{
		label: 'Dosen',
		href: '/dashboard/dosen',
		icon: IdCard,
	},
	{
		label: 'Mata Kuliah',
		href: '/dashboard/matakuliah',
		icon: ListCheck,
	},
	{
		label: 'Nilai Mahasiswa',
		href: '/dashboard/nilaimahasiswa',
		icon: CircleStar,
	},
];

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const { data: session } = useSession();
	return (
		<SidebarProvider>
			<Sidebar>
				<SidebarContent className="bg-zinc-100">
					<SidebarGroup>
						<div className="w-full border-b border-zinc-300 flex items-center gap-2 px-4 pt-2 pb-4 justify-center">
							<Image
								src="/unikma.jpg"
								alt="UNIKMA Logo"
								width={40}
								height={40}
							/>
							<div>
								<h1 className="text-xl font-black text-sky-800">
									UNIKMA
								</h1>
								<p className="text-zinc-800 text-xs">
									Sistem Informasi Akademik
								</p>
							</div>
						</div>
						<SidebarGroupContent className="gap-5 w-full">
							<SidebarMenu className="p-4 w-full">
								{sidebarItems.map((item) => (
									<SidebarMenuItem
										key={item.href}
										className="text-lg font-normal text-zinc-800 w-full py-1"
									>
										<Link
											href={item.href}
											className={`w-full hover:text-zinc-100 hover:bg-sky-800 px-3 py-2 rounded-sm flex items-center gap-2 ${
												pathname === item.href
													? 'bg-sky-800 text-zinc-100'
													: 'bg-transparent text-zinc-800'
											}`}
										>
											<item.icon /> {item.label}
										</Link>
									</SidebarMenuItem>
								))}
								<SidebarMenuItem className="text-lg font-normal text-zinc-800 w-full py-1">
									<Button
										onClick={() => signOut()}
										type="button"
										className="cursor-pointer text-lg font-normal text-zinc-800 justify-start w-full hover:text-zinc-100 hover:bg-sky-800 px-3 py-2 rounded-sm flex items-center gap-2 bg-transparent border-0"
									>
										<LogOut /> Logout
									</Button>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
			</Sidebar>
			<main className="bg-zinc-100 w-full overflow-auto relative min-h-screen">
				<nav className="flex justify-between p-3 shadow-xl shadow-zinc-300 w-full top-0 z-10 bg-zinc-100 px-6 gap-2">
					<div className="flex gap-2 items-center">
						<SidebarTrigger
							size="icon-lg"
							className="text-sky-800 hover:text-sky-800 focus:text-sky-800 active:text-sky-800 cursor-pointer text-xl"
						/>{' '}
						Menu
					</div>
					<div className="flex items-center gap-2">
						<UserCircle
							className="text-sky-800"
							width={30}
							height={30}
						/>
						<div>
							<h1 className="text-zinc-900 ont-medium text-base">
								{session?.user?.name}
							</h1>
							<p className="text-zinc-600 text-sm -mt-1">
								{session?.user?.role}
							</p>
						</div>
					</div>
				</nav>

				{children}
			</main>
		</SidebarProvider>
	);
}
