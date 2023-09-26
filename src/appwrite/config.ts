import { CreateUserAccount, LoginUserAccount } from "@/types/types";
import { Client, Account, ID, Databases } from "appwrite";
import config from "@/config/conf";

export const appwriteClient = new Client();

const {
  appwriteUrl: ENDPOINT,
  appwriteProjectId: PROJECT_ID,
  appwriteDatabaseId: DATABASE_ID,
  appwriteClientsCollectionId: CLIENTS_COLLECTION_ID,
} = config;

appwriteClient.setEndpoint(ENDPOINT).setProject(PROJECT_ID);

export const account = new Account(appwriteClient);
const databases = new Databases(appwriteClient);

export class AppwriteService {
  async createUserAccount({ email, password, name }: CreateUserAccount) {
    try {
      const userAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error: any) {
      throw error;
    }
  }

  async login({ email, password }: LoginUserAccount) {
    try {
      return await account.createEmailSession(email, password);
    } catch (error: any) {
      throw error;
    }
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const data = await this.getCurrentUser();
      return Boolean(data);
    } catch (error) {}

    return false;
  }

  async getCurrentUser() {
    try {
      return account.get();
    } catch (error) {
      console.log("getcurrentUser error: " + error);
    }
    return null;
  }

  async logout() {
    try {
      return await account.deleteSession("current");
    } catch (error) {
      console.log("logout error: " + error);
    }
  }

  async getClients() {
    try {
      const clients = await databases.listDocuments(
        DATABASE_ID,
        CLIENTS_COLLECTION_ID
      );
      return clients;
    } catch (error) {
      throw error;
    }
  }
  async getClient(DOCUMENT_ID: string) {
    try {
      const client = await databases.getDocument(
        DATABASE_ID,
        CLIENTS_COLLECTION_ID,
        DOCUMENT_ID
      );
      return client
    } catch (error) {
      throw error;
    }
  }
  async createClient(data: any) {
    try {
      const client = await databases.createDocument(
        DATABASE_ID,
        CLIENTS_COLLECTION_ID,
        ID.unique(),
        data
      );
      return client;
    } catch (error) {
      throw error;
    }
  }

  async updateClient(DOCUMENT_ID: string, data: any) {
    try {
      const updatedClient = await databases.updateDocument(
        DATABASE_ID,
        CLIENTS_COLLECTION_ID,
        DOCUMENT_ID,
        data
      );
      return updatedClient;
    } catch (error) {
      throw error;
    }
  }

  async deleteClient(DOCUMENT_ID: string) {
    try {
      const deleted = await databases.deleteDocument(
        DATABASE_ID,
        CLIENTS_COLLECTION_ID,
        DOCUMENT_ID
      );
      return deleted;
    } catch (error) {
      throw error;
    }
  }
}

export const appwriteService = new AppwriteService();
