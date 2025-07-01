'use client'

import TambahModal from "@/components/categories/TambahModel"
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
import { useEffect, useState } from "react"

export default function CategoriesPage() {
  const { categories, setCategories } = useCategoryStore()
  const { method } = useCategoryService()

  const { isSuccess, isPending, data } = method.fetchCategory;
  const { mutate: mutateCategory } = method.storeCategory;
  const [openModalTambah, setOpenModalTambah] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess && data) {
      setCategories(data.items)
    }
  }, [isSuccess, data, categories])


  return (
    <>  
        {openModalTambah && (
            <TambahModal open={openModalTambah} onClose={() => setOpenModalTambah(false)} onSubmit={(name: string)=> mutateCategory(name) }/>
        )}
        <button className="bg-blue-500 py-3 px-8 mb-5 rounded-lg text-white text-md" onClick={() => setOpenModalTambah(!openModalTambah)}>
            Tambah
        </button>
        <div>
        <Table className="w-full border border-gray-300 border-collapse">
            <TableHeader>
            <TableRow className="border border-gray-300">
                <TableHead className="w-[80px] border border-gray-300">No</TableHead>
                <TableHead className="border border-gray-300">Nama Kategori</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {isPending ? (
                <TableRow>
                <TableCell colSpan={2} className="text-center py-4">
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
                </TableRow>
                ))
            ) : (
                <TableRow>
                <TableCell colSpan={2} className="text-center py-4">
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
