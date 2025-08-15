import { Redirect } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { Stack } from "expo-router";

export default function Layout() {
  const { isSignedIn } = useUser();
  if (!isSignedIn) return <Redirect href={"/sign-in"} />;

  return <Stack />;
}
