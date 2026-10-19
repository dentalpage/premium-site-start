"use client";

import { useState, type FormEvent } from "react";

const TREATMENTS = ["라미네이트", "심미레진", "치아미백", "잇몸미백", "일반진료", "아직 모르겠어요"];

const FIELD =
  "w-full border-b border-line bg-transparent py-3 text-base text-ink placeholder:text-ink-muted/60 focus:border-ink focus:outline-none";

export function ReservationForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: connect to the clinic's booking backend before launch.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border-t border-line pt-10 text-center" role="status">
        <p className="font-display text-2xl text-ink">예약 요청이 접수되었습니다.</p>
        <p className="mt-3 text-sm text-ink-muted">
          확인 후 연락드리겠습니다. (샘플 화면: 실제 전송은 연동 후 동작합니다)
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 text-left">
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-medium tracking-[0.15em] text-ink-muted">이름</span>
          <input name="name" required autoComplete="name" className={FIELD} placeholder="홍길동" />
        </label>
        <label className="block">
          <span className="text-xs font-medium tracking-[0.15em] text-ink-muted">연락처</span>
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            className={FIELD}
            placeholder="010-0000-0000"
          />
        </label>
      </div>

      <fieldset>
        <legend className="text-xs font-medium tracking-[0.15em] text-ink-muted">
          관심 진료
        </legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {TREATMENTS.map((t) => (
            <label key={t} className="cursor-pointer">
              <input type="radio" name="treatment" value={t} className="peer sr-only" />
              <span className="inline-block rounded-full border border-line px-4 py-2 text-sm text-ink-muted transition-colors duration-200 peer-checked:border-ink peer-checked:bg-ink peer-checked:text-bg peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-accent">
                {t}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className="text-xs font-medium tracking-[0.15em] text-ink-muted">
          희망 일시
        </span>
        <input name="date" type="date" className={FIELD} />
      </label>

      <div className="border border-line bg-surface p-5 text-xs leading-relaxed text-ink-muted">
        <p className="font-medium text-ink">개인정보 수집·이용 동의 (필수)</p>
        <ul className="mt-2 space-y-0.5">
          <li>수집 항목: 이름, 연락처, 관심 진료, 희망 일시</li>
          <li>이용 목적: 진료 예약 및 상담 연락</li>
          <li>보유 기간: 예약 상담 완료 후 1년 (관계 법령에 따른 보존 기간 별도)</li>
          <li>동의를 거부할 수 있으나, 거부 시 온라인 예약이 제한됩니다.</li>
        </ul>
        <p className="mt-2">
          증상 등 건강 정보는 입력하지 마시고, 상담 시 말씀해 주세요.{" "}
          <a href="/privacy" className="underline underline-offset-4 hover:text-accent">
            개인정보처리방침
          </a>
        </p>
        <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="consent" required className="h-4 w-4 accent-[var(--color-ink)]" />
          위 내용을 확인했으며 동의합니다.
        </label>
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-ink px-7 py-4 text-sm font-medium tracking-wide text-bg transition-colors duration-300 hover:bg-accent"
      >
        예약 요청하기
      </button>
    </form>
  );
}
