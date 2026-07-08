"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import {
  Briefcase,
  MessageSquare,
  Users,
  Plus,
  Trash2,
  Edit,
  Loader2,
  CheckCircle2,
  X,
  ExternalLink,
  Star,
  Save,
  Upload,
  ImageIcon,
  Link2,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Project {
  id?: string;
  title: string;
  url: string;
  img: string;
  desc: string;
  order?: number;
}

interface Testimonial {
  id?: string;
  quote: string;
  author: string;
  role: string;
  order?: number;
}

interface TeamMember {
  id?: string;
  name: string;
  role: string;
  img?: string;
  order?: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const inputCls =
  "w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white placeholder-neutral-600 focus:ring-2 focus:ring-blue-500 outline-none text-sm";
const textareaCls =
  "w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white placeholder-neutral-600 focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-300 mb-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
    </div>
  );
}

// ─── Image Upload Component ───────────────────────────────────────────────────

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  shape?: "square" | "circle";
  label?: string;
}

function ImageUpload({
  value,
  onChange,
  folder = "website",
  shape = "square",
  label = "Image",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(
    async (file: File) => {
      // Validate type
      if (!file.type.startsWith("image/")) {
        setUploadError("Please select an image file.");
        return;
      }
      // Validate size (5 MB)
      if (file.size > 5 * 1024 * 1024) {
        setUploadError("Image must be under 5 MB.");
        return;
      }

      setUploading(true);
      setUploadError("");

      try {
        const user = auth.currentUser;
        if (!user) throw new Error("Not authenticated");
        const token = await user.getIdToken();

        const fd = new FormData();
        fd.append("file", file);
        fd.append("folder", folder);

        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: fd,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
        onChange(data.url);
      } catch (err: any) {
        setUploadError(err.message);
      } finally {
        setUploading(false);
      }
    },
    [folder, onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) uploadFile(file);
    },
    [uploadFile]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    e.target.value = "";
  };

  const previewCls =
    shape === "circle"
      ? "w-24 h-24 rounded-full object-cover"
      : "w-full h-32 object-contain rounded-lg";

  return (
    <div className="space-y-2">
      {/* Mode Toggle */}
      <div className="flex items-center gap-2">
        <label className="block text-sm font-medium text-neutral-300 flex-1">
          {label}
        </label>
        <div className="flex rounded-md overflow-hidden border border-neutral-800 text-xs">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`flex items-center gap-1 px-2.5 py-1 transition-colors ${
              mode === "upload"
                ? "bg-blue-600 text-white"
                : "bg-neutral-900 text-neutral-400 hover:text-white"
            }`}
          >
            <Upload className="w-3 h-3" /> Upload
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`flex items-center gap-1 px-2.5 py-1 transition-colors ${
              mode === "url"
                ? "bg-blue-600 text-white"
                : "bg-neutral-900 text-neutral-400 hover:text-white"
            }`}
          >
            <Link2 className="w-3 h-3" /> URL
          </button>
        </div>
      </div>

      {mode === "url" ? (
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
          placeholder="https://example.com/image.png"
        />
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-xl transition-colors cursor-pointer ${
            dragOver
              ? "border-blue-500 bg-blue-500/10"
              : "border-neutral-700 hover:border-neutral-600 bg-neutral-950"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {value ? (
            /* Preview */
            <div className="relative p-3 flex flex-col items-center gap-2">
              {shape === "circle" ? (
                <img
                  src={value}
                  alt="preview"
                  className={previewCls}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <img
                  src={value}
                  alt="preview"
                  className={previewCls}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              )}
              <span className="text-xs text-neutral-500 text-center line-clamp-1 max-w-xs">
                {value.split("/").pop()}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange("");
                }}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <div className="text-xs text-neutral-500">
                Click or drag to replace
              </div>
            </div>
          ) : uploading ? (
            /* Uploading State */
            <div className="py-10 flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              <span className="text-sm text-neutral-400">Uploading to Bunny CDN…</span>
            </div>
          ) : (
            /* Empty State */
            <div className="py-8 flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-neutral-500" />
              </div>
              <div className="text-sm text-neutral-400">
                <span className="text-blue-400 font-medium">Click to upload</span> or drag & drop
              </div>
              <div className="text-xs text-neutral-600">PNG, JPG, WebP · max 5 MB</div>
            </div>
          )}
        </div>
      )}

      {uploadError && (
        <p className="text-xs text-red-400">{uploadError}</p>
      )}
    </div>
  );
}

// ─── Tab Button ───────────────────────────────────────────────────────────────

