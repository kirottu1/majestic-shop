const id = document.querySelector('#item_id').dataset.id;

document.addEventListener("DOMContentLoaded", () => {
    const addToCartButton = document.querySelector(".btn-primary");

    addToCartButton.addEventListener("click", () => {
        const product_id = parseInt(id);
        const quantity = parseInt(document.querySelector("#quantity").value);


        addToCart(product_id, quantity);
    });

    function addToCart(product_id, quantity) {
        fetch("/add-to-cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ product_id, quantity })
        })
        .then(response => {
            if (response.ok) {
                alert("Product added to the cart!");
    } else {
        alert("Failed to add product to the cart.");
    }
})
    .catch(error => {
        console.error("Error adding product to the cart:", error);
    });
}
});
