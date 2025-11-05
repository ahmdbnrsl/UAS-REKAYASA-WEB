'use client';

import {
	Eye,
	EyeClosed,
	GraduationCap,
	LogIn,
	User,
	UserLockIcon,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

export default function Login() {
	const [visible, setVisible] = React.useState<boolean>(false);
	const [role, setRole] = React.useState<string | null>(null);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState('');
	const router = useRouter();

	const handleVisible = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setVisible(!visible);
	};

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = e.target as HTMLFormElement;

		const payload = {
			username: data.username.value,
			password: data.password.value,
			role: role,
		};

		for (const key in payload) {
			if (!payload[key as keyof typeof payload]) {
				return;
			}
		}

		setError('');
		setLoading(true);

		const res = (await signIn('credentials', {
			...payload,
			redirect: false,
		})) as
			| undefined
			| {
					error?: string;
					ok: boolean;
					status: number;
					url: string | null;
			  };

		if (res?.error) {
			setError('Username atau password salah!');
		} else if (res?.ok) {
			router.push('/dashboard');
		}

		setLoading(false);
	};

	return (
		<main className="w-full h-screen justify-center flex items-center p-4 bg-zinc-100">
			<div className="w-full max-w-md flex flex-col items-center px-4 py-12 rounded-lg border border-zinc-200 shadow-2xl shadow-zinc-400">
				<div className="w-full border-b border-zinc-300 flex items-center gap-2 px-4 pt-2 pb-4 justify-center">
					<GraduationCap
						className="text-sky-800"
						width={80}
						height={80}
					/>
					<div>
						<h1 className="text-2xl font-black text-sky-800">
							SIAKAD
						</h1>
						<p className="text-zinc-800">
							Sistem Informasi Akademik
						</p>
					</div>
				</div>
				<hr className="bg-zinc-500" />
				<h1 className="flex items-center gap-2 w-full mt-4 px-3 text-xl font-semibold">
					Login
				</h1>
				<p className="px-3 mt-1 text-base font-normal w-full text-zinc-500">
					Masukan Infomasi yang Diminta.
				</p>
				{error && (
					<p className="px-3 mt-1 text-base font-normal w-full text-red-500">
						{error}
					</p>
				)}
				<form
					onSubmit={handleLogin}
					className="mt-3 w-full p-2 flex flex-col gap-3"
				>
					<Input name="username" placeholder="Username" />
					<div className="relative">
						<Input
							name="password"
							placeholder="Password"
							type={visible ? 'text' : 'password'}
						/>
						<Button
							type="button"
							onClick={handleVisible}
							className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent border-0 focus:bg-transparent active:bg-transparent hover:bg-transparent w-auto z-3 text-zinc-500 cursor-pointer"
						>
							{visible ? <Eye /> : <EyeClosed />}
						</Button>
					</div>

					<Select onValueChange={setRole}>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Pilih Status Anda" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Status</SelectLabel>
								<SelectItem disabled value="1">
									Mahasiswa
								</SelectItem>
								<SelectItem disabled value="2">
									Dosen
								</SelectItem>
								<SelectItem disabled value="3">
									Akademik
								</SelectItem>
								<SelectItem value="admin">Admin</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<Button
						type="submit"
						className="cursor-pointer flex items-center gap-2 bg-sky-800 hover:bg-sky-900 active:bg-sky-900 focus:bg-sky-800 text-zinc-50 px-4 py-2"
					>
						{loading ? (
							'Loading...'
						) : (
							<>
								<LogIn /> Login
							</>
						)}
					</Button>
				</form>
				<footer className="mt-3 text-sm text-zinc-500">
					&#169; 2025 | Universitas Komputama
				</footer>
			</div>
		</main>
	);
}
