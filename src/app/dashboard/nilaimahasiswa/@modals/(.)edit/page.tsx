'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useDataState } from '@/lib/zustand';
import * as React from 'react';

export default function ModalEdit() {
	const router = useRouter();
	const path = usePathname();
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState('');

	const [mahasiswa, setMahasiswa] = React.useState<any[] | null>(null);
	const [matakuliah, setMataKuliah] = React.useState<any[] | null>(null);

	const [selectedMahasiswa, setSelectedMahasiswa] = React.useState('');
	const [selectedMataKuliah, setSelectedMataKuliah] = React.useState('');
	const { data } = useDataState();
	console.log(data);

	React.useEffect(() => {
		fetch('/api/matakuliah/get', { method: 'GET' })
			.then((res) => res.json())
			.then((res) => {
				if (res.length === 0) router.back();
				setMataKuliah(res);
				for (const key in res) {
					if (res[key as keyof typeof res].nama_mk === data[2]) {
						setSelectedMataKuliah(
							JSON.stringify(res[key as keyof typeof res])
						);
					}
				}
			});
	}, [path, data]);

	React.useEffect(() => {
		fetch('/api/mahasiswa/get', { method: 'GET' })
			.then((res) => res.json())
			.then((res) => {
				if (res.length === 0) router.back();
				setMahasiswa(res);
				for (const key in res) {
					if (res[key as keyof typeof res].nama === data[1]) {
						setSelectedMahasiswa(
							JSON.stringify(res[key as keyof typeof res])
						);
					}
				}
			});
	}, [path, data]);

	const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const nilai = e.target as HTMLFormElement;

		const dataMahasiswa = JSON.parse(selectedMahasiswa);
		const dataMataKuliah = JSON.parse(selectedMataKuliah);

		if (!dataMahasiswa || !dataMataKuliah) {
			setError('Pilih Mahasiswa dan Mata Kuliah');
			return;
		}

		const payload = {
			id_nilai: data[0],
			nilai: nilai.nilai.value,
			nim: dataMahasiswa.nim,
			kode_mk: dataMataKuliah.kode_mk,
		};

		for (const key in payload) {
			if (payload[key as keyof typeof payload] === '') {
				return;
			}
		}
		setError('');
		setLoading(true);
		fetch('/api/nilai/update', {
			method: 'PUT',
			body: JSON.stringify(payload),
		})
			.then((res) => res.json())
			.then((data) => {
				setLoading(false);
				router.refresh();
				router.back();
			})
			.catch((err) => {
				setLoading(false);
				setError('Terjadi Kesalahan : ' + err.message);
				console.log(err);
			});
	};
	return (
		<div className="absolute inset-0 bg-zinc-500/30 flex justify-center items-center">
			{(!mahasiswa || !matakuliah || !data) && (
				<h1 className="text-xl font-semibold text-sky-800 bg-zinc-100 px-4 py-2 rounded-lg">
					Loading...
				</h1>
			)}
			{mahasiswa && matakuliah && data && (
				<div className="bg-zinc-100 w-full h-full md:h-auto md:max-w-md flex flex-col items-center px-4 py-12 md:rounded-lg md:border md:border-zinc-200 md:shadow-2xl md:shadow-zinc-400">
					<h1 className="flex items-center gap-2 w-full mt-4 px-3 text-xl font-semibold">
						Edit Matakuliah
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
						onSubmit={handleEdit}
						className="mt-3 w-full p-2 flex flex-col gap-3"
					>
						<Select
							onValueChange={setSelectedMahasiswa}
							defaultValue={selectedMahasiswa}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Pilih Mahasiswa" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Nama Mahasiswa</SelectLabel>
									{mahasiswa.map((item: any) => (
										<SelectItem
											key={item.nim}
											value={JSON.stringify(item)}
										>
											{item.nama}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
						<Select
							onValueChange={setSelectedMataKuliah}
							defaultValue={selectedMataKuliah}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Pilih Matakuliah" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Nama Matakuliah</SelectLabel>
									{matakuliah.map((item: any) => (
										<SelectItem
											key={item.kode_mk}
											value={JSON.stringify(item)}
										>
											{item.nama_mk}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
						<Input
							defaultValue={data[3]}
							id="nilai"
							name="nilai"
							placeholder="Nilai Mahasiswa"
						/>

						<div className="flex justify-end gap-2">
							<Button
								onClick={() => router.back()}
								type="button"
								className="text-zinc-800 cursor-pointer flex items-center gap-2 bg-zinc-300 hover:bg-zinc-300 active:bg-zinc-300 focus:bg-zinc-300 px-4 py-2"
							>
								Batal
							</Button>
							<Button
								type="submit"
								className="cursor-pointer flex items-center gap-2 bg-sky-800 hover:bg-sky-900 active:bg-sky-900 focus:bg-sky-800 text-zinc-50 px-4 py-2"
							>
								{loading ? (
									'Loading...'
								) : (
									<>
										<Plus /> Edit
									</>
								)}
							</Button>
						</div>
					</form>
					<footer className="mt-3 text-sm text-zinc-500">
						&#169; 2025 | Universitas Komputama
					</footer>
				</div>
			)}
		</div>
	);
}
