const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");

const uri = process.env.MONGODB_URI;
console.log("URI:", uri);

async function seed() {
    if (!uri) {
        console.error("No MONGODB_URI found.");
        return;
    }
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db("evander"); // Using "evander" as the database name
        const users = db.collection("users");
        
        const email = process.env.EMAIL_USER || "evanderfirm@gmail.com";
        const password = "evanderadmin"; // Default password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const existingUser = await users.findOne({ email });
        if (!existingUser) {
            await users.insertOne({
                email,
                password: hashedPassword,
                role: "admin",
                createdAt: new Date()
            });
            console.log(`Successfully seeded admin user! Email: ${email}, Password: ${password}`);
        } else {
            console.log(`Admin user ${email} already exists.`);
        }
    } catch (e) {
        console.error("Error seeding DB:", e);
    } finally {
        await client.close();
    }
}
seed();
