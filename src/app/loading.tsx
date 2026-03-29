export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-page gap-4">

            {/* Animated ring */}
            <div className="relative w-10 h-10">
                <span className="absolute inset-0 rounded-full border-2 border-divider" />
                <span
                    className="absolute inset-0 rounded-full border-2 border-transparent border-t-flame animate-spin"
                    style={{ animationDuration: "0.8s" }}
                />
            </div>

            {/* Label */}
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground animate-pulse">
                Loading
            </p>

        </div>
    )
}