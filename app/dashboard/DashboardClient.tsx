"use client";

import {
  AlertCircle,
  BarChart3,
  Check,
  Edit2,
  ExternalLink,
  Eye,
  Link2,
  Loader2,
  LogOut,
  Palette,
  Plus,
  Save,
  ShoppingBag,
  Smartphone,
  Trash2,
  User as UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState, useTransition } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  addLinkAction,
  addProductAction,
  deleteLinkAction,
  deleteProductAction,
  editLinkAction,
  editProductAction,
  logoutAction,
  updateProfileAction,
  updateThemeAction,
} from "@/lib/actions";
import { THEMES } from "@/lib/themes";
import { cn } from "@/lib/utils";

interface DashboardClientProps {
  user: any;
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [isPending, startTransition] = useTransition();
  const [chartMounted, setChartMounted] = useState(false);

  useEffect(() => {
    setChartMounted(true);
  }, []);

  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Modal / Editing states
  const [linkModal, setLinkModal] = useState<{
    open: boolean;
    mode: "add" | "edit";
    data?: any;
  }>({ open: false, mode: "add" });
  const [productModal, setProductModal] = useState<{
    open: boolean;
    mode: "add" | "edit";
    data?: any;
  }>({ open: false, mode: "add" });

  // Custom states for switches inside dialogs
  const [linkDeepLink, setLinkDeepLink] = useState(false);

