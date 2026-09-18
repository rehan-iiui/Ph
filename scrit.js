/* =========================================
   SMARTPHONE SIMULATOR
   Main JavaScript
========================================= */

const lockScreen = document.getElementById("lockScreen");
const homeScreen = document.getElementById("homeScreen");

const unlockBtn = document.getElementById("unlockBtn");

const timeElement = document.getElementById("time");
const lockTimeElement = document.getElementById("lockTime");
const lockDateElement = document.getElementById("lockDate");

const controlBtn = document.getElementById("controlBtn");
const controlCenter = document.getElementById("controlCenter");
const closeControl = document.getElementById("closeControl");

const appWindow = document.getElementById("appWindow");
const appWindowTitle = document.getElementById("appWindowTitle");
const appWindowContent = document.getElementById("appWindowContent");

const closeApp = document.getElementById("closeApp");
const backButton = document.getElementById("backButton");

const homeIndicator = document.getElementById("homeIndicator");

const toast = document.getElementById("toast");

const appSearch = document.getElementById("appSearch");

const brightness = document.getElementById("brightness");

const lockDevice = document.getElementById("lockDevice");
const restartDevice = document.getElementById("restartDevice");

const flashlightBtn = document.getElementById("flashlightBtn");
const cameraBtn = document.getElementById("cameraBtn");


/* =========================================
   TIME
========================================= */

function updateClock() {

    const now = new Date();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;

    if (hours === 0) {
        hours = 12;
    }

    const currentTime = `${hours}:${minutes}`;

    timeElement.textContent = currentTime;
    lockTimeElement.textContent = currentTime;

    const dateOptions = {
        weekday: "long",
        month: "long",
        day: "numeric"
    };

    lockDateElement.textContent =
        now.toLocaleDateString("en-US", dateOptions);

}

updateClock();

setInterval(updateClock, 1000);


/* =========================================
   TOAST
========================================= */

let toastTimer;

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 1800);
}


/* =========================================
   UNLOCK PHONE
========================================= */

function unlockPhone() {

    lockScreen.style.opacity = "0";
    lockScreen.style.transform = "translateY(-20px)";

    setTimeout(() => {

        lockScreen.classList.add("hidden");
        homeScreen.classList.remove("hidden");

    }, 350);

}

unlockBtn.addEventListener("click", unlockPhone);


/* =========================================
   LOCK PHONE
========================================= */

function lockPhone() {

    appWindow.classList.add("hidden");
    controlCenter.classList.add("hidden");

    homeScreen.classList.add("hidden");

    lockScreen.classList.remove("hidden");

    lockScreen.style.opacity = "1";
    lockScreen.style.transform = "translateY(0)";

    showToast("Phone locked");

}

lockDevice.addEventListener("click", () => {

    controlCenter.classList.add("hidden");

    setTimeout(lockPhone, 150);

});


/* =========================================
   CONTROL CENTER
========================================= */

controlBtn.addEventListener("click", () => {

    controlCenter.classList.remove("hidden");

});

closeControl.addEventListener("click", () => {

    controlCenter.classList.add("hidden");

});


/* =========================================
   CONTROL CENTER TOGGLES
========================================= */

const controlTiles =
    document.querySelectorAll(".control-tile");

controlTiles.forEach(tile => {

    tile.addEventListener("click", () => {

        tile.classList.toggle("active");

        const small = tile.querySelector("small");

        if (tile.classList.contains("active")) {

            if (small) {
                small.textContent = "On";
            }

        } else {

            if (small) {
                small.textContent = "Off";
            }

        }

    });

});


/* =========================================
   BRIGHTNESS
========================================= */

brightness.addEventListener("input", () => {

    const value = brightness.value;

    const brightnessAmount =
        0.55 + (value / 100) * 0.45;

    homeScreen.style.filter =
        `brightness(${brightnessAmount})`;

});


/* =========================================
   APP SEARCH
========================================= */

appSearch.addEventListener("input", () => {

    const query =
        appSearch.value.toLowerCase().trim();

    const apps =
        document.querySelectorAll(".app-icon");

    apps.forEach(app => {

        const name =
            app.dataset.app.toLowerCase();

        if (name.includes(query)) {

            app.style.display = "flex";

        } else {

            app.style.display = "none";

        }

    });

});


/* =========================================
   APP OPENING
========================================= */

const appIcons =
    document.querySelectorAll(".app-icon");

appIcons.forEach(app => {

    app.addEventListener("click", () => {

        const appName = app.dataset.app;
        const appPath = app.dataset.path;

        openApp(appName, appPath);

    });

});


/* =========================================
   DOCK APPS
========================================= */

const dockApps =
    document.querySelectorAll(".dock-app");

dockApps.forEach(app => {

    app.addEventListener("click", () => {

        const appName = app.dataset.app;

        openBuiltInApp(appName);

    });

});


