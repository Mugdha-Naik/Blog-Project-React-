import {Client, ID, Databases, Storage, Query} from "appwrite";
import config from '../config/Config.js';

export class Service{ 
    client = new Client();
    databases;
    bucket      //urf storage

    constructor(){
        this.client
        .setEndpoint(config.appwriteURL)
        .setProject(config.appwriteProjectID)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({Title, slug, Content, featuredImage, Status, userID}){
         try{
            return await this.databases.createDocument(
                config.appwriteDataBaseID, 
                config.appwriteCollectionID,
                slug,        //doc id (we could also use id.unique)

                {
                    Title,
                    Status,
                    Content,
                    featuredImage,
                    userID,
                }
            )


         }catch(error){
            console.log("Appwrite service :: updatePost :: error", error)
         }
    }

    async updatePost(slug, {Title, Content, featuredImage, Status, userID}){
        try{
           return await this.databases.updateDocument(
               config.appwriteDataBaseID, 
               config.appwriteCollectionID,
               slug,        //doc id (we could also use id.unique)

               {
                   Title,
                   Content,
                   featuredImage,
                   Status,
               }
           )


        }catch(error){
           console.log("Appwrite service :: updatePost :: error", error)
        }
   }

   async deletePost(slug){
    try{
        await this.databases.deleteDocument(
           config.appwriteDataBaseID, 
           config.appwriteCollectionID,
           slug,        //doc id (we could also use id.unique)
        )

        return true;

        
    }catch(error){
       console.log("Appwrite service :: deletePost :: error", error)
       return false;
       
    }
}

    async getPost(slug){
        try{

            return await this.databases.getDocument(
                config.appwriteDataBaseID, 
                config.appwriteCollectionID,
                slug        //doc id (we could also use id.unique)
        
            )
        }catch(error){
            console.log("Appwrite service :: getPost :: error", error)
        }
    }

    async listPost(queries){
        try{
            return await this.databases.listDocuments(
                config.appwriteDataBaseID,
                config.appwriteCollectionID,
                [Query.equal("Status", "active")]

            )
        }catch(error){
            console.log("Appwrite service :: listPost :: error", error)
            return false;
        }
    }

    //file upload service

    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                config.appwriteBucketID,
                ID.unique(),
                file
            )
        }
        catch(error){
            console.log("Appwrite service :: uploadFile :: error", error)
            return false;
        }
    }

    // getFilePreview(fileID){
    //     return this.bucket.getFilePreview(
    //         config.appwriteBucketID,
    //         fileID
    //     )
        

    async deleteFile(fileID){
        try{
            await this.bucket.deleteFile(
                config.appwriteBucketID,
                fileID
            )
            
            
        }catch(error){
            console.log("Appwrite service :: deleteFile :: error", error)
        }
    }

    getFilePreview(fileId){
        try {
            if (!fileId) {
                console.log("No file ID provided for preview");
                return '';
            }
            console.log("Generating preview for file ID:", fileId);
            return this.bucket.getFileView(
                config.appwriteBucketID,
                fileId
            ).toString();
        } catch (error) {
            console.error("Error generating file preview:", error);
            return '';
        }
    }
}

const ConfigurationService = new Service();

export default ConfigurationService