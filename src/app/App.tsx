import { useState } from "react";
import { Toaster, toast } from "sonner";
import {
  Search,
  Command,
  Github,
  Sun,
  Moon,
  ChevronDown,
  Grid3X3,
  List,
  SlidersHorizontal,
  ArrowUpDown,
  Terminal,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  Layers,
  Type,
  Palette,
  Sparkles,
  Puzzle,
  Webhook,
  LayoutTemplate,
  Keyboard,
  Accessibility,
  History,
  Zap,
  SquareCode,
  Eye,
  X,
  ChevronUp,
  ToggleLeft,
  Settings2,
  Info,
  Package,
  Code2,
  BookOpen,
  Monitor,
  Menu,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Component {
  id: string;
  name: string;
  description: string;
  category: string;
  status: "stable" | "beta" | "alpha" | "new";
  version: string;
  hasA11y: boolean;
  hasKeyboard: boolean;
  preview: React.ReactNode;
  code: string;
  filename: string;
  dependencies: string[];
  ariaLabel: string;
  keyboardShortcuts: string[];
  installCmd: string;
}

// ─── Sidebar nav data ─────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  {
    label: "Getting Started",
    icon: BookOpen,
    items: ["Introduction", "Installation", "Quickstart"],
  },
  {
    label: "Foundations",
    icon: Layers,
    items: ["Colors", "Typography", "Icons", "Spacing", "Shadows"],
  },
  {
    label: "Components",
    icon: Puzzle,
    items: ["Overview"],
    active: true,
  },
  {
    label: "Hooks",
    icon: Webhook,
    items: ["useMediaQuery", "useLocalStorage", "useDebounce"],
  },
  {
    label: "Templates",
    icon: LayoutTemplate,
    items: ["Dashboard", "Auth Pages", "Settings"],
  },
  {
    label: "CLI",
    icon: Terminal,
    items: ["init", "add", "diff"],
  },
  {
    label: "Themes",
    icon: Palette,
    items: ["Default", "Slate", "Stone", "Zinc"],
  },
  {
    label: "Accessibility",
    icon: Accessibility,
    items: ["Overview", "Guidelines", "Testing"],
  },
  {
    label: "Changelog",
    icon: History,
    items: ["v2.4.0", "v2.3.0", "v2.2.0"],
  },
];

// ─── Component previews ───────────────────────────────────────────────────────

function ButtonPreview() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); setTimeout(() => setSuccess(false), 1500); }, 900);
  };
  return (
    <div className="flex flex-wrap gap-2 items-center justify-center p-4">
      <button
        onClick={handleClick}
        className="px-3 py-1.5 text-xs font-medium rounded-md bg-primary text-white transition-all duration-150 hover:bg-blue-500 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50 flex items-center gap-1.5 min-w-[80px] justify-center"
      >
        {loading ? <span className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" /> : success ? <><Check size={11} /> Done</> : "Primary"}
      </button>
      <button className="px-3 py-1.5 text-xs font-medium rounded-md border border-border text-foreground hover:bg-muted transition-all duration-150 active:scale-95">Outline</button>
      <button className="px-3 py-1.5 text-xs font-medium rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-150 active:scale-95">Ghost</button>
      <button disabled className="px-3 py-1.5 text-xs font-medium rounded-md bg-muted text-muted-foreground/50 cursor-not-allowed">Disabled</button>
    </div>
  );
}

function InputPreview() {
  const [val, setVal] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="flex flex-col gap-2 px-4 py-3 w-full">
      <div className="relative">
        <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          className="w-full bg-muted border border-border rounded-md pl-7 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all"
          placeholder="Type to search..."
        />
      </div>
      <div className="relative">
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="email@example.com"
          className={`w-full bg-muted border rounded-md px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 transition-all ${val === "" ? "border-border" : isValidEmail(val) ? "border-green-500/50 focus:ring-green-500/30" : "border-destructive/50 focus:ring-destructive/50"
            }`}
        />
        {val !== "" && (
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px]">
            {isValidEmail(val) ? (
              <span className="text-green-400">✓ Valid</span>
            ) : (
              <span className="text-red-400">✗ Invalid</span>
            )}
          </span>
        )}
      </div>
    </div>
  );
}

function BadgePreview() {
  return (
    <div className="flex flex-wrap gap-2 items-center justify-center p-4">
      <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-primary/15 text-primary border border-primary/20">Stable</span>
      <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-yellow-500/15 text-yellow-400 border border-yellow-500/20">Beta</span>
      <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-green-500/15 text-green-400 border border-green-500/20">New</span>
      <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-destructive/15 text-red-400 border border-destructive/20">Deprecated</span>
      <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/20">v2.4</span>
    </div>
  );
}

function TabsPreview() {
  const [active, setActive] = useState(0);
  const tabs = ["Preview", "Code", "Docs"];
  return (
    <div className="px-4 py-3 w-full">
      <div className="flex gap-1 border-b border-border mb-3">
        {tabs.map((t, i) => (
          <button
            key={t}
            onClick={() => setActive(i)}
            className={`px-3 py-1.5 text-xs font-semibold transition-all border-b-2 -mb-px ${i === active ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="min-h-[50px] flex flex-col justify-center">
        {active === 0 && (
          <div className="flex items-center gap-3 p-2 bg-white/[0.02] border border-white/[0.04] rounded-lg animate-in fade-in duration-200">
            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">WK</div>
            <div>
              <p className="text-[11px] font-semibold text-foreground">Wijaya Kusuma</p>
              <p className="text-[10px] text-muted-foreground">Lead Architect</p>
            </div>
            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          </div>
        )}
        {active === 1 && (
          <div className="p-2 bg-[#080A0D] border border-white/[0.04] rounded-md font-mono text-[9.5px] text-primary/90 leading-relaxed animate-in fade-in duration-200">
            {"<Tabs defaultValue=\"preview\">\n  <TabsList>\n    <TabsTrigger value=\"preview\">Preview</TabsTrigger>"}
          </div>
        )}
        {active === 2 && (
          <div className="text-[10px] text-muted-foreground leading-relaxed pl-1 space-y-0.5 animate-in fade-in duration-200">
            <p className="font-semibold text-foreground">API Reference:</p>
            <p>• <code className="text-primary font-mono">orientation</code>: "horizontal" | "vertical"</p>
          </div>
        )}
      </div>
    </div>
  );
}

function AccordionPreview() {
  const [open, setOpen] = useState<number | null>(0);
  const items = ["What is a Design System?", "How to install?", "Can I customize tokens?"];
  return (
    <div className="px-4 py-2 w-full space-y-1">
      {items.map((item, i) => (
        <div key={i} className="border border-border rounded-md overflow-hidden">
          <button onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between px-3 py-2 text-xs font-medium text-foreground hover:bg-muted/50 transition-colors">
            {item}
            <ChevronDown size={12} className={`text-muted-foreground transition-transform duration-200 ${open === i ? "rotate-180" : ""}`} />
          </button>
          {open === i && (
            <div className="px-3 pb-2 text-[11px] text-muted-foreground border-t border-border pt-2">
              A comprehensive set of reusable components and guidelines for building consistent interfaces.
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function SwitchPreview() {
  const [checked, setChecked] = useState(true);
  const [checked2, setChecked2] = useState(false);
  return (
    <div className="flex flex-col gap-3 px-4 py-3">
      {[{ label: "Dark Mode", val: checked, set: setChecked }, { label: "Notifications", val: checked2, set: setChecked2 }].map(({ label, val, set }) => (
        <div key={label} className="flex items-center justify-between">
          <span className="text-xs text-foreground">{label}</span>
          <button onClick={() => set(!val)} role="switch" aria-checked={val}
            className={`relative w-8 h-4 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${val ? "bg-primary" : "bg-muted border border-border"}`}>
            <span className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform duration-200 ${val ? "translate-x-4" : "translate-x-0"}`} />
          </button>
        </div>
      ))}
    </div>
  );
}

