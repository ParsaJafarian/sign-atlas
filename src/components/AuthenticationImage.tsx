import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
} from "@mantine/core";
import classes from "./AuthenticationImage.module.css";
import Link from "next/link";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import { postDataTo } from "@/lib/fetches";

export function AuthenticationImage({ isLogin }: { isLogin: boolean }) {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await postDataTo("/api/users", form.values)
    router.push("/");
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login(form.values);
    window.location.replace("/");
  };

  return (
    <form method="post" onSubmit={isLogin ? handleLogin : handleSignup} className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          {isLogin ? "Log in to Sign Atlas!" : "Sign up to Sign Atlas"}
        </Title>

        {!isLogin && (
          <TextInput
            label="Name"
            placeholder="Your name"
            size="md"
            name="name"
          />
        )}

        <TextInput
          label="Email address"
          placeholder="hello@gmail.com"
          mt="md"
          size="md"
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
        />
        <Checkbox label="Keep me logged in" mt="xl" size="md" />
        <Button fullWidth mt="xl" size="md">
          {isLogin ? "Login" : "Sign Up"}
        </Button>

        <Text ta="center" mt="md">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Anchor<"a">
            href="#"
            fw={700}
            onClick={(event) => event.preventDefault()}
          >
            {isLogin ? (
              <Link href="/signup">Register</Link>
            ) : (
              <Link href="/login">Log In</Link>
            )}
          </Anchor>
        </Text>
      </Paper>
    </form>
  );
}
