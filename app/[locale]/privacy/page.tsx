import { usePage } from '@/lib/page';
export default function Privacy({ params }: { params: { locale: string } }) {
  const { dict } = usePage(params);
  const p = dict.ui.privacy;
  return (
    <section className="bg-paper"><div className="container-n py-36 sm:py-44">
      <h1 className="t-h2">{p.title}</h1>
      <span className="mt-8 block h-px w-10 bg-gold" />
      <p className="t-body mt-8">{p.intro}</p>
      <ul className="mt-6 divide-y divide-stone border-y border-stone">
        {p.items.map((it) => <li key={it} className="t-body py-3">{it}</li>)}
        <li className="t-body py-3">{p.officer} ({dict.footer.email})</li>
      </ul>
    </div></section>
  );
}
