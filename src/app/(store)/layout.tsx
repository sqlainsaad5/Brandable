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
      <main id="main-content" className="flex-1" role="main">
        {children}
      </main>
      <FooterPro />
      <CartDrawerPro />
    </>
  );
}
