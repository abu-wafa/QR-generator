import anime from "animejs/lib/anime.es.js";

const container = document.querySelector(".bg-container");

const animationTarget = { ty: -100 }; // Start from -100vh
const bg_anime = () => {
  anime
    .timeline({
      easing: "easeInOutQuad",
    })
    .add({
      targets: animationTarget,
      ty: 0,
      duration: 800,
      update: () => {
        container.style.setProperty("--ty", `${animationTarget.ty}vh`);
      },
    })
    .add({
      targets: animationTarget,
      ty: 10,
      duration: 1000,
      update: () => {
        container.style.setProperty("--ty", `${animationTarget.ty}vh`);
      },
    })
    .add({
      targets: animationTarget,
      ty: 0,
      duration: 1000,
      update: () => {
        container.style.setProperty("--ty", `${animationTarget.ty}vh`);
      },
    });
};

const button_jump = (name) => {
  const button = document.getElementById(name);
  button.addEventListener("mouseenter", () => {
    anime({
      targets: button,
      scale: 1.4,
      rotate: 370,
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
bg_anime();
button_jump("scan-btn");
button_jump("download-btn");
button_jump("share-btn");

// generate QR code functionality
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
  console.log(url);
  if (url) {
    qrCode.makeCode(url);
  } else {
    alert("Please enter a valid URL");
  }
};
submitButton.addEventListener("click", generateQR);
