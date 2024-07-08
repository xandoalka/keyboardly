const itemsContainer = document.querySelector("#items-container");

async function getData() {
   const url = "https://xanzu-postgresql.vercel.app"
   try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
   } catch (error) {
      console.error(error);
   }
}

async function renderData() {
   const data = await getData();
   itemsContainer.innerHTML = "";
   data.forEach((item) => {
      const container = document.createElement("div");
      container.classList.add("flex", "justify-between", "items-center", "my-2");

      const itemContainer = document.createElement("div");
      itemContainer.classList.add("flex", "gap-3", "items-center", "py-2");
      
      const imageContainer = document.createElement("div");
      imageContainer.classList.add("w-11", "h-11", "rounded-xl", "overflow-hidden");
      const image = document.createElement("img");
      image.classList.add("w-full", "h-full", "object-cover", "object-center");
      image.src = item.logo;
      imageContainer.appendChild(image);

      const dataContainer = document.createElement("div");
      dataContainer.classList.add("flex", "flex-col", "justify-center", "gap-0", "leading-7");

      const title = document.createElement("h3");
      title.classList.add("font-semibold", "capitalize");
      title.textContent = item.title;
      dataContainer.appendChild(title);

      const developer = document.createElement("p");
      developer.classList.add("text-gray-400/70", "capitalize", "text-sm");
      developer.textContent = item.developer;
      dataContainer.appendChild(developer);

      itemContainer.appendChild(imageContainer);
      itemContainer.appendChild(dataContainer);

      const instalContainer = document.createElement("div");
      const install = document.createElement("button");
      install.classList.add("bg-green-500", "text-white", "px-3", "py-1.5", "rounded-md", "font-semibold", "text-sm", "flex", "gap-2", "items-center");
      const icon = document.createElement("img");
      icon.src = "./images/plus.png";
      icon.classList.add("w-6", "h-6");
      install.appendChild(icon);
      install.appendChild(document.createTextNode("Install"));
      instalContainer.appendChild(install);

      container.appendChild(itemContainer);
      container.appendChild(instalContainer);
      itemsContainer.appendChild(container);
   });
}



document.addEventListener("DOMContentLoaded", renderData)