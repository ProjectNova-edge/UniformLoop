
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
