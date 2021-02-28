import React, { useMemo } from "react";
import useProduct from "../queries/useProduct";
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
  const { data, loading } = useProduct(productId);

  if (loading) return <div>Loading</div>;
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
          {data?.product.similar.map((product) => (
            <ProductCard
              id={product.id}
              name={product.name}
              description={product.description}
            />
          ))}
        </Section>
      </Content>
    </Root>
  );
};
export default Product;
