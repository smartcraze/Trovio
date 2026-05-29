"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertCircle,
  Edit2,
  ExternalLink,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import type { ProductItem } from "./types";

interface ProductsTabProps {
  products: ProductItem[];
  onAddProduct: () => void;
  onEditProduct: (product: ProductItem) => void;
  onDeleteProduct: (id: string, title: string) => void;
}

export function ProductsTab({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
}: ProductsTabProps) {
  return (
    <div className="space-y-6">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            Shop Products &amp; Courses
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Showcase up to 3 courses, E-Books, or services
          </p>
        </div>

        {products.length < 3 ? (
          <Button
            onClick={onAddProduct}
            className="rounded-full bg-primary hover:bg-primary/95 text-primary-foreground flex items-center gap-1 px-4 py-2 font-medium text-xs shadow-md shadow-primary/10"
          >
            <Plus size={16} /> Add Product
          </Button>
        ) : (
          <span className="flex items-center gap-1 text-xs text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full font-medium">
            <AlertCircle size={14} /> Limit 3 Reached
          </span>
        )}
      </div>

      {/* Limit warning banner */}
      {products.length >= 3 && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/25 text-amber-500 text-sm rounded-xl flex gap-3">
          <AlertCircle className="shrink-0 text-amber-500 mt-0.5" size={16} />
          <div>
            <span className="font-bold">Maximum Showcase Limit Reached</span>:
            You can show up to 3 products to sell courses or digital items. To
            add another, please delete an existing product.
          </div>
        </div>
      )}

      {/* Products grid */}
      <div className="grid grid-cols-1 gap-4">
        {products.length === 0 ? (
          <Card className="border-dashed border-border bg-card/40 rounded-xl text-center p-12 opacity-80">
            <CardContent className="p-0">
              <p className="text-sm mb-4 text-muted-foreground">
                No products listed. Add products to monetize your audience!
              </p>
              <Button
                onClick={onAddProduct}
                className="mx-auto rounded-full border border-border bg-background hover:bg-muted px-4 py-1 text-xs"
              >
                Add first product
              </Button>
            </CardContent>
          </Card>
        ) : (
          products.map((product) => (
            <Card
              key={product.id}
              className="bg-card/40 border-border rounded-xl p-5 flex flex-col sm:flex-row gap-5 items-center justify-between backdrop-blur-md"
            >
              <div className="flex items-center gap-4 w-full">
                {product.imageUrl ? (
                  <div className="w-16 h-16 rounded-xl overflow-hidden relative shrink-0 border border-border bg-background/50">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground shrink-0">
                    <ShoppingBag size={24} />
                  </div>
                )}

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground text-base">
                      {product.title}
                    </h3>
                    <span className="font-bold text-sm text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      ${product.price}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 text-left">
                    {product.description}
                  </p>
                  <a
                    href={product.purchaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-muted-foreground hover:text-foreground hover:underline flex items-center gap-0.5 mt-1"
                  >
                    Checkout link <ExternalLink size={10} />
                  </a>
                </div>
              </div>

              <div className="flex sm:flex-col items-center justify-end gap-2 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-border">
                <Button
                  onClick={() => onEditProduct(product)}
                  variant="outline"
                  className="w-full sm:w-auto rounded-full text-xs px-4 py-2 flex items-center justify-center gap-1.5 font-medium"
                >
                  <Edit2 size={12} /> Edit
                </Button>
                <Button
                  onClick={() => onDeleteProduct(product.id, product.title)}
                  variant="destructive"
                  className="w-full sm:w-auto rounded-full text-xs px-4 py-2 flex items-center justify-center gap-1.5 font-medium"
                >
                  <Trash2 size={12} /> Delete
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
