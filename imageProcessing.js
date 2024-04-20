const imagePaths = [
    "assets/annualflwr copy.jpeg",
    "assets/mosanda.jpeg",
    "assets/rose.jpeg",
    "assets/sunflower.jpeg",
    "assets/tulip.jpeg",
    "assets/petunia.jpeg",
    "assets/daisy.jpeg",
    "assets/lilly.jpeg",
    "assets/pink.jpeg",
    "assets/arali.jpeg",
    "assets/annualflwr.jpeg",
    "assets/springtimeflwr.jpeg",
    "assets/greenflwr.jpeg",
    "assets/hibiscus.jpeg",
    "assets/queensland.jpeg",
    "assets/multirose.jpeg",
];
let currentImageIndex = 0;

function checkImageColor() {
    const img = new Image();
    img.src = imagePaths[currentImageIndex];
    img.onload = function() {
        canvas = document.getElementById('imageCanvas');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        let redPixels = 0, greenPixels = 0, bluePixels = 0;

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            if (r > g + b) {
                redPixels++;
            } else if (g > r + b) {
                greenPixels++;
            } else if (b > r + g) {
                bluePixels++;
            }
        }

        const totalPixels = data.length / 4;
        const redPercentage = (redPixels / totalPixels) * 100;
        const greenPercentage = (greenPixels / totalPixels) * 100;
        const bluePercentage = (bluePixels / totalPixels) * 100;

        let result;
        if (redPercentage > 50) {
            result = 'The image is reddish.';
        } else if (greenPercentage > 50) {
            result = 'The image is greenish.';
        } else if (bluePercentage > 50) {
            result = 'The image is blueish.';
        } else {
            result = 'The image is not predominantly red, green, or blue.';
        }

        document.getElementById('result').textContent = result;
    };
}

function makeImageColor(color) {
    const img = new Image();
    img.src = imagePaths[currentImageIndex];
    img.onload = function() {
        canvas = document.getElementById('imageCanvas');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            if (color === 'red' && r < g + b) {
                data[i] = g + b; // Increase R to G+B
            } else if (color === 'green' && g < r + b) {
                data[i + 1] = r + b; // Increase G to R+B
            } else if (color === 'blue' && b < r + g) {
                data[i + 2] = r + g; // Increase B to R+G
            }
        }

        ctx.putImageData(imageData, 0, 0);
    };
}

function duplicateImage() {
    const img = new Image();
    img.src = imagePaths[currentImageIndex];
    img.onload = function() {
        canvas = document.getElementById('imageCanvas');
        canvas.width = img.width * 2; // Double the width
        canvas.height = img.height; // Maintain the original height
        ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0); // Draw original image
        ctx.drawImage(img, img.width, 0); // Draw original image again next to the first one
    };
}
function increaseBrightness() {
    const img = new Image();
    img.src = imagePaths[currentImageIndex];
    img.onload = function() {
        canvas = document.getElementById('imageCanvas');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        const brightnessFactor = 1.1; // Increase brightness by 10%
        for (let i = 0; i < data.length; i += 4) {
            data[i] *= brightnessFactor; // Adjust red channel
            data[i + 1] *= brightnessFactor; // Adjust green channel
            data[i + 2] *= brightnessFactor; // Adjust blue channel
        }

        ctx.putImageData(imageData, 0, 0);
    };
}
function reduceResolution() {
    const img = new Image();
    img.src = imagePaths[currentImageIndex];
    img.onload = function() {
        const scaleFactor = 0.5; // Scale factor for reducing resolution (e.g., 0.5 means reducing by half)
        const newWidth = img.width * scaleFactor;
        const newHeight = img.height * scaleFactor;

        canvas = document.getElementById('imageCanvas');
        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, newWidth, newHeight); // Draw the image with reduced dimensions
    };
}
function rgbToGray() {
    const img = new Image();
    img.src = imagePaths[currentImageIndex];
    img.onload = function() {
        canvas = document.getElementById('imageCanvas');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3; // Calculate average of RGB channels
            data[i] = avg; // Set red channel to average
            data[i + 1] = avg; // Set green channel to average
            data[i + 2] = avg; // Set blue channel to average
        }

        ctx.putImageData(imageData, 0, 0);
    };
}

function createAvatar() {
    const img = new Image();
    img.src = imagePaths[currentImageIndex];
    img.onload = function() {
        const canvas = document.createElement('canvas');
        const avatarSize = 100; // Set the desired size for the avatar
        canvas.width = canvas.height = avatarSize; // Set the canvas size for the avatar
        const ctx = canvas.getContext('2d');

        // Draw a circular clipping path
        ctx.beginPath();
        ctx.arc(avatarSize / 2, avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        // Calculate scaling factor to fit the image within the avatarSize while maintaining aspect ratio
        const scale = Math.max(avatarSize / img.width, avatarSize / img.height);
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;

        // Calculate offsets to center the image within the avatar canvas
        const xOffset = (avatarSize - scaledWidth) / 2;
        const yOffset = (avatarSize - scaledHeight) / 2;

        // Draw the scaled image on the canvas
        ctx.drawImage(img, xOffset, yOffset, scaledWidth, scaledHeight);

        // Create a new image with the canvas as source
        const avatarImg = new Image();
        avatarImg.src = canvas.toDataURL();
        avatarImg.className = 'img-thumbnail mx-auto my-2 rounded-circle'; // Apply Bootstrap classes for rounded shape
        // Append the avatar image to the document or any desired container
        document.body.appendChild(avatarImg);
    };
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + imagePaths.length) % imagePaths.length;
    checkImageColor();
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % imagePaths.length;
    checkImageColor();
}

window.onload = function() {
    checkImageColor(); // Initially check color when the page loads
};