import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center px-6 pt-[68px] sm:px-10">
      <div className="mx-auto w-full max-w-5xl">
        <p className="font-display text-[34vw] leading-[0.85] tracking-[-0.05em] text-accent/25 lg:text-[260px]">
          404
        </p>
        <h1 className="mt-6 font-display text-3xl text-ink sm:text-4xl">찾으시는 페이지가 없습니다.</h1>
        <p className="mt-4 text-base text-ink-muted">주소가 바뀌었거나 삭제된 페이지일 수 있습니다.</p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Button href="/">처음으로</Button>
          <Link href="/journal" className="text-sm text-ink-muted transition-colors duration-200 hover:text-accent">
            Journal 보기 →
          </Link>
        </div>
      </div>
    </section>
  );
}
