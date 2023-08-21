let total = 0;
let appliedCoupon = false;

function getCardInfo(event) {
    const selectItem = document.getElementById('all-items');
    const itemName = event.children[1].children[1].innerText;
    const p = document.createElement('p');
    const count = selectItem.childElementCount;
    p.innerText = `${count + 1}. ${itemName}`;
    selectItem.appendChild(p);

    const priseString = event.children[1].children[2].innerText.split(" ")[0];
    total += parseInt(priseString);
    const totalPriseString = document.getElementById('total-prise');
    totalPriseString.innerText = total;
    getTotalToValidateButton(total);
    if (appliedCoupon) {
        getInputValue();
    }
}

function getInputValue() {
    const getInputField = document.getElementById('input-field');
    const couponCode = getInputField.value;

    if (total < 200) {
        alert("Total price is too low");
        resetCoupon();
    } else if (couponCode === "SELL200") {
        const previousTotal = total;
        const discount = total * 0.2;
        total -= discount;
        appliedCoupon = true;
        updateTotal(total, previousTotal);
    } else {
        alert("Invalid Coupon Code");
        resetCoupon();
    }
}

function resetCoupon() {
    appliedCoupon = false;
    updateTotal(total, previousTotal);
}

function updateTotal(total, previousTotal) {
    const previousTotalValue = previousTotal;
    const totalValue = total;
    const discount = previousTotal - total;
    const fixedDiscount = discount.toFixed(1);
    setTheValue(fixedDiscount)
    const totalPriseString = document.getElementById('in-total');
    totalPriseString.innerText = total;

}
function setTheValue(discount) {
    const discountString = document.getElementById('discount-total');
    discountString.innerText = discount;
}

document.getElementById('go-home').addEventListener('click', function () {
    const clearChild = document.getElementById('all-items');
    const clearDiscount = document.getElementById('discount-total');
    const clearPriceTotal = document.getElementById('total-prise');
    const clearTotal = document.getElementById('in-total');
    clearDiscount.innerText = "";
    clearPriceTotal.innerText = "";
    clearTotal.innerText = "";
    removeAllChildNodes(clearChild);
    window.location.reload();
});
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function getTotalToValidateButton(total) {
    if (total > 0) {
        const btn = document.getElementById("purchase-btn");
        btn.removeAttribute('disabled', "");
    }
    if (total > 200) {
        const btn = document.getElementById("apply-btn");
        btn.removeAttribute('disabled', "");
    }
}