"use client";

import {
  BarChart3,
  Link2,
  Palette,
  ShoppingBag,
  User as UserIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState, useTransition } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sendChatMessageAction } from "@/lib/actions/ai";
import { logoutAction } from "@/lib/actions/auth";
import {
  addLinkAction,
  deleteLinkAction,
  editLinkAction,
} from "@/lib/actions/link";
import {
  addProductAction,
  deleteProductAction,
  editProductAction,
} from "@/lib/actions/product";
import { updateProfileAction, updateThemeAction } from "@/lib/actions/profile";
import { AnalyticsTab } from "./components/AnalyticsTab";
import { ChatAssistant } from "./components/ChatAssistant";
import { DashboardHeader } from "./components/DashboardHeader";
import { DeleteConfirmDialog } from "./components/DeleteConfirmDialog";
import { FeedbackAlert } from "./components/FeedbackAlert";
import { LinkModal } from "./components/LinkModal";
import { LinksTab } from "./components/LinksTab";
import { ProductModal } from "./components/ProductModal";
import { ProductsTab } from "./components/ProductsTab";
import { ProfileTab } from "./components/ProfileTab";
import { ThemesTab } from "./components/ThemesTab";
import type {
  ChatMessage,
  DashboardUser,
  DeleteTarget,
  FeedbackState,
  LinkItem,
  LinkModalState,
  ProductItem,
  ProductModalState,
} from "./components/types";

// ─── Chart constants ────────────────────────────────────────────────────────
const COLORS = [
  "var(--primary)",
  "var(--secondary)",
  "oklch(0.6693 0.0706 248.923)",
  "oklch(0.6678 0.1546 41.62)",
  "oklch(0.5957 0.1807 19.9763)",
  "oklch(0.7859 0.1342 83.6986)",
];

