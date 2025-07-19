
const listings = [
  { school: "Sydney High School", item: "Blazer", size: "M", condition: "Good", price: "Free" },
  { school: "Melbourne Grammar", item: "Bag", size: "-", condition: "Like New", price: "$10" },
  { school: "Parramatta Public", item: "Books", size: "-", condition: "Used", price: "Free" },
  { school: "Sydney High School", item: "Shirt", size: "L", condition: "Used", price: "$5" },
];

const container = document.getElementById("listings");
const search = document.getElementById("search");
const filterType = document.getElementById("filterType");

function renderListings() {
  const keyword = search.value.toLowerCase();
  const filter = filterType.value;
  container.innerHTML = "";

  listings
    .filter(listing =>
      listing.school.toLowerCase().includes(keyword) &&
      (filter === "" || listing.item === filter)
    )
    .forEach(listing => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <h3>${listing.item}</h3>
        <p><strong>School:</strong> ${listing.school}</p>
        <p><strong>Size:</strong> ${listing.size}</p>
        <p><strong>Condition:</strong> ${listing.condition}</p>
        <p><strong>Price:</strong> ${listing.price}</p>
      `;
      container.appendChild(div);
    });
}

search.addEventListener("input", renderListings);
filterType.addEventListener("change", renderListings);

renderListings();
const form = document.getElementById('listingForm');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const newListing = {
    school: document.getElementById('schoolInput').value.trim(),
    item: document.getElementById('itemInput').value,
    size: document.getElementById('sizeInput').value.trim(),
    condition: document.getElementById('conditionInput').value.trim(),
    price: document.getElementById('priceInput').value.trim(),
  };

  listings.push(newListing);

  renderListings();

  form.reset();
});
const australianSchools = [
  // NSW Public and Selective Schools
  "Sydney High School",
  "Parramatta Public School",
  "Newtown High School of the Performing Arts",
  "North Sydney Girls High School",
  "Hornsby Girls High School",
  "Baulkham Hills High School",
  "James Ruse Agricultural High School",
  "Fort Street High School",
  "Penrith High School",
  "Ryde Secondary College",
  "Manly Selective Campus",
  "Gosford High School",
  "Hurlstone Agricultural High School",
  "The King's School",
  "St George Girls High School",
  "Cheltenham Girls High School",
  "Normanhurst Boys High School",
  "Cumberland High School",
  "Granville Boys High School",
  "Granville South Creative and Performing Arts High School",
  "Bankstown Girls High School",
  "Canterbury Boys High School",
  "Epping Boys High School",
  "Campsie Public School",
  "Auburn Girls High School",
  "Cabarita Public School",
  "Bexley North Public School",
  "Balmain High School",
  "Albury High School",
  "Alexandria Park Community School",
  "Annandale Public School",
  "Asquith Boys High School",
  "Asquith Girls High School",
  "Auburn Public School",
  "Ballina High School",
  "Belmore Boys High School",
  "Belmore South Public School",
  "Berowra Christian School",
  "Berowra Public School",
  "Blacktown Boys High School",
  "Blacktown Girls High School",
  "Blakehurst High School",
  "Blaxland High School",
  "Bourke High School",
  "Braidwood Central School",
  "Brisbane Water Secondary College",
  "Burradoo Public School",
  "Camden High School",
  "Camden Public School",
  "Campbelltown Performing Arts High School",
  "Canley Vale High School",
  "Carlingford High School",
  "Castle Hill High School",
  "Catherine McAuley Westmead",
  "Chatswood High School",
  "Cheltenham Girls High School",
  "Cherrybrook Technology High School",
  "Chifley College",
  "Coffs Harbour High School",
  "Concord High School",
  "Coonabarabran High School",
  "Corowa High School",
  "Cronulla High School",
  "Daceyville Public School",
  "Davidson High School",
  "Deniliquin High School",
  "Dover Heights Public School",
  "Drummoyne Public School",
  "Dubbo College",
  "Dulwich Hill High School",
  "Earlwood Public School",
  "East Hills Boys High School",
  "East Hills Girls Technology High School",
  "Eastwood High School",
  "Emu Plains Public School",
  "Engadine High School",
  "Fairfield High School",
  "Fairfield West Public School",
  "Figtree High School",
  "Forest High School",
  "Gerringong Public School",
  "Gosford High School",
  "Granville Boys High School",
  "Granville South Creative and Performing Arts High School",
  "Greystanes High School",
  "Gymea Technology High School",
  "Hammondville Public School",
  "Hawkesbury High School",
  "Hornsby Girls High School",
  "Hurlstone Agricultural High School",
  "Illawarra Sports High School",
  "Ingleburn High School",
  "James Fallon High School",
  "James Ruse Agricultural High School",
  "Jannali High School",
  "John Warby Public School",
  "Katoomba High School",
  "Kellyville Public School",
  "Kemps Creek Public School",
  "Kentlyn Public School",
  "Kingsgrove High School",
  "Kingswood High School",
  "Kogarah High School",
  "Lindfield Public School",
  "Liverpool Boys High School",
  "Liverpool Girls High School",
  "Lismore High School",
  "Lithgow High School",
  "Londonderry Public School",
  "Macarthur Anglican School",
  "Macquarie Fields High School",
  "Macquarie University High School",
  "Marrickville High School",
  "Marsden High School",
  "Maroubra Bay High School",
  "Menai High School",
  "Merrylands High School",
  "Mona Vale Public School",
  "Moss Vale High School",
  "Mount Druitt High School",
  "Mount Saint Benedict College",
  "Mudgee High School",
  "Mullumbimby High School",
  "Murrumbidgee Regional High School",
  "Nepean High School",
  "Neutral Bay Public School",
  "Newcastle High School",
  "Newington College",
  "Normanhurst Boys High School",
  "North Sydney Girls High School",
  "North Sydney Boys High School",
  "Northmead Creative and Performing Arts High School",
  "Nowra High School",
  "Oberon High School",
  "Orange High School",
  "Oxley High School",
  "Parramatta High School",
  "Penrith High School",
  "Penshurst West Public School",
  "Pymble Ladies' College",
  "Queanbeyan High School",
  "Randwick Girls' High School",
  "Redfern Public School",
  "Richmond High School",
  "Riverstone High School",
  "Rockdale High School",
  "Rouse Hill High School",
  "Ryde Secondary College",
  "St George Girls High School",
  "St Ives High School",
  "St Marys Senior High School",
  "St Patrick's College",
  "Sutherland Shire Christian School",
  "Sydney Technical High School",
  "Sydney Secondary College",
  "Tamworth High School",
  "Tuggerah Lakes Secondary College",
  "Turner Freeman",
  "Ultimo Public School",
  "Umina Beach Public School",
  "Wahroonga Public School",
  "Waverley College",
  "Westfields Sports High School",
  "Wollongong High School",
  "Wyong High School",
  "Yanco Agricultural High School",

  // Catholic Schools
  "St Joseph's College, Hunters Hill",
  "Santa Sabina College",
  "Loreto Normanhurst",
  "Carmel Catholic College",
  "Mount Saint Benedict College",
  "Mary MacKillop College",
  "St Vincent's College, Potts Point",
  "St Ursula's College, Kingsgrove",
  "Our Lady of Mercy College, Parramatta",
  "Mercy Catholic College, Chatswood",
  "All Saints Catholic College, Liverpool",
  "Catholic Senior College, Liverpool",
  "Marist College Eastwood",
  "Marist Sisters' College, Woolwich",
  "McAuley Catholic College, Grafton",

  // Muslim Schools
  "Malek Fahd Islamic School",
  "Islamic College of Sydney",
  "Australian International Academy",
  "Australian Islamic College",
  "Greenacre Muslim School",
  "Zayed College for Girls",
  "Wesley College (Muslim Campus)",
  "Omar bin Al-Khattab College",
  "Australian Muslim College",
  "Nur Ul Islam School",
  "Al Amanah College",
  "Al Sadiq College",
  "Al Noori Muslim School",
  "Ibrahim Bin Adham College",
  "Western Grammar School",
  "AICS"
];
// Your Firebase config — get this from your Firebase Console > Project settings > General > Your apps > Firebase SDK snippet
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to Firebase Auth service
const auth = firebase.auth();

// Sign up function
function signUp(email, password) {
  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      alert("User registered successfully!");
      // You can redirect or update UI here
    })
    .catch(error => {
      alert(error.message);
    });
}

// Sign in function
function signIn(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      alert("User signed in successfully!");
      // Update UI or redirect
    })
    .catch(error => {
      alert(error.message);
    });
}

// Sign out function
function signOutUser() {
  auth.signOut()
    .then(() => {
      alert("User signed out!");
      // Update UI
    });
}
<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCF35AKe2AHRXaXX_0d3lQi9bpqM_C2NaQ",
    authDomain: "schooluniformsapp.firebaseapp.com",
    projectId: "schooluniformsapp",
    storageBucket: "schooluniformsapp.firebasestorage.app",
    messagingSenderId: "660528209566",
    appId: "1:660528209566:web:5c19e23b57ce2b8039258f",
    measurementId: "G-7W5EPT691T"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
