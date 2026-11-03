export default function AppearanceToggleTab() {
    return (
        <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm text-card-foreground">
            <span
                className="size-2 rounded-full bg-emerald-500"
                aria-hidden="true"
            />
            Light theme is always enabled.
        </div>
    );
}
