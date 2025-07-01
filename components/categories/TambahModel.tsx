import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface TambahModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
}

export default function TambahModal({ open, onClose, onSubmit }: TambahModalProps) {
  const [name, setName] = useState("");

  const handleSubmit = (name: string) => {
    onSubmit(name)
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Kategori</DialogTitle>
          <DialogDescription>
            Masukkan nama kategori yang ingin ditambahkan.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            {/* <Label htmlFor="name">Nama Kategori</Label> */}
            <Input
              id="name"
              placeholder="Contoh: Teknologi"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={() => handleSubmit(name)}>Simpan</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
