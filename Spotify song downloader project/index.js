const loginForm = document.getElementById("loginForm")
const page2 = document.getElementById("page-2")
const page1 = document.getElementById("page-1")
const downloadBtn = document.getElementById("downloadBtn")

loginForm.addEventListener("submit", (event)=> {
    event.preventDefault();
    
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    
    if (!email.includes("@") || email.length < 5) {
        alert("Please enter a valid email!");
        return;
    }
    
    if (password.length < 6) {
        alert("Password must be at least 6 characters!");
        return;
    }
    
    alert("Login successful!");
    page2.classList.remove("page-hide")
    page1.classList.add("page-hide")
});

downloadBtn.addEventListener("click", async function() {
    let spotifyUrl = document.getElementById("spotifyUrl").value;
    
    if (!spotifyUrl.includes("spotify.com/track/")) {
        alert("Please enter a valid Spotify song URL!");
        return;
    }

    let trackId = spotifyUrl.split("track/")[1].split("?")[0]; 
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "Fetching download link...";

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '9f8a943317msh2d76df31d59d7aap1f3b8bjsn16940153751d', 
            'x-rapidapi-host': 'spotify-downloader9.p.rapidapi.com'
        }
    };

    const url = `https://spotify-downloader9.p.rapidapi.com/downloadSong?songId=${trackId}`;
    
    try {
        const response = await fetch(url, options);
        const mydata = await response.json();
        console.log("API Raw Response:", mydata);

        if (mydata.data.downloadLink) {
            resultDiv.innerHTML = ""; 

            
            const downloadButton = document.createElement("a");
            downloadButton.href = mydata.data.downloadLink;
            downloadButton.target = "_blank";
            downloadButton.download = "";
            downloadButton.innerText = "Download Song";
            downloadButton.style.display = "block";
            downloadButton.style.marginTop = "10px";
            downloadButton.style.padding = "10px";
            downloadButton.style.backgroundColor = "#1DB954"; 
            downloadButton.style.color = "white";
            downloadButton.style.textDecoration = "none";
            downloadButton.style.borderRadius = "5px";

            resultDiv.appendChild(downloadButton);
        } else {
            resultDiv.innerHTML = "Error: Could not fetch the song download link.";
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        resultDiv.innerHTML = "Error fetching data. Try again.";
    }
});