const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const upload = document.getElementById("upload");
const download = document.getElementById("download");

canvas.width = 500;
canvas.height = 500;

const frame = new Image();
frame.src = "frame1.png"; 


window.onload = () => {
    frame.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(frame, 0, 0, canvas.width, canvas.height); 
    };

    if (frame.complete) {
        ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
    }
};

upload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                const size = Math.min(img.width, img.height); 
                const sx = (img.width - size) / 2; 
                const sy = (img.height - size) / 2; 

                const padding = 0.2; // 20%
                const availableWidth = canvas.width * (1 - 2 * padding);
                const availableHeight = canvas.height * (1 - 2 * padding);

                const scale = Math.min(availableWidth / size, availableHeight / size);
                const imgWidth = size * scale;
                const imgHeight = size * scale;
                const x = (canvas.width - imgWidth) / 2;
                const y = (canvas.height - imgHeight) / 2;

                ctx.drawImage(img, sx, sy, size, size, x, y, imgWidth, imgHeight);

                ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});
//download 
download.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "framed-photo.png"; // Tên file khi tải xuống
    link.href = canvas.toDataURL("image/png"); // Chuyển canvas thành URL dạng PNG
    link.click(); // Tự động click để tải ảnh
});