// ─── Props ──────────────────────────────────────────────────────────────────
interface DashboardClientProps {
  user: DashboardUser;
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function DashboardClient({ user }: DashboardClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState("profile");
  const [chartMounted, setChartMounted] = useState(false);

  useEffect(() => {
    setChartMounted(true);
  }, []);

  // ── Feedback ──────────────────────────────────────────────────────────────
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  const showFeedback = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  // ── Link modal ────────────────────────────────────────────────────────────
  const [linkModal, setLinkModal] = useState<LinkModalState>({
    open: false,
    mode: "add",
  });
  const [linkTitleVal, setLinkTitleVal] = useState("");
  const [linkUrlVal, setLinkUrlVal] = useState("");
  const [linkDeepLink, setLinkDeepLink] = useState(false);

  const openAddLink = () => {
    setLinkDeepLink(false);
    setLinkTitleVal("");
    setLinkUrlVal("");
    setLinkModal({ open: true, mode: "add" });
  };

  const openEditLink = (link: LinkItem) => {
    setLinkDeepLink(link.isDeepLink);
    setLinkTitleVal(link.title);
    setLinkUrlVal(link.url);
    setLinkModal({ open: true, mode: "edit", data: link });
  };

  // ── Product modal ─────────────────────────────────────────────────────────
  const [productModal, setProductModal] = useState<ProductModalState>({
    open: false,
    mode: "add",
  });

  // ── Delete confirmation ───────────────────────────────────────────────────
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

  // ── Profile form values ───────────────────────────────────────────────────
  const [profileNameVal, setProfileNameVal] = useState(user.name || "");
  const [profileBioVal, setProfileBioVal] = useState(user.bio || "");

  // ── Chat state ────────────────────────────────────────────────────────────
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I am your Trivio AI Assistant. Ask me to suggest link titles, write a custom bio, or optimize your CTAs! What's on your mind today?",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  // ── Handlers ──────────────────────────────────────────────────────────────

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
      const res =
        linkModal.mode === "add"
          ? await addLinkAction(null, formData)
          : await editLinkAction(linkModal.data!.id, null, formData);
      if (res.success) {
        showFeedback("success", res.message || "Link saved!");
        setLinkModal({ open: false, mode: "add" });
        router.refresh();
      } else {
        showFeedback("error", res.error || "Error saving link.");
      }
    });
  };

  const handleDeleteLink = (linkId: string, title: string) => {
    setDeleteTarget({ type: "link", id: linkId, title });
    setDeleteConfirmOpen(true);
  };

  const handleProductSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res =
        productModal.mode === "add"
          ? await addProductAction(null, formData)
          : await editProductAction(productModal.data!.id, null, formData);
      if (res.success) {
        showFeedback("success", res.message || "Product saved!");
        setProductModal({ open: false, mode: "add" });
        router.refresh();
      } else {
        showFeedback("error", res.error || "Error saving product.");
      }
    });
  };

  const handleDeleteProduct = (productId: string, title: string) => {
    setDeleteTarget({ type: "product", id: productId, title });
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    startTransition(async () => {
      const res =
        deleteTarget.type === "link"
          ? await deleteLinkAction(deleteTarget.id)
          : await deleteProductAction(deleteTarget.id);
      if (res.success) {
        showFeedback(
          "success",
          `${deleteTarget.type === "link" ? "Link" : "Product"} deleted!`,
        );
        router.refresh();
      } else {
        showFeedback(
          "error",
          res.error || `Error deleting ${deleteTarget.type}.`,
        );
      }
      setDeleteConfirmOpen(false);
      setDeleteTarget(null);
    });
  };

  const handleSendChatMessage = async (
    e?: React.FormEvent,
    directMessage?: string,
  ) => {
    if (e) e.preventDefault();
    const textToSend = directMessage !== undefined ? directMessage : chatInput;
    if (!textToSend.trim() || chatLoading) return;

    const userMsg: ChatMessage = { role: "user", content: textToSend.trim() };
    const updatedMessages = [...chatMessages, userMsg];
    setChatMessages(updatedMessages);
    setChatInput("");
    setChatLoading(true);

    try {
      const res = await sendChatMessageAction(updatedMessages);
      if (res.success && res.reply) {
        setChatMessages((prev) => [
          ...prev,
          { role: "assistant", content: res.reply },
        ]);
      } else {
        setChatMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `⚠️ Error: ${res.error || "Failed to get AI response."}`,
          },
        ]);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: `⚠️ Error: ${message}` },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleImproveLinkWithAi = () => {
    if (!linkUrlVal) {
      showFeedback("error", "Please enter a Destination URL first.");
      return;
    }
    const prompt = `Suggest 3 optimized titles for the URL: ${linkUrlVal}${linkTitleVal ? ` (Current title: ${linkTitleVal})` : ""}`;
    setChatInput(prompt);
    setChatOpen(true);
    handleSendChatMessage(undefined, prompt);
  };

  const handleImproveBioWithAi = () => {
    const prompt = `Suggest a custom bio. My name is ${profileNameVal || "Creator"}${profileBioVal ? ` and my current bio is: "${profileBioVal}"` : ""}. Please write a few short options.`;
    setChatInput(prompt);
    setChatOpen(true);
    handleSendChatMessage(undefined, prompt);
  };

  // ── Computed chart values ─────────────────────────────────────────────────
  const totalClicks = user.links.reduce(
    (acc: number, l: LinkItem) => acc + (l.clickCount || 0),
    0,
  );

  const chartData = user.links.map((link: LinkItem) => ({
    name:
      link.title.length > 15 ? `${link.title.substring(0, 15)}...` : link.title,
    fullName: link.title,
    clicks: link.clickCount || 0,
    url: link.url,
  }));

  const hasClicks = chartData.some((d) => d.clicks > 0);

  // ── Analytics AI prompt builder ───────────────────────────────────────────
  const handleAnalyseWithAi = () => {
    const linksSummary =
      user.links.length > 0
        ? user.links
          .map((l: LinkItem) => `"${l.title}" (${l.clickCount || 0} clicks)`)
          .join(", ")
        : "no links yet";
    const prompt = `Please analyse my full analytics and tell me exactly what I need to change to get more clicks. Here is my current data: I have ${user.links.length} active links with ${totalClicks} total clicks. My links: ${linksSummary}. Give me a full breakdown with your top 3 specific actions I should take right now.`;
    setChatOpen(true);
    handleSendChatMessage(undefined, prompt);
  };

  // ── Tab nav config ────────────────────────────────────────────────────────
  const TAB_TRIGGER_CLASS =
    "w-full flex items-center justify-start gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left data-[state=active]:bg-card data-[state=active]:text-foreground border border-transparent data-[state=active]:border-border shadow-sm text-muted-foreground cursor-pointer";

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background text-foreground pb-20 relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-[0%] right-[10%] w-[450px] h-[450px] bg-secondary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <DashboardHeader username={user.username} onLogout={handleLogout} />

      <main className="max-w-6xl mx-auto px-4 mt-8">
        {/* Feedback */}
        <FeedbackAlert feedback={feedback} />

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          orientation="vertical"
          className="flex flex-col md:flex-row gap-8 w-full items-start"
        >
          {/* Sidebar nav */}
          <TabsList className="flex flex-col items-stretch h-auto bg-transparent border-none p-0 gap-2 shrink-0 w-full md:w-56">
            <TabsTrigger value="profile" className={TAB_TRIGGER_CLASS}>
              <UserIcon size={18} /> Edit Profile
            </TabsTrigger>
            <TabsTrigger value="links" className={TAB_TRIGGER_CLASS}>
              <Link2 size={18} /> Manage Links
            </TabsTrigger>
            <TabsTrigger value="products" className={TAB_TRIGGER_CLASS}>
              <ShoppingBag size={18} /> Shop Products ({user.products.length}/3)
            </TabsTrigger>
            <TabsTrigger value="themes" className={TAB_TRIGGER_CLASS}>
              <Palette size={18} /> Custom Themes
            </TabsTrigger>
            <TabsTrigger value="analytics" className={TAB_TRIGGER_CLASS}>
              <BarChart3 size={18} /> Analytics
            </TabsTrigger>
          </TabsList>

          {/* Tab content */}
          <div className="flex-1 w-full min-w-0">
            <TabsContent value="profile" className="mt-0 outline-none">
              <ProfileTab
                user={user}
                isPending={isPending}
                profileNameVal={profileNameVal}
                setProfileNameVal={setProfileNameVal}
                profileBioVal={profileBioVal}
                setProfileBioVal={setProfileBioVal}
                onSubmit={handleUpdateProfile}
                onImproveBioWithAi={handleImproveBioWithAi}
              />
            </TabsContent>

            <TabsContent value="links" className="mt-0 outline-none">
              <LinksTab
                links={user.links}
                onAddLink={openAddLink}
                onEditLink={openEditLink}
                onDeleteLink={handleDeleteLink}
              />
            </TabsContent>

            <TabsContent value="products" className="mt-0 outline-none">
              <ProductsTab
                products={user.products}
                onAddProduct={() =>
                  setProductModal({ open: true, mode: "add" })
                }
                onEditProduct={(p: ProductItem) =>
                  setProductModal({ open: true, mode: "edit", data: p })
                }
                onDeleteProduct={handleDeleteProduct}
              />
            </TabsContent>

            <TabsContent value="themes" className="mt-0 outline-none">
              <ThemesTab
                currentTheme={user.theme}
                isPending={isPending}
                onSelectTheme={handleSelectTheme}
              />
            </TabsContent>

            <TabsContent value="analytics" className="mt-0 outline-none">
              <AnalyticsTab
                links={user.links}
                totalClicks={totalClicks}
                chartData={chartData}
                hasClicks={hasClicks}
                chartMounted={chartMounted}
                colors={COLORS}
                onAnalyseWithAi={handleAnalyseWithAi}
              />
            </TabsContent>
          </div>
        </Tabs>
      </main>

      {/* Modals & Dialogs */}
      <LinkModal
        modal={linkModal}
        linkTitleVal={linkTitleVal}
        setLinkTitleVal={setLinkTitleVal}
        linkUrlVal={linkUrlVal}
        setLinkUrlVal={setLinkUrlVal}
        linkDeepLink={linkDeepLink}
        setLinkDeepLink={setLinkDeepLink}
        isPending={isPending}
        onSubmit={handleLinkSubmit}
        onClose={() => setLinkModal({ open: false, mode: "add" })}
        onImproveWithAi={handleImproveLinkWithAi}
      />

      <ProductModal
        modal={productModal}
        isPending={isPending}
        onSubmit={handleProductSubmit}
        onClose={() => setProductModal({ open: false, mode: "add" })}
      />

      <DeleteConfirmDialog
        open={deleteConfirmOpen}
        target={deleteTarget}
        isPending={isPending}
        onConfirm={handleConfirmDelete}
        onOpenChange={setDeleteConfirmOpen}
      />

      {/* Floating AI Chat */}
      <ChatAssistant
        isOpen={chatOpen}
        onToggle={() => setChatOpen((prev) => !prev)}
        messages={chatMessages}
        chatInput={chatInput}
        setChatInput={setChatInput}
        chatLoading={chatLoading}
        onSendMessage={handleSendChatMessage}
        links={user.links}
        profileNameVal={profileNameVal}
        linkUrlVal={linkUrlVal}
      />
    </div>
  );
}
