import { usePage } from '@/lib/page';
export default function Privacy({ params }: { params: { locale: string } }) {
  const { dict } = usePage(params);
  const p = dict.ui.privacy;
  return (
    <section className="bg-ivory"><div className="container-x prose max-w-3xl py-36 sm:py-44">
      <h1 className="h2">{p.title}</h1>
      <p className="mt-6 text-sm leading-relaxed text-ink-3">{p.intro}</p>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-ink-3">
        {p.items.map((it) => <li key={it}>{it}</li>)}
        <li>{p.officer} ({dict.footer.email})</li>
      </ul>
    </div></section>
  );
}
