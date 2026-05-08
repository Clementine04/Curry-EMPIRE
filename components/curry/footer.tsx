export function Footer() {
  return (
    <footer className="py-10 border-t border-foreground/5">
      <div className="mx-auto max-w-7xl px-3 min-[380px]:px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex max-w-full items-center gap-2.5">
          <span className="grid place-items-center h-8 w-8 rounded-xl gold-gradient font-serif text-xs">
            CE
          </span>
          <div className="leading-tight min-w-0">
            <div className="font-serif text-sm">Curry Empire — Cauayan</div>
            <div className="text-[11px] text-muted-foreground">
              A Tour Around the World Through Food
            </div>
          </div>
        </div>
        <div className="text-[11px] text-muted-foreground text-center sm:text-right">
          Demo experience · Inquiry-based only · No payment processed
        </div>
      </div>
    </footer>
  )
}
