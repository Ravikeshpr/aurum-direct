export default function Header() {
    return (
        <header className="border-b border-slate-800 bg-slate-900/80  sticky top-0">
            <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                            Aurum Direct{' '}
                        </h1>
                        <p className="text-xs text-slate-200">Secure Checkout</p>
                    </div>
                </div>
            </div>
        </header>
    );
}