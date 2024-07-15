const itemsContainer = document.querySelector("#items-container");
const filterName = document.querySelector("#filter-name");
const filterDeveloper = document.querySelector("#filter-developer");
const searchInput = document.querySelector("#search-input");
const clearIcon = document.querySelector("#clear-icon");

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

function filterData(data, query) {
   return data.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
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
      developer.classList.add("text-gray-400/70", "capitalize", "text-xs", "md:text-sm", "lg:hidden");
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
   modalContent.classList.add("bg-white", "rounded-t-2xl", "md:rounded-2xl", "p-5", "lg:px-8", "lg:pb-8", "w-full", "max-w-xl", "lg:max-w-3xl", "xl:max-w-5xl", "max-h-[40rem]", "relative");

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
   logoContainer.classList.add("w-14", "h-14", "xx:w-16", "xx:h-16", "lg:w-36", "lg:h-36", "rounded-xl", "overflow-hidden");

   const logo = document.createElement("img");
   logo.src = item.logo;
   logo.classList.add("w-full", "h-full", "object-cover", "object-center");
   logoContainer.appendChild(logo);
   logoAndHeader.appendChild(logoContainer);

   const header = document.createElement("div");
   header.classList.add("flex", "flex-col", "justify-center", "w-auto", "max-w-lg", "ml-2", "xx:ml-6", "lg:ml-10", "mb-7", "h-fit");

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
   share.addEventListener("click", () => {
      if (window.innerWidth < 500) {
         showShareModal(item);
         modalContainer.classList.remove("opacity-100", "translate-y-0");
         modalContainer.classList.add("opacity-0", "translate-y-2");
         setTimeout(() => {
            modalContainer.remove();
         }, 300);
      } else {
         showShareModal(item);
      }
   })
   titleContainer.appendChild(share);

   const developer = document.createElement("p");
   developer.textContent = item.developer;
   developer.classList.add("text-green-500", "capitalize", "leading-6", "text-sm");

   header.appendChild(titleContainer);
   header.appendChild(developer);

   const info = document.createElement("div");
   info.classList.add("flex", "justify-center", "lg:justify-start", "h-fit", "w-full", "mx-auto", "lg:mr-0", "mb-6", "lg:mb-0", "lg:ml-10", "lg:order-last");

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
   installBtn.addEventListener("click", () => {
      if (window.innerWidth > 500) {
         showInstall(item);
      }
   });
   headerContent.appendChild(installBtn);

   modalContent.appendChild(headerContent);

   const imageContainers = document.createElement("div");
   imageContainers.classList.add("w-full", "h-32", "lg:h-56", "my-4", "overflow-y-hidden", "rounded-sm", "flex");

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
   description.classList.add("text-gray-500", "line-clamp-4", "lg:line-clamp-5", "mb-6");

   modalContent.appendChild(description);

   const readAllBtn = document.createElement("button");
   readAllBtn.textContent = "Read All";
   readAllBtn.classList.add("w-full", "font-semibold", "rounded-xl", "text-blue-500", "flex", "absolute", "bottom-4");
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

searchInput.addEventListener("input", search);

async function search() {
   const query = searchInput.value;
   if (query.length >= 2) {
      clearIcon.classList.remove("hidden");
      const data = await getData();
      const filteredData = filterData(sortData(data, currentSortOrder.field, currentSortOrder.order), query);
      renderDataList(filteredData);
   } else {
      clearIcon.classList.add("hidden");
      renderData();
   }
}

clearIcon.addEventListener("click", () => {
   searchInput.value = "";
   clearIcon.classList.add("hidden");
   renderData();
});

async function renderData() {
   const data = await getData();
   const sortedData = sortData(data, currentSortOrder.field, currentSortOrder.order);
   renderDataList(sortedData);
   updateFilterUI(currentSortOrder.field, currentSortOrder.order);
}

function showShareModal(item) {
   const modalContainer = document.createElement("div");
   modalContainer.classList.add("fixed", "top-0", "left-0", "w-full", "h-full", "bg-gray-500", "bg-opacity-50", "flex", "justify-center", "items-center", "opacity-0", "translate-y-2");

   const modalContent = document.createElement("div");
   modalContent.classList.add("bg-white", "rounded-t-xl", "md:rounded-2xl", "p-7", "w-full", "max-w-xl", "max-h-[40rem]", "md:relative", "fixed", "bottom-0");

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

   const modalTitle = document.createElement("h2");
   modalTitle.textContent = "Share";
   modalTitle.classList.add("text-xl", "font-semibold", "mb-4", "relative", "-top-2", "w-fit");
   modalContent.appendChild(modalTitle);

   const header = document.createElement("div");
   header.classList.add("flex", "mb-6");

   const logoContainer = document.createElement("div");
   logoContainer.classList.add("w-16", "h-16", "rounded-xl", "overflow-hidden");

   const logo = document.createElement("img");
   logo.src = item.logo;
   logo.classList.add("w-full", "h-full", "object-cover", "object-center");
   logoContainer.appendChild(logo);

   const titleContainer = document.createElement("div");
   titleContainer.classList.add("flex", "flex-col", "justify-center", "ml-4", "gap-1");

   const title = document.createElement("h2");
   title.textContent = item.title;
   title.classList.add("font-semibold", "capitalize", "text-base", "leading-6");
   titleContainer.appendChild(title);

   const developer = document.createElement("p");
   developer.textContent = item.developer;
   developer.classList.add("text-green-500", "capitalize", "text-sm");
   titleContainer.appendChild(developer);

   header.appendChild(logoContainer);
   header.appendChild(titleContainer);
   modalContent.appendChild(header);

   const shareOptions = document.createElement("div");
   shareOptions.classList.add("flex", "gap-8", "overflow-x-auto", "mb-4", "whitespace-nowrap", "-mx-7", "px-5", "md:justify-between", "md:mx-0", "md:px-0", "md:w-full");

   const shareOption1 = document.createElement("button");
   shareOption1.classList.add("flex", "flex-col", "items-center", "gap-1");
   const shareOption1Logo = document.createElement("span");
   shareOption1Logo.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M20.71 3.6545C20.71 3.6545 22.6525 2.897 22.49 4.7365C22.4365 5.494 21.951 8.1455 21.573 11.013L20.278 19.508C20.278 19.508 20.17 20.7525 19.1985 20.969C18.2275 21.185 16.7705 20.2115 16.5005 19.995C16.2845 19.8325 12.4535 17.3975 11.1045 16.2075C10.7265 15.8825 10.2945 15.2335 11.1585 14.476L16.8245 9.065C17.472 8.415 18.1195 6.9 15.4215 8.74L7.86653 13.88C7.86653 13.88 7.00303 14.4215 5.38453 13.9345L1.87653 12.852C1.87653 12.852 0.581525 12.0405 2.79402 11.229C8.19053 8.686 14.828 6.089 20.7095 3.654" fill="white"/>
      </svg>`;
   shareOption1Logo.classList.add("w-14", "h-14", "rounded-full", "bg-blue-400", "flex", "items-center", "justify-center", "aspect-square", "pr-1");
   shareOption1.appendChild(shareOption1Logo);
   const shareOption1Text = document.createElement("span");
   shareOption1Text.textContent = "Telegram";
   shareOption1Text.classList.add("text-xs");
   shareOption1.appendChild(shareOption1Text);
   shareOptions.appendChild(shareOption1);

   const shareOption2 = document.createElement("button");
   shareOption2.classList.add("flex", "flex-col", "items-center", "gap-1");
   const shareOption2Logo = document.createElement("span");
   shareOption2Logo.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_1_2583)">
      <path d="M0.512212 11.8564C0.511649 13.8728 1.04265 15.8418 2.05234 17.5772L0.415649 23.5067L6.53115 21.9156C8.22261 22.8293 10.1178 23.3081 12.0436 23.3082H12.0487C18.4064 23.3082 23.5816 18.1749 23.5844 11.8654C23.5856 8.808 22.3867 5.93302 20.2085 3.77005C18.0307 1.60726 15.1343 0.415534 12.0482 0.414139C5.68984 0.414139 0.514931 5.54716 0.512306 11.8564" fill="url(#paint0_linear_1_2583)"/>
      <path d="M0.100313 11.8527C0.0996563 13.9417 0.649687 15.981 1.69537 17.7786L0 23.9207L6.33478 22.2726C8.08022 23.2168 10.0454 23.7147 12.0451 23.7154H12.0502C18.636 23.7154 23.9972 18.3975 24 11.8621C24.0011 8.69488 22.7591 5.71656 20.5031 3.47609C18.2468 1.23591 15.2468 0.00130233 12.0502 0C5.46337 0 0.102938 5.31721 0.100313 11.8527ZM3.87291 17.469L3.63637 17.0965C2.64206 15.5277 2.11725 13.7149 2.118 11.8534C2.12006 6.4213 6.57544 2.00186 12.054 2.00186C14.7071 2.00298 17.2005 3.02921 19.0759 4.89116C20.9512 6.7533 21.9831 9.22865 21.9824 11.8614C21.98 17.2935 17.5245 21.7135 12.0502 21.7135H12.0463C10.2638 21.7126 8.51569 21.2376 6.99113 20.34L6.62831 20.1265L2.86912 21.1045L3.87291 17.469Z" fill="url(#paint1_linear_1_2583)"/>
      <path d="M9.06358 6.89749C8.8399 6.40419 8.60449 6.39424 8.39177 6.38559C8.21758 6.37814 8.01846 6.3787 7.81952 6.3787C7.6204 6.3787 7.29687 6.45303 7.0234 6.74931C6.74965 7.04587 5.97827 7.76252 5.97827 9.2201C5.97827 10.6778 7.04824 12.0864 7.1974 12.2843C7.34674 12.4818 9.26299 15.5687 12.2979 16.7562C14.8201 17.7431 15.3334 17.5468 15.8808 17.4973C16.4283 17.448 17.6474 16.7808 17.8961 16.089C18.1451 15.3973 18.1451 14.8044 18.0704 14.6805C17.9958 14.557 17.7967 14.4829 17.4981 14.3348C17.1994 14.1866 15.7315 13.4699 15.4578 13.371C15.1841 13.2722 14.985 13.2229 14.7859 13.5195C14.5868 13.8157 14.015 14.4829 13.8407 14.6805C13.6666 14.8785 13.4923 14.9032 13.1938 14.755C12.8951 14.6063 11.9335 14.2939 10.7926 13.2847C9.90499 12.4994 9.30574 11.5296 9.13155 11.2329C8.95737 10.9367 9.1129 10.7762 9.26262 10.6286C9.39677 10.4958 9.5613 10.2826 9.71074 10.1097C9.85962 9.93666 9.9093 9.81321 10.0089 9.61563C10.1085 9.41786 10.0586 9.24484 9.98412 9.09666C9.9093 8.94847 9.32908 7.48326 9.06358 6.89749Z" fill="white"/>
      </g>
      <defs>
      <linearGradient id="paint0_linear_1_2583" x1="1158.85" y1="2309.67" x2="1158.85" y2="0.414139" gradientUnits="userSpaceOnUse">
      <stop stop-color="#1FAF38"/>
      <stop offset="1" stop-color="#60D669"/>
      </linearGradient>
      <linearGradient id="paint1_linear_1_2583" x1="1200" y1="2392.07" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F9F9F9"/>
      <stop offset="1" stop-color="white"/>
      </linearGradient>
      <clipPath id="clip0_1_2583">
      <rect width="24" height="24" fill="white"/>
      </clipPath>
      </defs>
      </svg>
            `;
   shareOption2Logo.classList.add("w-14", "h-14", "rounded-full", "bg-[#60D669]", "flex", "items-center", "justify-center", "aspect-square");
   shareOption2.appendChild(shareOption2Logo);
   const shareOption2Text = document.createElement("span");
   shareOption2Text.textContent = "Whatsapp";
   shareOption2Text.classList.add("text-xs");
   shareOption2.appendChild(shareOption2Text);
   shareOptions.appendChild(shareOption2);

   const shareOption3 = document.createElement("button");
   shareOption3.classList.add("flex", "flex-col", "items-center", "gap-1");
   const shareOption3Logo = document.createElement("span");
   shareOption3Logo.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47 14 5.5 16 5.5H17.5V2.14C17.174 2.097 15.943 2 14.643 2C11.928 2 10 3.657 10 6.7V9.5H7V13.5H10V22H14V13.5Z" fill="white"/>
      </svg>`;
   shareOption3Logo.classList.add("w-14", "h-14", "rounded-full", "bg-blue-600", "flex", "items-center", "justify-center", "aspect-square");
   shareOption3.appendChild(shareOption3Logo);
   const shareOption3Text = document.createElement("span");
   shareOption3Text.textContent = "Facebook";
   shareOption3Text.classList.add("text-xs");
   shareOption3.appendChild(shareOption3Text);
   shareOptions.appendChild(shareOption3);

   const shareOption4 = document.createElement("button");
   shareOption4.classList.add("flex", "flex-col", "items-center", "gap-1");
   const shareOption4Logo = document.createElement("span");
   shareOption4Logo.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z" fill="white"/>
      <path d="M12 12.87C11.16 12.87 10.31 12.61 9.66003 12.08L6.53002 9.58C6.21002 9.32 6.15003 8.85 6.41003 8.53C6.67003 8.21 7.14003 8.15 7.46003 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.46 9.58L14.33 12.08C13.69 12.61 12.84 12.87 12 12.87Z" fill="#BDBDBD"/>
      </svg>
      `;
   shareOption4Logo.classList.add("w-14", "h-14", "rounded-full", "bg-gray-300", "flex", "items-center", "justify-center", "aspect-square");
   shareOption4.appendChild(shareOption4Logo);
   const shareOption4Text = document.createElement("span");
   shareOption4Text.textContent = "Facebook";
   shareOption4Text.classList.add("text-xs");
   shareOption4.appendChild(shareOption4Text);
   shareOptions.appendChild(shareOption4);

   const shareOption5 = document.createElement("button");
   shareOption5.classList.add("flex", "flex-col", "items-center", "gap-1");
   const shareOption5Logo = document.createElement("span");
   shareOption5Logo.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path fill-rule="evenodd" clip-rule="evenodd" d="M21.5859 21.375L14.0885 10.4471L14.1013 10.4574L20.8613 2.625H18.6023L13.0954 9L8.72227 2.625H2.79766L9.79723 12.8276L9.79638 12.8267L2.41406 21.375H4.67309L10.7955 14.2824L15.6613 21.375H21.5859ZM7.82719 4.32954L18.3466 19.6705H16.5564L6.02852 4.32954H7.82719Z" fill="white"/>
      </svg>
      `;
   shareOption5Logo.classList.add("w-14", "h-14", "rounded-full", "bg-black", "flex", "items-center", "justify-center", "aspect-square");
   shareOption5.appendChild(shareOption5Logo);
   const shareOption5Text = document.createElement("span");
   shareOption5Text.textContent = "X";
   shareOption5Text.classList.add("text-xs");
   shareOption5.appendChild(shareOption5Text);
   shareOptions.appendChild(shareOption5);

   const shareOption6 = document.createElement("button");
   shareOption6.classList.add("flex", "flex-col", "items-center", "gap-1");
   const shareOption6Logo = document.createElement("span");
   const shareOption6Images = document.createElement("img");
   shareOption6Images.src = "./src/images/ig.png";
   shareOption6Images.classList.add("w-full", "h-full")
   shareOption6Logo.appendChild(shareOption6Images);
   shareOption6Logo.classList.add("w-14", "h-14", "rounded-full", "bg-gray-300", "flex", "items-center", "justify-center", "aspect-square");
   shareOption6.appendChild(shareOption6Logo);
   const shareOption6Text = document.createElement("span");
   shareOption6Text.textContent = "Instagram";
   shareOption6Text.classList.add("text-xs");
   shareOption6.appendChild(shareOption6Text);
   shareOptions.appendChild(shareOption6);

   modalContent.appendChild(shareOptions);

   const copyLink = document.createElement("div");
   const copyInput = document.createElement("input");
   copyInput.type = "text";
   copyInput.value = `${window.location.origin}/addon?id=${item.title.toLowerCase().replace(/ /g, "-")}`;
   copyInput.classList.add("w-full", "bg-transparent", "focus:outline-none");
   copyLink.classList.add("w-full", "bg-gray-200", "p-3", "rounded-xl", "mt-6", "flex", "gap-2");
   const copyButton = document.createElement("button");
   copyButton.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
         <path d="M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z" fill="#06C149" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
   `;
   copyButton.appendChild(document.createTextNode("Copy"));
   copyButton.classList.add("px-2", "py-1", "bg-[#06C149]", "text-white", "rounded-md", "text-xs", "flex", "justify-center", "items-center", "gap-2", "font-semibold");
   copyLink.appendChild(copyInput);
   copyLink.appendChild(copyButton);

   modalContent.appendChild(copyLink);
   modalContainer.appendChild(modalContent);
   document.body.appendChild(modalContainer);
   setTimeout(() => {
      modalContainer.classList.add("opacity-100", "translate-y-0", "transition", "duration-300", "ease-in-out");
      modalContainer.classList.remove("opacity-0", "translate-y-2");
   }, 0);
}

function showInstall(item) {
   const modalContainer = document.createElement("div");
   modalContainer.classList.add("fixed", "top-0", "left-0", "w-full", "h-full", "bg-gray-500", "bg-opacity-50", "flex", "justify-center", "items-center", "opacity-0", "translate-y-2");

   const modalContent = document.createElement("div");
   modalContent.classList.add("bg-white", "rounded-t-xl", "md:rounded-2xl", "p-7", "w-full", "max-w-xl", "max-h-[40rem]", "md:relative", "fixed", "bottom-0");

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

   const modalTitle = document.createElement("h2");
   modalTitle.textContent = "Install";
   modalTitle.classList.add("text-xl", "font-semibold", "mb-4", "relative", "-top-2", "w-fit");
   modalContent.appendChild(modalTitle);


   const paragraph = document.createElement("p");
   paragraph.textContent = "Open this link from mobile phone:";
   paragraph.classList.add("text-gray-700", "font-semibold");
   modalContent.appendChild(paragraph);

   const copyLink = document.createElement("div");
   const copyInput = document.createElement("input");
   copyInput.type = "text";
   copyInput.value = `${window.location.origin}/addon?id=${item.title.toLowerCase().replace(/ /g, "-")}`;
   copyInput.classList.add("w-full", "bg-transparent", "focus:outline-none");
   copyLink.classList.add("w-full", "bg-gray-200", "p-3", "rounded-xl", "mt-2", "flex", "gap-2");
   const copyButton = document.createElement("button");
   copyButton.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
         <path d="M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z" fill="#06C149" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
   `;
   copyButton.appendChild(document.createTextNode("Copy"));
   copyButton.classList.add("px-2", "py-1", "bg-[#06C149]", "text-white", "rounded-md", "text-xs", "flex", "justify-center", "items-center", "gap-2", "font-semibold");
   copyLink.appendChild(copyInput);
   copyLink.appendChild(copyButton);

   modalContent.appendChild(copyLink);

   modalContainer.appendChild(modalContent);
   document.body.appendChild(modalContainer);
   setTimeout(() => {
      modalContainer.classList.add("opacity-100", "translate-y-0", "transition", "duration-300", "ease-in-out");
      modalContainer.classList.remove("opacity-0", "translate-y-2");
   }, 0);
}