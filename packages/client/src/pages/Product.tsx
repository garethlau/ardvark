import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  TextContainer,
  Button,
  Heading,
  DisplayText,
  Card,
} from "@shopify/polaris";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { useProductQuery } from "../generated/graphql";

const Root = styled.div`
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  max-width: 960px;
  margin: auto;
`;

const Section = styled.div`
  margin: 10px;
`;

const Product: React.FC<{}> = () => {
  const { productId } = useParams<Record<string, string>>();
  const { data, loading } = useProductQuery({
    variables: { id: productId },
  });

  if (loading) {
    return <Loader full />;
  }
  return (
    <Root>
      <Content>
        <Section>
          <Button url="/explore">Back</Button>
        </Section>
        <Section>
          <Card sectioned title={data?.product.name}>
            <TextContainer>
              <Heading element="h1">{data?.product.id}</Heading>
              <DisplayText size="small">
                {data?.product.description}
              </DisplayText>
            </TextContainer>
          </Card>
        </Section>
        <Section>
          <Heading element="h1">Similar Items</Heading>
          {(data?.product?.similar || []).length > 0 ? (
            data?.product?.similar?.map((product) =>
              product?.id ? (
                <ProductCard
                  id={product.id}
                  name={product.name}
                  description={product.description}
                />
              ) : null
            )
          ) : (
            <div>No results</div>
          )}
        </Section>
      </Content>
    </Root>
  );
};
export default Product;