function TabBtn({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: any;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
        active
          ? "border-blue-500 text-blue-400"
          : "border-transparent text-neutral-400 hover:text-white hover:border-neutral-700"
      }`}
    >
      <Icon className="w-4 h-4 mr-2" />
      {label}
    </button>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Alerts & Empty State ─────────────────────────────────────────────────────

function Alert({ type, msg }: { type: "success" | "error"; msg: string }) {
  if (!msg) return null;
  return (
    <div
      className={`p-4 rounded-lg flex items-center text-sm ${
        type === "success"
          ? "bg-emerald-500/10 border border-emerald-500/50 text-emerald-400"
          : "bg-red-500/10 border border-red-500/50 text-red-400"
      }`}
    >
      {type === "success" && <CheckCircle2 className="w-5 h-5 mr-3 shrink-0" />}
      {msg}
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="text-center py-16 text-neutral-500">
      <p className="text-sm">No {label} yet. Click &quot;Add&quot; to create one.</p>
      <p className="text-xs mt-1 text-neutral-600">
        (When empty, the homepage uses built-in fallback data.)
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS TAB
// ─────────────────────────────────────────────────────────────────────────────

function ProjectsTab() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Project | null>(null);
  const [form, setForm] = useState<Project>({ title: "", url: "", img: "", desc: "" });

  const COLLECTION = "website_projects";

  const fetchItems = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, COLLECTION), orderBy("order", "asc"));
      const snap = await getDocs(q);
      setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Project) })));
    } catch {
      try {
        const snap = await getDocs(collection(db, COLLECTION));
        setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Project) })));
      } catch (err: any) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const openAdd = () => {
    setEditItem(null);
    setForm({ title: "", url: "", img: "", desc: "", order: items.length });
    setModalOpen(true);
    setError(""); setSuccess("");
  };

  const openEdit = (item: Project) => {
    setEditItem(item);
    setForm({ ...item });
    setModalOpen(true);
    setError(""); setSuccess("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(""); setSuccess("");
    try {
      if (editItem?.id) {
        await updateDoc(doc(db, COLLECTION, editItem.id), { ...form, updatedAt: serverTimestamp() });
        setSuccess("Project updated!");
      } else {
        await addDoc(collection(db, COLLECTION), { ...form, createdAt: serverTimestamp() });
        setSuccess("Project added!");
      }
      setModalOpen(false);
      fetchItems();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    setDeleting(id);
    try {
      await deleteDoc(doc(db, COLLECTION, id));
      setSuccess(`"${title}" deleted.`);
      fetchItems();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-400">
          Manage the &quot;Featured Projects&quot; section on the homepage.
          <span className="ml-2 text-neutral-600 text-xs">(Fallback used when empty)</span>
        </p>
        <button onClick={openAdd} className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
          <Plus className="w-4 h-4 mr-1.5" /> Add Project
        </button>
      </div>

      <Alert type="success" msg={success} />
      <Alert type="error" msg={error} />

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-neutral-500" /></div>
      ) : items.length === 0 ? (
        <EmptyState label="featured projects" />
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex gap-4 items-start">
              <div className="w-20 h-14 rounded-lg bg-neutral-950 shrink-0 flex items-center justify-center overflow-hidden">
                {item.img ? (
                  <img src={item.img} alt={item.title} className="w-full h-full object-contain p-1" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-neutral-700" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-white">{item.title}</span>
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
                <p className="text-xs text-neutral-500 line-clamp-2">{item.desc}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(item)} className="inline-flex items-center px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 rounded-md text-xs text-neutral-300 transition-colors">
                  <Edit className="w-3.5 h-3.5 mr-1" /> Edit
                </button>
                <button onClick={() => handleDelete(item.id!, item.title)} disabled={deleting === item.id} className="inline-flex items-center px-2.5 py-1.5 bg-neutral-800 hover:bg-red-900/40 text-red-400 rounded-md text-xs transition-colors disabled:opacity-50">
                  {deleting === item.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5 mr-1" />} Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <Modal title={editItem ? "Edit Project" : "Add Project"} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Project Title" required>
                <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls} placeholder="e.g. Dhareeni.in" />
              </Field>
              <Field label="Website URL">
                <input type="url" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} className={inputCls} placeholder="https://example.com" />
              </Field>
              <Field label="Display Order">
                <input type="number" value={form.order ?? 0} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className={inputCls} min={0} />
              </Field>
            </div>

            <ImageUpload
              label="Logo / Project Image"
              value={form.img}
              onChange={(url) => setForm({ ...form, img: url })}
              folder="website/projects"
              shape="square"
            />

            <Field label="Description" required>
              <textarea required rows={4} value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} className={textareaCls} placeholder="Brief description of the project…" />
            </Field>

            {error && <Alert type="error" msg={error} />}
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setModalOpen(false)} className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-2.5 rounded-lg transition-colors text-sm">Cancel</button>
              <button type="submit" disabled={saving} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors flex justify-center items-center text-sm disabled:opacity-50">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4 mr-1.5" /> {editItem ? "Save Changes" : "Add Project"}</>}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TESTIMONIALS TAB
// ─────────────────────────────────────────────────────────────────────────────

function TestimonialsTab() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<Testimonial>({ quote: "", author: "", role: "" });

  const COLLECTION = "website_testimonials";

  const fetchItems = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, COLLECTION), orderBy("order", "asc"));
      const snap = await getDocs(q);
      setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Testimonial) })));
    } catch {
      try {
        const snap = await getDocs(collection(db, COLLECTION));
        setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Testimonial) })));
      } catch (err: any) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const openAdd = () => {
    setEditItem(null);
    setForm({ quote: "", author: "", role: "", order: items.length });
    setModalOpen(true);
    setError(""); setSuccess("");
  };

  const openEdit = (item: Testimonial) => {
    setEditItem(item);
    setForm({ ...item });
    setModalOpen(true);
    setError(""); setSuccess("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(""); setSuccess("");
    try {
      if (editItem?.id) {
        await updateDoc(doc(db, COLLECTION, editItem.id), { ...form, updatedAt: serverTimestamp() });
        setSuccess("Testimonial updated!");
      } else {
        await addDoc(collection(db, COLLECTION), { ...form, createdAt: serverTimestamp() });
        setSuccess("Testimonial added!");
      }
      setModalOpen(false);
      fetchItems();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, author: string) => {
    if (!window.confirm(`Delete testimonial from "${author}"?`)) return;
    setDeleting(id);
    try {
      await deleteDoc(doc(db, COLLECTION, id));
      setSuccess(`Testimonial from "${author}" deleted.`);
      fetchItems();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-400">
          Manage the &quot;What clients say&quot; testimonials marquee on the homepage.
          <span className="ml-2 text-neutral-600 text-xs">(Fallback used when empty)</span>
        </p>
        <button onClick={openAdd} className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
          <Plus className="w-4 h-4 mr-1.5" /> Add Testimonial
        </button>
      </div>

      <Alert type="success" msg={success} />
      <Alert type="error" msg={error} />

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-neutral-500" /></div>
      ) : items.length === 0 ? (
        <EmptyState label="testimonials" />
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center shrink-0 text-blue-400 font-bold text-lg">
                {item.author[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} fill="var(--hi,#00f0ff)" color="var(--hi,#00f0ff)" size={12} />)}
                </div>
                <p className="text-sm text-neutral-300 italic line-clamp-2 mb-2">&quot;{item.quote}&quot;</p>
                <span className="text-xs font-medium text-white">{item.author}</span>
                <span className="text-xs text-neutral-500"> · {item.role}</span>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(item)} className="inline-flex items-center px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 rounded-md text-xs text-neutral-300 transition-colors">
                  <Edit className="w-3.5 h-3.5 mr-1" /> Edit
                </button>
                <button onClick={() => handleDelete(item.id!, item.author)} disabled={deleting === item.id} className="inline-flex items-center px-2.5 py-1.5 bg-neutral-800 hover:bg-red-900/40 text-red-400 rounded-md text-xs transition-colors disabled:opacity-50">
                  {deleting === item.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5 mr-1" />} Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <Modal title={editItem ? "Edit Testimonial" : "Add Testimonial"} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSave} className="space-y-4">
            <Field label="Quote" required>
              <textarea required rows={4} value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} className={textareaCls} placeholder="What did the client say?" />
            </Field>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Client Name" required>
                <input type="text" required value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className={inputCls} placeholder="e.g. Sanjay M." />
              </Field>
              <Field label="Role / Company">
                <input type="text" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className={inputCls} placeholder="e.g. Director, E-Hotel Store" />
              </Field>
              <Field label="Display Order">
                <input type="number" value={form.order ?? 0} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className={inputCls} min={0} />
              </Field>
            </div>
            {error && <Alert type="error" msg={error} />}
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setModalOpen(false)} className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-2.5 rounded-lg transition-colors text-sm">Cancel</button>
              <button type="submit" disabled={saving} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors flex justify-center items-center text-sm disabled:opacity-50">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4 mr-1.5" /> {editItem ? "Save Changes" : "Add Testimonial"}</>}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TEAM TAB
// ─────────────────────────────────────────────────────────────────────────────

function TeamTab() {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<TeamMember | null>(null);
  const [form, setForm] = useState<TeamMember>({ name: "", role: "", img: "" });

  const COLLECTION = "website_team";

  const fetchItems = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, COLLECTION), orderBy("order", "asc"));
      const snap = await getDocs(q);
      setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as TeamMember) })));
    } catch {
      try {
        const snap = await getDocs(collection(db, COLLECTION));
        setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as TeamMember) })));
      } catch (err: any) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const openAdd = () => {
    setEditItem(null);
    setForm({ name: "", role: "", img: "", order: items.length });
    setModalOpen(true);
    setError(""); setSuccess("");
  };

  const openEdit = (item: TeamMember) => {
    setEditItem(item);
    setForm({ ...item });
    setModalOpen(true);
    setError(""); setSuccess("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(""); setSuccess("");
    try {
      if (editItem?.id) {
        await updateDoc(doc(db, COLLECTION, editItem.id), { ...form, updatedAt: serverTimestamp() });
        setSuccess("Team member updated!");
      } else {
        await addDoc(collection(db, COLLECTION), { ...form, createdAt: serverTimestamp() });
        setSuccess("Team member added!");
      }
      setModalOpen(false);
      fetchItems();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Remove "${name}" from the team?`)) return;
    setDeleting(id);
    try {
      await deleteDoc(doc(db, COLLECTION, id));
      setSuccess(`"${name}" removed.`);
      fetchItems();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-400">
          Manage the &quot;The humans behind it&quot; team section on the homepage.
          <span className="ml-2 text-neutral-600 text-xs">(Fallback used when empty)</span>
        </p>
        <button onClick={openAdd} className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
          <Plus className="w-4 h-4 mr-1.5" /> Add Member
        </button>
      </div>

      <Alert type="success" msg={success} />
      <Alert type="error" msg={error} />

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-neutral-500" /></div>
      ) : items.length === 0 ? (
        <EmptyState label="team members" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex flex-col items-center text-center gap-3">
              {item.img ? (
                <img src={item.img} alt={item.name} className="w-20 h-20 rounded-full object-cover bg-neutral-800" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 font-bold text-3xl">
                  {item.name[0]}
                </div>
              )}
              <div>
                <div className="font-semibold text-white">{item.name}</div>
                <div className="text-xs text-neutral-400 mt-0.5">{item.role}</div>
              </div>
              <div className="flex gap-2 mt-auto">
                <button onClick={() => openEdit(item)} className="inline-flex items-center px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 rounded-md text-xs text-neutral-300 transition-colors">
                  <Edit className="w-3.5 h-3.5 mr-1" /> Edit
                </button>
                <button onClick={() => handleDelete(item.id!, item.name)} disabled={deleting === item.id} className="inline-flex items-center px-2.5 py-1.5 bg-neutral-800 hover:bg-red-900/40 text-red-400 rounded-md text-xs transition-colors disabled:opacity-50">
                  {deleting === item.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5 mr-1" />} Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <Modal title={editItem ? "Edit Team Member" : "Add Team Member"} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Full Name" required>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="e.g. Rahul" />
              </Field>
              <Field label="Role / Title" required>
                <input type="text" required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className={inputCls} placeholder="e.g. Web Developer" />
              </Field>
              <Field label="Display Order">
                <input type="number" value={form.order ?? 0} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className={inputCls} min={0} />
              </Field>
            </div>

            <ImageUpload
              label="Profile Photo"
              value={form.img || ""}
              onChange={(url) => setForm({ ...form, img: url })}
              folder="website/team"
              shape="circle"
            />

            {error && <Alert type="error" msg={error} />}
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setModalOpen(false)} className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-2.5 rounded-lg transition-colors text-sm">Cancel</button>
              <button type="submit" disabled={saving} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors flex justify-center items-center text-sm disabled:opacity-50">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4 mr-1.5" /> {editItem ? "Save Changes" : "Add Member"}</>}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────

type TabKey = "projects" | "testimonials" | "team";

export default function WebsiteContentPage() {
  const [tab, setTab] = useState<TabKey>("projects");

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Website Content</h2>
        <p className="text-neutral-400 mt-2">
          Manage dynamic content shown on the public homepage. If a section is empty, the site automatically uses built-in fallback data.
        </p>
      </div>

      <div className="flex space-x-1 border-b border-neutral-800">
        <TabBtn active={tab === "projects"} onClick={() => setTab("projects")} icon={Briefcase} label="Featured Projects" />
        <TabBtn active={tab === "testimonials"} onClick={() => setTab("testimonials")} icon={MessageSquare} label="What Clients Say" />
        <TabBtn active={tab === "team"} onClick={() => setTab("team")} icon={Users} label="The Humans Behind It" />
      </div>

      <div className="mt-6">
        {tab === "projects" && <ProjectsTab />}
        {tab === "testimonials" && <TestimonialsTab />}
        {tab === "team" && <TeamTab />}
      </div>
    </div>
  );
}
