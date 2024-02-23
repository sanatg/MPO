const marketplaces = [
  "Website",
  "Smytten",
  "Jiomart",
  "1mg",
  "Snapdeal",
  "Healthmug",
  "GlowRaod",
  "Zoozle",
  "Healthkart",
  "Mavshack",
  "Organic Orion",
  "Gaffaw",
  "Fably",
  "Trade Sala",
  "Herbkart",
  "Justdun",
  "Femica",
  "ONDC",
  "Foxy",
  "Minis",
];

const products = [
  "Citronella Essential Oil 15ml",
  "Sweet Orange Essential Oil 15ml",
  "Lemon Essential Oil 15ml",
  "Eucalyptus Essential Oil 15ml",
  "Lemongrass Essential Oil 15ml",
  "Rosemary Essential Oil 15ml",
  "Peppermint Essential Oil 15ml",
  "Lavender Essential Oil 15ml",
  "Tea Tree Essential Oil 15ml",
  "Zero Congest 15ml",
  "Essential 5 (Set of 5)",
  "Retinol Serum 30ml",
  "Vitamin C Serum 30ml",
  "Anti Aging Elixir 30ml",
  "Hyaluronic Acid 2% Serum 30 ml",
  "Niacinamide Serum 30ml",
  "Eyebrow Eyelashes Growth Serum 10ML",
  "Epsom Salt 1kg",
  "His & Her Massage Oil 50ml",
  "Astringent 120ml",
  "Blackseed Red Onion Oil 120ML",
  "Rose Water 120ml",
  "Vanilla Lip Balm 4G",
  "Orange Rosehip Lip Balm 4G",
  "Shampoo 300ml",
  "Jojoba 30ml",
  "Grapeseed Oil 30ML",
  "Castor Oil 30ML",
  "Sweet Almond Oil 30ML",
  "Coconut Oil 30ML",
  "Rosehip Seed Oil 30ML",
  "Moroccan Argan Oil 30ML",
  "Moringa Oil 30ML",
  "Apricot Kernel Oil 30ML",
  "Avocado Oil 30ML",
  "Olive Oil 30ML",
  "Pure Aloevera 120ml",
  "Niacinamide Dtan Peel Off Mask 120ML",
  "Squalane UV Bliss Sunscreen Gel 50ml",
  "Rose Hibiscus Manjistha Gel 50ml",
  "Tea Tree Basil Bloom Facial Cleanser 120ml",
  "Tea Tree Basil Bliss Face Exfoliator 120ml",
  "Flora Fresh Bath Soap 100g",
  "Noir Nectar Bath Soap 100g",
  "Amber Aura Bath Soap 100g",
  "Cocoa Cloud Bath Soap 100g",
  "Mellow Mist Bath Soap 100g",
  "Glycerin Lip Nectar 10ml",
  "Rose Velvet Lip Nectar 10ml",
  "Sandal Dream Lip Nectar 10ml",
  "Serene Lavender Bath Salt 500g",
  "Serene Pink Bath Salt 500g",
  "Kannauj Rose Serenity Bath Salt 600g",
  "Himalayan Rosemary dried leaves 50g",
];

const miniatures = [
  "Astringent 10ml",
  "Epsom salt 100g",
  "Tea Tea 5ml",
  "Lavender 5ml",
  "Lemongrass 5ml",
  "Onion oil 20ml",
  "Neem Comb",
];

document.addEventListener("DOMContentLoaded", function () {
  initializeDateTime();
  addMarketplace(); // Add the first marketplace by default
});

function initializeDateTime() {
  var now = new Date();
  document.getElementById("dateTime").value = now
    .toISOString()
    .substring(0, 19);
}

function addMarketplace() {
  var marketplaceDiv = document.createElement("div");
  marketplaceDiv.className = "marketplace";
  marketplaceDiv.innerHTML = `
        <label>Marketplace:</label>
        <select>${generateOptions(marketplaces)}</select>
        <div class="orders"></div>
        <button type="button" onclick="addOrder(this.parentNode)">Add Order</button>
    `;
  document.getElementById("marketplaces").appendChild(marketplaceDiv);
}

function addOrder(marketplaceDiv) {
  var ordersDiv = marketplaceDiv.querySelector(".orders");
  var orderNumber = ordersDiv.children.length + 1;
  var orderDiv = document.createElement("div");
  orderDiv.className = "order";
  orderDiv.innerHTML = `
        <strong>Order #${orderNumber}</strong>
        <div class="products"></div>
        <button type="button" onclick="addProduct(this.parentNode)">Add Product</button>
    `;
  ordersDiv.appendChild(orderDiv);
}

function addProduct(orderDiv) {
  var productDiv = document.createElement("div");
  productDiv.className = "product";
  productDiv.innerHTML = `
        <label>Product:</label>
        <select>${generateOptions(products)}</select>       
         
        <label>Quantity:</label>
        <input type="number">
        <button type="button" onclick="addMiniature(this.parentNode)">Add Miniature</button>
        <div class="miniatures"></div>
    `;
  orderDiv.querySelector(".products").appendChild(productDiv);

  // Initialize Select2 on the new product select element
  $(productDiv).find("select").select2();
}

function addMiniature(productDiv) {
  var miniatureDiv = document.createElement("div");
  miniatureDiv.className = "miniature";
  miniatureDiv.innerHTML = `
        <label>Miniature:</label>
        <select>${generateOptions(miniatures)}</select>
    `;
  productDiv.querySelector(".miniatures").appendChild(miniatureDiv);
}

function generateOptions(items) {
  return items
    .map((item) => `<option value="${item}">${item}</option>`)
    .join("");
}

document.getElementById("orderForm").onsubmit = function (event) {
  event.preventDefault();
  var message = compileMessage();
  copyToClipboard(message);
  alert("Message copied to clipboard!");
};

function compileMessage() {
  var dateTime = document.getElementById("dateTime").value;
  var message = dateTime + "\n\n";

  document.querySelectorAll(".marketplace").forEach((marketplace, mpIndex) => {
    var marketplaceName = marketplace.querySelector("select").value;
    message += `Marketplace: ${marketplaceName}\n`;
    marketplace.querySelectorAll(".order").forEach((order, orderIndex) => {
      message += `  - Order #${orderIndex + 1}\n`;
      order.querySelectorAll(".product").forEach((product, productIndex) => {
        var productName = product.querySelector("select").value;
        var quantity = product.querySelector('input[type="number"]').value;
        message += `    > Product: ${productName}\n`;
        message += `      > Quantity: ${quantity}\n`;
        var miniatures = Array.from(
          product.querySelectorAll(".miniature select")
        ).map((miniature) => miniature.value);
        if (miniatures.length > 0) {
          message += `      > Miniatures:\n`;
          miniatures.forEach((miniature) => {
            message += `        - ${miniature}\n`;
          });
        }
      });
      message += "\n  "; // Added two spaces after each order
    });
    message += "----------------------------------------\n";
  });

  return message.trim();
}

function copyToClipboard(text) {
  var textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    var successful = document.execCommand("copy");
    var msg = successful
      ? "Successfully copied to clipboard"
      : "Unable to copy";
    console.log(msg);
  } catch (err) {
    console.error("Unable to copy to clipboard", err);
  }
  document.body.removeChild(textarea);
}
