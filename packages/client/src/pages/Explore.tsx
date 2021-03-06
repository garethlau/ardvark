import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import { Button } from "@shopify/polaris";
import styled from "styled-components";
import Loader from "../components/Loader";
import { useProductsQuery } from "../generated/graphql";

const Root = styled.div`
  width: 100%;
  min-height: 100%;
`;
const Content = styled.div`
  max-width: 960px;
  margin: auto;
`;

const Section = styled.div`
  margin: 10px;
`;

const Explore: React.FC<{}> = () => {
  const { data, loading, error, fetchMore } = useProductsQuery();
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  async function loadMore() {
    setLoadingMore(true);
    await fetchMore({
      variables: {
        limit: 10,
        skip: page * 10,
      },
    });
    setLoadingMore(false);
    setPage(page + 1);
  }

  if (loading) {
    return <Loader full />;
  } else if (error) {
    return (
      <div>
        <pre>{error}</pre>
      </div>
    );
  }
  return (
    <Root>
      <Content>
        <Section>
          {data &&
            data.products.products.map((product) =>
              product?.id ? (
                <ProductCard
                  id={product.id}
                  name={product.name}
                  description={product.description}
                />
              ) : null
            )}
        </Section>
        <Section>
          <Button primary loading={loadingMore} onClick={loadMore}>
            Load More
          </Button>
        </Section>
      </Content>
    </Root>
  );
};

export default Explore;
