import { logout } from "@/lib/auth";
import { isAuthenticated } from "@/lib/effects";
import { Button, Group } from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AuthenticationButton() {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    useEffect(() => isAuthenticated(setAuthenticated), []);

    const handleLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        await logout();
        console.log("Logged out");
        window.location.reload();
    };

    return authenticated ? (
        <Group visibleFrom="sm">
            <Link href="/logout">
                <Button onClick={handleLogout}>Log out</Button>
            </Link>
        </Group>
    ) : (
        <Group visibleFrom="sm">
            <Link href="/login">
                <Button variant="default">Log In</Button>
            </Link>
            <Link href="/signup">
                <Button>Sign up</Button>
            </Link>
        </Group>
    )
};