function CheckboxPreview() {
  const [items, setItems] = useState([
    { label: "Accessible components", checked: true },
    { label: "TypeScript support", checked: true },
    { label: "Dark mode", checked: false },
    { label: "RTL support", checked: false },
  ]);
  return (
    <div className="px-4 py-3 space-y-2">
      {items.map((item, i) => (
        <label key={i} className="flex items-center gap-2 cursor-pointer group">
          <div onClick={() => setItems(items.map((it, idx) => idx === i ? { ...it, checked: !it.checked } : it))}
            className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all duration-150 flex-shrink-0 ${item.checked ? "bg-primary border-primary" : "border-border hover:border-primary/50"}`}>
            {item.checked && <Check size={9} className="text-white" />}
          </div>
          <span className="text-xs text-foreground group-hover:text-foreground/90">{item.label}</span>
        </label>
      ))}
    </div>
  );
}

function DialogPreview() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative p-4 flex items-center justify-center">
      <button onClick={() => setOpen(true)}
        className="px-3 py-1.5 text-xs font-medium rounded-md bg-muted border border-border text-foreground hover:bg-accent transition-colors active:scale-95">
        Open Dialog
      </button>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 transition-opacity animate-in fade-in duration-200" onClick={() => setOpen(false)}>
          <div className="bg-[#111318] border border-border rounded-xl p-5 w-80 shadow-2xl animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-foreground">Confirm Action</span>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground"><X size={14} /></button>
            </div>
            <p className="text-xs text-muted-foreground mb-4">This action cannot be undone. This will permanently delete your account and remove your data from our servers.</p>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setOpen(false)} className="px-3 py-1.5 text-xs font-medium rounded-md border border-border text-foreground hover:bg-muted transition-colors active:scale-95">Cancel</button>
              <button onClick={() => setOpen(false)} className="px-3 py-1.5 text-xs font-medium rounded-md bg-destructive text-white hover:bg-red-500 transition-colors active:scale-95">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ToastPreview() {
  const triggerSuccessToast = () => {
    toast.success("Component copied!", {
      description: "Button.tsx added to clipboard.",
    });
  };

  const triggerWarningToast = () => {
    toast.warning("Breaking change in v2.4", {
      description: "Review migration guide.",
    });
  };

  return (
    <div className="px-4 py-3 flex flex-col gap-2 items-center justify-center h-full min-h-[100px]">
      <div className="flex gap-2 w-full">
        <button
          onClick={triggerSuccessToast}
          className="flex-1 px-2.5 py-1.5 text-[11px] font-medium rounded-md bg-green-500/15 border border-green-500/20 text-green-400 hover:bg-green-500/20 transition-all active:scale-95"
        >
          Success Toast
        </button>
        <button
          onClick={triggerWarningToast}
          className="flex-1 px-2.5 py-1.5 text-[11px] font-medium rounded-md bg-yellow-500/15 border border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20 transition-all active:scale-95"
        >
          Warning Toast
        </button>
      </div>
    </div>
  );
}

function TablePreview() {
  const rows = [
    { name: "Button", status: "stable", size: "1.2kb", deps: 0 },
    { name: "Dialog", status: "stable", size: "3.4kb", deps: 2 },
    { name: "Combobox", status: "beta", size: "5.1kb", deps: 3 },
  ];
  return (
    <div className="px-2 py-2 w-full overflow-hidden">
      <table className="w-full text-[10px]">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left px-2 pb-1.5 font-medium text-muted-foreground">Component</th>
            <th className="text-left px-2 pb-1.5 font-medium text-muted-foreground">Status</th>
            <th className="text-right px-2 pb-1.5 font-medium text-muted-foreground">Size</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
              <td className="px-2 py-1.5 font-mono text-foreground">{r.name}</td>
              <td className="px-2 py-1.5">
                <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-medium ${r.status === "stable" ? "bg-green-500/15 text-green-400" : "bg-yellow-500/15 text-yellow-400"}`}>{r.status}</span>
              </td>
              <td className="px-2 py-1.5 text-right text-muted-foreground font-mono">{r.size}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SelectPreview() {
  const [val, setVal] = useState("Inter");
  const [open, setOpen] = useState(false);
  const opts = ["Inter", "JetBrains Mono", "Geist", "Cal Sans"];
  return (
    <div className="px-4 py-3 relative">
      <button onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full bg-muted border border-border rounded-md px-3 py-1.5 text-xs text-foreground hover:bg-accent transition-colors">
        <span>{val}</span>
        <ChevronDown size={12} className="text-muted-foreground" />
      </button>
      {open && (
        <div className="absolute top-full left-4 right-4 mt-1 bg-popover border border-border rounded-md shadow-xl z-20 overflow-hidden">
          {opts.map((o) => (
            <button key={o} onClick={() => { setVal(o); setOpen(false); }}
              className={`flex items-center gap-2 w-full px-3 py-1.5 text-[11px] hover:bg-muted transition-colors text-left ${o === val ? "text-primary" : "text-foreground"}`}>
              {o === val && <Check size={10} />}
              {o !== val && <span className="w-2.5" />}
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function AvatarPreview() {
  const avatars = [
    { initials: "WK", color: "bg-blue-500/20 text-blue-400" },
    { initials: "SK", color: "bg-purple-500/20 text-purple-400" },
    { initials: "AR", color: "bg-green-500/20 text-green-400" },
    { initials: "+5", color: "bg-muted text-muted-foreground" },
  ];
  return (
    <div className="flex flex-col gap-3 px-4 py-3 items-center">
      <div className="flex -space-x-2">
        {avatars.map((a, i) => (
          <div key={i} className={`w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-semibold ${a.color}`}>
            {a.initials}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[9px] font-bold">TC</div>
        <div>
          <p className="text-[10px] font-medium text-foreground">Thomas Clark</p>
          <p className="text-[9px] text-muted-foreground">@tclark · Senior Engineer</p>
        </div>
      </div>
    </div>
  );
}

function ProgressPreview() {
  return (
    <div className="px-4 py-3 space-y-3">
      {[{ label: "Bundle size", value: 68, color: "bg-primary" }, { label: "Test coverage", value: 94, color: "bg-green-500" }, { label: "Accessibility", value: 100, color: "bg-purple-500" }].map(({ label, value, color }) => (
        <div key={label}>
          <div className="flex justify-between mb-1">
            <span className="text-[10px] text-muted-foreground">{label}</span>
            <span className="text-[10px] font-mono text-foreground">{value}%</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${value}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function SkeletonPreview() {
  return (
    <div className="px-4 py-3 space-y-3.5 w-full">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-white/[0.07] animate-pulse flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-2.5 bg-white/[0.07] rounded animate-pulse w-2/3" />
          <div className="h-2 bg-white/[0.07] rounded animate-pulse w-1/3" />
        </div>
      </div>
      <div className="space-y-1.5 pt-1">
        <div className="h-2 bg-white/[0.05] rounded animate-pulse w-full" />
        <div className="h-2 bg-white/[0.05] rounded animate-pulse w-11/12" />
        <div className="h-2 bg-white/[0.05] rounded animate-pulse w-4/5" />
      </div>
    </div>
  );
}

// ─── Component data ───────────────────────────────────────────────────────────

const COMPONENTS: Component[] = [
  {
    id: "button",
    name: "Button",
    description: "Trigger actions with configurable variants, sizes, loading states, and icon support.",
    category: "Forms",
    status: "stable",
    version: "v2.4.0",
    hasA11y: true,
    hasKeyboard: true,
    preview: <ButtonPreview />,
    filename: "Button.tsx",
    code: `import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive"
  size?: "sm" | "md" | "lg"
  loading?: boolean
}

export function Button({
  variant = "default",
  size = "md",
  loading,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  )
}`,
    dependencies: ["lucide-react", "class-variance-authority"],
    ariaLabel: "button",
    keyboardShortcuts: ["Enter", "Space"],
    installCmd: "npx shadcn@latest add button",
  },
  {
    id: "input",
    name: "Input",
    description: "Text input with validation states, icons, and accessible label association.",
    category: "Forms",
    status: "stable",
    version: "v2.3.0",
    hasA11y: true,
    hasKeyboard: true,
    preview: <InputPreview />,
    filename: "Input.tsx",
    code: `import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  icon?: React.ReactNode
}

export function Input({ error, icon, className, ...props }: InputProps) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </div>
      )}
      <input
        className={cn(
          "w-full rounded-md border bg-background px-3 py-2 text-sm",
          "placeholder:text-muted-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring",
          error && "border-destructive focus:ring-destructive/50",
          icon && "pl-10",
          className
        )}
        {...props}
      />
    </div>
  )
}`,
    dependencies: [],
    ariaLabel: "textbox",
    keyboardShortcuts: ["Tab", "Shift+Tab"],
    installCmd: "npx shadcn@latest add input",
  },
  {
    id: "badge",
    name: "Badge",
    description: "Compact status indicators and labels with semantic color variants.",
    category: "Display",
    status: "stable",
    version: "v2.1.0",
    hasA11y: true,
    hasKeyboard: false,
    preview: <BadgePreview />,
    filename: "Badge.tsx",
    code: `import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary border border-primary/20",
        success: "bg-green-500/10 text-green-500 border border-green-500/20",
        warning: "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
        destructive: "bg-destructive/10 text-destructive border border-destructive/20",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

export function Badge({ variant, className, ...props }: VariantProps<typeof badgeVariants> & React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}`,
    dependencies: ["class-variance-authority"],
    ariaLabel: "status",
    keyboardShortcuts: [],
    installCmd: "npx shadcn@latest add badge",
  },
  {
    id: "tabs",
    name: "Tabs",
    description: "Accessible tabbed navigation built on Radix UI with smooth transitions.",
    category: "Navigation",
    status: "stable",
    version: "v2.4.0",
    hasA11y: true,
    hasKeyboard: true,
    preview: <TabsPreview />,
    filename: "Tabs.tsx",
    code: `import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "flex border-b border-border",
      className
    )}
    {...props}
  />
))

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "px-4 py-2 text-sm font-medium transition-colors",
      "border-b-2 border-transparent -mb-px",
      "data-[state=active]:border-primary data-[state=active]:text-foreground",
      "text-muted-foreground hover:text-foreground",
      className
    )}
    {...props}
  />
))`,
    dependencies: ["@radix-ui/react-tabs"],
    ariaLabel: "tablist",
    keyboardShortcuts: ["ArrowLeft", "ArrowRight", "Home", "End"],
    installCmd: "npx shadcn@latest add tabs",
  },
  {
    id: "accordion",
    name: "Accordion",
    description: "Vertically stacked collapsible sections with smooth animations.",
    category: "Display",
    status: "stable",
    version: "v2.3.0",
    hasA11y: true,
    hasKeyboard: true,
    preview: <AccordionPreview />,
    filename: "Accordion.tsx",
    code: `import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border border-border rounded-md overflow-hidden mb-1", className)}
    {...props}
  />
))

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between px-4 py-3",
        "text-sm font-medium hover:bg-muted/50 transition-colors",
        "[&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))`,
    dependencies: ["@radix-ui/react-accordion"],
    ariaLabel: "region",
    keyboardShortcuts: ["Enter", "Space", "Tab", "ArrowUp", "ArrowDown"],
    installCmd: "npx shadcn@latest add accordion",
  },
  {
    id: "switch",
    name: "Switch",
    description: "Toggle control for binary on/off states with ARIA switch role.",
    category: "Forms",
    status: "stable",
    version: "v2.2.0",
    hasA11y: true,
    hasKeyboard: true,
    preview: <SwitchPreview />,
    filename: "Switch.tsx",
    code: `import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full",
      "border-2 border-transparent transition-colors duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=unchecked]:bg-input data-[state=checked]:bg-primary",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg",
        "transition-transform duration-200",
        "data-[state=unchecked]:translate-x-0 data-[state=checked]:translate-x-4"
      )}
    />
  </SwitchPrimitive.Root>
))`,
    dependencies: ["@radix-ui/react-switch"],
    ariaLabel: "switch",
    keyboardShortcuts: ["Space"],
    installCmd: "npx shadcn@latest add switch",
  },
  {
    id: "checkbox",
    name: "Checkbox",
    description: "Accessible checkbox with indeterminate state and label association.",
    category: "Forms",
    status: "stable",
    version: "v2.1.0",
    hasA11y: true,
    hasKeyboard: true,
    preview: <CheckboxPreview />,
    filename: "Checkbox.tsx",
    code: `import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded border border-border",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-primary data-[state=checked]:border-primary",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
      <Check className="h-3 w-3" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))`,
    dependencies: ["@radix-ui/react-checkbox"],
    ariaLabel: "checkbox",
    keyboardShortcuts: ["Space"],
    installCmd: "npx shadcn@latest add checkbox",
  },
  {
    id: "dialog",
    name: "Dialog",
    description: "Modal overlay with focus trap, scroll lock, and animated transitions.",
    category: "Overlay",
    status: "stable",
    version: "v2.4.0",
    hasA11y: true,
    hasKeyboard: true,
    preview: <DialogPreview />,
    filename: "Dialog.tsx",
    code: `import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]",
        "w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl p-6",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
        <X className="h-4 w-4" />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
))`,
    dependencies: ["@radix-ui/react-dialog"],
    ariaLabel: "dialog",
    keyboardShortcuts: ["Escape", "Tab"],
    installCmd: "npx shadcn@latest add dialog",
  },
  {
    id: "toast",
    name: "Toast",
    description: "Non-intrusive notification messages with variants and action support.",
    category: "Feedback",
    status: "stable",
    version: "v2.3.0",
    hasA11y: true,
    hasKeyboard: false,
    preview: <ToastPreview />,
    filename: "Toast.tsx",
    code: `import { Toaster, toast } from "sonner"

// In your layout
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          classNames: {
            toast: "bg-card border border-border text-foreground shadow-xl",
            description: "text-muted-foreground",
            actionButton: "bg-primary text-primary-foreground",
            cancelButton: "bg-muted text-muted-foreground",
          },
        }}
      />
    </>
  )
}

// Usage
toast.success("Component copied!", {
  description: "Button.tsx added to clipboard.",
})

toast.warning("Breaking change in v2.4", {
  description: "Review migration guide.",
  action: { label: "View guide", onClick: () => {} },
})`,
    dependencies: ["sonner"],
    ariaLabel: "alert",
    keyboardShortcuts: [],
    installCmd: "npx shadcn@latest add sonner",
  },
  {
    id: "table",
    name: "Table",
    description: "Data table with sorting, filtering, pagination, and row selection.",
    category: "Data",
    status: "stable",
    version: "v2.4.0",
    hasA11y: true,
    hasKeyboard: true,
    preview: <TablePreview />,
    filename: "DataTable.tsx",
    code: `import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table"

export function DataTable<TData>({
  columns,
  data,
}: {
  columns: ColumnDef<TData>[]
  data: TData[]
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="rounded-md border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-4 py-3 text-left font-medium text-muted-foreground">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
      </table>
    </div>
  )
}`,
    dependencies: ["@tanstack/react-table"],
    ariaLabel: "table",
    keyboardShortcuts: ["ArrowUp", "ArrowDown"],
    installCmd: "npx shadcn@latest add table",
  },
  {
    id: "select",
    name: "Select",
    description: "Customizable dropdown select with search, groups, and multi-select.",
    category: "Forms",
    status: "stable",
    version: "v2.2.0",
    hasA11y: true,
    hasKeyboard: true,
    preview: <SelectPreview />,
    filename: "Select.tsx",
    code: `import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root
const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-9 w-full items-center justify-between rounded-md",
      "border border-border bg-background px-3 py-2 text-sm",
      "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))`,
    dependencies: ["@radix-ui/react-select"],
    ariaLabel: "listbox",
    keyboardShortcuts: ["ArrowUp", "ArrowDown", "Enter", "Escape"],
    installCmd: "npx shadcn@latest add select",
  },
  {
    id: "avatar",
    name: "Avatar",
    description: "User avatars with image, initials fallback, and group stacking.",
    category: "Display",
    status: "stable",
    version: "v2.1.0",
    hasA11y: true,
    hasKeyboard: false,
    preview: <AvatarPreview />,
    filename: "Avatar.tsx",
    code: `import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium",
      className
    )}
    {...props}
  />
))`,
    dependencies: ["@radix-ui/react-avatar"],
    ariaLabel: "img",
    keyboardShortcuts: [],
    installCmd: "npx shadcn@latest add avatar",
  },
  {
    id: "progress",
    name: "Progress",
    description: "Accessible progress indicator with animated fill and color variants.",
    category: "Feedback",
    status: "new",
    version: "v2.4.0",
    hasA11y: true,
    hasKeyboard: false,
    preview: <ProgressPreview />,
    filename: "Progress.tsx",
    code: `import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number
  variant?: "default" | "success" | "warning" | "destructive"
}

const variantStyles = {
  default: "bg-primary",
  success: "bg-green-500",
  warning: "bg-yellow-500",
  destructive: "bg-destructive",
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value = 0, variant = "default", ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-2 w-full overflow-hidden rounded-full bg-muted", className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn("h-full flex-1 transition-all duration-700", variantStyles[variant])}
      style={{ transform: \`translateX(-\${100 - value}%)\` }}
    />
  </ProgressPrimitive.Root>
))`,
    dependencies: ["@radix-ui/react-progress"],
    ariaLabel: "progressbar",
    keyboardShortcuts: [],
    installCmd: "npx shadcn@latest add progress",
  },
  {
    id: "skeleton",
    name: "Skeleton",
    description: "Loading placeholder with pulse animation for async content.",
    category: "Feedback",
    status: "stable",
    version: "v2.0.0",
    hasA11y: true,
    hasKeyboard: false,
    preview: <SkeletonPreview />,
    filename: "Skeleton.tsx",
    code: `import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular"
}

export function Skeleton({ className, variant = "rectangular", ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse bg-muted",
        variant === "circular" && "rounded-full",
        variant === "text" && "rounded h-4",
        variant === "rectangular" && "rounded-md",
        className
      )}
      {...props}
    />
  )
}

// Compound usage
export function CardSkeleton() {
  return (
    <div className="space-y-3 p-4">
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" className="h-10 w-10" />
        <div className="space-y-2 flex-1">
          <Skeleton variant="text" className="w-3/4" />
          <Skeleton variant="text" className="w-1/2" />
        </div>
      </div>
      <Skeleton variant="text" className="w-full" />
      <Skeleton variant="text" className="w-5/6" />
    </div>
  )
}`,
    dependencies: [],
    ariaLabel: "status",
    keyboardShortcuts: [],
    installCmd: "npx shadcn@latest add skeleton",
  },
];

const CATEGORIES = ["All", "Forms", "Display", "Navigation", "Overlay", "Feedback", "Data"];

// ─── Code block ───────────────────────────────────────────────────────────────

function CodeBlock({ code, filename }: { code: string; filename: string }) {
  const [copied, setCopied] = useState(false);
  const lines = code.split("\n");

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const highlight = (line: string) => {
    if (line.trim().startsWith("//") || line.trim().startsWith("/*") || line.trim().startsWith("*")) {
      return <span className="text-[#6B7280]">{line}</span>;
    }
    return line
      .split(/(\bimport\b|\bfrom\b|\bexport\b|\bconst\b|\bfunction\b|\breturn\b|\binterface\b|\btype\b|\bdefault\b|\bnull\b|\bundefined\b|\btrue\b|\bfalse\b|"[^"]*"|'[^']*'|`[^`]*`|\{|\}|\(|\))/g)
      .map((part, i) => {
        if (["import", "from", "export", "const", "function", "return", "interface", "type", "default", "null", "undefined", "true", "false"].includes(part))
          return <span key={i} className="text-[#C084FC]">{part}</span>;
        if (/^["'`]/.test(part) || /^["'`]/.test(part))
          return <span key={i} className="text-[#86EFAC]">{part}</span>;
        if (["{", "}", "(", ")"].includes(part))
          return <span key={i} className="text-[#94A3B8]">{part}</span>;
        return <span key={i} className="text-[#E2E8F0]">{part}</span>;
      });
  };

  return (
    <div className="relative rounded-lg overflow-hidden border border-border bg-[#0D1117]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-[#111318]">
        <div className="flex items-center gap-2">
          <Code2 size={12} className="text-muted-foreground" />
          <span className="text-[11px] font-mono text-muted-foreground">{filename}</span>
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-[10px] text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-muted/50"
        >
          {copied ? <><Check size={10} className="text-green-400" /><span className="text-green-400">Copied</span></> : <><Copy size={10} /><span>Copy</span></>}
        </button>
      </div>
      <div className="overflow-x-auto">
        <pre className="p-4 text-[11px] leading-relaxed">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="flex">
                <span className="select-none w-8 text-right pr-4 text-[#374151] flex-shrink-0 font-mono">{i + 1}</span>
                <span className="font-mono">{highlight(line)}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

// ─── Component Card ───────────────────────────────────────────────────────────

function ComponentCard({
  component,
  onSelect,
  isSelected,
  viewMode,
}: {
  component: Component;
  onSelect: (c: Component) => void;
  isSelected: boolean;
  viewMode: "grid" | "list";
}) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const statusColors: Record<string, string> = {
    stable: "bg-green-500/10 text-green-400 border-green-500/20",
    beta: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    alpha: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    new: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };

  const copyInstall = () => {
    navigator.clipboard.writeText(component.installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (viewMode === "list") {
    return (
      <div
        onClick={() => onSelect(component)}
        className={`flex items-center gap-4 px-4 py-3 border rounded-lg cursor-pointer transition-all duration-150 hover:border-border/80 hover:bg-muted/30 ${isSelected ? "border-primary/40 bg-primary/5" : "border-border"}`}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-medium text-foreground">{component.name}</span>
            <span className={`px-1.5 py-0.5 text-[9px] font-medium rounded-full border ${statusColors[component.status]}`}>{component.status}</span>
            {component.hasA11y && <span className="px-1.5 py-0.5 text-[9px] font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">a11y</span>}
          </div>
          <p className="text-xs text-muted-foreground truncate">{component.description}</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-[10px] font-mono text-muted-foreground">{component.version}</span>
          <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded">{component.category}</span>
          <ChevronRight size={12} className="text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-150 hover:border-border/80 cursor-pointer group ${isSelected ? "border-primary/40 shadow-lg shadow-primary/10" : "border-border hover:shadow-md hover:shadow-black/30"}`}
      style={{ background: "#111318" }}
      onClick={() => onSelect(component)}
    >
      {/* Card header */}
      <div className="flex items-start justify-between px-4 pt-4 pb-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-semibold text-foreground">{component.name}</h3>
            <span className={`px-1.5 py-0.5 text-[9px] font-medium rounded-full border ${statusColors[component.status]}`}>{component.status}</span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed max-w-[220px]">{component.description}</p>
        </div>
        <span className="text-[9px] font-mono text-muted-foreground mt-0.5 flex-shrink-0 ml-2">{component.version}</span>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-1.5 px-4 pt-2.5">
        <span className="px-1.5 py-0.5 text-[9px] font-medium rounded text-muted-foreground bg-muted/60 border border-border">{component.category}</span>
        {component.hasA11y && <span className="px-1.5 py-0.5 text-[9px] font-medium rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">ARIA</span>}
        {component.hasKeyboard && <span className="px-1.5 py-0.5 text-[9px] font-medium rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">Keyboard</span>}
      </div>

      {/* Tab switcher */}
      <div className="flex items-center gap-0 px-4 mt-3 border-b border-border">
        {(["preview", "code"] as const).map((t) => (
          <button
            key={t}
            onClick={(e) => { e.stopPropagation(); setTab(t); }}
            className={`px-3 py-2 text-[10px] font-medium capitalize transition-all border-b-2 -mb-px ${tab === t ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            {t === "preview" ? <><Eye size={10} className="inline mr-1" />Preview</> : <><SquareCode size={10} className="inline mr-1" />Code</>}
          </button>
        ))}
      </div>

      {/* Preview / Code */}
      <div className="min-h-[120px]" onClick={(e) => e.stopPropagation()}>
        {tab === "preview" ? (
          <div className="bg-[#0D0F12] min-h-[120px]">
            {component.preview}
          </div>
        ) : (
          <div className="max-h-[180px] overflow-y-auto">
            <div className="p-0">
              <CodeBlock code={component.code} filename={component.filename} />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-border">
        <button
          onClick={(e) => { e.stopPropagation(); copyInstall(); }}
          className="flex items-center gap-1.5 text-[10px] text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? <><Check size={10} className="text-green-400" /><span className="text-green-400 font-mono">Copied!</span></> : <><Copy size={10} /><span className="font-mono">npx shadcn add</span></>}
        </button>
        <div className="flex items-center gap-2">
          <button onClick={(e) => e.stopPropagation()} className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors">
            <ExternalLink size={10} />
            <span>Docs</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Live Inspector Preview Component ────────────────────────────────────────

function LiveInspectorPreview({
  id,
  variant,
  size,
  disabled,
  theme
}: {
  id: string;
  variant: string;
  size: "sm" | "md" | "lg";
  disabled: boolean;
  theme: string;
}) {
  const [checked, setChecked] = useState(true);
  const [progress, setProgress] = useState(65);
  const [selectVal, setSelectVal] = useState("Inter");
  const [selectOpen, setSelectOpen] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const buttonSizes = {
    sm: "px-2 py-1 text-[10px] rounded",
    md: "px-3 py-1.5 text-xs rounded-md",
    lg: "px-4 py-2 text-sm rounded-md",
  };

  const buttonVariants = {
    default: "bg-primary text-white hover:bg-blue-500 shadow-sm shadow-blue-500/10",
    outline: "border border-border text-foreground hover:bg-muted/50",
    ghost: "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
    destructive: "bg-destructive text-white hover:bg-red-500 shadow-sm shadow-red-500/10",
  };

  const inputSizes = {
    sm: "px-2 py-1 text-[10px] rounded",
    md: "px-2.5 py-1.5 text-xs rounded-md",
    lg: "px-3 py-2 text-sm rounded-md",
  };

  const badgeVariants = {
    default: "bg-primary/10 text-primary border border-primary/20",
    outline: "border border-border text-foreground",
    ghost: "bg-muted/60 text-muted-foreground",
    destructive: "bg-destructive/10 text-red-400 border border-destructive/20",
  };

  switch (id) {
    case "button":
      return (
        <button
          disabled={disabled}
          className={`font-medium transition-all duration-150 active:scale-95 flex items-center justify-center gap-1.5 ${buttonSizes[size]} ${buttonVariants[variant as keyof typeof buttonVariants] || buttonVariants.default} ${disabled ? "opacity-50 cursor-not-allowed active:scale-100" : ""}`}
        >
          {variant === "destructive" ? "Delete Action" : "Execute Action"}
        </button>
      );

    case "input":
      return (
        <div className="w-full px-4">
          <input
            type="text"
            disabled={disabled}
            placeholder={variant === "destructive" ? "Error state..." : "Type custom parameters..."}
            className={`w-full bg-muted border rounded-md text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all ${inputSizes[size]} ${variant === "destructive" ? "border-destructive/50 focus:ring-destructive/30" : "border-border"
              } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          />
        </div>
      );

    case "badge":
      return (
        <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border tracking-wide uppercase ${badgeVariants[variant as keyof typeof badgeVariants] || badgeVariants.default}`}>
          {variant}
        </span>
      );

    case "switch":
      return (
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-mono">Status</span>
          <button
            onClick={() => !disabled && setChecked(!checked)}
            disabled={disabled}
            className={`relative w-8 h-4 rounded-full transition-colors duration-200 focus:outline-none ${checked ? "bg-primary" : "bg-muted border border-border"
              } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform duration-200 ${checked ? "translate-x-4" : "translate-x-0"}`} />
          </button>
        </div>
      );

    case "checkbox":
      return (
        <button
          onClick={() => !disabled && setChecked(!checked)}
          disabled={disabled}
          className={`flex items-center gap-2 text-left hover:opacity-90 ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
        >
          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${checked ? "bg-primary border-primary" : "border-border"}`}>
            {checked && <Check size={10} className="text-white" />}
          </div>
          <span className="text-xs text-foreground select-none">Terms &amp; Conditions</span>
        </button>
      );

    case "tabs":
      return (
        <div className="w-full px-2 text-center">
          <div className="flex border-b border-border mb-2.5">
            {["System", "Profile"].map((t, idx) => (
              <button
                key={t}
                disabled={disabled}
                onClick={() => setTabIndex(idx)}
                className={`flex-1 py-1 text-[11px] font-medium border-b-2 -mb-px transition-all ${tabIndex === idx ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
                  } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                {t}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground font-mono">
            {tabIndex === 0 ? "System preferences active." : "User credentials active."}
          </span>
        </div>
      );

    case "accordion":
      return (
        <div className="w-full px-4">
          <div className="border border-border rounded-md overflow-hidden bg-muted/20">
            <button
              onClick={() => !disabled && setAccordionOpen(!accordionOpen)}
              disabled={disabled}
              className={`flex w-full items-center justify-between px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted/40 transition-colors ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
            >
              <span>Toggle Information</span>
              <ChevronDown size={11} className={`text-muted-foreground transition-transform duration-200 ${accordionOpen ? "rotate-180" : ""}`} />
            </button>
            {accordionOpen && (
              <div className="px-3 py-2 text-[10px] text-muted-foreground border-t border-border bg-[#0D0F12] leading-relaxed">
                Render parameters configured via design tokens. Supports dark theme out of the box.
              </div>
            )}
          </div>
        </div>
      );

    case "progress":
      return (
        <div className="w-full px-4 space-y-2">
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-muted-foreground font-mono">Progress status</span>
            <span className="text-foreground font-mono">{progress}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden relative">
            <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex gap-1 justify-end pt-1">
            <button onClick={() => setProgress(prev => Math.max(0, prev - 10))} className="px-1.5 py-0.5 text-[9px] rounded bg-muted hover:bg-muted/85 text-foreground">-10</button>
            <button onClick={() => setProgress(prev => Math.min(100, prev + 10))} className="px-1.5 py-0.5 text-[9px] rounded bg-muted hover:bg-muted/85 text-foreground">+10</button>
          </div>
        </div>
      );

    case "select":
      return (
        <div className="w-full px-4 relative">
          <button
            onClick={() => !disabled && setSelectOpen(!selectOpen)}
            disabled={disabled}
            className={`flex items-center justify-between w-full bg-muted border border-border rounded-md px-2.5 py-1.5 text-xs text-foreground hover:bg-muted/80 transition-colors ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
          >
            <span>{selectVal}</span>
            <ChevronDown size={12} className="text-muted-foreground" />
          </button>
          {selectOpen && (
            <div className="absolute left-4 right-4 bottom-full mb-1 bg-popover border border-border rounded-md shadow-2xl z-50 overflow-hidden">
              {["Inter", "Geist", "System UI"].map((o) => (
                <button
                  key={o}
                  onClick={() => { setSelectVal(o); setSelectOpen(false); }}
                  className={`w-full px-3 py-1.5 text-[10px] hover:bg-muted transition-colors text-left ${o === selectVal ? "text-primary font-medium" : "text-foreground"}`}
                >
                  {o}
                </button>
              ))}
            </div>
          )}
        </div>
      );

    case "avatar":
      return (
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[11px] font-bold border border-primary/20">
            WK
          </div>
          <div>
            <p className="text-[11px] font-semibold text-foreground">Wijaya Kusuma</p>
            <p className="text-[9px] text-muted-foreground">Admin Operator</p>
          </div>
        </div>
      );

    case "dialog":
      return (
        <div>
          <button
            onClick={() => !disabled && setAccordionOpen(true)}
            disabled={disabled}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md bg-muted border border-border text-foreground hover:bg-muted/80 transition-colors active:scale-95 ${disabled ? "opacity-40 cursor-not-allowed active:scale-100" : ""}`}
          >
            Open Dialog
          </button>
          {accordionOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 transition-opacity" onClick={() => setAccordionOpen(false)}>
              <div className="bg-[#111318] border border-border rounded-xl p-5 w-80 shadow-2xl animate-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-foreground">Confirm Inspector Action</span>
                  <button onClick={() => setAccordionOpen(false)} className="text-muted-foreground hover:text-foreground"><X size={14} /></button>
                </div>
                <p className="text-xs text-muted-foreground mb-4">Triggered directly from custom Inspector parameters.</p>
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setAccordionOpen(false)} className="px-3 py-1.5 text-xs font-medium rounded-md border border-border text-foreground hover:bg-muted transition-colors active:scale-95">Cancel</button>
                  <button onClick={() => setAccordionOpen(false)} className="px-3 py-1.5 text-xs font-medium rounded-md bg-destructive text-white hover:bg-red-500 transition-colors active:scale-95">Confirm</button>
                </div>
              </div>
            </div>
          )}
        </div>
      );

    case "toast":
      return (
        <button
          disabled={disabled}
          onClick={() => toast.success("Inspector Toast triggered!")}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md bg-muted border border-border text-foreground hover:bg-muted/80 transition-colors active:scale-95 ${disabled ? "opacity-40 cursor-not-allowed active:scale-100" : ""}`}
        >
          Trigger Toast
        </button>
      );

    case "table":
      return (
        <div className="w-full px-2">
          <table className="w-full text-[10px]">
            <thead>
              <tr className="border-b border-border text-muted-foreground text-left">
                <th className="pb-1 px-1">Col 1</th>
                <th className="pb-1 px-1">Col 2</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/40 text-foreground">
                <td className="py-1 px-1 font-mono">Row A</td>
                <td className="py-1 px-1 text-muted-foreground">Enabled</td>
              </tr>
              <tr className="text-foreground">
                <td className="py-1 px-1 font-mono">Row B</td>
                <td className="py-1 px-1 text-muted-foreground">Stable</td>
              </tr>
            </tbody>
          </table>
        </div>
      );

    case "skeleton":
      return (
        <div className="w-full px-4 space-y-2.5 animate-pulse">
          <div className="h-3 bg-white/[0.07] rounded w-3/4" />
          <div className="h-2 bg-white/[0.05] rounded w-1/2" />
        </div>
      );

    default:
      return (
        <div className="w-8 h-8 rounded-md bg-muted animate-pulse" />
      );
  }
}

// ─── Generate Usage Code Helper ──────────────────────────────────────────────

function generateUsageCode(id: string, variant: string, size: string, disabled: boolean, theme: string) {
  const disabledAttr = disabled ? " disabled" : "";
  const variantAttr = variant !== "default" ? ` variant="${variant}"` : "";
  const sizeAttr = size !== "md" ? ` size="${size}"` : "";
  const themeAttr = theme !== "zinc" ? ` theme="${theme}"` : "";

  switch (id) {
    case "button":
      return `<Button${variantAttr}${sizeAttr}${disabledAttr}>Button</Button>`;
    case "input":
      return `<Input${variantAttr}${sizeAttr}${disabledAttr} placeholder="Search..." />`;
    case "badge":
      return `<Badge${variantAttr}>Badge</Badge>`;
    case "switch":
      return `<Switch${themeAttr}${disabledAttr} />`;
    case "checkbox":
      return `<Checkbox${disabledAttr} />`;
    case "tabs":
      return `<Tabs defaultValue="system">\n  <TabsList>\n    <TabsTrigger value="system">System</TabsTrigger>\n  </TabsList>\n</Tabs>`;
    default:
      return `<${id.charAt(0).toUpperCase() + id.slice(1)}${disabledAttr} />`;
  }
}

// ─── Inspector panel ──────────────────────────────────────────────────────────

function InspectorPanel({ component, onClose }: { component: Component; onClose: () => void }) {
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [variant, setVariant] = useState("default");
  const [disabled, setDisabled] = useState(false);
  const [theme, setTheme] = useState("zinc");
  const [copied, setCopied] = useState(false);

  const copyImport = () => {
    navigator.clipboard.writeText(`import { ${component.name} } from "@/components/ui/${component.name.toLowerCase()}"`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <aside className="fixed md:relative right-0 top-12 bottom-0 md:top-0 z-40 w-80 md:w-64 max-w-[90vw] border-l border-border bg-card flex flex-col overflow-hidden shadow-2xl md:shadow-none animate-in slide-in-from-right duration-200">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2">
          <Settings2 size={13} className="text-muted-foreground" />
          <span className="text-xs font-semibold text-foreground">Inspector</span>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
          <X size={14} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Live Interactive Preview */}
        <div className="px-4 py-6 border-b border-border bg-[#0D0F12] flex flex-col items-center justify-center min-h-[140px] relative">
          <span className="absolute top-2 left-2.5 text-[9px] font-bold tracking-widest font-mono text-muted-foreground/60 uppercase">Live Preview</span>
          <div className="flex items-center justify-center w-full h-full pt-3">
            <LiveInspectorPreview id={component.id} variant={variant} size={size} disabled={disabled} theme={theme} />
          </div>
        </div>

        {/* Component info */}
        <div className="px-4 py-3 border-b border-border">
          <p className="text-[11px] font-semibold text-foreground mb-0.5">{component.name}</p>
          <p className="text-[10px] text-muted-foreground leading-relaxed">{component.description}</p>
        </div>

        {/* Properties */}
        <div className="px-4 py-3 border-b border-border space-y-3">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Properties</p>

          <div>
            <label className="text-[10px] text-muted-foreground block mb-1.5">Variant</label>
            <div className="grid grid-cols-2 gap-1">
              {["default", "outline", "ghost", "destructive"].map((v) => (
                <button key={v} onClick={() => setVariant(v)}
                  className={`px-2 py-1 text-[10px] rounded border transition-all ${variant === v ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-border/80 hover:text-foreground"}`}>
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] text-muted-foreground block mb-1.5">Size</label>
            <div className="flex gap-1">
              {(["sm", "md", "lg"] as const).map((s) => (
                <button key={s} onClick={() => setSize(s)}
                  className={`flex-1 py-1 text-[10px] rounded border transition-all ${size === s ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-border/80"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-[10px] text-muted-foreground">Disabled</label>
            <button onClick={() => setDisabled(!disabled)}
              className={`relative w-7 h-3.5 rounded-full transition-colors duration-200 ${disabled ? "bg-primary" : "bg-muted border border-border"}`}>
              <span className={`absolute top-0.5 w-2.5 h-2.5 rounded-full bg-white shadow transition-transform duration-200 ${disabled ? "translate-x-3.5" : "translate-x-0.5"}`} />
            </button>
          </div>

          <div>
            <label className="text-[10px] text-muted-foreground block mb-1.5">Theme</label>
            <select value={theme} onChange={(e) => setTheme(e.target.value)}
              className="w-full bg-muted border border-border rounded px-2 py-1 text-[10px] text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50">
              {["zinc", "slate", "stone", "gray", "neutral"].map((t) => (
                <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Accessibility */}
        <div className="px-4 py-3 border-b border-border space-y-2">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Accessibility</p>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground">ARIA role</span>
              <code className="text-[10px] font-mono text-primary">{component.ariaLabel}</code>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground">WCAG</span>
              <span className="text-[10px] font-mono text-green-400">AA</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground">Focus ring</span>
              <Check size={10} className="text-green-400" />
            </div>
          </div>
          {component.keyboardShortcuts.length > 0 && (
            <div className="mt-2">
              <p className="text-[10px] text-muted-foreground mb-1.5">Keyboard shortcuts</p>
              <div className="flex flex-wrap gap-1">
                {component.keyboardShortcuts.map((k) => (
                  <kbd key={k} className="px-1.5 py-0.5 text-[9px] font-mono bg-muted border border-border rounded text-foreground">{k}</kbd>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Installation */}
        <div className="px-4 py-3 border-b border-border">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Installation</p>
          <div className="bg-[#0D1117] rounded-md p-2 border border-border mb-2">
            <code className="text-[9px] font-mono text-green-400 break-all">{component.installCmd}</code>
          </div>
          {component.dependencies.length > 0 && (
            <div>
              <p className="text-[10px] text-muted-foreground mb-1.5">Dependencies</p>
              <div className="flex flex-wrap gap-1">
                {component.dependencies.map((d) => (
                  <span key={d} className="px-1.5 py-0.5 text-[9px] font-mono bg-muted border border-border rounded text-muted-foreground">{d}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Usage Code Snippet */}
        <div className="px-4 py-3 border-b border-border">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Usage Code</p>
          <div className="relative rounded-md overflow-hidden bg-[#0D1117] border border-border p-2">
            <code className="text-[9.5px] font-mono text-green-400 break-all block pr-6">
              {generateUsageCode(component.id, variant, size, disabled, theme)}
            </code>
            <button
              onClick={() => {
                navigator.clipboard.writeText(generateUsageCode(component.id, variant, size, disabled, theme));
                toast.success("Usage code copied to clipboard!");
              }}
              className="absolute right-1 top-1.5 p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all active:scale-90"
              title="Copy snippet"
            >
              <Copy size={10} />
            </button>
          </div>
        </div>

        {/* Copy import */}
        <div className="px-4 py-3">
          <button onClick={copyImport}
            className="w-full flex items-center justify-center gap-2 py-2 text-[11px] font-medium rounded-md bg-primary/10 border border-primary/20 text-primary hover:bg-primary/15 transition-all active:scale-95">
            {copied ? <><Check size={11} />Copied Import</> : <><Copy size={11} />Copy Import</>}
          </button>
        </div>
      </div>
    </aside>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [search, setSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Components");
  const [activeNavItem, setActiveNavItem] = useState("Overview");
  const [expandedSections, setExpandedSections] = useState<string[]>(["Getting Started", "Foundations", "Components"]);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);
  const [versionOpen, setVersionOpen] = useState(false);

  const toggleSection = (label: string) => {
    setExpandedSections((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  };

  const filtered = COMPONENTS.filter((c) => {
    const matchSearch = search === "" || c.name.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "All" || c.category === activeCategory;
    return matchSearch && matchCategory;
  }).sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "status") return a.status.localeCompare(b.status);
    return 0;
  });

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background text-foreground" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Toaster theme="dark" position="bottom-right" closeButton toastOptions={{ style: { backgroundColor: "#111318", border: "1px solid rgba(255,255,255,0.08)", color: "#F8FAFC" } }} />

      {/* Command palette overlay */}
      {cmdPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <Search size={14} className="text-muted-foreground" />
              <input autoFocus className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                placeholder="Search components, hooks, templates..." value={search}
                onChange={(e) => setSearch(e.target.value)} />
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-muted border border-border rounded text-muted-foreground">Esc</kbd>
            </div>
            <div className="max-h-64 overflow-y-auto py-2">
              {COMPONENTS.filter((c) => search === "" || c.name.toLowerCase().includes(search.toLowerCase())).slice(0, 6).map((c) => (
                <button key={c.id} onClick={() => { setSelectedComponent(c); setCmdPaletteOpen(false); setSearch(""); }}
                  className="flex items-center gap-3 w-full px-4 py-2 hover:bg-muted/50 transition-colors text-left">
                  <Puzzle size={12} className="text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-foreground">{c.name}</p>
                    <p className="text-[10px] text-muted-foreground">{c.category}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="px-4 py-2 border-t border-border flex items-center gap-4 text-[10px] text-muted-foreground">
              <span><kbd className="px-1 py-0.5 font-mono bg-muted border border-border rounded mr-1">↑↓</kbd>Navigate</span>
              <span><kbd className="px-1 py-0.5 font-mono bg-muted border border-border rounded mr-1">↵</kbd>Select</span>
              <span><kbd className="px-1 py-0.5 font-mono bg-muted border border-border rounded mr-1">Esc</kbd>Close</span>
            </div>
          </div>
        </div>
      )}

      {/* Top header */}
      <header className="h-12 flex items-center border-b border-border bg-background/95 backdrop-blur-sm flex-shrink-0 z-30 px-4" style={{ backdropFilter: "blur(8px)" }}>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 mr-2.5 rounded-md border border-border text-muted-foreground hover:text-foreground md:hidden active:scale-95 transition-all"
          aria-label="Toggle Navigation Menu"
        >
          <Menu size={14} />
        </button>

        <div className="flex items-center gap-0 md:w-64 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center flex-shrink-0">
              <Layers size={12} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-foreground tracking-tight">DesignSystem</span>
          </div>
        </div>

        <div className="flex-1 hidden md:flex items-center gap-3 px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer transition-colors">Docs</span>
            <ChevronRight size={10} />
            <span className="hover:text-foreground cursor-pointer transition-colors">Components</span>
            <ChevronRight size={10} />
            <span className="text-foreground">Overview</span>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {/* Search / cmd palette */}
          <button
            onClick={() => setCmdPaletteOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-muted/50 hover:bg-muted transition-colors text-[11px] text-muted-foreground"
          >
            <Search size={11} />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden sm:flex items-center gap-0.5 px-1 py-0.5 font-mono text-[9px] bg-background border border-border rounded text-muted-foreground">
              <Command size={8} />K
            </kbd>
          </button>

          {/* Version selector */}
          <div className="relative">
            <button onClick={() => setVersionOpen(!versionOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border text-[11px] text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
              v2.4.0
              <ChevronDown size={10} />
            </button>
            {versionOpen && (
              <div className="absolute right-0 top-full mt-1 w-32 bg-popover border border-border rounded-md shadow-xl z-50 overflow-hidden">
                {["v2.4.0 (latest)", "v2.3.0", "v2.2.0", "v2.1.0"].map((v) => (
                  <button key={v} onClick={() => setVersionOpen(false)}
                    className="flex items-center gap-2 w-full px-3 py-1.5 text-[11px] hover:bg-muted transition-colors text-left text-foreground">
                    {v.includes("latest") && <div className="w-1.5 h-1.5 rounded-full bg-green-400" />}
                    {!v.includes("latest") && <div className="w-1.5" />}
                    {v}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a href="https://github.com" className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border text-[11px] text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            <Github size={12} />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          <button className="p-1.5 rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            <Moon size={13} />
          </button>

          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 flex items-center justify-center text-[10px] font-semibold text-foreground border border-border">
            WK
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden relative">

        {/* Mobile menu backdrop click shield */}
        {mobileMenuOpen && (
          <div onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 bg-black/60 z-30 md:hidden animate-in fade-in duration-200" />
        )}

        {/* Left sidebar */}
        <nav className={`w-64 flex-shrink-0 border-r border-border bg-card overflow-y-auto flex flex-col transition-all duration-300 z-40
          fixed md:relative inset-y-0 left-0 md:translate-x-0 pt-12 md:pt-0
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
          {/* Search */}
          <div className="px-3 py-3 border-b border-border flex-shrink-0">
            <div className="relative">
              <Search size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                className="w-full bg-muted/60 border border-border rounded-md pl-7 pr-3 py-1.5 text-[11px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all"
                placeholder="Search components..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Nav sections */}
          <div className="flex-1 py-2">
            {NAV_SECTIONS.map((section) => {
              const Icon = section.icon;
              const isExpanded = expandedSections.includes(section.label);
              const isActive = activeSection === section.label;

              return (
                <div key={section.label} className="mb-0.5">
                  <button
                    onClick={() => { toggleSection(section.label); setActiveSection(section.label); }}
                    className={`flex items-center justify-between w-full px-3 py-2 text-[11px] font-medium transition-colors rounded-none hover:bg-muted/40 ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon size={12} className={isActive ? "text-primary" : "text-muted-foreground"} />
                      {section.label}
                    </div>
                    <ChevronRight size={10} className={`transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`} />
                  </button>

                  {isExpanded && (
                    <div className="ml-0 pb-1">
                      {section.items.map((item) => {
                        const isItemActive = activeNavItem === item && activeSection === section.label;
                        return (
                          <button
                            key={item}
                            onClick={() => { setActiveNavItem(item); setActiveSection(section.label); }}
                            className={`flex items-center w-full pl-7 pr-3 py-1.5 text-[11px] transition-all duration-100 ${isItemActive
                              ? "text-primary bg-primary/8 border-r-2 border-primary"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                              }`}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Sidebar footer */}
          <div className="border-t border-border px-3 py-3 flex-shrink-0">
            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
              <span>v2.4.0 — WJY License</span>
              <a href="#" className="hover:text-foreground transition-colors flex items-center gap-1">
                <Github size={10} />
              </a>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Page header */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between px-4 sm:px-8 py-6 border-b border-border flex-shrink-0">
            <div>
              <div className="flex items-center gap-2 mb-1.5 text-[11px] text-muted-foreground">
                <Sparkles size={11} className="text-primary" />
                <span>Design System / Components</span>
              </div>
              <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-1.5">Components</h1>
              <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
                Beautiful, accessible, production-ready React components built with Tailwind CSS and Radix UI primitives.
              </p>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span>{COMPONENTS.filter((c) => c.status === "stable").length} stable</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                  <span>{COMPONENTS.filter((c) => c.status === "beta").length} beta</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>{COMPONENTS.filter((c) => c.status === "new").length} new</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-1 w-full lg:w-auto">
              <div className="flex items-center border border-border rounded-md overflow-hidden">
                <button onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${viewMode === "grid" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  <Grid3X3 size={13} />
                </button>
                <button onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors border-l border-border ${viewMode === "list" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  <List size={13} />
                </button>
              </div>

              <div className="relative">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-3 pr-7 py-1.5 text-[11px] bg-muted border border-border rounded-md text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 cursor-pointer">
                  <option value="name">Sort: Name</option>
                  <option value="status">Sort: Status</option>
                </select>
                <ArrowUpDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>

              <button className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] border border-border rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                <SlidersHorizontal size={11} />
                Filter
              </button>

              <button
                onClick={() => { navigator.clipboard.writeText("npx shadcn@latest init"); }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] bg-primary text-white rounded-md hover:bg-blue-500 transition-colors font-medium ml-0 sm:ml-auto"
              >
                <Terminal size={11} />
                npx shadcn init
              </button>
            </div>
          </div>

          {/* Category filter */}
          <div className="flex items-center gap-1 px-4 sm:px-8 py-3 border-b border-border flex-shrink-0 overflow-x-auto">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 text-[11px] rounded-full transition-all whitespace-nowrap ${activeCategory === cat
                  ? "bg-primary/15 text-primary border border-primary/30 font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent"
                  }`}>
                {cat}
                {cat !== "All" && (
                  <span className="ml-1 text-[9px] opacity-60">{COMPONENTS.filter((c) => c.category === cat).length}</span>
                )}
              </button>
            ))}
          </div>

          {/* Component grid */}
          <div className="flex flex-1 overflow-hidden relative">
            <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 text-center">
                  <Monitor size={32} className="text-muted-foreground/30 mb-3" />
                  <p className="text-sm font-medium text-foreground mb-1">No components found</p>
                  <p className="text-xs text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              ) : (
                viewMode === "grid" ? (
                  <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
                    {filtered.map((component) => (
                      <ComponentCard
                        key={component.id}
                        component={component}
                        onSelect={setSelectedComponent}
                        isSelected={selectedComponent?.id === component.id}
                        viewMode="grid"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2 max-w-4xl">
                    {filtered.map((component) => (
                      <ComponentCard
                        key={component.id}
                        component={component}
                        onSelect={setSelectedComponent}
                        isSelected={selectedComponent?.id === component.id}
                        viewMode="list"
                      />
                    ))}
                  </div>
                )
              )}
            </div>

            {/* Right inspector panel backdrop for mobile */}
            {selectedComponent && (
              <div onClick={() => setSelectedComponent(null)} className="fixed inset-0 bg-black/60 z-30 md:hidden animate-in fade-in duration-200" />
            )}

            {/* Right inspector panel */}
            {selectedComponent && (
              <InspectorPanel
                component={selectedComponent}
                onClose={() => setSelectedComponent(null)}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
