export const createImage = (url) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
    });
  };
  
  export function getRadianAngle(degreeValue) {
    return (degreeValue * Math.PI) / 180;
  }
  
  export function rotateSize(width, height, rotation) {
    const rotRad = getRadianAngle(rotation);
  
    return {
      width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
      height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
    };
  }
  
  export default async function getCroppedImg(
    imageSrc,
    pixelCrop,
    rotation = 0,
    flip = { horizontal: false, vertical: false }
  ) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
  
    const rotRad = getRadianAngle(rotation);
  
    // Calculate the bounding box of the rotated image
    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation);
  
    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;
  
    ctx.translate(bBoxWidth/2, bBoxHeight/2);
    ctx.rotate(rotRad);
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    ctx.translate(-image.width / 2, -image.height / 2);
  
    ctx.drawImage(image, 0, 0);
  
    // Cropped area of the image
    const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);
  
    // Adjust canvas to the size of the cropped image
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
  
    // Draw the cropped image data onto the resized canvas
    ctx.putImageData(data, 0, 0);
  
    // Convert canvas content to a blob (image format)
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (file) => {
          if (file) {
            resolve(URL.createObjectURL(file));
          } else {
            reject(new Error("Failed to create image blob"));
          }
        },
        "image/jpeg",
        
      );
    });
  }
  