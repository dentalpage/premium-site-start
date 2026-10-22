// Required with every B&A: omitting side effects counts as missing key info under 의료법 제56조.
export function BaDisclaimer({
  sideEffects,
  className,
}: {
  sideEffects: string;
  className?: string;
}) {
  return (
    <p
      className={`border-t border-line pt-5 text-xs leading-relaxed text-ink-muted ${className ?? ""}`}
    >
      {`※ 치료 결과는 개인의 치아·잇몸 상태에 따라 다를 수 있습니다. ${sideEffects} 등의 부작용이 발생할 수 있으며, 치료 전 상담에서 자세히 안내해 드립니다.`}
    </p>
  );
}
