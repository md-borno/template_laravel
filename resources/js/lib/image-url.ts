export function resolveImageUrl(image: string): string {
    const match =
        image.match(/drive\.google\.com\/file\/d\/([\w-]+)/) ||
        image.match(/drive\.google\.com\/(?:open|uc)\?(?:.*&)?id=([\w-]+)/);

    if (match) {
        return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1600`;
    }
    if (/^https?:\/\//.test(image)) {
        return image;
    }
    return `/${image}`; // old locally uploaded images still work
}