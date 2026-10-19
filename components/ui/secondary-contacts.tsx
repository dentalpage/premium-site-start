// TODO: replace with the real Kakao channel URL and phone number.
export const CONTACT = {
  kakao: "#",
  phone: "#",
};

export function SecondaryContacts() {
  return (
    <p className="flex items-center gap-4 text-sm text-ink-muted">
      <a
        href={CONTACT.kakao}
        className="underline-offset-4 transition-colors duration-200 hover:text-accent hover:underline"
      >
        카카오 상담
      </a>
      <span aria-hidden className="h-3 w-px bg-line" />
      <a
        href={CONTACT.phone}
        className="underline-offset-4 transition-colors duration-200 hover:text-accent hover:underline"
      >
        전화 상담
      </a>
    </p>
  );
}