/* =========================================
   OPEN APP
========================================= */

function openApp(appName, appPath) {

    appWindowTitle.textContent = appName;

    appWindow.classList.remove("hidden");

    homeIndicator.classList.remove("hidden");

    if (appPath) {

        appWindowContent.innerHTML = `
            <iframe
                src="${appPath}"
                title="${appName}"
                class="app-frame">
            </iframe>
        `;

    } else {

        openBuiltInApp(appName);

    }

}


/* =========================================
   BUILT-IN APPS
========================================= */

function openBuiltInApp(appName) {

    appWindowTitle.textContent = appName;

    appWindow.classList.remove("hidden");

    homeIndicator.classList.remove("hidden");

    let content = "";

    if (appName === "Phone") {

        content = `
            <div class="app-placeholder">
                <div>📞</div>
                <h2>Phone</h2>
                <p>
                    Phone app is ready for future features.
                </p>
            </div>
        `;

    } else if (appName === "Messages") {

        content = `
            <div class="app-placeholder">
                <div>💬</div>
                <h2>Messages</h2>
                <p>
                    Your messages will appear here.
                </p>
            </div>
        `;

    } else if (appName === "Browser") {

        content = `
            <div class="app-placeholder">
                <div>🌐</div>
                <h2>Browser</h2>
                <p>
                    Browser simulator ready.
                </p>
            </div>
        `;

    } else if (appName === "Camera") {

        content = `
            <div class="app-placeholder">
                <div>📷</div>
                <h2>Camera</h2>
                <p>
                    Camera simulator ready.
                </p>
            </div>
        `;

    } else if (appName === "Calculator") {

        content = `
            <div class="app-placeholder">
                <div>🧮</div>
                <h2>Calculator</h2>
                <p>
                    Calculator features can be added later.
                </p>
            </div>
        `;

    } else if (appName === "Notes") {

        content = `
            <div class="app-placeholder">
                <div>📝</div>
                <h2>Notes</h2>
                <p>
                    Notes will be added to the smartphone later.
                </p>
            </div>
        `;

    } else if (appName === "Gallery") {

        content = `
            <div class="app-placeholder">
                <div>🌄</div>
                <h2>Gallery</h2>
                <p>
                    Your gallery will appear here.
                </p>
            </div>
        `;

    } else if (appName === "Settings") {

        content = `
            <div class="app-placeholder">
                <div>⚙️</div>
                <h2>Settings</h2>
                <p>
                    Smartphone settings will be built later.
                </p>
            </div>
        `;

    } else {

        content = `
            <div class="app-placeholder">
                <div>📱</div>
                <h2>${appName}</h2>
                <p>
                    This app is ready to be developed.
                </p>
            </div>
        `;

    }

    appWindowContent.innerHTML = content;

}


/* =========================================
   CLOSE APP
========================================= */

function closeCurrentApp() {

    appWindow.classList.add("hidden");

    homeIndicator.classList.add("hidden");

}

closeApp.addEventListener("click", closeCurrentApp);


/* =========================================
   BACK BUTTON
========================================= */

backButton.addEventListener("click", closeCurrentApp);


/* =========================================
   CAMERA SHORTCUT
========================================= */

cameraBtn.addEventListener("click", () => {

    showToast("Camera shortcut");

});


/* =========================================
   FLASHLIGHT
========================================= */

let flashlightOn = false;

flashlightBtn.addEventListener("click", () => {

    flashlightOn = !flashlightOn;

    if (flashlightOn) {

        flashlightBtn.style.background =
            "rgba(255,220,80,0.35)";

        showToast("Flashlight ON");

    } else {

        flashlightBtn.style.background =
            "rgba(255,255,255,0.11)";

        showToast("Flashlight OFF");

    }

});


/* =========================================
   RESTART
========================================= */

restartDevice.addEventListener("click", () => {

    controlCenter.classList.add("hidden");

    homeScreen.classList.add("hidden");

    appWindow.classList.add("hidden");

    lockScreen.classList.remove("hidden");

    lockScreen.style.opacity = "1";
    lockScreen.style.transform = "translateY(0)";

    showToast("Phone restarted");

});


/* =========================================
   KEYBOARD SHORTCUTS
========================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        if (!controlCenter.classList.contains("hidden")) {

            controlCenter.classList.add("hidden");

        } else if (!appWindow.classList.contains("hidden")) {

            closeCurrentApp();

        }

    }

});


/* =========================================
   PREVENT FORM-LIKE BUTTON BEHAVIOR
========================================= */

document
    .querySelectorAll("button")
    .forEach(button => {

        button.addEventListener("mousedown", event => {
            event.preventDefault();
        });

    });


/* =========================================
   STARTUP MESSAGE
========================================= */

setTimeout(() => {

    showToast("Smartphone Simulator ready");

}, 700);
