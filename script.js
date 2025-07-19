
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
