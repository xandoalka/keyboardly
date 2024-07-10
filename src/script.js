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

async function renderDataList() {
   const data = await getData();
   itemsContainer.innerHTML = "";
   itemsContainer.classList.remove("xl:grid-cols-3", "grid", "grid-cols-1", "gap-4", "md:grid-cols-2");
   data.forEach((item) => {
      const container = document.createElement("div");
      container.classList.add("flex", "justify-between", "items-center", "my-2", "cursor-pointer");

      const itemContainer = document.createElement("div");
      itemContainer.classList.add("flex", "gap-3", "items-center", "py-2");

      const imageContainer = document.createElement("div");
      imageContainer.classList.add("w-10", "h-10", "rounded-xl", "overflow-hidden", "md:w-12", "md:h-12", "lg:w-16", "lg:h-16");
      const image = document.createElement("img");
      image.classList.add("w-full", "h-full", "object-cover", "object-center");
      image.src = item.logo;
      imageContainer.appendChild(image);

      const dataContainer = document.createElement("div");
      dataContainer.classList.add("flex", "flex-col", "justify-center", "text-sm", "md:text-base");

      const title = document.createElement("h3");
      title.classList.add("font-semibold", "capitalize");
      title.textContent = item.title;
      dataContainer.appendChild(title);

      const developer = document.createElement("p");
      developer.classList.add("text-gray-400/70", "capitalize", "lg:hidden");
      developer.textContent = item.developer;
      dataContainer.appendChild(developer);

      const description = document.createElement("p");
      description.classList.add("text-gray-400", "line-clamp-2", "max-w-sm", "text-sm");

      const updateDisplayStyle = () => {
         if (window.innerWidth < 1024) {
            description.style.display = "none";
         } else {
            description.style.display = "-webkit-box";
         }
      };

      // Set the initial display style
      updateDisplayStyle();

      // Update the display style on window resize
      window.addEventListener('resize', updateDisplayStyle);

      description.textContent = item.description;
      dataContainer.appendChild(description);


      const developerContainer = document.createElement("div");
      developerContainer.classList.add("hidden", "lg:flex", "items-center", "text-gray-800", "font-medium", "capitalize");
      developerContainer.textContent = item.developer;

      itemContainer.appendChild(imageContainer);
      itemContainer.appendChild(dataContainer);

      const instalContainer = document.createElement("div");
      const install = document.createElement("button");
      install.classList.add("bg-green-500", "text-white", "px-2", "py-1", "rounded-md", "font-semibold", "text-sm", "flex", "gap-1", "items-center");

      // Buat elemen SVG
      const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      icon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      icon.setAttribute("width", "24");
      icon.setAttribute("height", "24");
      icon.setAttribute("viewBox", "0 0 24 24");
      icon.setAttribute("fill", "none");
      icon.setAttribute("stroke", "currentColor");
      icon.setAttribute("stroke-width", "2");
      icon.setAttribute("stroke-linecap", "round");
      icon.setAttribute("stroke-linejoin", "round");
      icon.classList.add("w-6", "h-6");

      // Tambahkan path ke dalam SVG
      const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path1.setAttribute("d", "M5 12h14");
      icon.appendChild(path1);

      const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path2.setAttribute("d", "M12 5v14");
      icon.appendChild(path2);

      install.appendChild(icon);
      install.appendChild(document.createTextNode("Install"));
      instalContainer.appendChild(install);

      container.appendChild(itemContainer);
      container.appendChild(developerContainer);
      container.appendChild(instalContainer);
      itemsContainer.appendChild(container);
   });
}

