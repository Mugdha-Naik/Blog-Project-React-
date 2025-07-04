import config from '../config/Config.js'
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor(){ 
        this.client
        .setEndpoint(config.appwriteURL)
        .setProject(config.appwriteProjectID)
        this.account=new Account(this.client)
    }

    async createAccount ({email, password, name}){
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
                //call another method to Login
                return this.login({email, password})
            }else{
                return userAccount;
            }
        }catch(error){
            throw error;
        }
    }

    async login({email, password}){
        try{
            return await this.account.createEmailPasswordSession(email, password);

        }catch(error){
            throw error;
        }
    }

    async getCurrUser(){
        try{
            return await this.account.get();
        } catch (error) {
            // Optionally log the error for debugging
            // console.log("getCurrUser error:", error);
            return null;
        }
    }

    async logout(){
        try{
            return this.account.deleteSessions()
        }catch(error){
            throw error;
        }
    }
}

const ConfigurationService = new AuthService();

export default ConfigurationService;

//we could have directly copied the whole code from appwrite wesbite
//but it would not have been so optimized
//so writing a diff approach

//1. create a class
//2. create an object of that class
//3. export that object directly, rather than exporting the class

