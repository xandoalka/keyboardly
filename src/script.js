const itemsContainer = document.querySelector("#items-container");
const filterName = document.querySelector("#filter-name");
const filterDeveloper = document.querySelector("#filter-developer");

let currentSortOrder = { field: "title", order: "asc" };

async function getData() {
   const url = "https://xanzu-postgresql.vercel.app";
   try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
   } catch (error) {
      console.error(error);
   }
}

function sortData(data, key, order) {
   return data.sort((a, b) => {
      if (order === "asc") {
         return a[key].localeCompare(b[key]);
      } else {
         return b[key].localeCompare(a[key]);
      }
   });
}

async function renderDataList(data) {
   itemsContainer.innerHTML = "";
   itemsContainer.classList.remove("xl:grid-cols-3", "grid", "grid-cols-1", "gap-4", "md:grid-cols-2");
   data.forEach((item) => {
      const container = document.createElement("div");
      container.classList.add("flex", "justify-between", "items-center", "my-2", "cursor-pointer");
      container.addEventListener("click", () => {
         showModal(item);
      });

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

      updateDisplayStyle();
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

async function renderDataGrid(data) {
   itemsContainer.innerHTML = "";
   itemsContainer.classList.add("xl:grid-cols-3", "grid", "grid-cols-1", "gap-4", "md:grid-cols-2");
   data.forEach((item) => {
      const container = document.createElement("div");
      container.classList.add("p-4", "bg-white", "rounded-2xl", "border", "max-w-[24.5rem]", "md:max-w-[28rem]", "xl:max-w-[23rem]", "w-full", "flex", "flex-col", "mx-auto");
      container.addEventListener("click", () => {
         showModal(item);
      });

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

      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("width", "22");
      rect.setAttribute("height", "18");
      rect.setAttribute("x", "1");
      rect.setAttribute("y", "3");
      rect.setAttribute("rx", "5");
      svg.appendChild(rect);

      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", "12");
      circle.setAttribute("cy", "12");
      circle.setAttribute("r", "2");
      svg.appendChild(circle);

      const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path1.setAttribute("d", "M6 12h.01");
      svg.appendChild(path1);

      const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path2.setAttribute("d", "M18 12h.01");
      svg.appendChild(path2);

      cost.appendChild(svg);

      if (item.cost.toLowerCase() === "free") {
         cost.appendChild(document.createTextNode("free"));
         cost.classList.add("capitalize");
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

      download.appendChild(svgDownload);
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

function showModal(item) {
   const modalContainer = document.createElement("div");
   modalContainer.classList.add("fixed", "top-0", "left-0", "w-full", "h-full", "bg-gray-500", "bg-opacity-50", "flex", "justify-center", "items-center", "opacity-0", "translate-y-2");

   const modalContent = document.createElement("div");
   modalContent.classList.add("bg-white", "rounded-t-2xl", "md:rounded-2xl", "p-5", "w-full", "max-w-xl", "lg:max-w-3xl", "xl:max-w-4xl", "max-h-[40rem]", "relative");

   const closeButton = document.createElement("button");
   closeButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-x">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    `;
   closeButton.classList.add("absolute", "top-6", "right-5", "text-gray-500");
   closeButton.addEventListener("click", () => {
      modalContainer.classList.remove("opacity-100", "translate-y-0");
      modalContainer.classList.add("opacity-0", "translate-y-2");
      setTimeout(() => {
         modalContainer.remove();
      }, 300);
   });
   modalContent.appendChild(closeButton);

   const headerContent = document.createElement("div");
   headerContent.classList.add("flex", "flex-wrap", "items-center", "mb-6", "mt-8", "w-full", "lg:justify-between");

   const logoAndHeader = document.createElement("div");
   logoAndHeader.classList.add("flex", "flex-wrap", "w-full", "lg:w-auto");
   headerContent.appendChild(logoAndHeader);

   const logoContainer = document.createElement("div");
   logoContainer.classList.add("w-14", "h-14", "xx:w-16", "xx:h-16", "lg:w-40", "lg:h-40", "rounded-xl", "overflow-hidden");

   const logo = document.createElement("img");
   logo.src = item.logo;
   logo.classList.add("w-full", "h-full", "object-cover", "object-center");
   logoContainer.appendChild(logo);
   logoAndHeader.appendChild(logoContainer);

   const header = document.createElement("div");
   header.classList.add("flex", "flex-col", "justify-center", "w-auto", "max-w-lg", "ml-2", "xx:ml-4", "mb-2", "h-fit");

   const titleContainer = document.createElement("div");
   titleContainer.classList.add("flex", "gap-3", "items-center", "xx:gap-4", "w-full");

   const title = document.createElement("h2");
   title.textContent = item.title;
   title.classList.add("font-semibold", "capitalize", "text-lg", "xx:leading-9", "xx:text-xl", "xx:col-span-2");
   titleContainer.appendChild(title);

   const share = document.createElement("button");
   const shareIcon = document.createElement("span");
   const shareText = document.createElement("p");
   shareText.textContent = "Share";
   shareText.classList.add("text-xs", "capitalize", "font-semibold", "leading-4");
   shareIcon.classList.add("w-4", "h-4", "inline-block");
   shareIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-share-2 w-full h-full"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>`;
   share.classList.add("text-green-500", "w-fit", "h-8", "pl-2", "pr-3", "rounded-md", "flex", "items-center", "gap-2", "justify-self-end", "self-end", "border", "border-green-500");
   share.appendChild(shareIcon);
   share.appendChild(shareText);
   titleContainer.appendChild(share);

   const developer = document.createElement("p");
   developer.textContent = item.developer;
   developer.classList.add("text-green-500", "capitalize", "leading-6", "text-sm");

   header.appendChild(titleContainer);
   header.appendChild(developer);

   const info = document.createElement("div");
   info.classList.add("flex", "justify-center", "lg:justify-start", "h-fit", "w-full", "mx-auto", "lg:mr-0", "mb-4", "lg:mb-0", "lg:ml-4", "lg:order-last");

   const version = document.createElement("div");
   const versionNumber = document.createElement("p");
   versionNumber.textContent = "1.0.7";
   versionNumber.classList.add("font-semibold", "text-gray-900", "text-xs");
   version.classList.add("flex", "flex-col", "gap-1", "text-xx", "items-center", "capitalize", "text-gray-400");
   version.appendChild(versionNumber);
   version.appendChild(document.createTextNode("Version"));

   const separator = document.createElement("div");
   separator.classList.add("w-[1px]", "h-7", "bg-gray-400/20", "mx-6", "my-auto");

   const update = document.createElement("div");
   const updateNumber = document.createElement("p");
   updateNumber.textContent = "Jun 10, 23";
   updateNumber.classList.add("font-semibold", "text-gray-900", "text-xs");
   update.classList.add("flex", "flex-col", "gap-1", "text-xx", "items-center", "capitalize", "text-gray-400");
   update.appendChild(updateNumber);
   update.appendChild(document.createTextNode("Last update"));

   info.appendChild(version);
   info.appendChild(separator);
   info.appendChild(update);

   const headerInfo = document.createElement("div");
   headerInfo.classList.add("flex", "flex-col", "justify-center");

   const updateDisplay = () => {
      if (window.innerWidth < 1024) {
         logoAndHeader.appendChild(header);
         logoAndHeader.appendChild(info);
      } else if (window.innerWidth >= 1024) {
         headerInfo.appendChild(header);
         headerInfo.appendChild(info);
         logoAndHeader.appendChild(headerInfo);
      }
   };

   window.addEventListener('resize', updateDisplay());

   const installBtn = document.createElement("button");
   installBtn.textContent = "Install";
   installBtn.classList.add("w-full", "lg:w-fit", "border", "py-2", "lg:px-4", "text-sm", "bg-green-500", "rounded-xl", "lg:rounded-lg", "text-white", "flex", "items-center", "gap-1", "justify-center", "justify-self-end");
   headerContent.appendChild(installBtn);

   modalContent.appendChild(headerContent);

   const imageContainers = document.createElement("div");
   imageContainers.classList.add("w-full", "h-28", "my-4", "overflow-y-hidden", "rounded-sm", "flex");

   const imageContainer = document.createElement("div");
   imageContainer.classList.add("w-", "h-full");
   const image = document.createElement("img");
   image.src = item.image;
   image.classList.add("w-full", "h-full", "object-cover", "object-center");
   imageContainer.appendChild(image);
   imageContainers.appendChild(imageContainer);
   modalContent.appendChild(imageContainers);

   const titleDescription = document.createElement("h3");
   titleDescription.textContent = "summary";
   titleDescription.classList.add("text-xl", "text-gray-900", "mb-2", "capitalize", "font-semibold");
   modalContent.appendChild(titleDescription);

   const description = document.createElement("p");
   description.textContent = item.description;
   description.classList.add("text-gray-500", "line-clamp-5", "mb-6");

   modalContent.appendChild(description);

   const readAllBtn = document.createElement("button");
   readAllBtn.textContent = "Read All";
   readAllBtn.classList.add("w-full", "font-semibold", "rounded-xl", "text-blue-500", "flex", "absolute", "bottom-3");
   modalContent.appendChild(readAllBtn);

   document.body.appendChild(modalContainer);
   setTimeout(() => {
      modalContainer.classList.add("opacity-100", "translate-y-0", "transition", "duration-300", "ease-in-out");
      modalContainer.classList.remove("opacity-0", "translate-y-2");
   }, 0);
   modalContainer.appendChild(modalContent);
}

const gridListBtn = document.querySelector("#gridlist-btn");
const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");
const filters = document.querySelector("#filters");

document.addEventListener("DOMContentLoaded", async () => {
   const data = await getData();
   const sortedData = sortData(data, currentSortOrder.field, currentSortOrder.order);
   renderDataList(sortedData);
   updateFilterUI(currentSortOrder.field, currentSortOrder.order);
});

gridListBtn.addEventListener("click", async () => {
   const data = await getData();
   const sortedData = sortData(data, currentSortOrder.field, currentSortOrder.order);
   if (gridBtn.classList.contains("hidden")) {
      gridBtn.classList.remove("hidden");
      listBtn.classList.add("hidden");
      filters.classList.remove("hidden");
      renderDataList(sortedData);
   } else {
      gridBtn.classList.add("hidden");
      listBtn.classList.remove("hidden");
      filters.classList.add("hidden");
      renderDataGrid(sortedData);
   }
});

filterName.addEventListener("click", async () => {
   const data = await getData();
   if (currentSortOrder.field !== "title") {
      currentSortOrder = { field: "title", order: "asc" };
   } else {
      currentSortOrder.order = currentSortOrder.order === "asc" ? "desc" : "asc";
   }
   const sortedData = sortData(data, currentSortOrder.field, currentSortOrder.order);
   renderDataList(sortedData);
   updateFilterUI(currentSortOrder.field, currentSortOrder.order);
});

filterDeveloper.addEventListener("click", async () => {
   const data = await getData();
   if (currentSortOrder.field !== "developer") {
      currentSortOrder = { field: "developer", order: "asc" };
   } else {
      currentSortOrder.order = currentSortOrder.order === "asc" ? "desc" : "asc";
   }
   const sortedData = sortData(data, currentSortOrder.field, currentSortOrder.order);
   renderDataList(sortedData);
   updateFilterUI(currentSortOrder.field, currentSortOrder.order);
});

function updateFilterUI(activeFilter, order) {
   const filterNameIcon = filterName.querySelector("svg");
   const filterDeveloperIcon = filterDeveloper.querySelector("svg");

   filterNameIcon.classList.remove("text-gray-600");
   filterDeveloperIcon.classList.remove("text-gray-600");

   if (activeFilter === "title") {
      filterDeveloperIcon.classList.add("text-gray-600");
      const paths = filterNameIcon.querySelectorAll("path");
      if (order === "asc") {
         paths[0].classList.add("text-gray-600");
         paths[1].classList.remove("text-gray-600");
      } else {
         paths[0].classList.remove("text-gray-600");
         paths[1].classList.add("text-gray-600");
      }
   } else {
      filterNameIcon.classList.add("text-gray-600");
      const paths = filterDeveloperIcon.querySelectorAll("path");
      if (order === "asc") {
         paths[0].classList.add("text-gray-600");
         paths[1].classList.remove("text-gray-600");
      } else {
         paths[0].classList.remove("text-gray-600");
         paths[1].classList.add("text-gray-600");
      }
   }
}
