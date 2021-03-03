import React, { useMemo, useState, useCallback, useEffect } from "react";
import {
  Autocomplete,
  TextContainer,
  Stack,
  Page,
  Tag,
  Heading,
} from "@shopify/polaris";
import { OptionDescriptor } from "@shopify/polaris/dist/types/latest/src/components/OptionList/OptionList";
import RecommendedProducts from "./RecommendedProducts";
import { useCategoriesQuery } from "../../generated/graphql";

const Categories: React.FC<{}> = () => {
  const { data, loading } = useCategoriesQuery();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const deselectedOptions = useMemo(() => {
    return (
      data?.categories.map((category) => ({
        value: category?.value || "",
        label: category?.value || "",
      })) || []
    );
  }, [data]);

  const [options, setOptions] = useState<OptionDescriptor[]>(deselectedOptions);

  useEffect(() => {
    setOptions(deselectedOptions);
  }, [deselectedOptions]);

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === "") {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, "i");
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex)
      );
      setOptions(resultOptions);
    },
    [deselectedOptions]
  );

  const removeTag = useCallback(
    (tag) => () => {
      const options = [...selectedOptions];
      options.splice(options.indexOf(tag), 1);
      setSelectedOptions(options);
    },
    [selectedOptions]
  );

  const tagsMarkup = selectedOptions.map((option) => {
    return (
      <Tag key={`option${option}`} onRemove={removeTag(option)}>
        {option}
      </Tag>
    );
  });

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Categories"
      value={inputValue}
      placeholder="Board Games, Sleeping Gear, Indoor Lighting"
    />
  );

  return (
    <Page title="Explore Products">
      <TextContainer>
        <Stack>{tagsMarkup}</Stack>
      </TextContainer>
      <br />
      <Autocomplete
        options={options}
        selected={selectedOptions}
        textField={textField}
        onSelect={setSelectedOptions}
        listTitle="Categories"
        loading={loading}
      />
      <br />
      <Heading element="h1">Results</Heading>
      <RecommendedProducts categories={selectedOptions} />
    </Page>
  );
};

export default Categories;
