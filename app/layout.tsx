import type { Metadata } from "next";
import { Noto_Serif_KR } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { MotionProvider } from "@/components/motion-provider";
import "./globals.css";

const notoSerifKr = Noto_Serif_KR({
  variable: "--font-display-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "BLOOM 심미치과 | 다시, 피어나다",
  description:
    "라미네이트·심미레진·미백을 제공하는 심미치과 BLOOM. 삭제는 필요한 만큼만, 색은 직접 보고 확인합니다.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${notoSerifKr.variable} h-full`}>
      <body className="flex min-h-full flex-col break-keep bg-bg font-body text-ink antialiased selection:bg-accent selection:text-bg">
        <MotionProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
