// Adding an event listener on window load so that the JS code gets executed after all elements are loaded
window.addEventListener("load", () => {
    // Selecting Canvas
    const canvas = document.querySelector("#canvas");

    // Selecting CanvasRenderingContext2d Object
    const context = canvas.getContext("2d");

    // Selecting image element
    const image = document.querySelector("#image");

    // Dimension of the canvas
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    // Creating particle class
    class Particle {
        // Constructor
        constructor(effect, x, y, color) {
            // Creating reference to Effect class
            this.effect = effect;
            // Particle position and size
            this.x = x;
            this.y = y;
            // Image particle
            // Particle original position
            this.originX = Math.floor(x);
            this.originY = Math.floor(y);
            this.color = color;
            // Particle velocity
            this.velocityX = (Math.random() * 2) - 1;
            this.velocityY = (Math.random() * 2) - 1;
            // Particle size
            this.size = 1;
        }
        // draw() method
        draw(context) {
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.size, this.size);
        }
        // update() method
        update() {
            this.x += this.velocityX;
            this.y += this.velocityY;
        }
    };

    // Creating effect class
    class Effect {
        // Parameterized constructor
        constructor(width, height, image) {
            // Reference to image
            this.image = image;
            // Particle dimensions
            this.width = width;
            this.height = height;
            // Positioning image on center of the canvas
            this.centerX = this.width * 0.5;
            this.centerY = this.height * 0.5;
            this.x = this.centerX - (this.image.width * 0.5);
            this.y = this.centerY - (this.image.height * 0.65);
            // Array to store particle objects
            this.particlesArray = [];
            // Pixel gap
            this.gap = 1;
        }
        // init() method
        init(context) {
            // Rendering image
            context.drawImage(this.image, this.x, this.y);
            // Getting image data
            const pixels = context.getImageData(0, 0, this.width, this.height).data;
            for (let y = 0; y < this.height; y += this.gap) {
                for (let x = 0; x < this.width; x += this.gap) {
                    const index = (y * this.width + x) * 4;
                    const red = pixels[index];
                    const green = pixels[index + 1];
                    const blue = pixels[index + 2];
                    const alpha = pixels[index + 3];
                    const color = `rgb(${red}, ${blue}, ${green})`;

                    // Creating new particle object for visible image data
                    if (alpha > 0 && red != 0 && blue != 0 && green != 0) {
                        this.particlesArray.push(new Particle(this, x, y, color));
                    }
                }
            }
        }
        // draw() method
        draw(context) {
            // It executes the draw() method of the Particles class for each particles of particlesArray
            this.particlesArray.forEach(particle => particle.draw(context));
        }
        // update() method
        update() {
            this.particlesArray.forEach(particle => particle.update());
        }
    };
    
    // Animation Loop Function
    function animate() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        effect.draw(context);
        effect.update();
        requestAnimationFrame(animate);
    }

    // Drawing a rectangle particle using effect object
    const effect = new Effect(canvas.width, canvas.height, image);
    effect.init(context);
    setTimeout(() => {
        animate();
    }, 1500);
});

// Hearts 🤍