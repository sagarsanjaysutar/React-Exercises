/**
 * @brief Component encompassing wrong & right ways to use Effects.
 * @ref https://react.dev/learn/you-might-not-need-an-effect
 * @note The following topics from the above link are not covered:
 *      1. Sending a POST request: This is covered in "Avoid Event specific logic in an Effect."
 *      2. Chain of Computation: Too specific code snippet is given in the link. Can't generalize the learning.
 *      3. Initializing the application: Ehhh.
 *      4. Subscribing to an external store: It looks like Redux covers this. I'll prefer to use redux.
 */
import React, { FC, useEffect, useState } from 'react';
import { Button, Card, Divider, Form, Input, notification, Radio, Rate, Row, Space } from 'antd';
import Icon, { ShoppingCartOutlined } from '@ant-design/icons';
import { IconType } from 'antd/es/notification/interface';
import { Product } from './type';
import { extractColors } from 'extract-colors';
import ShuffleIcon from '@/assests/icons/shuffle-svgrepo-com.svg';
type ProductCardProp = {
    product: Product;
    onRandomProduct: () => void;
};
const ProductCard: FC<ProductCardProp> = ({ product, onRandomProduct }) => {
    /**
     *  # Problem 00:  Resetting all state when a prop changes
     *  # Explanation: Changing the ProductCard's data using next/previous button doesn't reset the Input box.
     *                This is because next/previous ProductCards are rendered at the same place in the UI tree.
     *                From React’s perspective, it’s the same Card which is why it doesn't reset the input box
     *                or any States that the card might hold.
     *  # Soln 00: Using effect to reset the comments when product changes.
     *           This is not-scalable as similar logic would be needed,
     *           if there are more children components that needs to reset.
     *           Additionally it causes re-renders. First the initial render finishes,
     *           then useEffect gets called & setting a state causes another re-render.
     * useEffect(() => {
     *      console.log('Use effect called.');
     *      setComment('');
     * }, [product]);
     *
     * # Soln 01: Eliminate the use of Effects by giving key to the ProductCard to make it unique in React's perspective.
     *             Here we end up resetting the state based on key.
     */

    /**
     * # Problem 01:  Adjusting some state when a prop changes.
     * # Explanation: Partially changing a ProductCard's state, based on other state/prop. change using Effects.
     *              This isn't recommended as changing a state based on other state/prop inside an effect,
     *              causes unnecessary rerenders.
     * # Soln 01: Using effects to set the comments under certain conditions. Same rationale of re-rendering occurs.
     * useEffect(() => {
     *     console.log('Use effect called.');
     *     if (product.id == '2') {
     *         setComment('Francesco found.');
     *     }
     * }, [product]);
     * # Soln 01: Eliminate the use of Effects by calculating the value of comment during rendering.
     */
    const [comment, setComment] = useState('');
    const specialComment = product.id == 2 ? 'Francesco found.' : '';

    // A copy is made to mutate the product (in this case, to change it's addToCart prop)
    const [productCopy, setProductCopy] = useState(product);
    /**
     * # Problem 02: Avoid event specific logic in Effects.
     * # Explanation: We have a Product state which gets updated from 2 event handlers.
     *              We wish to show a notification when a users Buys or Adds a Product to the cart.
     *
     *  # Soln 00: We add an Effect listening to the Product state. Whenever Product gets added to the cart,
     *              we change it's state & Effect is triggered. There are two problem with this.
     *              1. Implementation: This component remembers the product added to the cart.
     *                          On refreshing, the notification is shown on first render.
     *              2. Ideological: Showing notification is an Event specific logic. It shouldn't belong in an Effect.
     */
    // useEffect(() => {
    //     console.log('Triggered');
    //     if (JSON.stringify(productCopy.id) == sessionStorage.getItem('cartItem')) {
    //         console.log('Item in cart');
    //         openNotification();
    //     }
    // }, [productCopy]);
    /**
     *  # Soln 01: Remove the effect & move the event specific logic in event handlers.
     */
    function showNotification(message: string, type: IconType = 'info') {
        notification.open({
            message: message,
            placement: 'topRight',
            type: type,
        });
    }

    function addToCart() {
        setProductCopy({ ...productCopy, isInCart: true });
        if (sessionStorage.getItem('cartItem') !== JSON.stringify(productCopy.id)) {
            sessionStorage.setItem('cartItem', JSON.stringify(productCopy.id));
            showNotification(`Added to cart: ${product.title}.`);
        } else {
            showNotification(`Already added to cart: ${product.title}.`, 'warning');
        }
    }

    function buyNow() {
        addToCart();
    }

    const [cardColor, setCardColor] = useState('#ffffff');
    if (product != productCopy) {
        extractColors(productCopy.image)
            .then((res) => {
                setCardColor(`${res[0].hex}`);
            })
            .catch(console.error);
    }

    return (
        <Card
            // Styling card
            style={{
                width: '50rem',
                height: '22rem',
            }}
            // Styling card body
            styles={{
                body: {
                    width: '100%',
                    display: 'flex',
                    height: '100%',
                    padding: '0px',
                    flexDirection: 'row',
                    justifyContent: 'end',
                },
            }}
            loading={productCopy.id == -1}
            bordered={false}
        >
            <div
                className="flex justify-center px-0 w-1/2"
                style={{ backgroundImage: `url(${product.image})`, backgroundSize: 'cover' }}
            >
                <img
                    alt="Product image.."
                    className="object-contain backdrop-blur-lg"
                    src={product.image}
                    style={{ width: '100%', height: '22rem' }}
                />
            </div>
            <div
                className="flex flex-col p-5 w-1/2 justify-between"
                style={{ backgroundColor: '#d3d3d3d3' }}
            >
                <Row>
                    <p className="text-lg font-bold ">{product.title}</p>
                    <p
                        className="text-sm text-slate-600 "
                        style={{
                            display: '-webkit-box',
                            lineClamp: '3',
                            overflow: 'hidden',
                            WebkitLineClamp: '3',
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {product.description}
                    </p>
                    <p className="text-xl">
                        £ <span className="text-4xl"> {product.price}</span>
                    </p>
                    <Input
                        className="mt-3"
                        placeholder="Leave a review..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Rate
                        tooltips={['normal']}
                        value={2}
                        className="text-slate-500 text-base mt-3"
                    />
                </Row>

                <Row className="mt-3 flex justify-around items-center">
                    <Button
                        className="bg-slate-50 "
                        icon={<Icon component={() => <ShuffleIcon style={{ width: '20px' }} />} />}
                        type="text"
                        size="large"
                        shape="circle"
                        onClick={onRandomProduct}
                    />
                    <Divider type="vertical" className="bg-slate-800" />
                    <Button
                        className="bg-slate-500 text-slate-100"
                        icon={<ShoppingCartOutlined />}
                        onClick={addToCart}
                        type="text"
                    >
                        Add to Cart
                    </Button>

                    <Button
                        className="bg-slate-700 text-slate-100"
                        size="large"
                        onClick={buyNow}
                        type="text"
                    >
                        Buy Now
                    </Button>
                </Row>
            </div>
        </Card>
    );
};

export default ProductCard;
