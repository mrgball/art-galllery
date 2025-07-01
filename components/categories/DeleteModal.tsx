import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (id: number) => void;
  categoryName?: string;
}

export default function DeleteModal({
  open,
  onClose,
  onConfirm,
  categoryName,
}: DeleteModalProps) {
    const [id] = useState<number>(0);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus Kategori</DialogTitle>
          <DialogDescription>
            Apakah kamu yakin ingin menghapus kategori{" "}
            <span className="font-semibold text-red-600">
              {categoryName ?? "ini"}
            </span>
            ? Tindakan ini tidak bisa dibatalkan.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button variant="destructive" onClick={() => onConfirm(id)}>
            Hapus
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
