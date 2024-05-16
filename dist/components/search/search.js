const searchInput = document.querySelector(".searchInput");
const resultsContainer = document.querySelector(".resultsContainer");

const addResult = (entryObject) => {
  if (entryObject.profilepic == "") {
    entryObject.profilepic = "http://localhost:5000/cdn/cat.png"
  }else{
    entryObject.profilepic = "http://localhost:5000/cdn/" + entryObject.profilepic
  }
  const image = `<img src="${entryObject.profilepic}" class="object-cover w-full h-full">`;

  const friendButton = `
         <button class="py-2 px-4 bg-accent rounded-md text-sm"> 
           Add friend
         </button>`;
  let profileStructure = `
    <a class="w-full h-10 flex justify-between items-center gap-x-6 text-text" href="/profile">
       <div class="flex items-center space-x-2">
         <span class="w-12 h-12 overflow-hidden rounded-full">${image}</span>
         <div class="flex flex-col">
          <p class="font-medium text-md">${entryObject.username}</p>
          <p class="text-text text-opacity-40 text-sm">${
            entryObject.displayname
          }</p>
         </div>
       </div>
       ${entryObject.isFriends ? "" : friendButton}
    </a>`;

  resultsContainer.insertAdjacentHTML("afterbegin", profileStructure);
};

searchInput.addEventListener("input", async (e) => {

  const inputValue = e.target.value.toLowerCase().trim(); // Convert input to lowercase and trim whitespace

  let result = await fetch('http://localhost:5000/api/user/search/' + inputValue);
  result = await result.json();

  const filterResults = result.filter((eachData) => {
    return (
      eachData.username &&
      eachData.displayname.toLowerCase().includes(inputValue)
    );
  });

  if (inputValue.length) {
    resultsContainer.classList.replace("hidden", "flex");
    resultsContainer.innerHTML = "";
    if (filterResults.length !== 0) {
      filterResults.forEach(async (eachFilteredObject) => {
        let resultIsFriend = await fetch('http://localhost:5000/api/user/get/' + eachFilteredObject.username , {
          credentials: 'include', // Include cookies in the request
        });
        resultIsFriend = await resultIsFriend.json();
        console.log(resultIsFriend.isFriends)

        eachFilteredObject.isFriends = resultIsFriend.isFriends || false;
        addResult(eachFilteredObject);
      });
    } else {
      // If no results found, display "No results found"
      resultsContainer.innerHTML = `<a class="w-full h-10 flex justify-between items-center gap-x-2 text-text text-opacity-40" href="">Search for "${inputValue}"</a>`;
    }
  } else {
    resultsContainer.classList.replace("flex", "hidden");
  }
});
