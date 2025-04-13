import { saveToken } from "../utils/tokenStorage";

const handleLogin = async () => {
  try {
    setError("");
    const token = await loginUser(email, password);
    await saveToken(token);
    navigation.navigate("Dashboard");
  } catch (err) {
    setError(err.message);
  }
};