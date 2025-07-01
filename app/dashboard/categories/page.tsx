'use client'

import DeleteModal from "@/components/categories/DeleteModal"
import TambahModal from "@/components/categories/TambahModal"
import { Alert, AlertTitle } from "@/components/ui/alert"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { useCategoryService } from "@/lib/services/categoryService"
import useCategoryStore from "@/lib/store/categoryStore"
import { Category } from "@/lib/types/categoryTypes"
import { Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

export default function CategoriesPage() {
  const { categories, setCategories, message } = useCategoryStore()
  const { method } = useCategoryService()

  const { isSuccess, isPending, data } = method.fetchCategory;
  const { mutate: mutateCategory } = method.storeCategory;
  const {mutate: mutateDelete } = method.deleteCategory;
  const [openModalTambah, setOpenModalTambah] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [selected, setSelected] = useState<Category | null>(null);
  const [alert, setAlert] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess && data) {
      setCategories(data.items)
    }
  }, [isSuccess, data, categories])

    useEffect(() => {
    if (message) {
        setAlert(true);

        const timeout = setTimeout(() => {
        setAlert(false);
        }, 5000);

        return () => clearTimeout(timeout); 
    }
    }, [message]);

    useEffect(() => {
  if (selected) {
    console.log('🟢 Selected berubah:', selected);
  }
}, [selected]);


  return (
    <>  
        {openModalTambah && (
            <TambahModal
            open={openModalTambah}
            onClose={() => setOpenModalTambah(false)}
            onSubmit={(name: string) => {
                mutateCategory(name, {
                onSuccess: () => {
                    method.refetchCategory(); 
                    setOpenModalTambah(false);
                 },
                });
            }}
            />

        )}
        {openModalDelete && selected?.id !== null && (
            <DeleteModal
                open={openModalDelete}
                onClose={() => setOpenModalDelete(false)}
                onConfirm={() => {
                if (!selected?.id) return;
                mutateDelete(selected.id, {
                    onSuccess: () => {
                        method.refetchCategory();
                        setOpenModalDelete(false);
                        setSelected(null);
                    },
                });
                }}
            />
        )}

        <button className="bg-blue-500 py-3 px-8 mb-5 rounded-lg text-white text-md" onClick={() => setOpenModalTambah(!openModalTambah)}>
            Tambah
        </button>
        <div>
        {alert && (
        <Alert
            variant="default"
            className={`mb-4 w-80 ${
            (message?.toLowerCase().includes('success') || message?.toLowerCase().includes('berhasil'))
                ? 'border-green-500 bg-green-100 text-green-700'
                : 'border-red-500 bg-red-100 text-red-700'
            }`}
        >
            <AlertTitle>
            {message}
            </AlertTitle>
        </Alert>
        )}

        <Table className="w-full border border-gray-300 border-collapse">
            <TableHeader>
                <TableRow className="border border-gray-300">
                <TableHead className="w-[80px] border border-gray-300">No</TableHead>
                <TableHead className="border border-gray-300">Nama Kategori</TableHead>
                <TableHead className="w-[100px] border border-gray-300 text-center">Aksi</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {isPending ? (
                <TableRow>
                    <TableCell colSpan={3} className="text-center py-4">
                    Sedang memuat data kategori...
                    </TableCell>
                </TableRow>
                ) : categories.length > 0 ? (
                categories.map((category, index) => (
                    <TableRow key={category.id} className="border border-gray-300">
                    <TableCell className="border border-gray-300 text-center">
                        {index + 1}
                    </TableCell>
                    <TableCell className="border border-gray-300">
                        {category.name}
                    </TableCell>
                    <TableCell className="border border-gray-300 text-center">
                        <button
                        onClick={() => {
                            setSelected(category);
                            setOpenModalDelete(true);
                        }}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Hapus kategori"
                        >
                        <Trash2 size={18} />
                        </button>
                    </TableCell>
                    </TableRow>
                ))
                ) : (
                <TableRow>
                    <TableCell colSpan={3} className="text-center py-4">
                    Tidak ada data kategori.
                    </TableCell>
                </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
    </>
  )
}
