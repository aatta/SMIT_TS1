class Product {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public price: number,
        public discountPercentage: number,
        public rating: number,
        public stock: number,
        public brand: string,
        public category: string,
        public thumbnail: string,
        public images: [string]
    ) {

    }
}

class ProductService {
    private webServiceUrl: string = "https://dummyjson.com/products";

    /**
     * Fetches data from web service
     * @returns Array of Product
     */
    public async fetchProducts(): Promise<Product[]> {
        const rawProducts = await this.fetchRawProducts();

        return rawProducts.map(rp => new Product(
            rp["id"] as number,
            rp["title"] as string,
            rp["description"] as string,
            rp["price"] as number,
            rp["discountPercentage"] as number,
            rp["rating"] as number,
            rp["stock"] as number,
            rp["brand"] as string,
            rp["category"] as string,
            rp["thumbnail"] as string,
            rp["images"] as [string],
        ));
    }

    private fetchRawProducts(): Promise<any[]> {        
        return new Promise((resolve, reject) => {
            fetch(this.webServiceUrl)
            .then(res => res.json())
            .then(res => resolve(res.products))
            .catch(err => reject(err));
        });
    }
}

class DataLoader {
    private dataService: ProductService = new ProductService();

    public async makeProductList() {
        //fetch products from web service
        const products = await this.dataService.fetchProducts();
        
        //generate rows from the products
        const productRows = products.map((pr, idx) => this.generateRow(pr, idx % 2 == 0));
        
        //join all product rows into a single string.
        const allRows = productRows.join("");

        //using DOM API get body element of the product table
        const productTableBody = document.querySelector("#tblProduct > tbody") as HTMLElement;

        //inject generated html into the table body.
        productTableBody.insertAdjacentHTML("beforebegin", allRows);
    }

    private generateRow(product: Product, isEven: boolean): string {
        const row = `<tr class="product row ${isEven ? "even-row" : "" }">
            <td>${product.id}</td>
            <td>${product.title}</td>
            <td>${product.description}</td>
            <td>${product.brand}</td>
            <td>${product.category}</td>
        </tr>`;

        return row;
    }
}


const dataLoader: DataLoader = new DataLoader();

dataLoader.makeProductList();