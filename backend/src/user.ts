import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { decode, sign, verify } from 'hono/jwt';
import { signinInput, signupInput } from '@zainop23/medium-common';

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    }
}>();

userRouter.post('/signup', async (c) => {
    try {
        const body = await c.req.json();
        const { success, error } = signupInput.safeParse(body);
        if (!success) {
            c.status(400);
            return c.json({ msg: "Invalid inputs", error });
        }

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const user = await prisma.user.create({
            data: {
                username: body.username,
                password: body.password,
            },
        });

        await prisma.$disconnect();

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        console.log("Generated token during signup:", token);
        return c.json({ jwt: token });
    } catch (error) {
        console.error("Signup error:", error);
        c.status(500);
        return c.json({ msg: "Internal server error" });
    }
});

userRouter.post('/signin', async (c) => {
    try {
        const body = await c.req.json();
        const { success, error } = signinInput.safeParse(body);
        if (!success) {
            c.status(400);
            return c.json({ msg: "Invalid inputs", error });
        }

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const user = await prisma.user.findUnique({
            where: {
                username: body.username,
                password: body.password,
            },
        });

        await prisma.$disconnect();

        if (user) {
            const token = await sign({ id: user.id }, c.env.JWT_SECRET);
            console.log("Generated token during signin:", token);
            return c.json({ token });
        } else {
            c.status(404);
            return c.json({ msg: 'User not found' });
        }
    } catch (error) {
        console.error("Signin error:", error);
        c.status(500);
        return c.json({ msg: "Internal server error" });
    }
});
