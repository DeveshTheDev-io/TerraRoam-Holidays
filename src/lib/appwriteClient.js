import { Client, Databases, Storage, ID } from "appwrite";

// TODO: Replace these placeholders with your actual Appwrite project details
export const appwriteConfig = {
  endpoint: "https://fra.cloud.appwrite.io/v1", // Replace with your endpoint
  projectId: "69464b94000f516cfa92", // Replace with your project ID
  databaseId: "agency_db", // Replace with your database ID
  storageId: "69479eb7003bfd5c4fbc", // Replace with your storage bucket ID
  tables: {
    profiles: "profiles",
    packages: "packages",
    bookings: "bookings",
    destinations: "destinations",
    callback_requests: "callback_requests",
  },
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID };
