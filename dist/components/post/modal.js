function previewImage(event) {
  var reader = new FileReader();
  reader.onload = function () {
    var existingImage = document.getElementById("uploaded-image");
    if (existingImage) {
      // Replace existing image with new one
      existingImage.src = reader.result;
    } else {
      // Create new image element
      var output = document.createElement("img");
      output.id = "uploaded-image";
      output.src = reader.result;
      output.classList.add(
        "w-full",
        "h-full",
        "object-cover",
        "overflow-hidden",
        "rounded-md",
        "mx-auto"
      ); // Adjust classes as needed
      
      var imagecontainer = document.getElementById("upload-container");
      if (imagecontainer) {
        imagecontainer.classList.remove("hidden")
        imagecontainer.appendChild(output);
      }
    }
  };
  if (event.target.files.length > 0) {
    reader.readAsDataURL(event.target.files[0]);
  } else {
    // Remove uploaded image if no file selected
    var existingImage = document.getElementById("uploaded-image");
    if (existingImage) {
      existingImage.parentNode.removeChild(existingImage);
      imagecontainer.classList.add("hidden")
    }
  }
}