import { model } from "mongoose";
import { ProductSchema } from "../schemas/product-schema";

const Product = model("Product", ProductSchema);

class ProductModel {
  async findById(pid) {
    const product = await Product.findOne({ _id: pid });
    return product;
  }

  async findAll() {
    const productList = await Product.find({});
    return productList;
  }

  async create(productInfo) {
    const createdNewProduct = await Product.create(productInfo);
    return createdNewProduct;
  }

  async update(pid, productInfo) {
    const filter = { _id: pid };
    const option = { returnOriginal: false };

    const updatedProduct = await Product.findOneAndUpdate(
      filter,
      productInfo,
      option
    );

    return updatedProduct;
  }

  async delete(pid) {
    await Product.deleteOne({ _id: pid });
  }
}

const productModel = new ProductModel();

export { productModel };
