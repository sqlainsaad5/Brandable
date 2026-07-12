import { HeaderPro } from "@/components/layout/HeaderPro";
import { FooterPro } from "@/components/layout/FooterPro";
import { CartDrawerPro } from "@/components/cart/CartDrawerPro";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderPro />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden" role="main">
        {children}
      </main>
      <FooterPro />
      <CartDrawerPro />
    </>
  );
}
