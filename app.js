"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Product {
    constructor(id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.discountPercentage = discountPercentage;
        this.rating = rating;
        this.stock = stock;
        this.brand = brand;
        this.category = category;
        this.thumbnail = thumbnail;
        this.images = images;
    }
}
class ProductService {
    constructor() {
        this.webServiceUrl = "https://dummyjson.com/products";
    }
    /**
     * Fetches data from web service
     * @returns Array of Product
     */
    fetchProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const rawProducts = yield this.fetchRawProducts();
            return rawProducts.map(rp => new Product(rp["id"], rp["title"], rp["description"], rp["price"], rp["discountPercentage"], rp["rating"], rp["stock"], rp["brand"], rp["category"], rp["thumbnail"], rp["images"]));
        });
    }
    fetchRawProducts() {
        return new Promise((resolve, reject) => {
            fetch(this.webServiceUrl)
                .then(res => res.json())
                .then(res => resolve(res.products))
                .catch(err => reject(err));
        });
    }
}
class DataLoader {
    constructor() {
        this.dataService = new ProductService();
    }
    makeProductList() {
        return __awaiter(this, void 0, void 0, function* () {
            //fetch products from web service
            const products = yield this.dataService.fetchProducts();
            //generate rows from the products
            const productRows = products.map((pr, idx) => this.generateRow(pr, idx % 2 == 0));
            //join all product rows into a single string.
            const allRows = productRows.join("");
            //using DOM API get body element of the product table
            const productTableBody = document.querySelector("#tblProduct > tbody");
            //inject generated html into the table body.
            productTableBody.insertAdjacentHTML("beforebegin", allRows);
        });
    }
    generateRow(product, isEven) {
        const row = `<tr class="product row ${isEven ? "even-row" : ""}">
            <td>${product.id}</td>
            <td>${product.title}</td>
            <td>${product.description}</td>
            <td>${product.brand}</td>
            <td>${product.category}</td>
        </tr>`;
        return row;
    }
}
const dataLoader = new DataLoader();
dataLoader.makeProductList();
