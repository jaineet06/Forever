import {v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModel.js"

//Function for adding product
const addProduct = async (req, res) => {
    try {
        
        // Products data from frontend
        const {name, price, description, category, subCategory, sizes, bestSeller} = req.body


        // if imageX is availabe then it will be stored in the variable
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        // filtering out only valid images i.e., only available one
        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        // uploading in the cloudinary nd storing the secure urls in the array
        let imageUrl = await Promise.all(
            images.map( async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'})
                return result.secure_url
            })
        )

        // creating new collection with the available data and storing in the DB
        const productData = {
            name,
            description,
            category,
            subCategory,
            price: Number(price),
            sizes: JSON.parse(sizes),
            bestSeller: bestSeller === 'true' ? true : false,
            image: imageUrl,
            date: Date.now()
        }

        const product = new productModel(productData)
        await product.save()
        
        res.json({success: true, message: "Product Added"})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


//Function for listing product
const listProduct = async (req, res) => {

    try {
        const products = await productModel.find({});
        res.json({success: true, products})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

//Function for removing product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success: true, message: "Removed Succesfully"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}


//Function for single product info
const singleProduct = async (req, res) => {
    try {
        const {productId} = req.body
        const product = await productModel.findById(productId)
        res.json({success: true, product})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}


export {addProduct, removeProduct, listProduct, singleProduct}