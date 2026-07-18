import fs from "fs";
import path from "path";
import crypto from "crypto";

const DB_FILE_PATH = path.join(process.cwd(), "src", "lib", "db.json");

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

// Ensure the db file exists
function initDb() {
  const dir = path.dirname(DB_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE_PATH)) {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify([], null, 2), "utf-8");
  }
}

export function getUsers(): User[] {
  initDb();
  try {
    const data = fs.readFileSync(DB_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading database:", error);
    return [];
  }
}

export function saveUsers(users: User[]): void {
  initDb();
  try {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(users, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing database:", error);
  }
}

export function findUserByEmail(email: string): User | undefined {
  const users = getUsers();
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id: string): User | undefined {
  const users = getUsers();
  return users.find((user) => user.id === id);
}

export function createUser(name: string, email: string, passwordHash: string): User {
  const users = getUsers();
  const newUser: User = {
    id: crypto.randomUUID(),
    name,
    email: email.toLowerCase(),
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
}

export function updateUser(id: string, name: string, email: string): User | undefined {
  const users = getUsers();
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1) return undefined;
  
  users[userIndex].name = name;
  users[userIndex].email = email.toLowerCase();
  saveUsers(users);
  return users[userIndex];
}

// Password hashing helper functions
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedValue: string): boolean {
  try {
    const [salt, hash] = storedValue.split(":");
    if (!salt || !hash) return false;
    const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
    return hash === verifyHash;
  } catch {
    return false;
  }
}
