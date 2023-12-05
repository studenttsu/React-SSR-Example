import Helmet from "react-helmet";
import React from "react";

interface PageMetaProps {
    title: string;
    description: string;
    image?: string;
}

export default function PageMeta ({ title, description, image }: PageMetaProps) {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="twitter:title" content={title} />
        </Helmet>
    );
}