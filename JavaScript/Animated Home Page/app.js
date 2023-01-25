const trashContainer = document.querySelector(".trash-container");
const quantity = document.querySelector(".quantity-removed");

const formatQty = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

const formatAmtLeft = new Intl.NumberFormat("en-IN", {
  minimumIntegerDigits: 8,
  maximumFractionDigits: 0,
  useGrouping: false,
});

let removedQuantity = 0;
quantity.textContent = removedQuantity;

const AMOUNT_TO_RAISED = 30000000;

const getRemovedTrash = async () => {
  try {
    const res = await fetch("https://tscache.com/donation_total.json", {
      method: "GET",
    });
    const data = await res.json();
    removedQuantity = data.count;
    quantity.textContent = formatQty.format(removedQuantity);

    const amountLeftToRaise = AMOUNT_TO_RAISED - removedQuantity;
    const formattedAmt = formatAmtLeft.format(amountLeftToRaise);
    const trashQuantity = [
      {
        qty: parseInt(`${formattedAmt[0]}${formattedAmt[1]}`),
        icon: "plastic-bag",
      },
      { qty: parseInt(`${formattedAmt[2]}`), icon: "oil" },
      { qty: parseInt(`${formattedAmt[3]}`), icon: "phone" },
      { qty: parseInt(`${formattedAmt[4]}`), icon: "trash" },
      { qty: parseInt(`${formattedAmt[5]}`), icon: "bottle" },
      { qty: parseInt(`${formattedAmt[6]}`), icon: "headset" },
    ];

    trashQuantity.forEach((tq) => {
      for (let i = 0; i < tq.qty; i++) {
        createIcon(tq.icon);
      }
    });
    console.log(trashQuantity);
  } catch (error) {
    console.log(error);
  }
};

getRemovedTrash();

const createIcon = (icon) => {
  const img = document.createElement("img");
  img.classList.add("trash");
  const top = randomNuberBetween(0, 50);
  img.style.top = `${top}vh`;
  img.style.left = `${randomNuberBetween(0, 99)}vw`;
  const size = top / 5 + 1;
  img.style.width = `${size}vmin`;
  img.style.height = `${size}vmin`;
  img.style.zIndex = 2;
  img.style.setProperty("--rotation", `${randomNuberBetween(-30, 30)}deg`);
  img.src = `/assets/${icon}.svg`;
  trashContainer.appendChild(img);
};

const randomNuberBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
