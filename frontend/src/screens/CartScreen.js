import React from 'react'

export default function CartScreen(props) {
    // eslint-disable-next-line react/prop-types
    const productId = props.match.params.id;
    // eslint-disable-next-line react/prop-types
    const qty = props.location.search
        // eslint-disable-next-line react/prop-types
        ? Number(props.location.search.split('=')[1])
        : 1;

    return (
        <div>
            <h1>
                Cart Screen
            </h1>
            <p>
                ADD TO CART : PRODUCT ID:{productId} QTY:{qty}
            </p>
        </div>
    )
}
