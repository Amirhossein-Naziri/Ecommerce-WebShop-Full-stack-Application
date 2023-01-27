import { SanityClient } from "@sanity/client";
import { ImageUrlBuilder } from "next-sanity-image";
// import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";

const client = SanityClient({
    projectId:"b9mt7qjn",
    dataset:"webshop",
    apiVersion:"2023-01-27",
    useCdn:true,
    token: process.env.NEXT_SANITY_PROJECT_TOKEN
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);