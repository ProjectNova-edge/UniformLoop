<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>My Account</title>
  <link rel="stylesheet" href="styles.css" />
  <style>
    .preview-img { width: 100px; margin: 5px; }
  </style>
</head>
<body>
  <h1>Welcome to Your Dashboard</h1>
  <button onclick="signOutUser()">Logout</button>

  <h2>Submit New Listing</h2>
  <form id="listingForm">
    <input type="text" id="schoolInput" placeholder="School Name" required />
    <input type="text" id="sizeInput" placeholder="Size" required />
    <select id="genderInput" required>
      <option value="">Select Gender</option>
      <option value="Boys">Boys</option>
      <option value="Girls">Girls</option>
      <option value="Unisex">Unisex</option>
    </select>
    <input type="text" id="locationInput" placeholder="Location" required />
    <input type="text" id="priceInput" placeholder="Price (or Free)" required />
    <textarea id="extraInput" placeholder="Extra details (optional)"></textarea>

    <label>Upload up to 5 photos:</label>
    <input type="file" id="photosInput" accept="image/*" multiple max="5" />
    <div id="photoPreviews"></div>

    <button type="submit">Submit Listing</button>
  </form>

  <h2>Your Listings</h2>
  <div id="userListings"></div>

  <script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
    import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

    const firebaseConfig = {
      apiKey: "YOUR_FIREBASE_API_KEY",
      authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
      projectId: "YOUR_FIREBASE_PROJECT_ID",
      storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
      messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
      appId: "YOUR_FIREBASE_APP_ID"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    // Replace with your cloudinary details:
    const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/upload";
    const UPLOAD_PRESET = "YOUR_UNSIGNED_UPLOAD_PRESET";

    let currentUser = null;
    let listings = JSON.parse(localStorage.getItem("listings")) || [];

    onAuthStateChanged(auth, (user) => {
      if (user) {
        currentUser = user;
        renderUserListings();
      } else {
        window.location.href = "index.html";
      }
    });

    function renderUserListings() {
      const container = document.getElementById("userListings");
      container.innerHTML = "";

      const userListings = listings.filter(item => item.userId === currentUser.uid);
      if (userListings.length === 0) {
        container.innerHTML = "<p>No listings yet.</p>";
        return;
      }

      userListings.forEach((listing, idx) => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
          <h3>${listing.school} (${listing.gender})</h3>
          <p><strong>Size:</strong> ${listing.size}</p>
          <p><strong>Location:</strong> ${listing.location}</p>
          <p><strong>Price:</strong> ${listing.price}</p>
          <p><strong>Extra details:</strong> ${listing.extra || "None"}</p>
          <div>${listing.photos.map(url => `<img src="${url}" class="preview-img" />`).join('')}</div>
          <button onclick="editListing(${idx})">Edit</button>
          <button onclick="deleteListing(${idx})">Delete</button>
        `;
        container.appendChild(div);
      });
    }

    async function uploadPhoto(file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      return data.secure_url;
    }

    document.getElementById("photosInput").addEventListener("change", function() {
      const files = Array.from(this.files).slice(0,5);
      const previewContainer = document.getElementById("photoPreviews");
      previewContainer.innerHTML = "";
      files.forEach(file => {
        const img = document.createElement("img");
        img.className = "preview-img";
        img.src = URL.createObjectURL(file);
        previewContainer.appendChild(img);
      });
    });

    document.getElementById("listingForm").addEventListener("submit", async function(e) {
      e.preventDefault();
      const school = document.getElementById("schoolInput").value.trim();
      const size = document.getElementById("sizeInput").value.trim();
      const gender = document.getElementById("genderInput").value;
      const location = document.getElementById("locationInput").value.trim();
      const price = document.getElementById("priceInput").value.trim();
      const extra = document.getElementById("extraInput").value.trim();
      const photoFiles = Array.from(document.getElementById("photosInput").files).slice(0,5);

      if (!school || !size || !gender || !location || !price) {
        alert("Please fill all required fields.");
        return;
      }
      if(photoFiles.length === 0) {
        alert("Please upload at least one photo.");
        return;
      }

      const uploadedPhotos = [];
      for (const file of photoFiles) {
        const url = await uploadPhoto(file);
        uploadedPhotos.push(url);
      }

      listings.push({
        userId: currentUser.uid,
        school, size, gender, location, price, extra,
        photos: uploadedPhotos
      });

      localStorage.setItem("listings", JSON.stringify(listings));
      alert("Listing submitted!");
      this.reset();
      document.getElementById("photoPreviews").innerHTML = "";
      renderUserListings();
    });

    window.signOutUser = function() {
      signOut(auth).then(() => {
        window.location.href = "index.html";
      });
    };

    window.deleteListing = function(index) {
      if(confirm("Are you sure you want to delete this listing?")) {
        listings.splice(index, 1);
        localStorage.setItem("listings", JSON.stringify(listings));
        renderUserListings();
      }
    };

    window.editListing = function(index) {
      const listing = listings[index];
      if (!listing) return alert("Listing not found.");

      // Prefill form for editing
      document.getElementById("schoolInput").value = listing.school;
      document.getElementById("sizeInput").value = listing.size;
      document.getElementById("genderInput").value = listing.gender;
      document.getElementById("locationInput").value = listing.location;
      document.getElementById("priceInput").value = listing.price;
      document.getElementById("extraInput").value = listing.extra || "";

      // For simplicity, do not edit photos now (would require more UI)

      // Remove old listing and wait for resubmission
      listings.splice(index, 1);
      localStorage.setItem("listings", JSON.stringify(listings));
      renderUserListings();
      alert("Edit the form and submit again.");
    };
  </script>
</body>
</html>
