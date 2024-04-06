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

export function AuthenticationImage({ isLogin }: { isLogin: boolean }) {
  return (
    <div className={classes.wrapper}>
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
    </div>
  );
}
