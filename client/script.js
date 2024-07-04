function run() {
  const outAnimationElements01 = document.getElementsByClassName("out-animation-01");
  const outAnimationElements02 = document.getElementsByClassName("out-animation-02");

  const inAnimationElements01 = document.getElementsByClassName("in-animation-01");
  const inAnimationElements02 = document.getElementsByClassName("in-animation-02");
  const inAnimationElements03 = document.getElementsByClassName("in-animation-03");

  for (let i = 0; i < outAnimationElements01.length; i++) {
    outAnimationElements01[i].addEventListener("animationend", () => {
      outAnimationElements01[i].style.display = "none";
    });
  }
  for (let i = 0; i < outAnimationElements02.length; i++) {
    outAnimationElements02[i].addEventListener("animationend", () => {
      outAnimationElements02[i].style.display = "none";
    });
  }
  for (let i = 0; i < inAnimationElements01.length; i++) {
    inAnimationElements01[i].addEventListener("animationend", () => {
      inAnimationElements01[i].style.transform = "translateX(0)";
    });
  }
  for (let i = 0; i < inAnimationElements02.length; i++) {
    inAnimationElements02[i].addEventListener("animationend", () => {
      inAnimationElements02[i].style.transform = "translateX(0)";
    });
  }
  for (let i = 0; i < inAnimationElements03.length; i++) {
    inAnimationElements03[i].addEventListener("animationend", () => {
      inAnimationElements03[i].style.width = "8.66667px";
      inAnimationElements03[i].style.opacity = "1";
    });
  }

  const copyDiv = document.getElementById("copyDiv");
  copyDiv.addEventListener("click", (event) => {
    const textToCopy = document.getElementById('urlText');

    const isCopied = document.getElementById('isCopied');
    const copySVGPaths = document.getElementById('copySVG').children;

    navigator.clipboard.writeText(textToCopy).then(() => {
      const validColor = "rgb(0, 255, 115)";
      for (let i = 0; i < copySVGPaths.length; i++) {
        console.log(copySVGPaths);
        copySVGPaths[i].style.stroke = validColor;
      }
      isCopied.style.color = validColor;
      isCopied.innerText = 'Copied!';
    }).catch((err) => {
      const inValidColor = "rgb(255, 60, 0)";
      for (let i = 0; i < copySVGPaths.length; i++) {
        copySVGPaths[i].style.stroke = inValidColor;
      }
      isCopied.style.color = inValidColor;
      isCopied.innerText = 'Failed to copy text';
      console.error(err);
    });
  });

  const urlForm = document.getElementById("urlForm");
  urlForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));

    try {
      const response = await fetch(form.action, {
        method: form.method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonData
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const result = await response.json();

      document.getElementById("urlText").href = result.newUrl;
      document.getElementById("urlText").innerText = result.newUrl;
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  });
}

document.addEventListener("DOMContentLoaded", run);