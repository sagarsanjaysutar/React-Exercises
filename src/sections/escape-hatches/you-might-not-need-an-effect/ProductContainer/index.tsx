/**
 * @brief You Might Not Need an Effect
 * @ref https://react.dev/learn/you-might-not-need-an-effect
 * @note The fewer raw useEffect calls you have in your components, the easier you will find to maintain your application.
 */
import React, { FC, useEffect, useState } from 'react';
import Header from '@/components/header/header';
import ProductCard from './Product';
import SearchBar from './SearchBar';
import { Product } from './type';

const defaultProduct: Product = {
    id: -1,
    title: 'Random Product 342',
    description: 'This is a randomly generated product description for a unique item.',
    image: 'https://fakestorexapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    isInCart: false,
    price: 5,
};

/**
 * UI: The ProductContainer displays a search bar single ProductCard.
 *     The ProductCard also contains a input box.
 */
const ProductContainer: FC = () => {
    const [productList, setProductList] = useState<Product[]>([]);
    const [productIdx, setProductIdx] = useState<number>(defaultProduct.id);
    const product: Product =
        productList.filter((product) => product.id == productIdx)[0] || defaultProduct;

    /**
     * # Problem: Avoid passing data to the parent
     * # Explanation: Here the child (ProductCard) needs the Product Information. We've fetched the product
     *              details in the Parent & passed it to the child. This is how it should be.
     *              We should avoid passing data from child to parent as it break's React "parent-child data flow"
     *              principle. Makes it hard to debug.
     */
    useEffect(() => {
        fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=10')
            .then((response) => response.json())
            .then((data) => {
                setProductList(
                    data.map((item: any) => ({
                        id: item.id,
                        title: item.title,
                        description: item.description,
                        image: item.images[0],
                        price: item.price,
                        isInCart: false,
                    }))
                );
                setProductIdx(data[0].id);
            })
            .catch((e) => console.log('Error occurred. ' + e));
    }, []);

    /**
     * Searching Products
     *
     * # Problem: This effect depends on productQuery which rapidly changes resulting in multiple fetch requesting.
     * # Soln:  Adding a clean-up function ignores the stale request.
     */
    const [productQuery, setProductQuery] = useState('');
    const [searchedProductList, setSearchedProductList] = useState<Product[]>([]);
    useEffect(() => {
        let ignoreResponse = false;
        if (ignoreResponse == false) {
            if (productQuery != '') {
                fetch(`https://api.escuelajs.co/api/v1/products/?title=${productQuery}`)
                    .then((response) => response.json())
                    .then((data) => {
                        const searchedProducts = data.map((item: any) => ({
                            id: item.id,
                            title: item.title,
                            description: item.description,
                            image: item.images[0],
                            price: item.price,
                            isInCart: false,
                        }));
                        setSearchedProductList(searchedProducts);

                        // Note: Potential Error here: The productList is not upto date in this effect as it is not declared as dependency.
                        // Ref: https://react.dev/learn/removing-effect-dependencies#do-you-want-to-read-a-value-without-reacting-to-its-changes
                        // Add the searched products into the main product list so that when a user clicks on
                        // the product from the searchbar-dropdown, that product is shown on ProductCard.
                        setProductList([...productList, ...searchedProducts]);
                    });
            } else {
                setSearchedProductList([]);
            }
        }

        return () => {
            ignoreResponse = true;
        };
    }, [productQuery]);

    return (
        <div>
            <Header> You Might Not Need an Effect </Header>

            <Header level={4}>
                Resetting all state when a prop changes, <br />
                Adjusting some state when a prop changes & more...
            </Header>
            <div className="flex flex-col w-fit space-y-3">
                <SearchBar
                    onSearch={(searchStr) => {
                        setProductQuery(searchStr);
                    }}
                    searchedList={searchedProductList}
                    onSearchedProductClicked={(productIdx) => setProductIdx(productIdx)}
                />
                <ProductCard
                    key={product.id}
                    product={product}
                    onRandomProduct={() => {
                        const productIdList = productList.map((product) => product.id);
                        const randomProductId =
                            productIdList[Math.floor(Math.random() * productList.length)];
                        console.log('rr ' + randomProductId);
                        setProductIdx(randomProductId);
                    }}
                />
            </div>
        </div>
    );
};

export default ProductContainer;
