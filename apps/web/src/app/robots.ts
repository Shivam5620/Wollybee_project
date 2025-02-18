import { MetadataRoute } from "next";

export default function robots() : MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                "/thank-you",
                "/login",
                "/register",
                "/forgot-password",
                "/reset-password",
                "/profile",
                "/profile/orders",
                "/profile/address",
                "/profile/change-password",
                "/profile/manage",
            ]
        },
        sitemap: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/sitemap.xml`,
    };
}