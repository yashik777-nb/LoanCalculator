// Listen for submit
document
  .getElementById("loan-form")
  .addEventListener("submit", calculateResults);

// Calculate Results
function calculateResults(e) {
  // UI Varaibles
  const uiAmount = document.getElementById("amount");
  const uiInterest = document.getElementById("interest");
  const uiYears = document.getElementById("years");
  const uiMonthlyPayment = document.getElementById("monthly-payment");
  const uiTotalPayment = document.getElementById("total-payment");
  const uiTotalInterest = document.getElementById("total-interest");

  // Calculations
  const principle = parseFloat(uiAmount.value);
  const calculatedInterest = parseFloat(uiInterest.value) / 100 / 12;
  const calculatedPaymentMonths = parseFloat(uiYears.value) * 12;

  // Monthly Payment
  const x = Math.pow(1 + calculatedInterest, calculatedPaymentMonths);
  const monthly = (principle * x * calculatedInterest) / (x - 1);
  if (isFinite(monthly)) {
    uiMonthlyPayment.value = monthly.toFixed(2);
    uiTotalPayment.value = (monthly * calculatedPaymentMonths).toFixed(2);
    uiTotalInterest.value = (
      monthly * calculatedPaymentMonths -
      principle
    ).toFixed(2);
  } else {
    showError("Please Check your numbers");
  }
  uiMonthlyPayment.value = monthly.toFixed(2);
  e.preventDefault();
}

// Error Message
function showError(error) {
  // Get Elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");
  const errorDiv = document.createElement("div");
  errorDiv.className = "alert alert-danger";
  errorDiv.appendChild(document.createTextNode(error));

  //   Insert into DOM, above heading
  card.insertBefore(errorDiv, heading);

  //   Clear error After 3s
  setTimeout(clearError, 3000);
}

// Clear Error
function clearError() {
  document.querySelector(".alert").remove();
}