async function renderDataGrid() {
   const data = await getData();
   itemsContainer.innerHTML = "";
   itemsContainer.classList.add("xl:grid-cols-3", "grid", "grid-cols-1", "gap-4", "md:grid-cols-2");
   data.forEach((item) => {
      const container = document.createElement("div");
      container.classList.add("p-4", "bg-white", "rounded-2xl", "border", "max-w-[24.5rem]", "md:max-w-[21.5rem]", "lg:max-w-[23rem]", "w-full", "flex", "flex-col", "mx-auto");

      const imageContainer = document.createElement("div");
      imageContainer.classList.add("w-full", "max-h-52", "rounded-xl", "overflow-hidden");
      const image = document.createElement("img");
      image.classList.add("w-full", "h-full", "object-cover", "object-center");
      image.src = item.image;
      imageContainer.appendChild(image);

      const dataContainer = document.createElement("div");
      dataContainer.classList.add("flex", "justify-between", "mt-4");
      const left = document.createElement("div");
      left.classList.add("flex", "items-center", "gap-3");
      const right = document.createElement("div");
      right.classList.add("flex", "items-center", "gap-3");


      const logoContainer = document.createElement("div");
      logoContainer.classList.add("w-10", "h-10", "rounded-xl", "overflow-hidden");
      const logo = document.createElement("img");
      logo.classList.add("w-full", "h-full", "object-cover", "object-center");
      logo.src = item.logo;
      logoContainer.appendChild(logo);

      const description = document.createElement("div");
      description.classList.add("flex", "flex-col", "justify-center", "text-sm");

      const title = document.createElement("h3");
      title.classList.add("font-semibold", "capitalize");
      title.textContent = item.title;
      description.appendChild(title);

      const developer = document.createElement("p");
      developer.classList.add("text-gray-400/70", "capitalize");
      developer.textContent = item.developer;
      description.appendChild(developer);

      const cost = document.createElement("p");
      cost.classList.add("text-gray-400", "text-sm", "flex", "items-center", "gap-1");

      // Buat elemen SVG
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svg.setAttribute("width", "24");
      svg.setAttribute("height", "24");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("fill", "none");
      svg.setAttribute("stroke", "currentColor");
      svg.setAttribute("stroke-width", "2");
      svg.setAttribute("stroke-linecap", "round");
      svg.setAttribute("stroke-linejoin", "round");
      svg.classList.add("lucide", "lucide-banknote", "w-4", "h-4", "flex", "items-stretch", "justify-center", "text-gray-500");

      // Tambahkan elemen `rect` ke dalam SVG
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("width", "22");
      rect.setAttribute("height", "18");
      rect.setAttribute("x", "1");
      rect.setAttribute("y", "3");
      rect.setAttribute("rx", "5");
      svg.appendChild(rect);

      // Tambahkan elemen `circle` ke dalam SVG
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", "12");
      circle.setAttribute("cy", "12");
      circle.setAttribute("r", "2");
      svg.appendChild(circle);

      // Tambahkan elemen `path` ke dalam SVG
      const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path1.setAttribute("d", "M6 12h.01");
      svg.appendChild(path1);

      const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path2.setAttribute("d", "M18 12h.01");
      svg.appendChild(path2);

      // Tambahkan SVG ke dalam elemen `p`
      cost.appendChild(svg);

      // Tambahkan teks `item.cost`
      if (item.cost.toLowerCase() === "free") {
         cost.appendChild(document.createTextNode("free"));
         cost.classList.add("capitalize")
      } else {
         if (item.subscribe === "NO") {
            cost.appendChild(document.createTextNode("Rp " + item.cost.replace(/\B(?=(\d{3})+(?!\d))/g, ".")));
         } else {
            cost.appendChild(document.createTextNode("Rp " + item.cost.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "/mth"));
         }
      }
      right.appendChild(cost);

      const download = document.createElement("p");
      download.classList.add("text-gray-400", "capitalize", "text-sm", "flex", "items-center", "gap-1");

      // Buat elemen SVG
      const svgDownload = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svgDownload.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svgDownload.setAttribute("width", "24");
      svgDownload.setAttribute("height", "24");
      svgDownload.setAttribute("viewBox", "0 0 24 24");
      svgDownload.setAttribute("fill", "none");
      svgDownload.setAttribute("stroke", "currentColor");
      svgDownload.setAttribute("stroke-width", "2");
      svgDownload.setAttribute("stroke-linecap", "round");
      svgDownload.setAttribute("stroke-linejoin", "round");
      svgDownload.classList.add("lucide", "lucide-download", "w-4", "h-4", "flex", "items-stretch", "justify-center", "text-gray-500");

      // Tambahkan path ke dalam SVG
      const path1Download = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path1Download.setAttribute("d", "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4");
      svgDownload.appendChild(path1Download);

      const polylineDownload = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
      polylineDownload.setAttribute("points", "7 10 12 15 17 10");
      svgDownload.appendChild(polylineDownload);

      const lineDownload = document.createElementNS("http://www.w3.org/2000/svg", "line");
      lineDownload.setAttribute("x1", "12");
      lineDownload.setAttribute("x2", "12");
      lineDownload.setAttribute("y1", "15");
      lineDownload.setAttribute("y2", "3");
      svgDownload.appendChild(lineDownload);

      // Tambahkan SVG ke dalam elemen `p`
      download.appendChild(svgDownload);

      // Tambahkan teks `item.download`
      download.appendChild(document.createTextNode(item.download));

      right.appendChild(download);

      left.appendChild(logoContainer);
      left.appendChild(description);

      dataContainer.appendChild(left);

      dataContainer.appendChild(right);

      container.appendChild(imageContainer);
      container.appendChild(dataContainer);
      itemsContainer.appendChild(container);
   });
}

// fungsi untuk ubah menjadi grid dan list 

const gridListBtn = document.querySelector("#gridlist-btn");
const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");
const filters = document.querySelector("#filters");

document.addEventListener("DOMContentLoaded", () => {
   if (listBtn.classList.contains("hidden")) {
      renderDataList()
   } else {
      renderDataGrid()
   }
});
gridListBtn.addEventListener("click", () => {
   if (gridBtn.classList.contains("hidden")) {
      gridBtn.classList.remove("hidden");
      listBtn.classList.add("hidden");
      filters.classList.remove("hidden");
      renderDataList();
   } else {
      gridBtn.classList.add("hidden");
      listBtn.classList.remove("hidden");
      filters.classList.add("hidden");
      renderDataGrid();
   }
});