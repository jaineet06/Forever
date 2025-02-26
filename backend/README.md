<---------- Things used in backend are as follows ---------->
    -> express for creating server
    ->CORS for cross origin resource sharing
    -> Cloudinary to store the images on the cloud
    -> dotenv for environment variables
    -> MongoDb as database
            Consist of three primarily models
                |_ Orders
                    |_ Product
                        |_ User
    -> Multer to ulpoad file on cloud as express doesnt supports file upload
    -> bcrypt to generate salt in password
    -> jsonwebtoken for generating token in order to authenticate user
    -> validator for validating email, password, etc.


<---------- File Structure ---------->
config
    |_ cloudinary.js (For configuration and establishing connection with cloudinary)
        |_mongodb.js (Connnecting mongo database)


controllers
    |_userController.js
        |_cartController.js
            |_orderController.js
                |_productController.js

middlewares
    |_adminAuth.js (for authetiacting admins credentials)
        |_auth.js (for user authentication)
            |_multer(for uploading file to cloud)
            
models
    |_ userModel.js (schema for user)
        |_ productModel.js (schema for products data)
            |_ orderModel.js (schema for orders data)

routes
    |_cartRoutes.js
        |_orderRoutes.js
            |_productRoutes.js
                |_userRoutes.js