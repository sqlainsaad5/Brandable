import { HeroCinematic } from "@/components/home/HeroCinematic";
import { ProductSlider3D } from "@/components/home/ProductSlider3D";
import { CategoryMasonry } from "@/components/home/CategoryMasonry";
import { NewsletterPopup } from "@/components/home/NewsletterPopup";

export default function StoreHomePage() {
  return (
    <>
      <HeroCinematic />
      <ProductSlider3D />
      <CategoryMasonry />
      <NewsletterPopup />
    </>
  );
}