  const showFeedback = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleLogout = async () => {
    await logoutAction();
    router.push("/login");
    router.refresh();
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeedback(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await updateProfileAction(null, formData);
      if (res.success) {
        showFeedback("success", res.message || "Profile updated successfully!");
        router.refresh();
      } else {
        showFeedback("error", res.error || "Failed to update profile.");
      }
    });
  };

  const handleSelectTheme = async (themeId: string) => {
    setFeedback(null);
    startTransition(async () => {
      const res = await updateThemeAction(themeId);
      if (res.success) {
        showFeedback("success", "Theme updated successfully!");
        router.refresh();
      } else {
        showFeedback("error", res.error || "Failed to update theme.");
      }
    });
  };

  const handleLinkSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("isDeepLink", linkDeepLink ? "true" : "false");

    startTransition(async () => {
      let res;
      if (linkModal.mode === "add") {
        res = await addLinkAction(null, formData);
      } else {
        res = await editLinkAction(linkModal.data.id, null, formData);
      }

      if (res.success) {
        showFeedback("success", res.message || "Link saved!");
        setLinkModal({ open: false, mode: "add" });
        router.refresh();
      } else {
        showFeedback("error", res.error || "Error saving link.");
      }
    });
  };

  const handleDeleteLink = async (linkId: string) => {
    if (!confirm("Are you sure you want to delete this link?")) return;
    startTransition(async () => {
      const res = await deleteLinkAction(linkId);
      if (res.success) {
        showFeedback("success", "Link deleted!");
        router.refresh();
      } else {
        showFeedback("error", res.error || "Error deleting link.");
      }
    });
  };

  const handleProductSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      let res;
      if (productModal.mode === "add") {
        res = await addProductAction(null, formData);
      } else {
        res = await editProductAction(productModal.data.id, null, formData);
      }

      if (res.success) {
        showFeedback("success", res.message || "Product saved!");
        setProductModal({ open: false, mode: "add" });
        router.refresh();
      } else {
        showFeedback("error", res.error || "Error saving product.");
      }
    });
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    startTransition(async () => {
      const res = await deleteProductAction(productId);
      if (res.success) {
        showFeedback("success", "Product deleted!");
        router.refresh();
      } else {
        showFeedback("error", res.error || "Error deleting product.");
      }
    });
  };

  const totalClicks = user.links.reduce(
    (acc: number, l: any) => acc + (l.clickCount || 0),
    0,
  );

  // Trigger modals helper
  const openAddLink = () => {
    setLinkDeepLink(false);
    setLinkModal({ open: true, mode: "add" });
  };

  const openEditLink = (link: any) => {
    setLinkDeepLink(link.isDeepLink);
    setLinkModal({ open: true, mode: "edit", data: link });
  };

  // Recharts calculations
  const chartData = user.links.map((link: any) => ({
    name:
      link.title.length > 15 ? link.title.substring(0, 15) + "..." : link.title,
    fullName: link.title,
    clicks: link.clickCount || 0,
    url: link.url,
  }));
  const hasClicks = chartData.some((d: any) => d.clicks > 0);
  const COLORS = [
    "var(--primary)",
    "var(--secondary)",
    "oklch(0.6693 0.0706 248.923)",
    "oklch(0.6678 0.1546 41.62)",
    "oklch(0.5957 0.1807 19.9763)",
    "oklch(0.7859 0.1342 83.6986)",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-[0%] right-[10%] w-[450px] h-[450px] bg-secondary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* ────────────────────────────────────────────────────────────────
          Dashboard Top Header
          - BrandLogo uses variant="dynamic" so it automatically switches:
              • light mode → logo-white.png  (block dark:hidden)
              • dark  mode → logo-dark.png   (hidden dark:block)
          NOTE: the variant naming in brand-logo.tsx is intentionally
          "inverted" relative to the image file names:
              variant="white" → /logo-dark.png   (dark ink, for light bg)
              variant="dark"  → /logo-white.png  (white ink, for dark bg)
          Always use variant="dynamic" here so it adapts automatically.
      ──────────────────────────────────────────────────────────────── */}
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* dynamic variant = correct logo for both light and dark mode */}
            <BrandLogo variant="dynamic" width={100} height={30} />
            <span className="text-xs px-2.5 py-0.5 rounded bg-muted border border-border text-muted-foreground font-mono">
              Dashboard
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Profile page link — opens in new tab */}

            <Link href={`/${user.username}`} target="_blank">
              <Button variant="default" size="sm">
                <Eye size={16} />
                {"trivio/"}
                {user.username}
              </Button>
            </Link>

            <Button
              onClick={handleLogout}
              variant="destructive"
              size="sm"
              className="text-destructive hover:text-destructive hover:bg-destructive/10 flex items-center gap-1.5 rounded"
            >
              <LogOut size={16} />{" "}
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-8">
        {/* Feedback Alert */}
        {feedback && (
          <div
            className={cn(
              "mb-6 p-4 rounded-xl border flex items-center gap-2 text-sm transition animate-in fade-in slide-in-from-top-4 duration-300",
              feedback.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-destructive/10 border-destructive/20 text-destructive",
            )}
          >
            <AlertCircle size={16} />
            {feedback.message}
          </div>
        )}

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          orientation="vertical"
          className="flex flex-col md:flex-row gap-8 w-full items-start"
        >
          {/* Tabs Navigation */}
          <TabsList className="flex flex-col items-stretch h-auto bg-transparent border-none p-0 gap-2 shrink-0 w-full md:w-56">
            <TabsTrigger
              value="profile"
              className="w-full flex items-center justify-start gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left data-[state=active]:bg-card data-[state=active]:text-foreground border border-transparent data-[state=active]:border-border shadow-sm text-muted-foreground cursor-pointer"
            >
              <UserIcon size={18} /> Edit Profile
            </TabsTrigger>
            <TabsTrigger
              value="links"
              className="w-full flex items-center justify-start gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left data-[state=active]:bg-card data-[state=active]:text-foreground border border-transparent data-[state=active]:border-border shadow-sm text-muted-foreground cursor-pointer"
            >
              <Link2 size={18} /> Manage Links
            </TabsTrigger>
            <TabsTrigger
              value="products"
              className="w-full flex items-center justify-start gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left data-[state=active]:bg-card data-[state=active]:text-foreground border border-transparent data-[state=active]:border-border shadow-sm text-muted-foreground cursor-pointer"
            >
              <ShoppingBag size={18} /> Shop Products ({user.products.length}/3)
            </TabsTrigger>
            <TabsTrigger
              value="themes"
              className="w-full flex items-center justify-start gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left data-[state=active]:bg-card data-[state=active]:text-foreground border border-transparent data-[state=active]:border-border shadow-sm text-muted-foreground cursor-pointer"
            >
              <Palette size={18} /> Custom Themes
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="w-full flex items-center justify-start gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left data-[state=active]:bg-card data-[state=active]:text-foreground border border-transparent data-[state=active]:border-border shadow-sm text-muted-foreground cursor-pointer"
            >
              <BarChart3 size={18} /> Analytics
            </TabsTrigger>
          </TabsList>

          {/* Content Sections */}
          <div className="flex-1 w-full min-w-0">
            {/* TAB: PROFILE */}
            <TabsContent value="profile" className="mt-0 outline-none">
              <Card className="border-border bg-card/60 backdrop-blur-2xl p-6 sm:p-8 rounded-xl shadow-xl">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-xl font-bold text-foreground">
                    Profile Settings
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-sm">
                    Customize your creator details and social channels.
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-0">
                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          className="text-sm text-foreground font-medium"
                          htmlFor="profile_name"
                        >
                          Display Name
                        </Label>
                        <Input
                          id="profile_name"
                          name="name"
                          type="text"
                          required
                          defaultValue={user.name}
                          className="h-11 rounded-lg bg-background/50 border-border"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          className="text-sm text-foreground font-medium"
                          htmlFor="profile_avatar"
                        >
                          Avatar Image URL
                        </Label>
                        <Input
                          id="profile_avatar"
                          name="avatarUrl"
                          type="url"
                          placeholder="https://images.unsplash.com/..."
                          defaultValue={user.avatarUrl}
                          className="h-11 rounded-lg bg-background/50 border-border"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        className="text-sm text-foreground font-medium"
                        htmlFor="profile_bio"
                      >
                        Bio (Max 160 characters)
                      </Label>
                      <textarea
                        id="profile_bio"
                        name="bio"
                        maxLength={160}
                        defaultValue={user.bio}
                        rows={3}
                        placeholder="Tell your story..."
                        className="w-full bg-background/50 border border-border rounded-lg p-4 text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition resize-none"
                      />
                    </div>

                    <div className="border-t border-border pt-6 space-y-4">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Social Channels
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { id: "instagram", label: "Instagram" },
                          { id: "twitter", label: "Twitter / X" },
                          { id: "youtube", label: "YouTube" },
                          { id: "spotify", label: "Spotify" },
                          { id: "github", label: "GitHub" },
                          { id: "tiktok", label: "TikTok" },
                          { id: "website", label: "Website" },
                        ].map((platform) => (
                          <div key={platform.id} className="space-y-1">
                            <Label
                              className="text-xs text-muted-foreground capitalize"
                              htmlFor={`social_${platform.id}`}
                            >
                              {platform.label} Link
                            </Label>
                            <Input
                              id={`social_${platform.id}`}
                              name={`social_${platform.id}`}
                              type="url"
                              placeholder={`https://${platform.id}.com/...`}
                              defaultValue={user.socials?.[platform.id] || ""}
                              className="h-10 rounded-lg bg-background/50 border-border text-xs"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isPending}
                      className="px-6 h-11 bg-primary hover:bg-primary/95 text-primary-foreground rounded-full font-medium transition shadow-md shadow-primary/10 disabled:opacity-50"
                    >
                      {isPending ? (
                        <Loader2 className="animate-spin" size={18} />
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB: LINKS */}
            <TabsContent value="links" className="mt-0 outline-none space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    Manage Links
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Configure your handpicked custom URLs
                  </p>
                </div>
                <Button
                  onClick={openAddLink}
                  className="rounded-full bg-primary hover:bg-primary/95 text-primary-foreground flex items-center gap-1 px-4 py-2 font-medium text-xs shadow-md shadow-primary/10"
                >
                  <Plus size={16} /> Add Link
                </Button>
              </div>

              <div className="space-y-4">
                {user.links.length === 0 ? (
                  <Card className="border-dashed border-border bg-card/40 rounded-xl text-center p-12 opacity-80">
                    <CardContent className="p-0">
                      <p className="text-sm mb-4 text-muted-foreground">
                        No links added yet. Start by creating one!
                      </p>
                      <Button
                        onClick={openAddLink}
                        className="mx-auto rounded-full border border-border bg-background hover:bg-muted px-4 py-1 text-xs"
                      >
                        Create first link
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  user.links.map((link: any) => (
                    <Card
                      key={link.id}
                      className="bg-card/40 border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-md hover:bg-card/70 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground text-base">
                            {link.title}
                          </span>
                          {link.isDeepLink && (
                            <span className="flex items-center gap-0.5 text-[10px] px-2 py-0.5 rounded-full bg-secondary/15 border border-secondary/35 text-secondary font-medium">
                              <Smartphone size={10} /> DeepLink Enabled
                            </span>
                          )}
                        </div>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground hover:text-foreground break-all flex items-center gap-1"
                        >
                          {link.url} <ExternalLink size={12} />
                        </a>
                      </div>

                      <div className="flex items-center gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-border justify-between sm:justify-start">
                        <div className="text-xs text-muted-foreground flex items-center gap-1.5 bg-muted border border-border px-3 py-1.5 rounded-full">
                          <BarChart3 size={14} />{" "}
                          <span className="font-bold text-foreground">
                            {link.clickCount || 0}
                          </span>{" "}
                          clicks
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => openEditLink(link)}
                            variant="outline"
                            size="icon"
                            className="size-8 rounded-full border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                            title="Edit"
                          >
                            <Edit2 size={14} />
                          </Button>
                          <Button
                            onClick={() => handleDeleteLink(link.id)}
                            variant="destructive"
                            size="icon"
                            className="size-8 rounded-full"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* TAB: PRODUCTS */}
            <TabsContent
              value="products"
              className="mt-0 outline-none space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    Shop Products & Courses
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Showcase up to 3 courses, E-Books, or services
                  </p>
                </div>

                {user.products.length < 3 ? (
                  <Button
                    onClick={() => setProductModal({ open: true, mode: "add" })}
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

              {user.products.length >= 3 && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/25 text-amber-500 text-sm rounded-xl flex gap-3">
                  <AlertCircle
                    className="shrink-0 text-amber-500 mt-0.5"
                    size={16}
                  />
                  <div>
                    <span className="font-bold">
                      Maximum Showcase Limit Reached
                    </span>
                    : You can show up to 3 products to sell courses or digital
                    items. To add another, please delete an existing product.
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4">
                {user.products.length === 0 ? (
                  <Card className="border-dashed border-border bg-card/40 rounded-xl text-center p-12 opacity-80">
                    <CardContent className="p-0">
                      <p className="text-sm mb-4 text-muted-foreground">
                        No products listed. Add products to monetize your
                        audience!
                      </p>
                      <Button
                        onClick={() =>
                          setProductModal({ open: true, mode: "add" })
                        }
                        className="mx-auto rounded-full border border-border bg-background hover:bg-muted px-4 py-1 text-xs"
                      >
                        Add first product
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  user.products.map((product: any) => (
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
                          onClick={() =>
                            setProductModal({
                              open: true,
                              mode: "edit",
                              data: product,
                            })
                          }
                          variant="outline"
                          className="w-full sm:w-auto rounded-full text-xs px-4 py-2 flex items-center justify-center gap-1.5 font-medium"
                        >
                          <Edit2 size={12} /> Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteProduct(product.id)}
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
            </TabsContent>

            {/* TAB: THEMES */}
            <TabsContent value="themes" className="mt-0 outline-none">
              <Card className="border-border bg-card/60 backdrop-blur-2xl p-6 sm:p-8 rounded-xl shadow-xl">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-xl font-bold text-foreground">
                    Pick a Profile Theme
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-sm">
                    Choose the style that reflects your brand presence.
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {Object.values(THEMES).map((theme) => {
                      const isActive = user.theme === theme.id;
                      return (
                        <button
                          key={theme.id}
                          onClick={() => handleSelectTheme(theme.id)}
                          disabled={isPending}
                          className={cn(
                            "group p-5 rounded-xl text-left border transition relative overflow-hidden flex flex-col justify-between h-40",
                            isActive
                              ? "border-primary bg-background/80 shadow-[0_0_25px_rgba(var(--primary),0.15)] ring-2 ring-primary/50"
                              : "border-border bg-background/40 hover:border-border/80 hover:bg-background/60",
                          )}
                        >
                          <div className="flex items-center justify-between w-full relative z-10">
                            <span className="font-semibold text-foreground text-base tracking-tight">
                              {theme.name}
                            </span>
                            {isActive && (
                              <span className="size-6 bg-primary rounded-full flex items-center justify-center border border-primary-foreground">
                                <Check
                                  size={12}
                                  className="text-primary-foreground"
                                />
                              </span>
                            )}
                          </div>

                          {/* Mockup Preview Card */}
                          <div className="flex gap-2 items-center mt-3 relative z-10 w-full">
                            <div className="w-8 h-8 rounded-full bg-foreground/10 border border-foreground/20 flex-shrink-0" />
                            <div className="space-y-1.5 w-full">
                              <div className="h-2.5 w-20 bg-foreground/20 rounded-full" />
                              <div className="h-2 w-32 bg-foreground/10 rounded-full" />
                            </div>
                          </div>

                          <div className="mt-4 flex gap-1 relative z-10">
                            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-foreground/15 border border-foreground/5 text-muted-foreground">
                              Glassmorphic
                            </span>
                          </div>

                          {/* Background Colors Overlay in Button */}
                          <div
                            className={cn(
                              "absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity",
                              theme.bgClass,
                            )}
                          />
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB: ANALYTICS */}
            <TabsContent
              value="analytics"
              className="mt-0 outline-none space-y-8 animate-fade-in"
            >
              {/* Total Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card className="border-border bg-card/60 backdrop-blur-2xl p-6 shadow-xl flex items-center gap-5 rounded-xl">
                  <div className="size-14 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
                    <BarChart3 size={24} />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider block">
                      Total Link Clicks
                    </span>
                    <span className="text-3xl font-extrabold text-foreground mt-1 block">
                      {totalClicks}
                    </span>
                  </div>
                </Card>

                <Card className="border-border bg-card/60 backdrop-blur-2xl p-6 shadow-xl flex items-center gap-5 rounded-xl">
                  <div className="size-14 rounded-xl bg-secondary/10 border border-secondary/20 text-secondary flex items-center justify-center shrink-0">
                    <Link2 size={24} />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider block">
                      Total Active Links
                    </span>
                    <span className="text-3xl font-extrabold text-foreground mt-1 block">
                      {user.links.length}
                    </span>
                  </div>
                </Card>
              </div>

              {/* Charts Section */}
              {user.links.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-border bg-card/60 backdrop-blur-2xl p-6 shadow-xl rounded-xl">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="font-bold text-sm text-foreground uppercase tracking-wider">
                        Clicks Breakdown
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground">
                        Compare performance metrics across all active links.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 flex items-center justify-center min-h-[300px]">
                      {!hasClicks ? (
                        <div className="text-center py-12 text-muted-foreground text-xs">
                          No click data recorded yet.
                        </div>
                      ) : chartMounted ? (
                        <div className="h-[300px] w-full mt-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={chartData}
                              margin={{
                                top: 10,
                                right: 10,
                                left: -25,
                                bottom: 0,
                              }}
                            >
                              <XAxis
                                dataKey="name"
                                stroke="var(--muted-foreground)"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                              />
                              <YAxis
                                stroke="var(--muted-foreground)"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(val) => `${val}`}
                              />
                              <Tooltip
                                cursor={{ fill: "rgba(255,255,255,0.03)" }}
                                content={({ active, payload }) => {
                                  if (active && payload && payload.length) {
                                    return (
                                      <div className="bg-card/95 border border-border p-2.5 rounded-lg shadow-xl backdrop-blur-md text-xs">
                                        <p className="font-semibold text-foreground">
                                          {payload[0].payload.fullName}
                                        </p>
                                        <p className="text-muted-foreground mt-0.5">
                                          Clicks:{" "}
                                          <span className="font-bold text-primary">
                                            {payload[0].value}
                                          </span>
                                        </p>
                                      </div>
                                    );
                                  }
                                  return null;
                                }}
                              />
                              <Bar dataKey="clicks" radius={[4, 4, 0, 0]}>
                                {chartData.map((entry: any, index: number) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                  />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      ) : (
                        <div className="text-muted-foreground text-xs">
                          Loading chart...
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="border-border bg-card/60 backdrop-blur-2xl p-6 shadow-xl rounded-xl">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="font-bold text-sm text-foreground uppercase tracking-wider">
                        Traffic Distribution
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground">
                        Visualizing relative share of user clicks.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 flex items-center justify-center min-h-[300px]">
                      {!hasClicks ? (
                        <div className="text-center py-12 text-muted-foreground text-xs">
                          No click data recorded yet.
                        </div>
                      ) : chartMounted ? (
                        <div className="h-[300px] w-full flex items-center justify-center mt-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={chartData.filter(
                                  (d: any) => d.clicks > 0,
                                )}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={85}
                                paddingAngle={4}
                                dataKey="clicks"
                              >
                                {chartData
                                  .filter((d: any) => d.clicks > 0)
                                  .map((entry: any, index: number) => (
                                    <Cell
                                      key={`cell-${index}`}
                                      fill={COLORS[index % COLORS.length]}
                                    />
                                  ))}
                              </Pie>
                              <Tooltip
                                content={({ active, payload }) => {
                                  if (active && payload && payload.length) {
                                    return (
                                      <div className="bg-card/95 border border-border p-2.5 rounded-lg shadow-xl backdrop-blur-md text-xs">
                                        <p className="font-semibold text-foreground">
                                          {payload[0].name}
                                        </p>
                                        <p className="text-muted-foreground mt-0.5">
                                          Clicks:{" "}
                                          <span className="font-bold text-secondary">
                                            {payload[0].value}
                                          </span>
                                        </p>
                                      </div>
                                    );
                                  }
                                  return null;
                                }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      ) : (
                        <div className="text-muted-foreground text-xs">
                          Loading chart...
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Click breakdown list */}
              <Card className="border-border bg-card/60 backdrop-blur-2xl p-6 sm:p-8 shadow-xl rounded-xl">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="font-bold text-lg text-foreground">
                    Click Performance List
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-0 space-y-4">
                  {user.links.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-6">
                      No links configured yet.
                    </p>
                  ) : (
                    user.links.map((link: any) => {
                      const percentage =
                        totalClicks > 0
                          ? Math.round(
                              ((link.clickCount || 0) / totalClicks) * 100,
                            )
                          : 0;
                      return (
                        <div key={link.id} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-foreground">
                              {link.title}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              <span className="font-bold text-foreground">
                                {link.clickCount || 0}
                              </span>{" "}
                              clicks ({percentage}%)
                            </span>
                          </div>

                          {/* Progress Bar */}
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </main>

      {/* SHADCN DIALOG: LINK MODAL */}
      <Dialog
        open={linkModal.open}
        onOpenChange={(isOpen) =>
          !isOpen && setLinkModal((prev) => ({ ...prev, open: false }))
        }
      >
        <DialogContent className="max-w-lg bg-card border-border rounded-xl p-6 sm:p-8 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">
              {linkModal.mode === "add"
                ? "Create Custom Link"
                : "Edit Link Details"}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-xs">
              Fill in the destination and customize the redirection options.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleLinkSubmit} className="space-y-5 mt-4">
            <div className="space-y-2">
              <Label
                className="text-sm font-medium text-foreground block"
                htmlFor="link_title"
              >
                Link Title
              </Label>
              <Input
                id="link_title"
                name="title"
                type="text"
                required
                placeholder="e.g. Follow me on Twitter"
                defaultValue={
                  linkModal.mode === "edit" ? linkModal.data.title : ""
                }
                className="h-11 rounded-lg bg-background/50 border-border"
              />
            </div>

            <div className="space-y-2">
              <Label
                className="text-sm font-medium text-foreground block"
                htmlFor="link_url"
              >
                Destination URL
              </Label>
              <Input
                id="link_url"
                name="url"
                type="url"
                required
                placeholder="https://..."
                defaultValue={
                  linkModal.mode === "edit" ? linkModal.data.url : ""
                }
                className="h-11 rounded-lg bg-background/50 border-border"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border">
              <div className="space-y-1 pr-4">
                <span className="text-sm font-medium text-foreground flex items-center gap-1.5">
                  <Smartphone size={16} className="text-primary" /> Enable Deep
                  Linking
                </span>
                <p className="text-xs text-muted-foreground">
                  Auto-redirects mobile users to their native mobile application
                  instead of browser page.
                </p>
              </div>

              <Switch
                checked={linkDeepLink}
                onCheckedChange={setLinkDeepLink}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={() => setLinkModal({ open: false, mode: "add" })}
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
                Save Link
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* SHADCN DIALOG: PRODUCT MODAL */}
      <Dialog
        open={productModal.open}
        onOpenChange={(isOpen) =>
          !isOpen && setProductModal((prev) => ({ ...prev, open: false }))
        }
      >
        <DialogContent className="max-w-lg bg-card border-border rounded-xl p-6 sm:p-8 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">
              {productModal.mode === "add"
                ? "Create Shop Product"
                : "Edit Product Details"}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-xs">
              Input the product price and Stripe checkout link.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleProductSubmit} className="space-y-5 mt-4">
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
                  defaultValue={
                    productModal.mode === "edit" ? productModal.data.title : ""
                  }
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
                  defaultValue={
                    productModal.mode === "edit" ? productModal.data.price : ""
                  }
                  className="h-11 rounded-lg bg-background/50 border-border"
                />
              </div>
            </div>

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
                  productModal.mode === "edit"
                    ? productModal.data.description
                    : ""
                }
                className="w-full bg-background/50 border border-border rounded-lg p-4 text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition resize-none"
              />
            </div>

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
                defaultValue={
                  productModal.mode === "edit" ? productModal.data.imageUrl : ""
                }
                className="h-11 rounded-lg bg-background/50 border-border"
              />
            </div>

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
                  productModal.mode === "edit"
                    ? productModal.data.purchaseUrl
                    : ""
                }
                className="h-11 rounded-lg bg-background/50 border-border"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={() => setProductModal({ open: false, mode: "add" })}
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
    </div>
  );
}
