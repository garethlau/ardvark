import React from "react";
import { Spinner } from "@shopify/polaris";
import styled from "styled-components";

const Container = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: table;
`;

const Content = styled.div`
  display: table-cell;
  text-align: center;
  vertical-align: middle;
`;
const Page = styled.div`
  height: 100vh;
  width: 100vw;
`;

const Loader: React.FC<{
  full?: boolean;
}> = ({ full = false }) => {
  if (full) {
    return (
      <Page>
        <Container>
          <Content>
            <Spinner size="large" />
          </Content>
        </Container>
      </Page>
    );
  }
  return (
    <Container>
      <Content>
        <Spinner size="large" />
      </Content>
    </Container>
  );
};

export default Loader;
