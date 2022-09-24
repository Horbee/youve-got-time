import { IoLogoGoogle } from "react-icons/io";
import { toast } from "react-toastify";

import { Button } from "@mantine/core";

import { firebaseLoginGoogle } from "../../config/firebase";

export const GoogleLoginButton = () => {
  const handleFirebaseLogin = () => {
    try {
      firebaseLoginGoogle();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Login with Google is not possible");
    }
  };

  return (
    <Button
      color="red"
      type="button"
      leftIcon={<IoLogoGoogle size={18} />}
      onClick={handleFirebaseLogin}
    >
      Sign in with Google
    </Button>
  );
};
