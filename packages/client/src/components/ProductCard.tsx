import React, { useState } from "react";
import { Card, Collapsible, Stack, Button } from "@shopify/polaris";

const ProductCard: React.FC<{
  id: string;
  name: string;
  description: string;
}> = ({ name, description, id }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Card
      sectioned
      title={name}
      primaryFooterAction={{ content: "More Info", url: "/product/" + id }}
    >
      <Stack vertical>
        <Button onClick={() => setOpen(!open)} size="slim">
          {!open ? "Show Description" : "Hide Description"}
        </Button>
        <Collapsible open={open} id="description">
          <p>{description}</p>
        </Collapsible>
      </Stack>
    </Card>
  );
};
export default ProductCard;
