import bcrypt from "bcrypt";

export class PasswordHash {
  static async toHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  static async compare(
    suppliedPassword: string,
    storedPassword: string
  ): Promise<boolean> {
    const validPassword = await bcrypt.compare(
      suppliedPassword,
      storedPassword
    );
    return validPassword;
  }
}
