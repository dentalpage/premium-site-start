import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";

export const metadata: Metadata = {
  title: "개인정보처리방침 | BLOOM 심미치과",
  description: "블룸치과의원 개인정보처리방침.",
};

// Skeleton only: final text must be reviewed against the clinic's actual data handling.
const SECTIONS = [
  {
    title: "1. 수집하는 개인정보 항목",
    body: "온라인 예약 시 이름, 연락처, 관심 진료, 희망 일시를 수집합니다.",
  },
  {
    title: "2. 개인정보의 수집·이용 목적",
    body: "진료 예약 확인 및 상담 연락을 위해 이용합니다.",
  },
  {
    title: "3. 보유 및 이용 기간",
    body: "예약 상담 완료 후 1년간 보관 후 파기합니다. 단, 관계 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관합니다.",
  },
  {
    title: "4. 개인정보의 제3자 제공 및 처리 위탁",
    body: "입력 예정 (예약 시스템·문자 발송 업체 등 위탁 현황 기재)",
  },
  {
    title: "5. 정보주체의 권리",
    body: "언제든지 개인정보 열람, 정정, 삭제, 처리 정지를 요청하실 수 있습니다.",
  },
  {
    title: "6. 개인정보 보호책임자",
    body: "성명 · 연락처 입력 예정",
  },
  {
    title: "7. 시행일",
    body: "입력 예정",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Privacy" title="개인정보처리방침" />
      <section className="px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-3xl space-y-10">
          <p className="text-sm leading-relaxed text-ink-muted">
            블룸치과의원(이하 &lsquo;병원&rsquo;)은 「개인정보 보호법」에 따라
            정보주체의 개인정보를 보호하고 관련 고충을 원활하게 처리하기 위해
            다음과 같이 개인정보처리방침을 수립·공개합니다.
          </p>
          {SECTIONS.map((s) => (
            <div key={s.title} className="border-t border-line pt-6">
              <h2 className="text-base font-medium text-ink">{s.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
