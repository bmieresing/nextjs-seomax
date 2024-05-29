import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Image from 'next/image';
import miImagenSeoMax from '../public/imagenes/SeoMax-Dalle3.png';
import miImagenSeo from '../public/imagenes/SEO-Dalle3.png';

export default async function TodosPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  
  return (
    <section className="p-3 pt-6 max-w-2xl w-full flex flex-col gap-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Bienvenido
      </h1>
      <Image src={miImagenSeoMax} alt="miImagenSeoMax" />
      <Separator className="w-full " />     
      <Image src={miImagenSeo} alt="miImagenSeo" />
      <Separator className="w-full " />      
    </section>
  );
}
