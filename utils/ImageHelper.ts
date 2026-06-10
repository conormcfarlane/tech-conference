export function ImageUrlHelper(url: string) {
    const imageName = url.split("/").pop();
    const imageSrc = `/images/${imageName}`
    return imageSrc;
}