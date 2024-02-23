const marketplaces = ["Marketplace 1", "Marketplace 2", "Marketplace 3"];
const products = ["Product 1", "Product 2", "Product 3"];
const miniatures = ["Miniature 1", "Miniature 2", "Miniature 3"];

document.addEventListener('DOMContentLoaded', function() {
    initializeDateTime();
    addMarketplace(); // Add the first marketplace by default
});

function initializeDateTime() {
    var now = new Date();
    document.getElementById('dateTime').value = now.toISOString().substring(0, 19);
}

function addMarketplace() {
    var marketplaceDiv = document.createElement('div');
    marketplaceDiv.className = 'field';
    marketplaceDiv.innerHTML = `
        <label>Marketplace:</label>
        <select class="marketplace">${generateOptions(marketplaces)}</select>
        <button type="button" onclick="addProduct(this.parentNode)">Add Product</button>
    `;
    document.getElementById('marketplaces').appendChild(marketplaceDiv);
}

function addProduct(marketplaceDiv) {
    var productDiv = document.createElement('div');
    productDiv.className = 'sub-field';
    productDiv.innerHTML = `
        <label>Product:</label>
        <select class="product">${generateOptions(products)}</select>
        Quantity: <input type="number" class="quantity">
        <button type="button" onclick="addMiniature(this.parentNode)">Add Miniature</button>
    `;
    marketplaceDiv.appendChild(productDiv);
}

function addMiniature(productDiv) {
    var miniatureDiv = document.createElement('div');
    miniatureDiv.className = 'sub-field';
    miniatureDiv.innerHTML = `
        <label>Miniature:</label>
        <select class="miniature">${generateOptions(miniatures)}</select>
    `;
    productDiv.appendChild(miniatureDiv);
}

function generateOptions(items) {
    return items.map(item => `<option value="${item}">${item}</option>`).join('');
}


document.getElementById('orderForm').onsubmit = function(event) {
    event.preventDefault();
    var message = compileMessage();
    copyToClipboard(message);
    alert("Message copied to clipboard!");
};

function compileMessage() {
    var dateTime = document.getElementById('dateTime').value;
    var message = dateTime + '\n\n'; // Add date and time at the top

    var marketplaces = document.querySelectorAll('.marketplace');
    marketplaces.forEach((marketplace, marketplaceIndex) => {
        if (marketplace.value !== '') {
            message += `${marketplaceIndex + 1}.) ${marketplace.value}\n`;
            
            var products = marketplace.parentNode.querySelectorAll('.product');
            products.forEach((product, productIndex) => {
                if (product.value !== '') {
                    message += `  ${marketplaceIndex + 1}.${productIndex + 1}) ${product.value}\n`;
                    
                    var quantity = product.nextElementSibling.value; // Assuming the next element is the quantity input
                    if (quantity) {
                        message += `      ${marketplaceIndex + 1}.${productIndex + 1}.1) Qty: ${quantity}\n`;
                    }

                    var miniatures = Array.from(product.parentNode.querySelectorAll('.miniature'));
                    miniatures.forEach((miniature, miniatureIndex) => {
                        if (miniature.value !== '') {
                            message += `      ${marketplaceIndex + 1}.${productIndex + 1}.${miniatureIndex + 2}) Miniature: ${miniature.value}\n`;
                        }
                    });
                }
            });
        }
    });
    
    return message.trim();
}


function copyToClipboard(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'Successfully copied to clipboard' : 'Unable to copy';
        console.log(msg);
    } catch (err) {
        console.error('Unable to copy to clipboard', err);
    }
    document.body.removeChild(textarea);
}
