import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type Manufacturer = {
  __typename?: 'Manufacturer';
  value: Scalars['String'];
};

export type Category = {
  __typename?: 'Category';
  value: Scalars['String'];
  products?: Maybe<Array<Maybe<Product>>>;
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Maybe<Category>>;
  category: Category;
  products: ProductsConnection;
  product: Product;
  productsInCategories: Array<Maybe<Product>>;
};


export type QueryCategoryArgs = {
  value: Scalars['String'];
};


export type QueryProductsArgs = {
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryProductArgs = {
  id: Scalars['String'];
};


export type QueryProductsInCategoriesArgs = {
  names: Array<Maybe<Scalars['String']>>;
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['String'];
  categories?: Maybe<Array<Maybe<Category>>>;
  manufacturer?: Maybe<Manufacturer>;
  similar?: Maybe<Array<Maybe<Product>>>;
};

export type ProductsConnection = {
  __typename?: 'ProductsConnection';
  hasMore: Scalars['Boolean'];
  products: Array<Maybe<Product>>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = (
  { __typename?: 'Query' }
  & { categories: Array<Maybe<(
    { __typename?: 'Category' }
    & Pick<Category, 'value'>
  )>> }
);

export type ProductsInCategoriesQueryVariables = Exact<{
  categories: Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>;
}>;


export type ProductsInCategoriesQuery = (
  { __typename?: 'Query' }
  & { productsInCategories: Array<Maybe<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'name' | 'description'>
  )>> }
);

export type ProductQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ProductQuery = (
  { __typename?: 'Query' }
  & { product: (
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'name' | 'description' | 'price'>
    & { categories?: Maybe<Array<Maybe<(
      { __typename?: 'Category' }
      & Pick<Category, 'value'>
    )>>>, manufacturer?: Maybe<(
      { __typename?: 'Manufacturer' }
      & Pick<Manufacturer, 'value'>
    )>, similar?: Maybe<Array<Maybe<(
      { __typename?: 'Product' }
      & Pick<Product, 'id' | 'name' | 'description'>
    )>>> }
  ) }
);

export type ProductsQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
}>;


export type ProductsQuery = (
  { __typename?: 'Query' }
  & { products: (
    { __typename?: 'ProductsConnection' }
    & Pick<ProductsConnection, 'hasMore'>
    & { products: Array<Maybe<(
      { __typename?: 'Product' }
      & Pick<Product, 'id' | 'name' | 'description'>
    )>> }
  ) }
);


export const CategoriesDocument = gql`
    query Categories {
  categories {
    value
  }
}
    `;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
        return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, baseOptions);
      }
export function useCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, baseOptions);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesQueryResult = Apollo.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
export const ProductsInCategoriesDocument = gql`
    query ProductsInCategories($categories: [String]!) {
  productsInCategories(names: $categories) {
    id
    name
    description
  }
}
    `;

/**
 * __useProductsInCategoriesQuery__
 *
 * To run a query within a React component, call `useProductsInCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsInCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsInCategoriesQuery({
 *   variables: {
 *      categories: // value for 'categories'
 *   },
 * });
 */
export function useProductsInCategoriesQuery(baseOptions: Apollo.QueryHookOptions<ProductsInCategoriesQuery, ProductsInCategoriesQueryVariables>) {
        return Apollo.useQuery<ProductsInCategoriesQuery, ProductsInCategoriesQueryVariables>(ProductsInCategoriesDocument, baseOptions);
      }
export function useProductsInCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsInCategoriesQuery, ProductsInCategoriesQueryVariables>) {
          return Apollo.useLazyQuery<ProductsInCategoriesQuery, ProductsInCategoriesQueryVariables>(ProductsInCategoriesDocument, baseOptions);
        }
export type ProductsInCategoriesQueryHookResult = ReturnType<typeof useProductsInCategoriesQuery>;
export type ProductsInCategoriesLazyQueryHookResult = ReturnType<typeof useProductsInCategoriesLazyQuery>;
export type ProductsInCategoriesQueryResult = Apollo.QueryResult<ProductsInCategoriesQuery, ProductsInCategoriesQueryVariables>;
export const ProductDocument = gql`
    query Product($id: String!) {
  product(id: $id) {
    id
    name
    description
    price
    categories {
      value
    }
    manufacturer {
      value
    }
    similar {
      id
      name
      description
    }
  }
}
    `;

/**
 * __useProductQuery__
 *
 * To run a query within a React component, call `useProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProductQuery(baseOptions: Apollo.QueryHookOptions<ProductQuery, ProductQueryVariables>) {
        return Apollo.useQuery<ProductQuery, ProductQueryVariables>(ProductDocument, baseOptions);
      }
export function useProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductQuery, ProductQueryVariables>) {
          return Apollo.useLazyQuery<ProductQuery, ProductQueryVariables>(ProductDocument, baseOptions);
        }
export type ProductQueryHookResult = ReturnType<typeof useProductQuery>;
export type ProductLazyQueryHookResult = ReturnType<typeof useProductLazyQuery>;
export type ProductQueryResult = Apollo.QueryResult<ProductQuery, ProductQueryVariables>;
export const ProductsDocument = gql`
    query Products($limit: Int, $skip: Int) {
  products(limit: $limit, skip: $skip) {
    hasMore
    products {
      id
      name
      description
    }
  }
}
    `;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useProductsQuery(baseOptions?: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, baseOptions);
      }
export function useProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, baseOptions);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsQueryResult = Apollo.QueryResult<ProductsQuery, ProductsQueryVariables>;