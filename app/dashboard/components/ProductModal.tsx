"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save } from "lucide-react";
import type React from "react";
import type { ProductModalState } from "./types";

interface ProductModalProps {
  modal: ProductModalState;
  isPending: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}

export function ProductModal({
  modal,
  isPending,
  onSubmit,
  onClose,
}: ProductModalProps) {
  return (
    <Dialog open={modal.open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-lg bg-card border-border rounded-xl p-6 sm:p-8 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            {modal.mode === "add"
              ? "Create Shop Product"
              : "Edit Product Details"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs">
            Input the product price and Stripe checkout link.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-5 mt-4">
          {/* Title + Price row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-2">
              <Label
                className="text-sm font-medium text-foreground block"
                htmlFor="prod_title"
              >
                Product Title
              </Label>
              <Input
                id="prod_title"
                name="title"
                type="text"
                required
                placeholder="e.g. Next.js Masterclass Course"
                defaultValue={modal.mode === "edit" ? modal.data?.title : ""}
                className="h-11 rounded-lg bg-background/50 border-border"
              />
            </div>

            <div className="col-span-1 space-y-2">
              <Label
                className="text-sm font-medium text-foreground block"
                htmlFor="prod_price"
              >
                Price (USD)
              </Label>
              <Input
                id="prod_price"
                name="price"
                type="number"
                step="0.01"
                required
                placeholder="29.00"
                defaultValue={modal.mode === "edit" ? modal.data?.price : ""}
                className="h-11 rounded-lg bg-background/50 border-border"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label
              className="text-sm font-medium text-foreground block"
              htmlFor="prod_desc"
            >
              Short Description
            </Label>
            <textarea
              id="prod_desc"
              name="description"
              required
              rows={2}
              maxLength={250}
              placeholder="Summarize what users get..."
              defaultValue={
                modal.mode === "edit" ? modal.data?.description : ""
              }
              className="w-full bg-background/50 border border-border rounded-lg p-4 text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition resize-none"
            />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <Label
              className="text-sm font-medium text-foreground block"
              htmlFor="prod_img"
            >
              Cover Image URL
            </Label>
            <Input
              id="prod_img"
              name="imageUrl"
              type="url"
              placeholder="https://images.unsplash.com/..."
              defaultValue={modal.mode === "edit" ? modal.data?.imageUrl : ""}
              className="h-11 rounded-lg bg-background/50 border-border"
            />
          </div>

          {/* Purchase URL */}
          <div className="space-y-2">
            <Label
              className="text-sm font-medium text-foreground block"
              htmlFor="prod_purchase"
            >
              Checkout / Purchase URL
            </Label>
            <Input
              id="prod_purchase"
              name="purchaseUrl"
              type="url"
              required
              placeholder="https://buy.stripe.com/..."
              defaultValue={
                modal.mode === "edit" ? modal.data?.purchaseUrl : ""
              }
              className="h-11 rounded-lg bg-background/50 border-border"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-full h-11"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="px-6 h-11 bg-primary hover:bg-primary/95 text-primary-foreground rounded-full font-medium transition disabled:opacity-50 flex items-center gap-1"
            >
              {isPending ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <Save size={16} />
              )}
              Save Product
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
