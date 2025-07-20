import anime from "animejs/lib/anime.es.js";

// bakground animation implementation
// This function animates the background container by changing its translateY and scaleY properties
const bg_anime = () => {
  const container = document.querySelector(".bg-container");

  const animationTarget = { ty: -100, scaleY: 1 }; // Start from -100vh
  const setTArget = () => {
    container.style.setProperty("--ty", `${animationTarget.ty}vh`);
    container.style.setProperty("--scaleY", animationTarget.scaleY);
  };

  const bounces = [
    { to: 0, scale: 0.7, duration: 600 }, // Big fall + squash
    { to: 0, scale: 1.2, duration: 300 }, // Bounce up + stretch
    { to: 0, scale: 0.8, duration: 400 }, // Bounce down + squash
    { to: 0, scale: 1.1, duration: 250 }, // Smaller bounce
    { to: 0, scale: 0.9, duration: 300 },
    { to: 0, scale: 1.05, duration: 200 },
    { to: 0, scale: 1, duration: 250 },
  ];

  const timeline = anime.timeline();

  bounces.forEach(({ to, duration, scale }) => {
    timeline.add({
      targets: animationTarget,
      ty: to,
      scaleY: scale,
      easing: "easeInOutSine", //'easeInOutQuad'
      duration,
      update: setTArget,
    });
  });
};
const button_jump = () => {
  anime({
    targets: "#scan-btn",
    scale: 1.4,
    rotate: 370,
    duration: 800,
    easing: "easeInOutQuad",
    complete: () => {
      anime({
        targets: "#scan-btn",
        scale: 0.8,
        rotate: -15,
        duration: 500,
        easing: "easeInOutQuad",
      });
    },
  });
};
// Buttons animations on hover and click
const Crazy_button = (name, rotate = 360) => {
  const button = document.getElementById(name);
  button.addEventListener("mouseenter", () => {
    anime({
      targets: button,
      scale: 1.4,
      rotate: rotate,
      duration: 500,
      easing: "easeInOutQuad",
    });
  });
  button.addEventListener("mouseleave", () => {
    anime({
      targets: button,
      scale: 1,
      rotate: 0,
      duration: 500,
      easing: "easeInOutQuad",
    });
  });
  button.addEventListener("click", () => {
    anime({
      targets: button,
      scale: 0.7,
      rotate: -15,
      duration: 500,
      easing: "easeInOutQuad",
    });
  });
};
// the first animations that appers in the first load
const firstAnimation = () => {
  // background animation
  bg_anime();
  // button jump animation
  setTimeout(button_jump, 2000);
};
// collective buttons animation
const buttons_animation = () => {
  Crazy_button("scan-btn", 370);
  Crazy_button("download-btn", 370);
  Crazy_button("share-btn", -370);
};
// generate QR code functionality
const Qr_code_Generator = () => {
  const submitButton = document.getElementById("scan-btn");

  // initialize QRCode object
  const qrCode = new QRCode(document.getElementById("qrcode"), {
    text: "",
    width: 170,
    height: 170,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
  const generateQR = () => {
    const url = document.getElementById("qr-input").value.trim();
    const qr_wrapper = document.querySelector(".generated-qr");
    const inputField = document.querySelector(".input-wrapper");

    if (url) {
      qrCode.makeCode(url);
      qr_wrapper.classList.add("show");
      inputField.classList.add("hide");
    } else {
      alert("Please enter a valid URL");
    }
  };
  submitButton.addEventListener("click", generateQR);
};
// Download QR code functionality
const Download_fun = () => {
  // this function handles the download of the generated QR code as an image
  const Download_btn = document.getElementById("download-btn");
  Download_btn.addEventListener("click", () => {
    const img_src = document.querySelector("#qrcode img").src;
    const fileName = "Generated QR.png";
    const link = document.createElement("a");
    link.href = img_src;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};
// Share QR code functionality
const Share_fun = () => {
  const Share_btn = document.getElementById("share-btn");
  Share_btn.addEventListener("click", async () => {
    const img_src = document.querySelector("#qrcode img").src;
    const response = await fetch(img_src);
    const blob = await response.blob();
    const file = new File([blob], "qr_code.png", { type: "image/png" });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: "QR Code",
          text: "your QR code is ready to be shared!",
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Sharing is not supported in this browser.");
    }
  });
};
Qr_code_Generator();
firstAnimation();
buttons_animation();
Download_fun();
Share_fun();
