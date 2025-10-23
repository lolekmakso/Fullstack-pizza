import { Container, Filters, Title, TopBar } from "@/shared/components/shared";
import { ProductsGroupList } from "@/shared/components/shared/products-group-list";
import { Stories } from "@/shared/components/shared/stories";
import { findPizzas, GetSearchParams } from "@/shared/lib/find-pizzas";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<GetSearchParams>;
}) {
  const params = await searchParams;
  const categories = await findPizzas(params);

  return (
    <>
      <Container className="mt-10">
        <Title text="Усі піци" size="lg" className="font-extrabold" />
      </Container>

      <TopBar
        categories={categories.filter(
          (category) => category.products.length > 0
        )}
      />

      {/* <Stories /> */}

      <Container className="mt-10 pb-14">
        <div className="flex gap-[70px]">
          {/* Фільтр */}
          <div className="hidden max-w-[190px] sm:block md:max-w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          {/* Список товарів */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.products}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
