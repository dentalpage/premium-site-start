import { ChapterBand } from "@/components/ui/chapter-band";

const LAYERS = [
  { name: "EFFECT", ko: "표면", note: "미세한 결과 특징" },
  { name: "ENAMEL", ko: "법랑질 층", note: "투명도와 광택" },
  { name: "DENTIN", ko: "상아질 층", note: "색의 깊이" },
];

function LayerCard() {
  return (
    <div className="w-[230px] border border-ink/10 bg-bone p-5 text-ink shadow-[0_20px_40px_rgb(0_0_0/0.25)]">
      <p className="text-[10px] tracking-[0.25em] text-accent">LAYER STRUCTURE</p>
      <ul className="mt-4 divide-y divide-ink/10">
        {LAYERS.map((l) => (
          <li key={l.name} className="flex items-baseline justify-between gap-3 py-2.5">
            <span className="text-xs font-medium tracking-[0.15em]">{l.name}</span>
            <span className="text-right text-[11px] text-ink-muted">
              {l.ko} · {l.note}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ResinChapters() {
  return (
    <>
      <ChapterBand
        no="01"
        label="OBSERVE"
        ko="관찰"
        title={"먼저,\n오래 봅니다."}
        text="주변 치아의 색, 투명도, 표면의 결을 확인하고 사진으로 기록합니다. 어떤 부분을 얼마나 더할지는 관찰에서 정해집니다."
        photoNote="셰이드 가이드와 확대 사진 기록 (환자 구강 내 장면 제외)"
      />
      <ChapterBand
        no="02"
        label="LAYERING"
        ko="적층"
        title={"한 겹씩 쌓아\n자연스러운 결을 만듭니다."}
        text="색과 투명도가 다른 재료를 단계적으로 쌓아 올립니다. 안쪽은 색의 깊이를, 바깥쪽은 투명도와 광택을 맡습니다."
        photoNote="레진 재료와 적층 기구 디테일"
        reverse
        overlay={<LayerCard />}
      />
      <ChapterBand
        no="03"
        label="HARMONY"
        ko="조화"
        title={"주변 치아와\n어우러질 때까지 다듬습니다."}
        text="형태와 색을 조정하고, 씹을 때 불편함이 없도록 교합을 확인한 뒤 자연스러운 광택이 나도록 연마합니다."
        photoNote="연마 도구와 모형 디테일"
      />
    </>
  );
}
