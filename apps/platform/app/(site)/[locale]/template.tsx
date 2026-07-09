/** Remounts on every route change, giving each page an animated entrance. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-enter">{children}</div>
}
