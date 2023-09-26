const config = {
    appwriteUrl: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
    appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
    appwriteClientsCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE__CLIENTS_COLLECTION_ID ),
    appwriteUsageCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_USAGE_COLLECTION_ID ),
};

export default config;